import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
} from 'firebase/firestore'
import { db, isConfigured } from '../firebase/config'

export interface StudentProfile {
  uid: string
  email: string
  name: string
  phone?: string
  goals?: string
  education?: {
    level: string
    college: string
    university: string
    city: string
    state: string
    year: string
    graduationYear: string
  }
  targetExams?: string[]
  weakSubjects?: string[]
  strongSubjects?: string[]
  language?: string
  learningPreferences?: {
    studyHours: string
  }
  createdAt: string
  updatedAt: string
}

export interface MentorProfile {
  uid: string
  email: string
  name: string
  phone?: string
  bio?: string
  skills?: string[]
  categories?: string[]
  hourlyRate?: number
  availability?: {
    [key: string]: { start: string; end: string }[]
  }
  verificationStatus?: 'pending' | 'verified' | 'rejected'
  portfolio?: {
    education?: string
    experience?: string
    achievements?: string
  }
  heardAbout?: string
  createdAt: string
  updatedAt: string
}

export async function createStudentProfile(
  uid: string,
  data: Omit<StudentProfile, 'uid' | 'createdAt' | 'updatedAt'>
): Promise<void> {
  if (!isConfigured || !db) {
    console.warn('Firestore not configured - student profile not saved')
    return
  }
  const now = new Date().toISOString()
  await setDoc(doc(db, 'students', uid), {
    ...data,
    createdAt: now,
    updatedAt: now,
  })
}

export async function createMentorProfile(
  uid: string,
  data: Omit<MentorProfile, 'uid' | 'createdAt' | 'updatedAt'>
): Promise<void> {
  if (!isConfigured || !db) {
    console.warn('Firestore not configured - mentor profile not saved')
    return
  }
  const now = new Date().toISOString()
  await setDoc(doc(db, 'mentors', uid), {
    ...data,
    verificationStatus: 'pending',
    createdAt: now,
    updatedAt: now,
  })
}

export async function getStudentProfile(uid: string): Promise<StudentProfile | null> {
  if (!isConfigured || !db) {
    console.warn('Firestore not configured')
    return null
  }
  const docSnap = await getDoc(doc(db, 'students', uid))
  if (docSnap.exists()) {
    return docSnap.data() as StudentProfile
  }
  return null
}

export async function getMentorProfile(uid: string): Promise<MentorProfile | null> {
  if (!isConfigured || !db) {
    console.warn('Firestore not configured')
    return null
  }
  const docSnap = await getDoc(doc(db, 'mentors', uid))
  if (docSnap.exists()) {
    return docSnap.data() as MentorProfile
  }
  return null
}

export async function getUserProfile(uid: string): Promise<StudentProfile | MentorProfile | null> {
  const studentProfile = await getStudentProfile(uid)
  if (studentProfile) return studentProfile
  return await getMentorProfile(uid)
}

export async function updateStudentProfile(
  uid: string,
  data: Partial<Omit<StudentProfile, 'uid' | 'createdAt' | 'updatedAt'>>
): Promise<void> {
  if (!isConfigured || !db) {
    console.warn('Firestore not configured - student profile not updated')
    return
  }
  await updateDoc(doc(db, 'students', uid), {
    ...data,
    updatedAt: new Date().toISOString(),
  })
}

export async function updateMentorProfile(
  uid: string,
  data: Partial<Omit<MentorProfile, 'uid' | 'createdAt' | 'updatedAt'>>
): Promise<void> {
  if (!isConfigured || !db) {
    console.warn('Firestore not configured - mentor profile not updated')
    return
  }
  await updateDoc(doc(db, 'mentors', uid), {
    ...data,
    updatedAt: new Date().toISOString(),
  })
}