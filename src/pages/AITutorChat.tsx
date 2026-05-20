import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, MoreVertical, Send, Sparkles, Lightbulb, HelpCircle, CheckCircle, RefreshCw, BookOpen, X } from 'lucide-react'

type TutorType = 'math' | 'uppolice' | 'english' | 'general'

interface ChatMessage {
  from: 'mentor' | 'student'
  name?: string
  role?: string
  text: string
  time: string
}

interface TutorOption {
  id: TutorType
  name: string
  role: string
  color: string
}

const tutorOptions: TutorOption[] = [
  { id: 'math', name: 'Arya', role: 'JEE Maths Expert', color: '#22C55E' },
  { id: 'uppolice', name: 'Raj', role: 'UP Police Expert', color: '#F59E0B' },
  { id: 'english', name: 'Priya', role: 'English & Reasoning', color: '#8B5CF6' },
  { id: 'general', name: 'Sam', role: 'General Tutor', color: '#EC4899' },
]

const API_URL = '/api/aiTutor'

export default function AITutorChat() {
  const navigate = useNavigate()
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [currentTutor, setCurrentTutor] = useState<TutorOption>(tutorOptions[0])
  const [showTutorSelector, setShowTutorSelector] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [chatId] = useState(() => `chat_${Date.now()}_${Math.random().toString(36).slice(2)}`)
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

  const callAI = async (text: string, action?: string) => {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: text, 
          tutorType: currentTutor.id,
          action,
          chatId
        }),
      })
      
      const data = await res.json()
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to get response')
      }
      
      return data.response
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      return null
    }
  }

  const handleSend = async () => {
    if (!message.trim()) return
    const userMsg: ChatMessage = { 
      from: 'student', 
      text: message, 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    }
    setMessages(prev => [...prev, userMsg])
    setMessage('')
    setIsTyping(true)
    setError(null)
    
    const response = await callAI(message)
    
    setIsTyping(false)
    if (response) {
      setMessages(prev => [...prev, {
        from: 'mentor',
        name: currentTutor.name,
        role: currentTutor.role,
        text: response,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }])
    }
  }

  const handleQuickAction = async (action: string) => {
    const actionMessages: Record<string, string> = {
      explain: 'Please explain this step by step',
      hint: 'Can you give me a hint?',
      check: 'Can you check my answer?',
      practice: 'Give me a practice question',
      revise: 'Help me revise this topic',
    }
    const userMsg: ChatMessage = { 
      from: 'student', 
      text: actionMessages[action], 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    }
    setMessages(prev => [...prev, userMsg])
    setIsTyping(true)
    setError(null)
    
    const response = await callAI(actionMessages[action], action)
    
    setIsTyping(false)
    if (response) {
      setMessages(prev => [...prev, {
        from: 'mentor',
        name: currentTutor.name,
        role: currentTutor.role,
        text: response,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }])
    }
  }

  return (
    <div className="senjr-app">
      <header className="senjr-header" style={{ background: 'var(--senjr-black)', color: 'white', border: 'none' }}>
        <button className="senjr-header-back" style={{ borderColor: '#334155', color: 'white' }} onClick={() => navigate(-1)}>
          <ArrowLeft size={18} />
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }} onClick={() => setShowTutorSelector(true)}>
          <div style={{ position: 'relative' }}>
            <div className="senjr-avatar" style={{ width: 36, height: 36, fontSize: 16, background: currentTutor.color, color: 'white' }}>
              {currentTutor.name[0]}
            </div>
            <div style={{
              position: 'absolute', bottom: 0, right: 0,
              width: 10, height: 10, borderRadius: '50%',
              background: '#22C55E',
              border: '2px solid var(--senjr-black)',
            }} />
          </div>
          <div>
            <span style={{ fontSize: 16, fontWeight: 700, color: 'white' }}>{currentTutor.name}</span>
            <p style={{ fontSize: 11, color: '#94A3B8' }}>{currentTutor.role} • Online</p>
          </div>
        </div>
        <button className="senjr-btn-icon" style={{ borderColor: '#334155', color: 'white' }} onClick={() => setShowTutorSelector(true)}>
          <MoreVertical size={18} />
        </button>
      </header>

      {showTutorSelector && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)', zIndex: 100,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }} onClick={() => setShowTutorSelector(false)}>
          <div style={{
            background: 'white', borderRadius: 16, padding: 20, width: '85%', maxWidth: 340,
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
          }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3 style={{ margin: 0, fontSize: 18 }}>Choose Your Tutor</h3>
              <button onClick={() => setShowTutorSelector(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>
            {tutorOptions.map(tutor => (
              <button
                key={tutor.id}
                onClick={() => { setCurrentTutor(tutor); setShowTutorSelector(false); setMessages([]); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12, width: '100%',
                  padding: '12px 16px', marginBottom: 8, borderRadius: 12,
                  border: currentTutor.id === tutor.id ? `2px solid ${tutor.color}` : '2px solid var(--senjr-border)',
                  background: currentTutor.id === tutor.id ? `${tutor.color}15` : 'white',
                  cursor: 'pointer', textAlign: 'left'
                }}
              >
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: tutor.color, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                  {tutor.name[0]}
                </div>
                <div>
                  <div style={{ fontWeight: 600 }}>{tutor.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--senjr-text-muted)' }}>{tutor.role}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="senjr-page" style={{ display: 'flex', flexDirection: 'column', background: '#F8FAFC' }}>
        <div style={{ flex: 1, padding: 16, overflowY: 'auto' }}>
          <div style={{
            background: `${currentTutor.color}15`,
            borderRadius: 12,
            padding: 12,
            marginBottom: 16,
            border: `1px solid ${currentTutor.color}40`,
          }}>
            <p style={{ fontSize: 12, color: currentTutor.color, fontWeight: 600, marginBottom: 4 }}>
              <Sparkles size={12} style={{ display: 'inline', marginRight: 4 }} />
              {currentTutor.name}'s Tips
            </p>
            <p style={{ fontSize: 12, color: 'var(--senjr-text-muted)' }}>
              {currentTutor.id === 'math' && 'Ask me anything about JEE Maths! Calculus, Algebra, Trigonometry - all covered.'}
              {currentTutor.id === 'uppolice' && 'Ask me about UP Police exam topics - GK, Reasoning, Numerical Ability!'}
              {currentTutor.id === 'english' && 'Ask me about English grammar, vocabulary, and reasoning shortcuts!'}
              {currentTutor.id === 'general' && 'Ask me anything! I can help with any subject or topic.'}
            </p>
          </div>

          {error && (
            <div style={{
              background: '#FEE2E2', border: '1px solid #FCA5A5',
              borderRadius: 8, padding: '12px 16px', marginBottom: 16, color: '#DC2626', fontSize: 14
            }}>
              {error}
            </div>
          )}

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

          {messages.length === 0 && (
            <div style={{
              textAlign: 'center', padding: '40px 20px', color: 'var(--senjr-text-muted)'
            }}>
              <Sparkles size={48} style={{ marginBottom: 12, color: currentTutor.color, opacity: 0.5 }} />
              <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>Start chatting with {currentTutor.name}!</p>
              <p style={{ fontSize: 14 }}>Ask any question or use the quick actions below</p>
            </div>
          )}

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
