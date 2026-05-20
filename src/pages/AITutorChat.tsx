import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, MoreVertical, Send, Sparkles, Lightbulb, HelpCircle, CheckCircle, RefreshCw, BookOpen } from 'lucide-react'

export default function AITutorChat() {
  const navigate = useNavigate()
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([
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
  ])
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const quickActions = [
    { icon: Lightbulb, label: 'Explain Step by Step', action: 'explain' },
    { icon: HelpCircle, label: 'Give Me a Hint', action: 'hint' },
    { icon: CheckCircle, label: 'Check My Answer', action: 'check' },
    { icon: RefreshCw, label: 'Practice Question', action: 'practice' },
    { icon: BookOpen, label: 'Revise Topic', action: 'revise' },
  ]

  const practiceQuestion = {
    title: 'Find the derivative of f(x) = x² + 3x',
    options: ['2x + 3', 'x + 3', '2x'],
    correct: 0,
  }

  const handleSend = () => {
    if (!message.trim()) return
    setMessages([...messages, { from: 'student', text: message, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }])
    setMessage('')
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      setMessages(prev => [...prev, {
        from: 'mentor',
        text: 'Achha sawaal! Let me explain this step by step...',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }])
    }, 1500)
  }

  const handleQuickAction = (action: string) => {
    const actionMessages: Record<string, string> = {
      explain: 'Please explain this step by step',
      hint: 'Can you give me a hint?',
      check: 'Can you check my answer?',
      practice: 'Give me a practice question',
      revise: 'Help me revise this topic',
    }
    setMessages([...messages, { from: 'student', text: actionMessages[action], time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }])
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      setMessages(prev => [...prev, {
        from: 'mentor',
        text: 'Sure! Let me help you with that...',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }])
    }, 1500)
  }

  return (
    <div className="senjr-app">
      <header className="senjr-header" style={{ background: 'var(--senjr-black)', color: 'white', border: 'none' }}>
        <button className="senjr-header-back" style={{ borderColor: '#334155', color: 'white' }} onClick={() => navigate(-1)}>
          <ArrowLeft size={18} />
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ position: 'relative' }}>
            <div className="senjr-avatar" style={{ width: 36, height: 36, fontSize: 16, background: 'var(--senjr-green)', color: 'white' }}>
              A
            </div>
            <div style={{
              position: 'absolute', bottom: 0, right: 0,
              width: 10, height: 10, borderRadius: '50%',
              background: 'var(--senjr-green)',
              border: '2px solid var(--senjr-black)',
            }} />
          </div>
          <div>
            <span style={{ fontSize: 16, fontWeight: 700, color: 'white' }}>Arya</span>
            <p style={{ fontSize: 11, color: '#94A3B8' }}>Maths Expert • Online</p>
          </div>
        </div>
        <button className="senjr-btn-icon" style={{ borderColor: '#334155', color: 'white' }}>
          <MoreVertical size={18} />
        </button>
      </header>

      <div className="senjr-page" style={{ display: 'flex', flexDirection: 'column', background: '#F8FAFC' }}>
        <div style={{ flex: 1, padding: 16, overflowY: 'auto' }}>
          <div style={{
            background: 'var(--senjr-green-bg)',
            borderRadius: 12,
            padding: 12,
            marginBottom: 16,
            border: '1px solid var(--senjr-green-light)',
          }}>
            <p style={{ fontSize: 12, color: 'var(--senjr-green-dark)', fontWeight: 600, marginBottom: 4 }}>
              <Sparkles size={12} style={{ display: 'inline', marginRight: 4 }} />
              AI Tutor Tips
            </p>
            <p style={{ fontSize: 12, color: 'var(--senjr-text-muted)' }}>
              Ask me anything about Maths! I can explain concepts, solve problems, and give practice questions.
            </p>
          </div>

          {messages.map((m, i) => (
            <div key={i} style={{
              marginBottom: 16,
              display: 'flex',
              justifyContent: m.from === 'student' ? 'flex-end' : 'flex-start',
            }}>
              {m.from === 'mentor' && (
                <div style={{ maxWidth: '85%' }}>
                  <div style={{
                    background: 'white',
                    borderRadius: '16px 16px 16px 4px',
                    padding: '12px 16px',
                    marginBottom: 4,
                    border: '2px solid var(--senjr-border)',
                    boxShadow: '2px 2px 0 var(--senjr-border)',
                  }}>
                    <p style={{ fontSize: 14, lineHeight: 1.6 }}>{m.text}</p>
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
                    marginBottom: 4,
                    border: '2px solid var(--senjr-green-dark)',
                    boxShadow: '2px 2px 0 var(--senjr-green-dark)',
                  }}>
                    <p style={{ fontSize: 14, lineHeight: 1.6 }}>{m.text}</p>
                  </div>
                  <span style={{ fontSize: 11, color: 'var(--senjr-text-muted)', textAlign: 'right', display: 'block' }}>{m.time}</span>
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'flex-start' }}>
              <div style={{
                background: 'white',
                borderRadius: '16px 16px 16px 4px',
                padding: '12px 16px',
                border: '2px solid var(--senjr-border)',
              }}>
                <div style={{ display: 'flex', gap: 4 }}>
                  {[0, 1, 2].map((i) => (
                    <div key={i} style={{
                      width: 8, height: 8, borderRadius: '50%',
                      background: 'var(--senjr-text-light)',
                      animation: `bounce 1s infinite ${i * 0.2}s`,
                    }} />
                  ))}
                </div>
              </div>
            </div>
          )}

          <div style={{
            border: '2px dashed var(--senjr-green)',
            borderRadius: 12,
            padding: 16,
            background: 'var(--senjr-green-bg)',
            marginBottom: 16,
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
                  border: '2px solid var(--senjr-border)',
                  background: 'white',
                  fontSize: 14,
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontWeight: 500,
                }}
              >
                {String.fromCharCode(65 + i)}) {opt}
              </button>
            ))}
          </div>

          <div ref={messagesEndRef} />
        </div>

        <div style={{
          padding: '12px 16px',
          borderTop: '2px solid var(--senjr-border)',
          background: 'var(--senjr-bg-card)',
        }}>
          <div style={{ display: 'flex', gap: 6, marginBottom: 12, overflowX: 'auto', paddingBottom: 4 }}>
            {quickActions.map((action) => {
              const Icon = action.icon
              return (
                <button
                  key={action.action}
                  onClick={() => handleQuickAction(action.action)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    padding: '6px 12px',
                    borderRadius: 20,
                    border: '2px solid var(--senjr-border)',
                    background: 'var(--senjr-bg)',
                    fontSize: 12,
                    fontWeight: 500,
                    whiteSpace: 'nowrap',
                    cursor: 'pointer',
                    color: 'var(--senjr-text)',
                  }}
                >
                  <Icon size={14} style={{ color: 'var(--senjr-green)' }} />
                  {action.label}
                </button>
              )
            })}
          </div>
          <div style={{
            display: 'flex',
            gap: 8,
            alignItems: 'center',
          }}>
            <input
              className="senjr-input"
              style={{ flex: 1, borderRadius: 24, padding: '10px 16px', border: '2px solid var(--senjr-text)' }}
              placeholder="Type your doubt..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button
              className="senjr-btn-icon"
              style={{
                background: 'var(--senjr-green)',
                color: 'white',
                border: '2px solid var(--senjr-green-dark)',
                boxShadow: '2px 2px 0 var(--senjr-green-dark)',
              }}
              onClick={handleSend}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
      `}</style>
    </div>
  )
}
