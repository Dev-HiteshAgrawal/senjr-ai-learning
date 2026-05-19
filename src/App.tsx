import { BrowserRouter, Routes, Route } from 'react-router-dom'
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
import WarRoom from './pages/WarRoom'
import BookSession from './pages/BookSession'
import AdminPanel from './pages/AdminPanel'
import UserProfile from './pages/UserProfile'
import MentorPortfolio from './pages/MentorPortfolio'
import LiveSession from './pages/LiveSession'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/student-signup" element={<StudentSignup />} />
        <Route path="/student-education" element={<StudentEducation />} />
        <Route path="/student-goals" element={<StudentGoals />} />
        <Route path="/student-profile" element={<StudentProfile />} />
        <Route path="/mentor-signup" element={<MentorSignup />} />
        <Route path="/mentor-verify" element={<MentorVerify />} />
        <Route path="/mentor-video" element={<MentorVideo />} />
        <Route path="/mentor-profile" element={<MentorProfile />} />
        <Route path="/mentor-success" element={<MentorSuccess />} />
        <Route path="/dashboard" element={<StudentDashboard />} />
        <Route path="/mentor-hub" element={<MentorHub />} />
        <Route path="/availability" element={<Availability />} />
        <Route path="/ai-tutor" element={<AITutorChat />} />
        <Route path="/war-room" element={<WarRoom />} />
        <Route path="/book-session" element={<BookSession />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/mentor-portfolio" element={<MentorPortfolio />} />
        <Route path="/live-session" element={<LiveSession />} />
        <Route path="/courses" element={<Landing />} />
        <Route path="/my-learning" element={<StudentDashboard />} />
        <Route path="/community" element={<StudentDashboard />} />
        <Route path="/achievements" element={<UserProfile />} />
        <Route path="/earnings" element={<MentorHub />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
