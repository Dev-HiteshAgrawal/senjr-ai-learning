import { useState, useEffect, useContext } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowLeft, X, CheckCircle, ArrowRight, Star, Loader2, AlertTriangle } from 'lucide-react'
import { AuthContext } from '../contexts/AuthContext'
import { type MentorProfile } from '../services/firestore'
import { createBooking } from '../services/sessions'

const durations = ['30 min', '45 min', '60 min', '90 min']
const durationMinutes = [30, 45, 60, 90]

const slots = {
  morning: { label: 'MORNING', times: ['9:00 AM', '10:00 AM', '11:00 AM'] },
  afternoon: { label: 'AFTERNOON', times: ['2:00 PM', '3:30 PM', '4:30 PM'] },
  evening: { label: 'EVENING', times: ['6:00 PM', '7:00 PM', '8:30 PM'] },
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
        if (!isConfigured || !db) { setMentors([]); setLoadingMentors(false); return }
        const q = query(collection(db, 'mentors'), where('verificationStatus', '==', 'verified'))
        const snapshot = await getDocs(q)
        const mentorList: MentorProfile[] = []
        snapshot.forEach((doc) => { mentorList.push({ uid: doc.id, ...doc.data() } as MentorProfile) })
        setMentors(mentorList)
      } catch (err) { console.error('Error fetching mentors:', err) }
      finally { setLoadingMentors(false) }
    }
    fetchMentors()
  }, [])

  useEffect(() => {
    const mentorId = searchParams.get('mentorId')
    if (mentorId && mentors.length > 0) {
      const mentor = mentors.find(m => m.uid === mentorId)
      if (mentor) {
        const setSelectedMentorAsync = async () => {
          setSelectedMentor(mentor)
        }
        setSelectedMentorAsync()
      }
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
    if (!user) { setError('Please sign in to book a session'); return }
    if (!selectedMentor) { setError('Please select a mentor'); return }
    if (!topic.trim()) { setError('Please enter what you want to learn'); return }
    setError(''); setBooking(true)
    try {
      const selectedDateObj = dates[selectedDate]
      const currentMonth = new Date().getMonth(); const currentYear = new Date().getFullYear()
      const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(selectedDateObj.date).padStart(2, '0')}`
      const allSlots = [...slots.morning.times, ...slots.afternoon.times, ...slots.evening.times]
      const timeStr = allSlots[selectedSlot] || '10:00 AM'
      const sessionId = await createBooking(user.uid, user.displayName || 'Student', selectedMentor.uid, selectedMentor.name, topic, dateStr, timeStr, durationMinutes[selectedDuration], totalPrice)
      if (sessionId) { setSuccess(true); setTimeout(() => navigate('/dashboard/student'), 2000) }
      else setError('Failed to create booking. Please try again.')
    } catch (err) { console.error('Booking error:', err); setError('An error occurred while booking.') }
    finally { setBooking(false) }
  }

  if (success) {
    return (
      <div className="senjr-app">
        <div className="senjr-page">
          <div className="senjr-content" style={{ textAlign: 'center', paddingTop: 80 }}>
            <div className="senjr-pop" style={{
              width: 88, height: 88, borderRadius: '50%',
              background: 'var(--senjr-green-lighter)', display: 'flex',
              alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px',
              border: '4px solid var(--senjr-green)',
              boxShadow: '4px 4px 0 var(--senjr-green-dark)',
            }}>
              <CheckCircle size={48} style={{ color: 'var(--senjr-green)' }} />
            </div>
            <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: 8, letterSpacing: '-0.3px' }}>Booking Sent!</h2>
            <p style={{ color: 'var(--senjr-text-muted)', fontSize: 15, marginBottom: 24 }}>The mentor will confirm your session soon.</p>
            <div className="senjr-card-neo" style={{ textAlign: 'center', padding: 20 }}>
              <p style={{ fontSize: 13, color: 'var(--senjr-text-muted)', marginBottom: 4 }}>Redirecting to dashboard...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="senjr-app">
      <header className="senjr-header">
        <button className="senjr-header-back" onClick={() => navigate(-1)}><ArrowLeft size={18} /></button>
        <span className="senjr-header-title" style={{ color: 'var(--senjr-green)' }}>Book Session</span>
        <button className="senjr-btn-icon" onClick={() => navigate(-1)}><X size={18} /></button>
      </header>

      <div className="senjr-page">
        <div className="senjr-content">
          {!selectedMentor && (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <div style={{ width: 4, height: 20, borderRadius: 2, background: 'var(--senjr-green)' }} />
                <p style={{ fontSize: 15, fontWeight: 700 }}>Choose Your Mentor</p>
              </div>
              {loadingMentors ? (
                <div style={{ textAlign: 'center', padding: 60 }}><Loader2 size={36} className="animate-spin" style={{ color: 'var(--senjr-green)' }} /></div>
              ) : mentors.length === 0 ? (
                <div className="senjr-card" style={{ textAlign: 'center', padding: 40, border: '2px dashed var(--senjr-border)' }}>
                  <p style={{ color: 'var(--senjr-text-muted)', fontSize: 14 }}>No verified mentors available yet</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
                  {mentors.map((mentor) => (
                    <button key={mentor.uid} onClick={() => setSelectedMentor(mentor)} className="senjr-card-neo" style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s' }}>
                      <div style={{ width: 50, height: 50, borderRadius: 12, background: 'linear-gradient(135deg, var(--senjr-green-light) 0%, var(--senjr-orange-light) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 700, color: 'var(--senjr-green-dark)', border: '2px solid var(--senjr-black)' }}>
                        {mentor.name.charAt(0)}
                      </div>
                      <div style={{ flex: 1 }}>
                        <h3 style={{ fontSize: 16, fontWeight: 700 }}>{mentor.name}</h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, marginTop: 2 }}>
                          <Star size={12} style={{ color: 'var(--senjr-orange)' }} />
                          <span style={{ fontWeight: 600, color: 'var(--senjr-orange)' }}>4.8</span>
                          <span style={{ color: 'var(--senjr-text-muted)' }}>&middot; {mentor.skills?.slice(0, 3).join(', ')}</span>
                        </div>
                      </div>
                      <span className="senjr-tag senjr-tag-green" style={{ fontSize: 12, padding: '4px 12px' }}>&#8377;{mentor.hourlyRate}/hr</span>
                    </button>
                  ))}
                </div>
              )}
            </>
          )}

          {selectedMentor && (
            <>
              <div className="senjr-card-neo" style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, padding: 12 }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: 'linear-gradient(135deg, var(--senjr-green-light) 0%, var(--senjr-orange-light) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 700, color: 'var(--senjr-green-dark)', border: '2px solid var(--senjr-black)' }}>
                  {selectedMentor.name.charAt(0)}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 16, fontWeight: 700 }}>{selectedMentor.name}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12 }}>
                    <Star size={12} style={{ color: 'var(--senjr-orange)' }} />
                    <span style={{ fontWeight: 600, color: 'var(--senjr-orange)' }}>4.8</span>
                    <span style={{ color: 'var(--senjr-text-muted)', marginLeft: 4 }}>&middot; &#8377;{selectedMentor.hourlyRate}/hr</span>
                  </div>
                </div>
                <button onClick={() => setSelectedMentor(null)} style={{ padding: 8, background: 'var(--senjr-bg)', border: '1.5px solid var(--senjr-border)', borderRadius: 8, cursor: 'pointer', display: 'flex' }}><X size={16} /></button>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <div style={{ width: 4, height: 20, borderRadius: 2, background: 'var(--senjr-orange)' }} />
                <p style={{ fontSize: 14, fontWeight: 700 }}>Select Date</p>
              </div>
              <div className="senjr-grid-4" style={{ marginBottom: 24, gap: 8 }}>
                {dates.map((d, i) => (
                  <button key={d.date} onClick={() => setSelectedDate(i)} style={{
                    padding: '14px 0', borderRadius: 12, textAlign: 'center',
                    background: selectedDate === i ? 'var(--senjr-green)' : 'white',
                    color: selectedDate === i ? 'white' : 'var(--senjr-text)',
                    border: selectedDate === i ? '2px solid var(--senjr-green-dark)' : '2px solid var(--senjr-border)',
                    cursor: 'pointer', transition: 'all 0.15s',
                    boxShadow: selectedDate === i ? '3px 3px 0 var(--senjr-green-dark)' : 'none',
                  }}>
                    <span style={{ fontSize: 11, display: 'block', marginBottom: 2, fontWeight: 600 }}>{d.label}</span>
                    <span style={{ fontSize: 24, fontWeight: 800 }}>{d.date}</span>
                  </button>
                ))}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <div style={{ width: 4, height: 20, borderRadius: 2, background: 'var(--senjr-green)' }} />
                <p style={{ fontSize: 14, fontWeight: 700 }}>Duration</p>
              </div>
              <div className="senjr-chip-group" style={{ marginBottom: 20 }}>
                {durations.map((d, i) => (
                  <button key={d}
                    style={{
                      padding: '10px 18px', borderRadius: 8, fontSize: 13, fontWeight: 600,
                      background: selectedDuration === i ? 'var(--senjr-green)' : 'white',
                      color: selectedDuration === i ? 'white' : 'var(--senjr-text)',
                      border: selectedDuration === i ? '2px solid var(--senjr-green-dark)' : '2px solid var(--senjr-border)',
                      cursor: 'pointer', transition: 'all 0.15s',
                      boxShadow: selectedDuration === i ? '2px 2px 0 var(--senjr-green-dark)' : 'none',
                    }}
                    onClick={() => setSelectedDuration(i)}>{d}</button>
                ))}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <div style={{ width: 4, height: 20, borderRadius: 2, background: '#3B82F6' }} />
                <p style={{ fontSize: 14, fontWeight: 700 }}>Available Slots</p>
              </div>
              {Object.entries(slots).map(([key, slot]) => (
                <div key={key} style={{ marginBottom: 12 }}>
                  <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--senjr-text-muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{slot.label}</p>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {slot.times.map((time, i) => {
                      const globalIndex = key === 'morning' ? i : key === 'afternoon' ? 3 + i : 6 + i
                      const isUnavailable = unavailableSlots.includes(globalIndex)
                      const isSelected = selectedSlot === globalIndex
                      return (
                        <button key={time} onClick={() => !isUnavailable && setSelectedSlot(globalIndex)} disabled={isUnavailable}
                          style={{
                            flex: 1, padding: '10px 0', borderRadius: 8, fontSize: 13, fontWeight: 600,
                            border: isSelected ? '2px solid var(--senjr-green)' : '2px solid var(--senjr-border)',
                            background: isSelected ? 'var(--senjr-green)' : isUnavailable ? 'var(--senjr-bg)' : 'white',
                            color: isSelected ? 'white' : isUnavailable ? 'var(--senjr-text-light)' : 'var(--senjr-text)',
                            cursor: isUnavailable ? 'not-allowed' : 'pointer',
                            opacity: isUnavailable ? 0.4 : 1,
                            boxShadow: isSelected ? '2px 2px 0 var(--senjr-green-dark)' : 'none',
                          }}>
                          {time}
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}

              <div className="senjr-input-group" style={{ marginTop: 8 }}>
                <label className="senjr-input-label">What do you want to learn?</label>
                <textarea className="senjr-input" rows={3} placeholder="E.g. I need help with DSA or want to discuss internship prep..." value={topic} onChange={(e) => setTopic(e.target.value)} />
              </div>

              <div className="senjr-card-neo-green" style={{ marginBottom: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ fontSize: 12, color: 'var(--senjr-green-dark)' }}>Price</p>
                    <p style={{ fontSize: 14, fontWeight: 600 }}>&#8377;{pricePerHour} &times; {durationMinutes[selectedDuration] >= 60 ? `${durationMinutes[selectedDuration] / 60}h` : `${durationMinutes[selectedDuration]}min`}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: 12, color: 'var(--senjr-green-dark)' }}>Total</p>
                    <p style={{ fontSize: 30, fontWeight: 800, color: 'var(--senjr-green-dark)' }}>&#8377;{totalPrice}</p>
                  </div>
                </div>
              </div>

              {error && <div style={{ padding: '10px 14px', background: '#FEF2F2', color: '#DC2626', borderRadius: 8, marginBottom: 16, fontSize: 14, border: '1px solid #FCA5A5', display: 'flex', alignItems: 'center', gap: 6 }}><AlertTriangle size={14} />{error}</div>}

              <button className="senjr-btn senjr-btn-green" style={{ boxShadow: '3px 3px 0 var(--senjr-green-dark)', opacity: booking ? 0.7 : 1 }} onClick={handleBooking} disabled={booking}>
                {booking ? <><Loader2 size={18} className="animate-spin" /> Processing...</> : <>Confirm Booking <ArrowRight size={18} /></>}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
