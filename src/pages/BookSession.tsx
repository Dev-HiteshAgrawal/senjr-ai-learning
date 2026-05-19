import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, X, CheckCircle, ArrowRight } from 'lucide-react'

export default function BookSession() {
  const navigate = useNavigate()
  const [selectedDate, setSelectedDate] = useState(0)
  const [selectedDuration, setSelectedDuration] = useState(2)
  const [selectedSlot, setSelectedSlot] = useState(4)
  const [topic, setTopic] = useState('')

  const dates = [
    { label: 'Today', date: 13 },
    { label: 'Tomorrow', date: 14 },
    { label: 'Thu', date: 15 },
    { label: 'Fri', date: 16 },
  ]

  const durations = ['30 min', '45 min', '60 min', '90 min']
  const durationMinutes = [30, 45, 60, 90]

  const slots = {
    morning: { label: 'MORNING', icon: '☀️', times: ['9:00 AM', '10:00 AM', '11:00 AM'] },
    afternoon: { label: 'AFTERNOON', icon: '', times: ['2:00 PM', '3:30 PM', '4:30 PM'] },
    evening: { label: 'EVENING', icon: '', times: ['6:00 PM', '7:00 PM', '8:30 PM'] },
  }

  const unavailableSlots = [1]

  const pricePerHour = 200
  const totalPrice = Math.round((pricePerHour * durationMinutes[selectedDuration]) / 60)

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
          <div className="senjr-card" style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <div style={{
              width: 56, height: 56, borderRadius: 12,
              background: 'linear-gradient(135deg, #F0FDF4 0%, #FFF7ED 100%)',
              overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 32
            }}>
              
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700 }}>Rahul S.</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 4 }}>
                <span style={{ color: 'var(--senjr-orange)', fontWeight: 600 }}>4.8</span>
                <span style={{ fontSize: 12, color: 'var(--senjr-text-muted)' }}>(120 reviews)</span>
              </div>
              <span className="senjr-badge senjr-badge-green">200/hr</span>
            </div>
            <div style={{
              width: 24, height: 24, borderRadius: '50%',
              background: 'var(--senjr-green)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <CheckCircle size={14} style={{ color: 'white' }} />
            </div>
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
                  const globalIndex = Object.values(slots).reduce((acc, s, idx) => {
                    if (idx < Object.keys(slots).indexOf(key)) return acc + s.times.length
                    return acc + i
                  }, 0)
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
          </div>

          <button className="senjr-btn senjr-btn-green">
            Confirm Booking <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
