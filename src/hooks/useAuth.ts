import { useContext, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth'
import { auth, googleProvider, isConfigured } from '../firebase/config'
import { AuthContext, type UserRole } from '../contexts/AuthContext'

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

interface AuthResult {
  success: boolean
  error?: string
}

export function useAuthActions() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)

  const signupWithEmail = async (
    email: string,
    password: string,
    name: string,
    role: UserRole
  ): Promise<AuthResult> => {
    if (!isConfigured || !auth) {
      return { success: false, error: 'Firebase not configured' }
    }

    setLoading(true)
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(result.user, { displayName: JSON.stringify({ name, role }) })
      return { success: true }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Signup failed'
      return { success: false, error: message }
    } finally {
      setLoading(false)
    }
  }

  const loginWithEmail = async (email: string, password: string): Promise<AuthResult> => {
    if (!isConfigured || !auth) {
      return { success: false, error: 'Firebase not configured' }
    }

    setLoading(true)
    try {
      await signInWithEmailAndPassword(auth, email, password)
      return { success: true }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed'
      return { success: false, error: message }
    } finally {
      setLoading(false)
    }
  }

  const loginWithGoogle = async (): Promise<AuthResult> => {
    if (!isConfigured || !auth || !googleProvider) {
      return { success: false, error: 'Firebase not configured' }
    }

    setLoading(true)
    try {
      await signInWithPopup(auth, googleProvider)
      return { success: true }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Google login failed'
      return { success: false, error: message }
    } finally {
      setLoading(false)
    }
  }

  const getUserRole = (): UserRole | null => {
    if (!user?.displayName) return null
    try {
      const data = JSON.parse(user.displayName)
      return data.role || null
    } catch {
      return null
    }
  }

  const getUserName = (): string | null => {
    if (!user?.displayName) return user?.email || null
    try {
      const data = JSON.parse(user.displayName)
      return data.name || null
    } catch {
      return null
    }
  }

  return {
    loading,
    signupWithEmail,
    loginWithEmail,
    loginWithGoogle,
    getUserRole,
    getUserName,
  }
}
