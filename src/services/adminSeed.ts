import { doc, getDoc, setDoc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore'
// Auth imports removed as they're not used in this file
import { db, isConfigured } from '../firebase/config'

export interface AdminUser {
  uid: string
  email: string
  displayName: string
  role: 'admin'
  createdBy?: string
  createdAt: string
  updatedAt: string
}

export async function promoteUserToAdmin(uid: string): Promise<{ success: boolean; error?: string }> {
  if (!isConfigured || !db) {
    return { success: false, error: 'Firestore not configured' }
  }
  try {
    const userRef = doc(db, 'users', uid)
    const userSnap = await getDoc(userRef)
    if (!userSnap.exists()) {
      return { success: false, error: 'User not found in Firestore' }
    }
    await updateDoc(userRef, {
      role: 'admin',
      updatedAt: new Date().toISOString(),
    })
    return { success: true }
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : 'Unknown error' }
  }
}

export async function createAdminUserRecord(
  uid: string,
  email: string,
  displayName: string,
  createdBy?: string
): Promise<{ success: boolean; error?: string }> {
  if (!isConfigured || !db) {
    return { success: false, error: 'Firestore not configured' }
  }
  try {
    const now = new Date().toISOString()
    const adminData: AdminUser = {
      uid,
      email,
      displayName,
      role: 'admin',
      createdBy,
      createdAt: now,
      updatedAt: now,
    }
    await setDoc(doc(db, 'users', uid), adminData)
    return { success: true }
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : 'Unknown error' }
  }
}

export async function getAdminUsers(): Promise<AdminUser[]> {
  if (!isConfigured || !db) return []
  try {
    const q = query(collection(db, 'users'), where('role', '==', 'admin'))
    const snapshot = await getDocs(q)
    return snapshot.docs.map(d => d.data() as AdminUser)
  } catch {
    return []
  }
}

export async function isUserAdmin(uid: string): Promise<boolean> {
  if (!isConfigured || !db) return false
  try {
    const userSnap = await getDoc(doc(db, 'users', uid))
    if (!userSnap.exists()) return false
    const data = userSnap.data() as { role?: string }
    return data.role === 'admin'
  } catch {
    return false
  }
}
