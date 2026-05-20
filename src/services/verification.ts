import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  query,
  where,
  getDocs,
  collection,
  type DocumentData,
} from 'firebase/firestore'
import { db, isConfigured } from '../firebase/config'

export type DocumentType = 'identity_front' | 'identity_back' | 'education' | 'professional' | 'intro_video'
export type DocumentStatus = 'pending' | 'approved' | 'rejected' | 'needs_clarification'

export interface MentorDocument {
  id: string
  mentorId: string
  documentType: DocumentType
  filePath: string
  fileName: string
  fileSize: number
  mimeType: string
  hash: string
  status: DocumentStatus
  reviewerNotes?: string
  flaggedReasons?: string[]
  submittedBy: string
  submittedAt: string
  reviewedAt?: string
  reviewedBy?: string
}

export interface VerificationFlags {
  duplicateHash: boolean
  mismatchedNames: boolean
  lowQuality: boolean
  suspicious: boolean
}

export async function hashFile(file: File): Promise<string> {
  const buffer = await file.arrayBuffer()
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

export function validateFileType(file: File): boolean {
  const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp']
  return allowedTypes.includes(file.type)
}

export function validateFileSize(file: File, maxMB: number = 5): boolean {
  return file.size <= maxMB * 1024 * 1024
}

export async function checkDuplicateHash(hash: string, excludeDocId?: string): Promise<boolean> {
  if (!isConfigured || !db) return false
  const q = query(collection(db, 'mentorDocuments'), where('hash', '==', hash))
  const snapshot = await getDocs(q)
  return snapshot.docs.some(d => d.id !== excludeDocId)
}

export async function submitMentorDocument(
  mentorId: string,
  documentType: DocumentType,
  file: File,
  filePath: string
): Promise<{ success: boolean; docId?: string; error?: string }> {
  if (!isConfigured || !db) {
    return { success: false, error: 'Database not configured' }
  }

  if (!validateFileType(file)) {
    return { success: false, error: 'Invalid file type. Allowed: PDF, JPG, PNG, WEBP' }
  }

  if (!validateFileSize(file)) {
    return { success: false, error: 'File too large. Maximum 5MB allowed' }
  }

  const hash = await hashFile(file)
  const isDuplicate = await checkDuplicateHash(hash)
  if (isDuplicate) {
    return { success: false, error: 'This file has already been submitted' }
  }

  const docId = `${mentorId}_${documentType}_${Date.now()}`
  const now = new Date().toISOString()

  const docData: MentorDocument = {
    id: docId,
    mentorId,
    documentType,
    filePath,
    fileName: file.name,
    fileSize: file.size,
    mimeType: file.type,
    hash,
    status: 'pending',
    submittedBy: mentorId,
    submittedAt: now,
  }

  try {
    await setDoc(doc(db, 'mentorDocuments', docId), docData)
    return { success: true, docId }
  } catch (err) {
    return { success: false, error: 'Failed to save document' }
  }
}

export async function getMentorDocuments(mentorId: string): Promise<MentorDocument[]> {
  if (!isConfigured || !db) return []
  const q = query(collection(db, 'mentorDocuments'), where('mentorId', '==', mentorId))
  const snapshot = await getDocs(q)
  return snapshot.docs.map(d => d.data() as MentorDocument)
}

export async function getPendingVerifications(): Promise<(MentorDocument & { mentorName?: string; mentorEmail?: string })[]> {
  if (!isConfigured || !db) return []
  const q = query(collection(db, 'mentorDocuments'), where('status', '==', 'pending'))
  const snapshot = await getDocs(q)
  const docs = snapshot.docs.map(d => d.data() as MentorDocument)
  
  const mentorIds = [...new Set(docs.map(d => d.mentorId))]
  const mentorsWithDocs: Map<string, { name?: string; email?: string }> = new Map()
  
  for (const id of mentorIds) {
    const mentorDoc = await getDoc(doc(db, 'mentors', id))
    if (mentorDoc.exists()) {
      const data = mentorDoc.data() as DocumentData
      mentorsWithDocs.set(id, { name: data.name, email: data.email })
    }
  }

  return docs.map(d => ({
    ...d,
    mentorName: mentorsWithDocs.get(d.mentorId)?.name,
    mentorEmail: mentorsWithDocs.get(d.mentorId)?.email,
  }))
}

export async function reviewDocument(
  docId: string,
  status: DocumentStatus,
  reviewerNotes: string,
  reviewerId: string,
  flaggedReasons?: string[]
): Promise<{ success: boolean; error?: string }> {
  if (!isConfigured || !db) {
    return { success: false, error: 'Database not configured' }
  }

  try {
    await updateDoc(doc(db, 'mentorDocuments', docId), {
      status,
      reviewerNotes,
      reviewedBy: reviewerId,
      reviewedAt: new Date().toISOString(),
      flaggedReasons: flaggedReasons || [],
    })
    return { success: true }
  } catch (err) {
    return { success: false, error: 'Failed to update document' }
  }
}

export async function updateMentorVerificationStatus(
  mentorId: string,
  status: 'pending' | 'verified' | 'rejected'
): Promise<void> {
  if (!isConfigured || !db) return
  await updateDoc(doc(db, 'mentors', mentorId), {
    verificationStatus: status,
    updatedAt: new Date().toISOString(),
  })
}

export async function checkMentorVerificationComplete(mentorId: string): Promise<boolean> {
  const docs = await getMentorDocuments(mentorId)
  const requiredTypes: DocumentType[] = ['identity_front', 'identity_back', 'education']
  const submittedTypes = docs.map(d => d.documentType)
  return requiredTypes.every(t => submittedTypes.includes(t))
}

export function getVerificationFlags(
  doc: MentorDocument,
  allDocs: MentorDocument[],
  _mentorName?: string
): VerificationFlags {
  const flags: VerificationFlags = {
    duplicateHash: false,
    mismatchedNames: false,
    lowQuality: false,
    suspicious: false,
  }

  const sameHashDocs = allDocs.filter(d => d.hash === doc.hash && d.id !== doc.id)
  if (sameHashDocs.length > 0) {
    flags.duplicateHash = true
    flags.suspicious = true
  }

  if (doc.fileSize < 10000) {
    flags.lowQuality = true
    flags.suspicious = true
  }

  return flags
}

export function getDocumentTypeLabel(type: DocumentType): string {
  const labels: Record<DocumentType, string> = {
    identity_front: 'Identity (Front)',
    identity_back: 'Identity (Back)',
    education: 'Education Proof',
    professional: 'Professional Certificate',
    intro_video: 'Intro Video',
  }
  return labels[type] || type
}

export function getStatusColor(status: DocumentStatus): string {
  const colors: Record<DocumentStatus, string> = {
    pending: '#F59E0B',
    approved: '#10B981',
    rejected: '#EF4444',
    needs_clarification: '#8B5CF6',
  }
  return colors[status] || '#6B7280'
}

export function getStatusLabel(status: DocumentStatus): string {
  const labels: Record<DocumentStatus, string> = {
    pending: 'Pending Review',
    approved: 'Approved',
    rejected: 'Rejected',
    needs_clarification: 'Needs Clarification',
  }
  return labels[status] || status
}