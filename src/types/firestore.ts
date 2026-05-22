import type { Timestamp } from 'firebase/firestore'

export type UserRole = 'student' | 'mentor' | 'pending_mentor' | 'admin'

export interface UserProfile {
  uid: string
  email: string
  displayName: string
  role: UserRole
  phone?: string
  photoURL?: string
  bio?: string
  city?: string
  onboardingCompleted: boolean
  createdAt: string
  updatedAt: string
}

export interface StudentEducation {
  level: string
  college: string
  university: string
  city: string
  state: string
  year: string
  graduationYear: string
}

export interface StudentProfile {
  uid: string
  email: string
  displayName: string
  phone?: string
  education?: StudentEducation
  goals?: string[]
  targetExams?: string[]
  weakSubjects?: string[]
  strongSubjects?: string[]
  language?: string
  learningPreferences?: {
    studyHours: string
  }
  createdAt: string
  updatedAt: string
}

export type MentorVerificationStatus = 'pending' | 'verified' | 'rejected'

export interface MentorAvailability {
  [day: string]: { start: string; end: string }[]
}

export interface MentorPortfolio {
  education?: string
  experience?: string
  achievements?: string
}

export interface MentorProfile {
  uid: string
  email: string
  displayName: string
  phone?: string
  bio?: string
  skills: string[]
  categories?: string[]
  hourlyRate: number
  availability?: MentorAvailability
  verificationStatus: MentorVerificationStatus
  portfolio?: MentorPortfolio
  sessionsCompleted: number
  rating: number
  reviewCount: number
  introVideoUrl?: string
  heardAbout?: string
  createdAt: string
  updatedAt: string
}

export type SessionStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed'
export type PaymentStatus = 'pending' | 'confirmed' | 'failed' | 'refunded'

export interface Session {
  id: string
  studentId: string
  mentorId: string
  mentorName: string
  studentName: string
  topic: string
  description?: string
  date: string
  time: string
  duration: number
  price: number
  status: SessionStatus
  paymentStatus: PaymentStatus
  meetingLink?: string
  studentNotes?: string
  mentorNotes?: string
  createdAt: Timestamp | string
  updatedAt: Timestamp | string
}

export type DocumentType = 'identity_front' | 'identity_back' | 'education' | 'professional' | 'intro_video'
export type DocumentStatus = 'pending' | 'approved' | 'rejected' | 'needs_clarification'

export interface MentorDocument {
  id: string
  mentorId: string
  documentType: DocumentType
  filePath: string
  fileName: string
  fileSize: number
  mimeType: string
  hash: string
  status: DocumentStatus
  reviewerNotes?: string
  flaggedReasons?: string[]
  submittedBy: string
  submittedAt: string
  reviewedAt?: string
  reviewedBy?: string
}

export type MessageSender = 'user' | 'ai' | 'system'

export interface ChatMessage {
  id: string
  sessionId: string
  sender: MessageSender
  content: string
  metadata?: Record<string, unknown>
  createdAt: Timestamp | string
}

export interface AITutorSession {
  id: string
  userId: string
  topic?: string
  subject?: string
  messages: ChatMessage[]
  createdAt: Timestamp | string
  updatedAt: Timestamp | string
}

export interface Review {
  id: string
  mentorId: string
  studentId: string
  studentName: string
  sessionId: string
  rating: number
  content: string
  createdAt: Timestamp | string
}

export interface Notification {
  id: string
  userId: string
  type: 'booking_request' | 'booking_confirmed' | 'booking_cancelled' | 'verification_update' | 'session_reminder' | 'system'
  title: string
  body: string
  data?: Record<string, unknown>
  read: boolean
  createdAt: Timestamp | string
}

export interface Resource {
  id: string
  mentorId: string
  title: string
  description?: string
  type: 'pdf' | 'video' | 'link' | 'document'
  url: string
  tags?: string[]
  createdAt: Timestamp | string
}

export interface AvailabilitySlot {
  id: string
  mentorId: string
  date: string
  startTime: string
  endTime: string
  booked: boolean
  sessionId?: string
}

export type CollectionName = 'users' | 'students' | 'mentors' | 'sessions' | 'mentorDocuments' | 'chatSessions' | 'reviews' | 'notifications' | 'resources' | 'availabilitySlots'

export const COLLECTIONS: Record<string, CollectionName> = {
  USERS: 'users',
  STUDENTS: 'students',
  MENTORS: 'mentors',
  SESSIONS: 'sessions',
  DOCUMENTS: 'mentorDocuments',
  CHATS: 'chatSessions',
  REVIEWS: 'reviews',
  NOTIFICATIONS: 'notifications',
  RESOURCES: 'resources',
  AVAILABILITY: 'availabilitySlots',
} as const
