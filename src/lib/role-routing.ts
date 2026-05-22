import type { UserRole } from '../types/firestore'

export const ROUTES = {
  LANDING: '/',
  AUTH: '/auth',

  STUDENT_SIGNUP: '/student-signup',
  STUDENT_EDUCATION: '/onboarding/student/education',
  STUDENT_GOALS: '/onboarding/student/goals',
  STUDENT_PROFILE: '/onboarding/student/profile',

  MENTOR_APPLY: '/mentor-signup',
  MENTOR_VERIFY: '/onboarding/mentor/verify',
  MENTOR_VIDEO: '/onboarding/mentor/video',
  MENTOR_PROFILE_SETUP: '/onboarding/mentor/profile',
  MENTOR_SUCCESS: '/onboarding/mentor/success',

  STUDENT_DASHBOARD: '/dashboard/student',
  MENTOR_DASHBOARD: '/dashboard/mentor',
  ADMIN_DASHBOARD: '/dashboard/admin',
  PENDING_MENTOR: '/mentor/apply',

  AI_TUTOR: '/ai-tutor',
  BOOK_SESSION: '/book-session',
  LIVE_SESSION: '/live-session',
  MOCK_TEST: '/mock-test',
  WAR_ROOM: '/intensive',
  PROFILE: '/profile',
  MENTOR_PORTFOLIO: '/mentor-portfolio',
  AVAILABILITY: '/availability',
  MENTOR_HUB: '/mentor-hub',
} as const

export function getDashboardRoute(role: UserRole): string {
  switch (role) {
    case 'admin':
      return ROUTES.ADMIN_DASHBOARD
    case 'mentor':
      return ROUTES.MENTOR_DASHBOARD
    case 'pending_mentor':
      return ROUTES.PENDING_MENTOR
    case 'student':
    default:
      return ROUTES.STUDENT_DASHBOARD
  }
}

export function getOnboardingRoute(role: UserRole): string | null {
  switch (role) {
    case 'student':
      return ROUTES.STUDENT_SIGNUP
    case 'mentor':
    case 'pending_mentor':
      return ROUTES.MENTOR_APPLY
    default:
      return null
  }
}

export function isOnboardingComplete(role: UserRole, onboardingCompleted: boolean): boolean {
  if (role === 'admin') return true
  return onboardingCompleted
}

export function getPostAuthRoute(role: UserRole, onboardingCompleted: boolean): string {
  if (!isOnboardingComplete(role, onboardingCompleted)) {
    const onboardingRoute = getOnboardingRoute(role)
    if (onboardingRoute) return onboardingRoute
  }
  return getDashboardRoute(role)
}

export function isRouteAccessible(path: string, role: UserRole | null, onboardingCompleted: boolean): boolean {
  const publicPaths: string[] = [ROUTES.LANDING, ROUTES.AUTH]

  if (publicPaths.includes(path)) {
    return true
  }

  if (!role) {
    return path === ROUTES.AUTH || path === ROUTES.LANDING
  }

  if (role === 'admin') return true

  if (!onboardingCompleted) {
    const onboardingPaths: string[] = [
      ROUTES.STUDENT_SIGNUP,
      ROUTES.STUDENT_EDUCATION,
      ROUTES.STUDENT_GOALS,
      ROUTES.STUDENT_PROFILE,
      ROUTES.MENTOR_APPLY,
      ROUTES.MENTOR_VERIFY,
      ROUTES.MENTOR_VIDEO,
      ROUTES.MENTOR_PROFILE_SETUP,
      ROUTES.MENTOR_SUCCESS,
    ]
    return onboardingPaths.includes(path)
  }

  return true
}

export function matchRoleRoute(path: string): UserRole | null {
  if (path.startsWith('/dashboard/admin') || path.startsWith('/admin')) return 'admin'
  if (path.startsWith('/dashboard/mentor') || path.startsWith('/mentor')) return 'mentor'
  if (path.startsWith('/dashboard/student')) return 'student'
  return null
}
