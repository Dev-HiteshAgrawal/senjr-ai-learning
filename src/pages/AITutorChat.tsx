import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, MoreVertical, Send, Mic, Sparkles } from 'lucide-react'

export default function AITutorChat() {
  const navigate = useNavigate()
  const [message, setMessage] = useState('')

  const messages = [
    {
      from: 'mentor',
      name: 'Arya',
      role: 'Maths Expert',
      text: 'Namaste Hitesh! Aaj kya seekhna hai? ',
      time: '10:02 AM',
    },
    {
      from: 'student',
      text: 'Sir, calculus samajh nahi aa raha',
      time: '10:03 AM',
    },
    {
      from: 'mentor',
      text: 'Arre tension mat lo! Calculus = rate of change...',
      time: '10:03 AM',
    },
    {
      from: 'mentor',
      text: 'Example: Agar car 60km/hr se chal rahi hai, toh woh constant rate hai. Calculus humein batata hai ki speed har second kaise badal rahi hai.',
      time: '10:04 AM',
    },
  ]

  const practiceQuestion = {
    title: 'Find the derivative of f(x) = x² + 3x',
    options: ['2x + 3', 'x + 3', '2x'],
  }

  return (
    <div className="senjr-app">
      <header className="senjr-header">
        <button className="senjr-header-back" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} />
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div className="senjr-avatar" style={{ width: 36, height: 36, fontSize: 16, background: 'var(--senjr-green)', color: 'white' }}>
            A
          </div>
          <div>
            <span style={{ fontSize: 16, fontWeight: 700 }}>Arya</span>
            <p style={{ fontSize: 11, color: 'var(--senjr-text-muted)' }}>Maths Expert</p>
          </div>
        </div>
        <button className="senjr-btn-icon">
          <MoreVertical size={18} />
        </button>
      </header>

      <div className="senjr-page" style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, padding: 16, overflowY: 'auto' }}>
          {messages.map((m, i) => (
            <div key={i} style={{
              marginBottom: 16,
              display: 'flex',
              justifyContent: m.from === 'student' ? 'flex-end' : 'flex-start',
            }}>
              {m.from === 'mentor' && (
                <div style={{ maxWidth: '85%' }}>
                  <div style={{
                    background: '#EFF6FF',
                    borderRadius: '16px 16px 16px 4px',
                    padding: '12px 16px',
                    marginBottom: 4
                  }}>
                    <p style={{ fontSize: 14, lineHeight: 1.5 }}>{m.text}</p>
                  </div>
                  <span style={{ fontSize: 11, color: 'var(--senjr-text-muted)' }}>{m.time}</span>
                </div>
              )}
              {m.from === 'student' && (
                <div style={{ maxWidth: '85%' }}>
                  <div style={{
                    background: 'var(--senjr-green)',
                    color: 'white',
                    borderRadius: '16px 16px 4px 16px',
                    padding: '12px 16px',
                    marginBottom: 4
                  }}>
                    <p style={{ fontSize: 14, lineHeight: 1.5 }}>{m.text}</p>
                  </div>
                  <span style={{ fontSize: 11, color: 'var(--senjr-text-muted)', textAlign: 'right', display: 'block' }}>{m.time}</span>
                </div>
              )}
            </div>
          ))}

          <div style={{
            border: '2px dashed var(--senjr-green)',
            borderRadius: 12,
            padding: 16,
            background: 'var(--senjr-green-bg)',
            marginBottom: 16
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
              <Sparkles size={16} style={{ color: 'var(--senjr-green)' }} />
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--senjr-green)' }}>PRACTICE QUESTION</span>
            </div>
            <p style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>{practiceQuestion.title}</p>
            {practiceQuestion.options.map((opt, i) => (
              <button
                key={i}
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '10px 14px',
                  marginBottom: 8,
                  borderRadius: 8,
                  border: '1px solid var(--senjr-border)',
                  background: 'white',
                  fontSize: 14,
                  textAlign: 'left',
                  cursor: 'pointer'
                }}
              >
                {String.fromCharCode(65 + i)}) {opt}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 4, padding: '8px 0' }}>
            {[0, 1, 2].map((i) => (
              <div key={i} style={{
                width: 8, height: 8, borderRadius: '50%',
                background: 'var(--senjr-text-light)',
              }} />
            ))}
          </div>
        </div>

        <div style={{
          padding: '12px 16px',
          borderTop: '1px solid var(--senjr-border)',
          background: 'var(--senjr-bg-card)',
          display: 'flex',
          gap: 8,
          alignItems: 'center'
        }}>
          <input
            className="senjr-input"
            style={{ flex: 1, borderRadius: 24, padding: '10px 16px' }}
            placeholder="Type your doubt..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="senjr-btn-icon" style={{ background: 'var(--senjr-green)', color: 'white', border: 'none' }}>
            <Mic size={18} />
          </button>
          <button className="senjr-btn-icon" style={{ background: 'var(--senjr-green)', color: 'white', border: 'none' }}>
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
