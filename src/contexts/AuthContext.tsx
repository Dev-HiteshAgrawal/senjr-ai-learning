import { createContext, useEffect, useState, type ReactNode } from 'react'
import { onAuthStateChanged, signOut as firebaseSignOut, type User } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, isConfigured, db } from '../firebase/config'

export type UserRole = 'student' | 'mentor' | 'pending_mentor' | 'admin'

export interface AppUser extends Omit<User, 'displayName'> {
  role: UserRole
  displayName: string | null
}

interface AuthContextType {
  user: AppUser | null
  loading: boolean
  configured: boolean
  signOut: () => Promise<void>
  refreshUserRole: () => Promise<void>
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null)
  const [loading, setLoading] = useState(isConfigured && Boolean(auth))

  const fetchUserRole = async (firebaseUser: User): Promise<UserRole> => {
    if (!db || !firebaseUser.uid) return 'student'
    try {
      const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid))
      const userData = userDoc.data()
      return (userData?.role as UserRole) || 'student'
    } catch {
      return 'student'
    }
  }

  const refreshUserRole = async () => {
    if (!auth?.currentUser) return
    const role = await fetchUserRole(auth.currentUser)
    setUser(prev => prev ? { ...prev, role } : null)
  }

  useEffect(() => {
    if (!isConfigured || !auth) {
      return
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const role = await fetchUserRole(firebaseUser)
        setUser({ ...firebaseUser as AppUser, role })
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signOut = async () => {
    if (!auth) {
      setUser(null)
      return
    }

    await firebaseSignOut(auth)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, configured: isConfigured, signOut, refreshUserRole }}>
      {children}
    </AuthContext.Provider>
  )
}
