import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Save, ChevronDown, Check } from 'lucide-react'

export default function Availability() {
  const navigate = useNavigate()
  const [selectedDay, setSelectedDay] = useState(1)
  const [startTime, setStartTime] = useState({ h: 9, m: 0, ampm: 'AM' })
  const [endTime] = useState({ h: 12, m: 0, ampm: 'PM' })
  const [slotDuration, setSlotDuration] = useState(30)
  const [buffer] = useState(5)
  const [breakAfter] = useState(3)
  const [breakDuration] = useState(10)
  const [autoAccept, setAutoAccept] = useState(true)
  const [repeatOption, setRepeatOption] = useState('weekly')

  const days = [
    { label: 'MON', date: 12 },
    { label: 'TUE', date: 13 },
    { label: 'WED', date: 14 },
    { label: 'THU', date: 15 },
    { label: 'FRI', date: 16 },
    { label: 'SAT', date: 17 },
  ]

  const generatedSlots = [
    { start: '09:00 AM', end: '09:30 AM' },
    { start: '09:35 AM', end: '10:05 AM' },
    { start: '10:10 AM', end: '10:40 AM' },
    { break: true, duration: '10 MIN BREAK' },
    { start: '10:50 AM', end: '11:20 AM' },
  ]

  return (
    <div className="senjr-app">
      <header className="senjr-header" style={{ background: 'var(--senjr-black)', color: 'white', border: 'none' }}>
        <button className="senjr-header-back" style={{ borderColor: 'white', color: 'white' }} onClick={() => navigate(-1)}>
          <ArrowLeft size={18} />
        </button>
        <span className="senjr-header-title" style={{ color: 'white' }}>Availability Settings</span>
        <button style={{ color: 'var(--senjr-green)', fontWeight: 600, fontSize: 14 }} onClick={() => navigate('/mentor-hub')}>
          Save
        </button>
      </header>

      <div className="senjr-page">
        <div className="senjr-content">
          <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--senjr-text-muted)', marginBottom: 12, textTransform: 'uppercase' }}>
            Select Working Days
          </p>
          <div style={{ display: 'flex', gap: 8, marginBottom: 24, overflowX: 'auto' }}>
            {days.map((d, i) => (
              <button
                key={d.label}
                onClick={() => setSelectedDay(i)}
                style={{
                  minWidth: 48, padding: '8px 4px',
                  borderRadius: 12, textAlign: 'center',
                  background: selectedDay === i ? 'var(--senjr-green)' : 'var(--senjr-bg-card)',
                  color: selectedDay === i ? 'white' : 'var(--senjr-text)',
                  border: selectedDay === i ? 'none' : '1px solid var(--senjr-border)',
                  cursor: 'pointer'
                }}
              >
                <span style={{ fontSize: 10, display: 'block', marginBottom: 2 }}>{d.label}</span>
                <span style={{ fontSize: 16, fontWeight: 700 }}>{d.date}</span>
              </button>
            ))}
          </div>

          <div className="senjr-card-flat" style={{ marginBottom: 16 }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--senjr-text-muted)', marginBottom: 12, textTransform: 'uppercase' }}>
              Available From:
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <button style={{ fontSize: 18, color: 'var(--senjr-text-muted)', display: 'block' }}>+</button>
                <span style={{ fontSize: 32, fontWeight: 800, color: 'var(--senjr-green)' }}>{String(startTime.h).padStart(2, '0')}</span>
                <button style={{ fontSize: 18, color: 'var(--senjr-text-muted)', display: 'block' }}>−</button>
              </div>
              <span style={{ fontSize: 32, fontWeight: 800 }}>:</span>
              <div style={{ textAlign: 'center' }}>
                <button style={{ fontSize: 18, color: 'var(--senjr-text-muted)', display: 'block' }}>+</button>
                <span style={{ fontSize: 32, fontWeight: 800, color: 'var(--senjr-green)' }}>{String(startTime.m).padStart(2, '0')}</span>
                <button style={{ fontSize: 18, color: 'var(--senjr-text-muted)', display: 'block' }}>−</button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <button
                  style={{
                    padding: '4px 12px', borderRadius: 6, fontSize: 12, fontWeight: 600,
                    background: startTime.ampm === 'AM' ? 'var(--senjr-green)' : 'var(--senjr-bg)',
                    color: startTime.ampm === 'AM' ? 'white' : 'var(--senjr-text-muted)',
                    border: 'none', cursor: 'pointer'
                  }}
                  onClick={() => setStartTime({ ...startTime, ampm: 'AM' })}
                >AM</button>
                <button
                  style={{
                    padding: '4px 12px', borderRadius: 6, fontSize: 12, fontWeight: 600,
                    background: startTime.ampm === 'PM' ? 'var(--senjr-green)' : 'var(--senjr-bg)',
                    color: startTime.ampm === 'PM' ? 'white' : 'var(--senjr-text-muted)',
                    border: 'none', cursor: 'pointer'
                  }}
                  onClick={() => setStartTime({ ...startTime, ampm: 'PM' })}
                >PM</button>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 8 }}>
              {['6AM', '9AM', '12PM', '3PM', '6PM'].map((t) => (
                <button key={t} style={{
                  padding: '4px 10px', borderRadius: 20, fontSize: 11,
                  background: t === '9AM' ? 'var(--senjr-green-light)' : 'var(--senjr-bg)',
                  color: t === '9AM' ? 'var(--senjr-green-dark)' : 'var(--senjr-text-muted)',
                  border: 'none', cursor: 'pointer', fontWeight: 500
                }}>{t}</button>
              ))}
            </div>
          </div>

          <div className="senjr-card-flat" style={{ marginBottom: 16 }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--senjr-text-muted)', marginBottom: 12, textTransform: 'uppercase' }}>
              Available Until:
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <button style={{ fontSize: 18, color: 'var(--senjr-text-muted)', display: 'block' }}>+</button>
                <span style={{ fontSize: 32, fontWeight: 800, color: '#1E40AF' }}>{String(endTime.h).padStart(2, '0')}</span>
                <button style={{ fontSize: 18, color: 'var(--senjr-text-muted)', display: 'block' }}>−</button>
              </div>
              <span style={{ fontSize: 32, fontWeight: 800 }}>:</span>
              <div style={{ textAlign: 'center' }}>
                <button style={{ fontSize: 18, color: 'var(--senjr-text-muted)', display: 'block' }}>+</button>
                <span style={{ fontSize: 32, fontWeight: 800, color: '#1E40AF' }}>{String(endTime.m).padStart(2, '0')}</span>
                <button style={{ fontSize: 18, color: 'var(--senjr-text-muted)', display: 'block' }}>−</button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <button style={{
                  padding: '4px 12px', borderRadius: 6, fontSize: 12, fontWeight: 600,
                  background: endTime.ampm === 'AM' ? '#1E40AF' : 'var(--senjr-bg)',
                  color: endTime.ampm === 'AM' ? 'white' : 'var(--senjr-text-muted)',
                  border: 'none', cursor: 'pointer'
                }}>AM</button>
                <button style={{
                  padding: '4px 12px', borderRadius: 6, fontSize: 12, fontWeight: 600,
                  background: endTime.ampm === 'PM' ? '#1E40AF' : 'var(--senjr-bg)',
                  color: endTime.ampm === 'PM' ? 'white' : 'var(--senjr-text-muted)',
                  border: 'none', cursor: 'pointer'
                }}>PM</button>
              </div>
            </div>
            <p style={{ fontSize: 11, color: 'var(--senjr-text-muted)', textAlign: 'center', marginTop: 8 }}>
              Defaulting to 3 hours after start time.
            </p>
          </div>

          <div className="senjr-card-flat" style={{ marginBottom: 16 }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--senjr-text-muted)', marginBottom: 12 }}>
              Slot Duration (Min)
            </p>
            <div className="senjr-chip-group">
              {[15, 30, 45, 60].map((d) => (
                <button
                  key={d}
                  className={`senjr-chip ${slotDuration === d ? 'senjr-chip-active' : ''}`}
                  onClick={() => setSlotDuration(d)}
                  style={{ fontSize: 13, padding: '6px 14px' }}
                >
                  {d}
                </button>
              ))}
              <button className="senjr-chip" style={{ fontSize: 13, padding: '6px 14px' }}>Custom</button>
            </div>
          </div>

          <div className="senjr-grid-2" style={{ marginBottom: 16 }}>
            <div className="senjr-card-flat" style={{ marginBottom: 0 }}>
              <p style={{ fontSize: 12, color: 'var(--senjr-text-muted)', marginBottom: 4 }}>Buffer</p>
              <select className="senjr-input" style={{ fontSize: 13, padding: '8px 12px' }} value={buffer} disabled>
                <option value={5}>5 min</option>
                <option value={10}>10 min</option>
                <option value={15}>15 min</option>
              </select>
            </div>
            <div className="senjr-card-flat" style={{ marginBottom: 0 }}>
              <p style={{ fontSize: 12, color: 'var(--senjr-text-muted)', marginBottom: 4 }}>Break After</p>
              <select className="senjr-input" style={{ fontSize: 13, padding: '8px 12px' }} value={breakAfter} disabled>
                <option value={2}>2 slots</option>
                <option value={3}>3 slots</option>
                <option value={4}>4 slots</option>
              </select>
            </div>
          </div>

          <div className="senjr-card-flat" style={{ marginBottom: 16 }}>
            <p style={{ fontSize: 12, color: 'var(--senjr-text-muted)', marginBottom: 4 }}>Break Duration</p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
              <button style={{ fontSize: 18, color: 'var(--senjr-text-muted)' }}>−</button>
              <span style={{ fontSize: 18, fontWeight: 700 }}>{breakDuration} min</span>
              <button style={{ fontSize: 18, color: 'var(--senjr-text-muted)' }}>+</button>
            </div>
          </div>

          <div className="senjr-card-flat" style={{ background: 'var(--senjr-green-bg)', borderColor: 'var(--senjr-green-light)', marginBottom: 16 }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--senjr-green-dark)', marginBottom: 12 }}>
              Generated Slots:
            </p>
            {generatedSlots.map((slot, i) => (
              slot.break ? (
                <p key={i} style={{ textAlign: 'center', fontSize: 12, color: 'var(--senjr-orange)', fontWeight: 600, padding: '8px 0' }}>
                  ⏸ {slot.duration}
                </p>
              ) : (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '8px 12px', background: 'white', borderRadius: 8, marginBottom: 6
                }}>
                  <span style={{ fontSize: 13, fontWeight: 500 }}>{slot.start} - {slot.end}</span>
                  <Check size={16} style={{ color: 'var(--senjr-green)' }} />
                </div>
              )
            ))}
          </div>

          <div className="senjr-card-flat" style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 14, fontWeight: 600 }}>Advanced Options</span>
              <ChevronDown size={18} style={{ color: 'var(--senjr-text-muted)' }} />
            </div>
          </div>

          <div className="senjr-card-flat" style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ fontSize: 13, fontWeight: 500 }}>Auto-accept Bookings</span>
              <button
                onClick={() => setAutoAccept(!autoAccept)}
                style={{
                  width: 48, height: 28, borderRadius: 14,
                  background: autoAccept ? 'var(--senjr-green)' : 'var(--senjr-border)',
                  position: 'relative', transition: 'background 0.2s', border: 'none', cursor: 'pointer'
                }}
              >
                <div style={{
                  width: 22, height: 22, borderRadius: '50%',
                  background: 'white',
                  position: 'absolute',
                  top: 3,
                  left: autoAccept ? 23 : 3,
                  transition: 'left 0.2s',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
                }} />
              </button>
            </div>
          </div>

          <div className="senjr-card-flat" style={{ marginBottom: 24 }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--senjr-text-muted)', marginBottom: 12, textTransform: 'uppercase' }}>
              Repeating Options
            </p>
            {[
              { id: 'weekly', label: 'Repeat every week' },
              { id: 'biweekly', label: 'Repeat every 2 weeks' },
              { id: 'custom', label: 'Custom' },
            ].map((opt) => (
              <div key={opt.id} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '10px 0', borderBottom: '1px solid var(--senjr-border)'
              }}>
                <span style={{ fontSize: 14 }}>{opt.label}</span>
                <div style={{
                  width: 20, height: 20, borderRadius: '50%',
                  border: `2px solid ${repeatOption === opt.id ? 'var(--senjr-green)' : 'var(--senjr-border)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer'
                }} onClick={() => setRepeatOption(opt.id)}>
                  {repeatOption === opt.id && <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--senjr-green)' }} />}
                </div>
              </div>
            ))}
          </div>

          <button className="senjr-btn senjr-btn-green">
            <Save size={18} /> Save Availability
          </button>
        </div>
      </div>
    </div>
  )
}
