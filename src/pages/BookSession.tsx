import { useState, useEffect, useContext } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowLeft, X, CheckCircle, ArrowRight, Star, Loader2 } from 'lucide-react'
import { AuthContext } from '../contexts/AuthContext'
import { type MentorProfile } from '../services/firestore'
import { createBooking } from '../services/sessions'

const durations = ['30 min', '45 min', '60 min', '90 min']
const durationMinutes = [30, 45, 60, 90]

const slots = {
  morning: { label: 'MORNING', icon: '☀️', times: ['9:00 AM', '10:00 AM', '11:00 AM'] },
  afternoon: { label: 'AFTERNOON', icon: '', times: ['2:00 PM', '3:30 PM', '4:30 PM'] },
  evening: { label: 'EVENING', icon: '', times: ['6:00 PM', '7:00 PM', '8:30 PM'] },
}

export default function BookSession() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const auth = useContext(AuthContext)
  const user = auth?.user ?? null

  const [mentors, setMentors] = useState<MentorProfile[]>([])
  const [selectedMentor, setSelectedMentor] = useState<MentorProfile | null>(null)
  const [loadingMentors, setLoadingMentors] = useState(true)
  const [booking, setBooking] = useState(false)

  const [selectedDate, setSelectedDate] = useState(0)
  const [selectedDuration, setSelectedDuration] = useState(2)
  const [selectedSlot, setSelectedSlot] = useState(0)
  const [topic, setTopic] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    async function fetchMentors() {
      try {
        const { collection, getDocs, query, where } = await import('firebase/firestore')
        const { db, isConfigured } = await import('../firebase/config')

        if (!isConfigured || !db) {
          setMentors([])
          setLoadingMentors(false)
          return
        }

        const q = query(collection(db, 'mentors'), where('verificationStatus', '==', 'verified'))
        const snapshot = await getDocs(q)

        const mentorList: MentorProfile[] = []
        snapshot.forEach((doc) => {
          mentorList.push({ uid: doc.id, ...doc.data() } as MentorProfile)
        })
        setMentors(mentorList)
      } catch (err) {
        console.error('Error fetching mentors:', err)
      } finally {
        setLoadingMentors(false)
      }
    }

    fetchMentors()
  }, [])

  useEffect(() => {
    const mentorId = searchParams.get('mentorId')
    if (mentorId && mentors.length > 0) {
      const mentor = mentors.find(m => m.uid === mentorId)
      if (mentor) setSelectedMentor(mentor)
    }
  }, [searchParams, mentors])

  const dates = [
    { label: 'Today', date: new Date().getDate() },
    { label: 'Tomorrow', date: new Date().getDate() + 1 },
    { label: 'Thu', date: new Date().getDate() + 2 },
    { label: 'Fri', date: new Date().getDate() + 3 },
  ]

  const unavailableSlots = [1, 5]

  const pricePerHour = selectedMentor?.hourlyRate || 200
  const totalPrice = Math.round((pricePerHour * durationMinutes[selectedDuration]) / 60)

  const handleBooking = async () => {
    if (!user) {
      setError('Please sign in to book a session')
      return
    }

    if (!selectedMentor) {
      setError('Please select a mentor')
      return
    }

    if (!topic.trim()) {
      setError('Please enter what you want to learn')
      return
    }

    setError('')
    setBooking(true)

    try {
      const selectedDateObj = dates[selectedDate]
      const currentMonth = new Date().getMonth()
      const currentYear = new Date().getFullYear()
      const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(selectedDateObj.date).padStart(2, '0')}`

      const allSlots = [
        ...slots.morning.times,
        ...slots.afternoon.times,
        ...slots.evening.times,
      ]
      const timeStr = allSlots[selectedSlot] || '10:00 AM'

      const sessionId = await createBooking(
        user.uid,
        user.displayName || 'Student',
        selectedMentor.uid,
        selectedMentor.name,
        topic,
        dateStr,
        timeStr,
        durationMinutes[selectedDuration],
        totalPrice
      )

      if (sessionId) {
        setSuccess(true)
        setTimeout(() => navigate('/student-dashboard'), 2000)
      } else {
        setError('Failed to create booking. Please try again.')
      }
    } catch (err) {
      console.error('Booking error:', err)
      setError('An error occurred while booking. Please try again.')
    } finally {
      setBooking(false)
    }
  }

  if (success) {
    return (
      <div className="senjr-app">
        <div className="senjr-page">
          <div className="senjr-content" style={{ textAlign: 'center', paddingTop: 100 }}>
            <CheckCircle size={64} style={{ color: 'var(--senjr-green)', marginBottom: 24 }} />
            <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>Booking Request Sent!</h2>
            <p style={{ color: 'var(--senjr-text-muted)' }}>The mentor will confirm your session soon.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="senjr-app">
      <header className="senjr-header">
        <button className="senjr-header-back" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} />
        </button>
        <span className="senjr-header-title" style={{ color: 'var(--senjr-green)' }}>Book Session</span>
        <button className="senjr-btn-icon" onClick={() => navigate(-1)}>
          <X size={18} />
        </button>
      </header>

      <div className="senjr-page">
        <div className="senjr-content">
          {!selectedMentor && (
            <>
              <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--senjr-text-muted)', marginBottom: 12, textTransform: 'uppercase' }}>
                Select Mentor
              </p>
              {loadingMentors ? (
                <div style={{ textAlign: 'center', padding: 40 }}>
                  <Loader2 size={32} className="animate-spin" style={{ color: 'var(--senjr-green)' }} />
                </div>
              ) : mentors.length === 0 ? (
                <p style={{ textAlign: 'center', color: 'var(--senjr-text-muted)', padding: 20 }}>
                  No verified mentors available
                </p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
                  {mentors.map((mentor) => (
                    <button
                      key={mentor.uid}
                      onClick={() => setSelectedMentor(mentor)}
                      className="senjr-card"
                      style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', textAlign: 'left' }}
                    >
                      <div style={{
                        width: 48, height: 48, borderRadius: 12,
                        background: 'linear-gradient(135deg, #F0FDF4 0%, #FFF7ED 100%)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 20, fontWeight: 700, color: 'var(--senjr-green)'
                      }}>
                        {mentor.name.charAt(0)}
                      </div>
                      <div style={{ flex: 1 }}>
                        <h3 style={{ fontSize: 16, fontWeight: 600 }}>{mentor.name}</h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12 }}>
                          <Star size={12} style={{ color: 'var(--senjr-orange)' }} />
                          <span style={{ fontWeight: 600 }}>4.8</span>
                          <span style={{ color: 'var(--senjr-text-muted)' }}>• {mentor.skills?.slice(0, 2).join(', ')}</span>
                        </div>
                      </div>
                      <span className="senjr-badge senjr-badge-green">₹{mentor.hourlyRate}/hr</span>
                    </button>
                  ))}
                </div>
              )}
            </>
          )}

          {selectedMentor && (
            <>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                <div className="senjr-card" style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1, marginBottom: 0 }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 12,
                    background: 'linear-gradient(135deg, #F0FDF4 0%, #FFF7ED 100%)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 20, fontWeight: 700, color: 'var(--senjr-green)'
                  }}>
                    {selectedMentor.name.charAt(0)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 600 }}>{selectedMentor.name}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12 }}>
                      <Star size={12} style={{ color: 'var(--senjr-orange)' }} />
                      <span style={{ fontWeight: 600 }}>4.8</span>
                    </div>
                  </div>
                  <span className="senjr-badge senjr-badge-green">₹{selectedMentor.hourlyRate}/hr</span>
                </div>
                <button
                  onClick={() => setSelectedMentor(null)}
                  style={{ marginLeft: 12, padding: 8, background: 'transparent', border: 'none', cursor: 'pointer' }}
                >
                  <X size={18} />
                </button>
              </div>

              <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--senjr-text-muted)', marginBottom: 8, textTransform: 'uppercase' }}>
                Select Date
              </p>
              <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
                {dates.map((d, i) => (
                  <button
                    key={d.date}
                    onClick={() => setSelectedDate(i)}
                    style={{
                      flex: 1, padding: '12px 0',
                      borderRadius: 12, textAlign: 'center',
                      background: selectedDate === i ? 'var(--senjr-green)' : 'var(--senjr-bg-card)',
                      color: selectedDate === i ? 'white' : 'var(--senjr-text)',
                      border: selectedDate === i ? 'none' : '2px solid var(--senjr-text)',
                      cursor: 'pointer',
                      boxShadow: selectedDate === i ? 'none' : '2px 2px 0 var(--senjr-text)',
                    }}
                  >
                    <span style={{ fontSize: 12, display: 'block', marginBottom: 2, fontWeight: selectedDate === i ? 700 : 500 }}>{d.label}</span>
                    <span style={{ fontSize: 22, fontWeight: 800 }}>{d.date}</span>
                  </button>
                ))}
              </div>

              <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--senjr-text-muted)', marginBottom: 8, textTransform: 'uppercase' }}>
                Duration
              </p>
              <div className="senjr-chip-group" style={{ marginBottom: 24 }}>
                {durations.map((d, i) => (
                  <button
                    key={d}
                    className={`senjr-chip ${selectedDuration === i ? 'senjr-chip-active' : ''}`}
                    onClick={() => setSelectedDuration(i)}
                    style={{ fontSize: 13, padding: '8px 16px' }}
                  >
                    {d}
                  </button>
                ))}
              </div>

              {Object.entries(slots).map(([key, slot]) => (
                <div key={key} style={{ marginBottom: 16 }}>
                  <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--senjr-text-muted)', marginBottom: 8 }}>
                    {slot.icon} {slot.label}
                  </p>
                  <div className="senjr-chip-group">
                    {slot.times.map((time, i) => {
                      const globalIndex = key === 'morning' ? i : key === 'afternoon' ? 3 + i : 6 + i
                      const isUnavailable = unavailableSlots.includes(globalIndex)
                      const isSelected = selectedSlot === globalIndex
                      return (
                        <button
                          key={time}
                          onClick={() => !isUnavailable && setSelectedSlot(globalIndex)}
                          disabled={isUnavailable}
                          style={{
                            padding: '10px 16px',
                            borderRadius: 8,
                            fontSize: 13,
                            fontWeight: 600,
                            border: isSelected ? '2px solid var(--senjr-green)' : '2px solid var(--senjr-border)',
                            background: isSelected ? 'var(--senjr-green)' : isUnavailable ? 'var(--senjr-bg)' : 'var(--senjr-bg-card)',
                            color: isSelected ? 'white' : isUnavailable ? 'var(--senjr-text-light)' : 'var(--senjr-text)',
                            cursor: isUnavailable ? 'not-allowed' : 'pointer',
                            opacity: isUnavailable ? 0.5 : 1,
                          }}
                        >
                          {time}
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}

              <div className="senjr-input-group" style={{ marginTop: 16 }}>
                <label className="senjr-input-label">What do you want to learn?</label>
                <textarea
                  className="senjr-input"
                  rows={3}
                  placeholder="E.g. I need help with my Data Structures assignment or want to discuss internship prep..."
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
              </div>

              <div className="senjr-card-green" style={{ marginBottom: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ fontSize: 12, color: 'var(--senjr-text-muted)' }}>Price Calculation</p>
                    <p style={{ fontSize: 14 }}>₹{pricePerHour} × {durationMinutes[selectedDuration] >= 60 ? `${durationMinutes[selectedDuration] / 60} hour` : `${durationMinutes[selectedDuration]} min`}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: 12, color: 'var(--senjr-text-muted)' }}>Total Amount</p>
                    <p style={{ fontSize: 28, fontWeight: 800, color: 'var(--senjr-green)' }}>₹{totalPrice}</p>
                  </div>
                </div>
                <div style={{ marginTop: 12, padding: 12, background: 'rgba(16,185,129,0.1)', borderRadius: 8 }}>
                  <p style={{ fontSize: 12, color: 'var(--senjr-green-dark)' }}>
                    💳 Payment: UPI / Net Banking
                  </p>
                </div>
              </div>

              {error && (
                <div style={{ padding: 12, background: '#FEE2E2', color: '#DC2626', borderRadius: 8, marginBottom: 16, fontSize: 14 }}>
                  {error}
                </div>
              )}

              <button
                className="senjr-btn senjr-btn-green"
                onClick={handleBooking}
                disabled={booking}
                style={{ opacity: booking ? 0.7 : 1 }}
              >
                {booking ? (
                  <>
                    <Loader2 size={18} className="animate-spin" style={{ marginRight: 8 }} />
                    Processing...
                  </>
                ) : (
                  <>
                    Confirm Booking <ArrowRight size={18} />
                  </>
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}