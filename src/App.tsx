import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
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
function PublicRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

// Protected routes - require authentication
function ProtectedRoutes() {
  return (
    <Routes>
      {/* Student routes */}
      <Route path="/student-signup" element={<StudentSignup />} />
      <Route path="/student-education" element={<StudentEducation />} />
      <Route path="/student-goals" element={<StudentGoals />} />
      <Route path="/student-profile" element={<StudentProfile />} />
      <Route path="/dashboard" element={
        <ProtectedRoute allowedRoles={['student']}>
          <StudentDashboard />
        </ProtectedRoute>
      } />

      {/* Mentor routes */}
      <Route path="/mentor-signup" element={<MentorSignup />} />
      <Route path="/mentor-verify" element={<MentorVerify />} />
      <Route path="/mentor-video" element={<MentorVideo />} />
      <Route path="/mentor-profile" element={<MentorProfile />} />
      <Route path="/mentor-success" element={<MentorSuccess />} />
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
    </Routes>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {PublicRoutes().props.children}
          {ProtectedRoutes().props.children}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
