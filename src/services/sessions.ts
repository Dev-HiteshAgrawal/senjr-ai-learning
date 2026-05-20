import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore'
import { db, isConfigured } from '../firebase/config'

export type SessionStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed'
export type PaymentStatus = 'pending' | 'confirmed' | 'failed' | 'refunded'

export interface Session {
  id: string
  studentId: string
  mentorId: string
  mentorName: string
  studentName: string
  topic: string
  date: string
  time: string
  duration: number
  price: number
  status: SessionStatus
  paymentStatus: PaymentStatus
  meetingLink?: string
  createdAt: string
  updatedAt: string
}

function generateJitsiRoom(): string {
  const randomId = Math.random().toString(36).substring(2, 10)
  return `https://meet.jit.si/senjr-${randomId}`
}

export async function createBooking(
  studentId: string,
  studentName: string,
  mentorId: string,
  mentorName: string,
  topic: string,
  date: string,
  time: string,
  duration: number,
  price: number
): Promise<string | null> {
  if (!isConfigured || !db) {
    console.warn('Firestore not configured - booking not saved')
    return null
  }

  const docRef = await addDoc(collection(db, 'sessions'), {
    studentId,
    studentName,
    mentorId,
    mentorName,
    topic,
    date,
    time,
    duration,
    price,
    status: 'pending',
    paymentStatus: 'pending',
    meetingLink: null,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })

  return docRef.id
}

export async function getUserBookings(userId: string): Promise<Session[]> {
  if (!isConfigured || !db) {
    console.warn('Firestore not configured')
    return []
  }

  const q = query(
    collection(db, 'sessions'),
    where('studentId', '==', userId),
    orderBy('date', 'desc'),
    orderBy('time', 'desc')
  )

  const querySnapshot = await getDocs(q)
  const sessions: Session[] = []

  querySnapshot.forEach((doc) => {
    const data = doc.data()
    sessions.push({
      id: doc.id,
      studentId: data.studentId,
      mentorId: data.mentorId,
      mentorName: data.mentorName,
      studentName: data.studentName,
      topic: data.topic,
      date: data.date,
      time: data.time,
      duration: data.duration,
      price: data.price,
      status: data.status,
      paymentStatus: data.paymentStatus,
      meetingLink: data.meetingLink,
      createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
      updatedAt: data.updatedAt?.toDate?.()?.toISOString() || new Date().toISOString(),
    })
  })

  return sessions
}

export async function getMentorBookings(mentorId: string): Promise<Session[]> {
  if (!isConfigured || !db) {
    console.warn('Firestore not configured')
    return []
  }

  const q = query(
    collection(db, 'sessions'),
    where('mentorId', '==', mentorId),
    orderBy('date', 'desc'),
    orderBy('time', 'desc')
  )

  const querySnapshot = await getDocs(q)
  const sessions: Session[] = []

  querySnapshot.forEach((doc) => {
    const data = doc.data()
    sessions.push({
      id: doc.id,
      studentId: data.studentId,
      mentorId: data.mentorId,
      mentorName: data.mentorName,
      studentName: data.studentName,
      topic: data.topic,
      date: data.date,
      time: data.time,
      duration: data.duration,
      price: data.price,
      status: data.status,
      paymentStatus: data.paymentStatus,
      meetingLink: data.meetingLink,
      createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
      updatedAt: data.updatedAt?.toDate?.()?.toISOString() || new Date().toISOString(),
    })
  })

  return sessions
}

export async function confirmBooking(sessionId: string): Promise<void> {
  if (!isConfigured || !db) {
    console.warn('Firestore not configured')
    return
  }

  const sessionDoc = await getDoc(doc(db, 'sessions', sessionId))
  if (!sessionDoc.exists()) {
    throw new Error('Session not found')
  }

  const meetingLink = generateJitsiRoom()

  await updateDoc(doc(db, 'sessions', sessionId), {
    status: 'confirmed',
    meetingLink,
    updatedAt: serverTimestamp(),
  })
}

export async function rejectBooking(sessionId: string): Promise<void> {
  if (!isConfigured || !db) {
    console.warn('Firestore not configured')
    return
  }

  await updateDoc(doc(db, 'sessions', sessionId), {
    status: 'cancelled',
    updatedAt: serverTimestamp(),
  })
}

export async function cancelBooking(sessionId: string): Promise<void> {
  if (!isConfigured || !db) {
    console.warn('Firestore not configured')
    return
  }

  await updateDoc(doc(db, 'sessions', sessionId), {
    status: 'cancelled',
    updatedAt: serverTimestamp(),
  })
}

export async function updatePaymentStatus(
  sessionId: string,
  paymentStatus: PaymentStatus
): Promise<void> {
  if (!isConfigured || !db) {
    console.warn('Firestore not configured')
    return
  }

  await updateDoc(doc(db, 'sessions', sessionId), {
    paymentStatus,
    updatedAt: serverTimestamp(),
  })
}

export async function getSessionById(sessionId: string): Promise<Session | null> {
  if (!isConfigured || !db) {
    console.warn('Firestore not configured')
    return null
  }

  const docSnap = await getDoc(doc(db, 'sessions', sessionId))
  if (!docSnap.exists()) {
    return null
  }

  const data = docSnap.data()
  return {
    id: docSnap.id,
    studentId: data.studentId,
    mentorId: data.mentorId,
    mentorName: data.mentorName,
    studentName: data.studentName,
    topic: data.topic,
    date: data.date,
    time: data.time,
    duration: data.duration,
    price: data.price,
    status: data.status,
    paymentStatus: data.paymentStatus,
    meetingLink: data.meetingLink,
    createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
    updatedAt: data.updatedAt?.toDate?.()?.toISOString() || new Date().toISOString(),
  }
}