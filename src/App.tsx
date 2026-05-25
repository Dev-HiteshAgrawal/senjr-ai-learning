import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Landing from './pages/Landing'
import Auth from './pages/Auth'
import StudentSignup from './pages/StudentSignup'
import StudentEducation from './pages/StudentEducation'
import StudentGoals from './pages/StudentGoals'
import StudentProfile from './pages/StudentProfile'
import MentorSignup from './pages/MentorSignup'
import MentorVerify from './pages/MentorVerify'
import MentorVideo from './pages/MentorVideo'
import MentorProfile from './pages/MentorProfile'
import MentorSuccess from './pages/MentorSuccess'
import StudentDashboard from './pages/StudentDashboard'
import MentorHub from './pages/MentorHub'
import Availability from './pages/Availability'
import AITutorChat from './pages/AITutorChat'
import ExamPrep from './pages/WarRoom'
import BookSession from './pages/BookSession'
import AdminPanel from './pages/AdminPanel'
import UserProfile from './pages/UserProfile'
import MentorPortfolio from './pages/MentorPortfolio'
import LiveSession from './pages/LiveSession'
import MockTest from './pages/MockTest'
import ProtectedRoute from './components/ProtectedRoute'

// Public routes - accessible without authentication
const publicRoutes = (
  <>
    <Route path="/" element={<Landing />} />
    <Route path="/auth" element={<Auth />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </>
)

// Protected routes - require authentication
const protectedRoutes = (
  <>
    {/* Role-based dashboard routes */}
    <Route path="/dashboard/student" element={
      <ProtectedRoute allowedRoles={['student']}>
        <StudentDashboard />
      </ProtectedRoute>
    } />
      <Route path="/dashboard/mentor" element={
        <ProtectedRoute allowedRoles={['mentor']}>
          <MentorHub />
        </ProtectedRoute>
      } />
      <Route path="/dashboard/admin" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <AdminPanel />
        </ProtectedRoute>
      } />
      <Route path="/mentor/apply" element={
        <ProtectedRoute allowedRoles={['pending_mentor']}>
          <MentorHub />
        </ProtectedRoute>
      } />

      {/* Student onboarding routes */}
      <Route path="/student-signup" element={
        <ProtectedRoute allowedRoles={['student']}>
          <StudentSignup />
        </ProtectedRoute>
      } />
      <Route path="/onboarding/student/education" element={
        <ProtectedRoute allowedRoles={['student']}>
          <StudentEducation />
        </ProtectedRoute>
      } />
      <Route path="/onboarding/student/goals" element={
        <ProtectedRoute allowedRoles={['student']}>
          <StudentGoals />
        </ProtectedRoute>
      } />
      <Route path="/onboarding/student/profile" element={
        <ProtectedRoute allowedRoles={['student']}>
          <StudentProfile />
        </ProtectedRoute>
      } />
      <Route path="/student-education" element={<Navigate to="/onboarding/student/education" replace />} />
      <Route path="/student-goals" element={<Navigate to="/onboarding/student/goals" replace />} />
      <Route path="/student-profile" element={<Navigate to="/onboarding/student/profile" replace />} />
      <Route path="/dashboard" element={<Navigate to="/dashboard/student" replace />} />

      {/* Mentor routes */}
      <Route path="/mentor-signup" element={
        <ProtectedRoute allowedRoles={['pending_mentor']}>
          <MentorSignup />
        </ProtectedRoute>
      } />
      <Route path="/onboarding/mentor/verify" element={
        <ProtectedRoute allowedRoles={['pending_mentor']}>
          <MentorVerify />
        </ProtectedRoute>
      } />
      <Route path="/onboarding/mentor/video" element={
        <ProtectedRoute allowedRoles={['pending_mentor']}>
          <MentorVideo />
        </ProtectedRoute>
      } />
      <Route path="/onboarding/mentor/profile" element={
        <ProtectedRoute allowedRoles={['pending_mentor']}>
          <MentorProfile />
        </ProtectedRoute>
      } />
      <Route path="/onboarding/mentor/success" element={
        <ProtectedRoute allowedRoles={['pending_mentor']}>
          <MentorSuccess />
        </ProtectedRoute>
      } />
      <Route path="/mentor-verify" element={<Navigate to="/onboarding/mentor/verify" replace />} />
      <Route path="/mentor-video" element={<Navigate to="/onboarding/mentor/video" replace />} />
      <Route path="/mentor-profile" element={<Navigate to="/onboarding/mentor/profile" replace />} />
      <Route path="/mentor-success" element={<Navigate to="/onboarding/mentor/success" replace />} />
      <Route path="/mentor-hub" element={
        <ProtectedRoute allowedRoles={['mentor', 'pending_mentor']}>
          <MentorHub />
        </ProtectedRoute>
      } />

      {/* Shared protected routes */}
      <Route path="/availability" element={
        <ProtectedRoute>
          <Availability />
        </ProtectedRoute>
      } />
      <Route path="/ai-tutor" element={
        <ProtectedRoute>
          <AITutorChat />
        </ProtectedRoute>
      } />
      <Route path="/intensive" element={
        <ProtectedRoute>
          <ExamPrep />
        </ProtectedRoute>
      } />
      <Route path="/book-session" element={
        <ProtectedRoute>
          <BookSession />
        </ProtectedRoute>
      } />
<Route path="/admin" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <AdminPanel />
        </ProtectedRoute>
      } />
      <Route path="/mentor-dashboard" element={<Navigate to="/dashboard/mentor" replace />} />
      <Route path="/profile" element={
        <ProtectedRoute>
          <UserProfile />
        </ProtectedRoute>
      } />
      <Route path="/mentor-portfolio" element={
        <ProtectedRoute>
          <MentorPortfolio />
        </ProtectedRoute>
      } />
      <Route path="/live-session" element={
        <ProtectedRoute>
          <LiveSession />
        </ProtectedRoute>
      } />
      <Route path="/mock-test" element={
        <ProtectedRoute>
          <MockTest />
        </ProtectedRoute>
      } />

      {/* Aliases that redirect to protected pages */}
      <Route path="/courses" element={<Navigate to="/dashboard" replace />} />
      <Route path="/my-learning" element={
        <ProtectedRoute allowedRoles={['student']}>
          <StudentDashboard />
        </ProtectedRoute>
      } />
      <Route path="/community" element={
        <ProtectedRoute allowedRoles={['student']}>
          <StudentDashboard />
        </ProtectedRoute>
      } />
      <Route path="/achievements" element={
        <ProtectedRoute>
          <UserProfile />
        </ProtectedRoute>
      } />
      <Route path="/earnings" element={
        <ProtectedRoute allowedRoles={['mentor', 'pending_mentor']}>
          <MentorHub />
        </ProtectedRoute>
      } />
  </>
)

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {publicRoutes}
        {protectedRoutes}
      </Routes>
    </BrowserRouter>
  )
}

export default App
