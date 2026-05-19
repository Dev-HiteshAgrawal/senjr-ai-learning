import { initializeApp, type FirebaseApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, type Auth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

const looksLikePlaceholder = (value?: string) =>
  !value || value.startsWith('your_') || value.includes('your_project')

export const isConfigured = Boolean(
  !looksLikePlaceholder(firebaseConfig.apiKey) &&
  !looksLikePlaceholder(firebaseConfig.authDomain) &&
  !looksLikePlaceholder(firebaseConfig.projectId) &&
  !looksLikePlaceholder(firebaseConfig.appId)
)

export const app: FirebaseApp | null = isConfigured ? initializeApp(firebaseConfig) : null
export const auth: Auth | null = app ? getAuth(app) : null
export const googleProvider = isConfigured ? new GoogleAuthProvider() : null
