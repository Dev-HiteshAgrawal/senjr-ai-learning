import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles?: Array<'student' | 'mentor' | 'pending_mentor' | 'admin'>
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, loading, configured } = useAuth()
  const location = useLocation()

  // If Firebase is not configured, allow access (for development)
  if (!configured) {
    console.warn('Firebase not configured - allowing unrestricted access')
    return <>{children}</>
  }

  // Show loading state while checking auth
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'var(--senjr-bg)'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: 40, height: 40,
            border: '3px solid var(--senjr-border)',
            borderTopColor: 'var(--senjr-green)',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px'
          }} />
          <p style={{ color: 'var(--senjr-text-muted)' }}>Loading...</p>
        </div>
      </div>
    )
  }

  // If not authenticated, redirect to auth page
  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />
  }

  // If roles are specified, check if user has allowed role
  if (allowedRoles && allowedRoles.length > 0) {
    // Get user role from displayName (stored as JSON)
    let userRole: string | null = null
    if (user.displayName) {
      try {
        const data = JSON.parse(user.displayName)
        userRole = data.role
      } catch {
        userRole = null
      }
    }

    // If user role doesn't match allowed roles, redirect to appropriate dashboard
    if (userRole && !allowedRoles.includes(userRole as 'student' | 'mentor' | 'pending_mentor' | 'admin')) {
      if (userRole === 'mentor' || userRole === 'pending_mentor') {
        return <Navigate to="/mentor-hub" replace />
      }
      return <Navigate to="/dashboard" replace />
    }
  }

  return <>{children}</>
}
