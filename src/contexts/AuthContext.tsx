import { createContext, useEffect, useState, type ReactNode } from 'react'
import { onAuthStateChanged, signOut as firebaseSignOut, type User } from 'firebase/auth'
import { auth, isConfigured } from '../firebase/config'

export type UserRole = 'student' | 'mentor' | 'pending_mentor' | 'admin'

export interface AppUser extends Omit<User, 'displayName'> {
  role?: UserRole
  displayName: string | null
}

interface AuthContextType {
  user: AppUser | null
  loading: boolean
  configured: boolean
  signOut: () => Promise<void>
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null)
  const [loading, setLoading] = useState(isConfigured && Boolean(auth))

  useEffect(() => {
    if (!isConfigured || !auth) {
      return
    }

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser as AppUser | null)
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
    <AuthContext.Provider value={{ user, loading, configured: isConfigured, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}
