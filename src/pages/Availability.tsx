import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Sun, Moon, Save, Plus, X, Check, Clock } from 'lucide-react'

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

type DaySlots = { day: string; enabled: boolean; slots: { start: string; end: string }[] }

const defaultSlots: DaySlots[] = daysOfWeek.map((day) => ({
  day,
  enabled: ['Sat', 'Sun'].includes(day) ? false : true,
  slots: [{ start: '10:00', end: '12:00' }, { start: '14:00', end: '17:00' }],
}))

const timeOptions: { value: string; label: string }[] = []
for (let h = 6; h <= 22; h++) {
  for (let m = 0; m < 60; m += 30) {
    const hour = h > 12 ? h - 12 : h
    const ampm = h >= 12 ? 'PM' : 'AM'
    const str = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
    const label = `${hour}:${String(m).padStart(2, '0')} ${ampm}`
    timeOptions.push({ value: str, label })
  }
}

export default function Availability() {
  const navigate = useNavigate()
  const [schedule, setSchedule] = useState<DaySlots[]>(defaultSlots)
  const [saved, setSaved] = useState(false)

  const toggleDay = (index: number) => {
    setSchedule(prev => prev.map((d, i) => i === index ? { ...d, enabled: !d.enabled } : d))
    setSaved(false)
  }

  const addSlot = (dayIndex: number) => {
    setSchedule(prev => prev.map((d, i) => i === dayIndex ? { ...d, slots: [...d.slots, { start: '14:00', end: '15:00' }] } : d))
    setSaved(false)
  }

  const removeSlot = (dayIndex: number, slotIndex: number) => {
    setSchedule(prev => prev.map((d, i) => i === dayIndex ? { ...d, slots: d.slots.filter((_, j) => j !== slotIndex) } : d))
    setSaved(false)
  }

  const updateSlot = (dayIndex: number, slotIndex: number, field: 'start' | 'end', value: string) => {
    setSchedule(prev => prev.map((d, i) => i === dayIndex ? { ...d, slots: d.slots.map((s, j) => j === slotIndex ? { ...s, [field]: value } : s) } : d))
    setSaved(false)
  }

  const saveAvailability = () => {
    localStorage.setItem('senjr_availability', JSON.stringify(schedule))
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="senjr-app">
      <header className="senjr-header">
        <button className="senjr-header-back" onClick={() => navigate(-1)}><ArrowLeft size={18} /></button>
        <span className="senjr-header-title">Set Availability</span>
        <div />
      </header>

      <div className="senjr-page">
        <div className="senjr-content">
          <div className="senjr-card-neo-green" style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Clock size={22} style={{ color: 'var(--senjr-green-dark)' }} />
              <div>
                <p style={{ fontSize: 14, fontWeight: 700, marginBottom: 2 }}>Your Weekly Schedule</p>
                <p style={{ fontSize: 12, color: 'var(--senjr-text-muted)' }}>Set when you're available for sessions</p>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {schedule.map((day, dayIndex) => (
              <div key={day.day} className="senjr-card-neo" style={{ background: day.enabled ? 'white' : 'var(--senjr-bg)', opacity: day.enabled ? 1 : 0.6, border: day.enabled ? '2px solid var(--senjr-text)' : '2px solid var(--senjr-border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: day.enabled && day.slots.length > 0 ? 12 : 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <button onClick={() => toggleDay(dayIndex)} style={{ width: 22, height: 22, borderRadius: 6, border: `2px solid ${day.enabled ? 'var(--senjr-green)' : 'var(--senjr-border)'}`, background: day.enabled ? 'var(--senjr-green)' : 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', transition: 'all 0.15s' }}>
                      {day.enabled && <Check size={14} />}
                    </button>
                    <span style={{ fontSize: 15, fontWeight: 600 }}>{day.day}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    {day.day === 'Sat' || day.day === 'Sun' ? <Moon size={14} style={{ color: 'var(--senjr-text-muted)' }} /> : <Sun size={14} style={{ color: 'var(--senjr-orange)' }} />}
                    <span style={{ fontSize: 11, color: 'var(--senjr-text-muted)' }}>{day.enabled ? `${day.slots.length} slot${day.slots.length > 1 ? 's' : ''}` : 'Off'}</span>
                  </div>
                </div>

                {day.enabled && day.slots.map((slot, slotIndex) => (
                  <div key={slotIndex} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <select value={slot.start} onChange={(e) => updateSlot(dayIndex, slotIndex, 'start', e.target.value)}
                      style={{ flex: 1, padding: '8px 10px', borderRadius: 8, border: '1px solid var(--senjr-border)', background: 'var(--senjr-bg)', fontSize: 13, color: 'var(--senjr-text)' }}>
                      {timeOptions.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                    </select>
                    <span style={{ fontSize: 12, color: 'var(--senjr-text-muted)' }}>to</span>
                    <select value={slot.end} onChange={(e) => updateSlot(dayIndex, slotIndex, 'end', e.target.value)}
                      style={{ flex: 1, padding: '8px 10px', borderRadius: 8, border: '1px solid var(--senjr-border)', background: 'var(--senjr-bg)', fontSize: 13, color: 'var(--senjr-text)' }}>
                      {timeOptions.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                    </select>
                    <button onClick={() => removeSlot(dayIndex, slotIndex)} style={{ padding: 6, background: '#FEE2E2', border: 'none', borderRadius: 6, cursor: 'pointer', color: '#DC2626' }}>
                      <X size={14} />
                    </button>
                  </div>
                ))}

                {day.enabled && (
                  <button onClick={() => addSlot(dayIndex)} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '6px 0', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--senjr-green)', fontSize: 12, fontWeight: 600 }}>
                    <Plus size={14} /> Add Slot
                  </button>
                )}
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
            <button className="senjr-btn" style={{ background: 'var(--senjr-green)', color: 'white', flex: 1 }} onClick={saveAvailability}>
              <Save size={16} /> {saved ? 'Saved!' : 'Save Availability'}
            </button>
            <button className="senjr-btn" style={{ background: 'transparent', color: 'var(--senjr-text)', border: '1px solid var(--senjr-border)', width: 'auto' }} onClick={() => navigate(-1)}>Cancel</button>
          </div>

          {saved && (
            <div style={{ position: 'fixed', bottom: 20, left: '50%', transform: 'translateX(-50%)', padding: '12px 24px', background: 'var(--senjr-green)', color: 'white', borderRadius: 12, fontWeight: 600, fontSize: 14, boxShadow: '0 4px 20px rgba(0,0,0,0.2)', zIndex: 100 }}>
              <Check size={16} style={{ display: 'inline', marginRight: 8 }} /> Schedule saved successfully!
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
