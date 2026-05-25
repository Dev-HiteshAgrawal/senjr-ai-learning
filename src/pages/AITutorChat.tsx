import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, MoreVertical, Send, Lightbulb, HelpCircle, CheckCircle, RefreshCw, BookOpen, X, Image as ImageIcon, MessageSquare, Trash2 } from 'lucide-react'

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
  const [selectedImage, setSelectedImage] = useState<{ name: string; preview: string } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  useEffect(() => { scrollToBottom() }, [messages])

  const quickActions = [
    { icon: Lightbulb, label: 'Explain', action: 'explain' },
    { icon: HelpCircle, label: 'Hint', action: 'hint' },
    { icon: CheckCircle, label: 'Check', action: 'check' },
    { icon: RefreshCw, label: 'Practice', action: 'practice' },
    { icon: BookOpen, label: 'Revise', action: 'revise' },
  ]

  const callAI = async (text: string, action?: string) => {
    try {
      const res = await fetch(API_URL, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, tutorType: currentTutor.id, action, chatId }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to get response')
      return data.response
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      return null
    }
  }

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onloadend = () => setSelectedImage({ name: file.name, preview: reader.result as string })
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  const clearImage = () => setSelectedImage(null)

  const handleSend = async () => {
    if (!message.trim() && !selectedImage) return
    const textToSend = message.trim() || (selectedImage ? `[Image: ${selectedImage.name}]` : '')
    const userMsg: ChatMessage = { from: 'student', text: textToSend, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    setMessages(prev => [...prev, userMsg])
    setMessage(''); setSelectedImage(null); setIsTyping(true); setError(null)
    const response = await callAI(textToSend)
    setIsTyping(false)
    if (response) setMessages(prev => [...prev, { from: 'mentor', name: currentTutor.name, role: currentTutor.role, text: response, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }])
  }

  const handleQuickAction = async (action: string) => {
    const actionMessages: Record<string, string> = { explain: 'Please explain this step by step', hint: 'Can you give me a hint?', check: 'Can you check my answer?', practice: 'Give me a practice question', revise: 'Help me revise this topic' }
    const userMsg: ChatMessage = { from: 'student', text: actionMessages[action], time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    setMessages(prev => [...prev, userMsg]); setIsTyping(true); setError(null)
    const response = await callAI(actionMessages[action], action)
    setIsTyping(false)
    if (response) setMessages(prev => [...prev, { from: 'mentor', name: currentTutor.name, role: currentTutor.role, text: response, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }])
  }

  return (
    <div className="senjr-app">
      <header className="senjr-header">
        <button className="senjr-header-back" onClick={() => navigate(-1)}><ArrowLeft size={18} /></button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }} onClick={() => setShowTutorSelector(true)}>
          <div style={{
            width: 36, height: 36, borderRadius: '50%',
            background: `${currentTutor.color}20`, color: currentTutor.color,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 700, fontSize: 16,
          }}>{currentTutor.name[0]}</div>
          <div style={{ textAlign: 'left' }}>
            <span style={{ fontSize: 15, fontWeight: 700 }}>{currentTutor.name}</span>
            <p style={{ fontSize: 11, color: 'var(--senjr-text-muted)' }}>{currentTutor.role}</p>
          </div>
        </div>
        <button className="senjr-btn-icon" onClick={() => setShowTutorSelector(true)}><MoreVertical size={18} /></button>
      </header>

      {showTutorSelector && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setShowTutorSelector(false)}>
          <div style={{ background: 'white', borderRadius: 16, padding: 20, width: '85%', maxWidth: 340, boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>Choose Tutor</h3>
              <button onClick={() => setShowTutorSelector(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            {tutorOptions.map(tutor => (
              <button key={tutor.id} onClick={() => { setCurrentTutor(tutor); setShowTutorSelector(false); setMessages([]) }}
                style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%', padding: '12px 16px', marginBottom: 8, borderRadius: 12, border: currentTutor.id === tutor.id ? `2px solid ${tutor.color}` : '2px solid var(--senjr-border)', background: currentTutor.id === tutor.id ? `${tutor.color}15` : 'white', cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s' }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: tutor.color, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 18 }}>{tutor.name[0]}</div>
                <div><div style={{ fontWeight: 600 }}>{tutor.name}</div><div style={{ fontSize: 12, color: 'var(--senjr-text-muted)' }}>{tutor.role}</div></div>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="senjr-page" style={{ display: 'flex', flexDirection: 'column', background: '#F8FAFC' }}>
        <div style={{ flex: 1, padding: 16, overflowY: 'auto' }}>
          {messages.length === 0 && (
            <div style={{
              background: `${currentTutor.color}10`, borderRadius: 16, padding: 20, marginBottom: 16,
              border: `1px solid ${currentTutor.color}30`, textAlign: 'center',
            }}>
              <MessageSquare size={36} style={{ marginBottom: 12, color: currentTutor.color, opacity: 0.6 }} />
              <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>Chat with {currentTutor.name}</p>
              <p style={{ fontSize: 13, color: 'var(--senjr-text-muted)', marginBottom: 12 }}>
                {currentTutor.id === 'math' && 'Ask me about JEE Maths!'}
                {currentTutor.id === 'uppolice' && 'Ask me about UP Police exam topics!'}
                {currentTutor.id === 'english' && 'Ask me about English, grammar, and reasoning!'}
                {currentTutor.id === 'general' && 'Ask me anything!'}
              </p>
            </div>
          )}

          {error && <div style={{ background: '#FEE2E2', border: '1px solid #FCA5A5', borderRadius: 8, padding: '12px 16px', marginBottom: 16, color: '#DC2626', fontSize: 14 }}>{error}</div>}

          {messages.map((m, i) => (
            <div key={i} className="senjr-slide-up" style={{
              marginBottom: 16,
              display: 'flex',
              flexDirection: 'column',
              alignItems: m.from === 'student' ? 'flex-end' : 'flex-start',
            }}>
              {m.from === 'mentor' && (
                <div style={{ maxWidth: '85%' }}>
                  <div style={{
                    background: 'white',
                    borderRadius: '16px 16px 16px 4px',
                    padding: '12px 16px',
                    marginBottom: 4,
                    border: '1px solid var(--senjr-border)',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                  }}>
                    {m.name && (
                      <p style={{ fontSize: 11, fontWeight: 700, color: currentTutor.color, marginBottom: 4 }}>
                        {m.name} <span style={{ color: 'var(--senjr-text-muted)', fontWeight: 400 }}>&middot; {m.role}</span>
                      </p>
                    )}
                    <p style={{ fontSize: 14, lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{m.text}</p>
                  </div>
                  <span style={{ fontSize: 11, color: 'var(--senjr-text-muted)', marginLeft: 4 }}>{m.time}</span>
                </div>
              )}
              {m.from === 'student' && (
                <div style={{ maxWidth: '85%' }}>
                  <div style={{
                    background: 'linear-gradient(135deg, var(--senjr-green) 0%, var(--senjr-green-dark) 100%)',
                    color: 'white',
                    borderRadius: '16px 16px 4px 16px',
                    padding: '12px 16px',
                    marginBottom: 4,
                    boxShadow: '0 2px 8px rgba(16,185,129,0.2)',
                  }}>
                    <p style={{ fontSize: 14, lineHeight: 1.6 }}>{m.text}</p>
                  </div>
                  <span style={{ fontSize: 11, color: 'var(--senjr-text-muted)', textAlign: 'right', display: 'block', marginRight: 4 }}>{m.time}</span>
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'flex-start' }}>
              <div style={{ background: 'white', borderRadius: '16px 16px 16px 4px', padding: '12px 16px', border: '1px solid var(--senjr-border)' }}>
                <div style={{ display: 'flex', gap: 4 }}>
                  {[0, 1, 2].map((i) => (<div key={i} className="senjr-typing-dot" />))}
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div style={{ padding: '12px 16px', borderTop: '1px solid var(--senjr-border)', background: 'var(--senjr-bg-card)' }}>
          <div style={{ display: 'flex', gap: 6, marginBottom: 12, overflowX: 'auto', paddingBottom: 4 }} className="senjr-scrollbar-hide">
            {quickActions.map((action) => {
              const Icon = action.icon
              return (
                <button key={action.action} onClick={() => handleQuickAction(action.action)}
                  style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '6px 14px', borderRadius: 20, border: '1px solid var(--senjr-border)', background: 'var(--senjr-bg)', fontSize: 12, fontWeight: 500, whiteSpace: 'nowrap', cursor: 'pointer', color: 'var(--senjr-text)', transition: 'all 0.15s' }}>
                  <Icon size={14} style={{ color: 'var(--senjr-green)' }} /> {action.label}
                </button>
              )
            })}
          </div>
          {selectedImage && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, padding: '8px 12px', borderRadius: 8, background: 'var(--senjr-green-lighter)', border: '1px solid var(--senjr-green-light)' }}>
              <ImageIcon size={16} style={{ color: 'var(--senjr-green)' }} />
              <span style={{ fontSize: 13, flex: 1, color: 'var(--senjr-green-dark)' }}>{selectedImage.name}</span>
              <button onClick={clearImage} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--senjr-text-muted)' }}><Trash2 size={16} /></button>
            </div>
          )}
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageSelect} />
            <button className="senjr-btn-icon" style={{ background: 'var(--senjr-bg)', color: 'var(--senjr-text-muted)', border: '1px solid var(--senjr-border)' }} onClick={() => fileInputRef.current?.click()} title="Attach image">
              <ImageIcon size={18} />
            </button>
            <input className="senjr-input" style={{ flex: 1, borderRadius: 24, padding: '10px 16px' }} placeholder="Type your doubt..." value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} />
            <button className="senjr-btn-icon" style={{ background: 'var(--senjr-green)', color: 'white', border: 'none' }} onClick={handleSend}>
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
