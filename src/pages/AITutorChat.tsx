import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, MoreVertical, Send, Lightbulb, HelpCircle, CheckCircle, RefreshCw, BookOpen, X, Image as ImageIcon, Trash2, Bot } from 'lucide-react'

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
  tagline: string
  avatarEmoji: string
  gradient: string
}

const tutorOptions: TutorOption[] = [
  { id: 'math', name: 'Arya', role: 'JEE Maths Expert', color: '#22C55E', tagline: 'Maths ki duniya ka superhero!', avatarEmoji: '\u{1F9EE}', gradient: 'linear-gradient(135deg, #22C55E, #16A34A)' },
  { id: 'uppolice', name: 'Raj', role: 'UP Police Expert', color: '#F59E0B', tagline: 'Guard banne ka sapna poora karenge!', avatarEmoji: '\u{1F9FF}', gradient: 'linear-gradient(135deg, #F59E0B, #D97706)' },
  { id: 'english', name: 'Priya', role: 'English & Reasoning', color: '#8B5CF6', tagline: 'English ko banao apni strength!', avatarEmoji: '\u{1F4D6}', gradient: 'linear-gradient(135deg, #8B5CF6, #7C3AED)' },
  { id: 'general', name: 'Sam', role: 'General Tutor', color: '#EC4899', tagline: 'Har sawaal ka jawab yahan hai!', avatarEmoji: '\u{1F916}', gradient: 'linear-gradient(135deg, #EC4899, #DB2777)' },
]

const API_URL = '/api/aiTutor'

const mockResponses: Record<TutorType, string[]> = {
  math: [
    "Let's break it down step by step. In JEE Maths, the key is to understand the underlying concept first, then apply formulas. Try solving the derivative from first principles — what do you get?",
    "Great question! For JEE Main, focus on NCERT concepts first, then move to advanced problems. Remember: limit, continuity, and differentiability are scoring topics.",
    "Here's a useful trick: when dealing with complex integration, look for patterns like `f'(x)/f(x)` form — that's almost always a log integration. Practice 5 similar problems and you'll master it.",
    "Maine khud yeh sab kiya hai! Ek baar mein bhi integration mein fass gaya tha. But regular practice ne sab theek kar diya. Tum bhi kar sakte ho! \u{1F4AA}",
  ],
  uppolice: [
    "For UP Police, current affairs from the last 6 months are crucial. Focus on government schemes, national parks, and sports events. Let me know which topic you want to dive deeper into.",
    "In reasoning, practice Venn diagrams and syllogisms daily — these are high-weightage topics in UP Police exams. Try this: 'All A are B. Some B are C.' What can you conclude?",
    "GK strategy tip: Divide your study into 4 buckets — History, Geography, Polity, and Economy. Revise each bucket weekly with mock tests. Consistency beats intensity here.",
    "Maine bhi UP Police ka exam diya hai. Trust me, agar mein kar sakta hoon to tum bhi kar sakte ho. Sirf discipline chahiye! \u{1F525}",
  ],
  english: [
    "Great question! In English, reading comprehension is all about identifying the main idea and tone. Skim the passage first, then read questions, then scan. Try this with the next passage you see.",
    "For grammar, remember the golden rule: a singular subject takes a singular verb. 'The group of students IS studying' — 'group' is singular, so use 'is', not 'are'.",
    "Reasoning tip: In blood relation problems, draw a family tree. Start with the oldest member and work down. Once you visualize it, much of the confusion disappears.",
    "English koi rocket science nahi hai! Rozana 15 minutes newspaper padho, aur dekho improvement. I'm here to help you every step of the way! \u{2728}",
  ],
  general: [
    "That's a great question! Let me help you understand this concept. Think of it as building blocks — once you master the fundamentals, advanced topics become much easier.",
    "Here's a simple way to look at it: break down the problem into smaller parts. What's the first thing we need to figure out? Start there, and the rest will follow naturally.",
    "Practice makes progress, not perfection. Try to solve 3 problems on this topic daily. Even 15 minutes of focused practice will show results in a week.",
    "Don't worry about making mistakes — that's how we learn! I've got your back. Ask me anything, no question is too silly! \u{1F60A}",
  ]
}

export default function AITutorChat() {
  const navigate = useNavigate()
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [currentTutor, setCurrentTutor] = useState<TutorOption>(tutorOptions[0])
  const [showTutorSelector, setShowTutorSelector] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [chatId] = useState(() => {
    const timestamp = Date.now()
    const randomPart = Math.random().toString(36).slice(2)
    return `chat_${timestamp}_${randomPart}`
  })
  const randomRef = useRef({
    random: () => Math.random()
  })
  const [selectedImage, setSelectedImage] = useState<{ name: string; preview: string } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  useEffect(() => { scrollToBottom() }, [messages])

   useEffect(() => {
     if (messages.length === 0) {
       const greetings: Record<TutorType, string> = {
         math: 'Hi! I\'m Arya, your JEE Maths expert. What would you like to work on today?',
         uppolice: 'Namaste! I\'m Raj, your UP Police prep guide. Ready to crack some questions?',
         english: 'Hello! I\'m Priya. Let\'s improve your English and reasoning skills together!',
         general: 'Hey there! I\'m Sam, your general tutor. What are you studying today?',
       }
       const greeting: ChatMessage = {
         from: 'mentor', name: currentTutor.name, role: currentTutor.role,
         text: greetings[currentTutor.id],
         time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
       }
       setMessages(() => [greeting])
     }
   }, [currentTutor.id, currentTutor.name, currentTutor.role, messages.length])

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
      if (!res.ok) throw new Error('API unavailable')
      const data = await res.json()
      return data.response
    } catch {
      const replies = mockResponses[currentTutor.id]
        const randomIdx = Math.floor(randomRef.current.random() * replies.length)
        await new Promise(r => setTimeout(r, 800 + randomRef.current.random() * 600))
        return replies[randomIdx]
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
    const actionMessages: Record<string, string> = {
      explain: 'Please explain this step by step',
      hint: 'Can you give me a hint?',
      check: 'Can you check my answer?',
      practice: 'Give me a practice question',
      revise: 'Help me revise this topic'
    }
    const userMsg: ChatMessage = { from: 'student', text: actionMessages[action], time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    setMessages(prev => [...prev, userMsg]); setIsTyping(true); setError(null)
    const response = await callAI(actionMessages[action], action)
    setIsTyping(false)
    if (response) setMessages(prev => [...prev, { from: 'mentor', name: currentTutor.name, role: currentTutor.role, text: response, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }])
  }

  return (
    <div className="senjr-app">
      <header className="senjr-header" style={{
        background: 'rgba(255,255,255,0.9)',
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
      }}>
        <button className="senjr-header-back" onClick={() => navigate(-1)}><ArrowLeft size={18} /></button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }} onClick={() => setShowTutorSelector(true)}>
          <div style={{
            width: 38, height: 38, borderRadius: 10,
            background: currentTutor.gradient,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18, boxShadow: `0 2px 8px ${currentTutor.color}40`,
          }}>
            {currentTutor.avatarEmoji}
          </div>
          <div style={{ textAlign: 'left' }}>
            <span style={{ fontSize: 15, fontWeight: 700 }}>{currentTutor.name}</span>
            <p style={{ fontSize: 11, color: 'var(--senjr-text-muted)' }}>{currentTutor.role}</p>
          </div>
        </div>
        <button className="senjr-btn-icon" style={{ border: '1.5px solid var(--senjr-border)' }} onClick={() => setShowTutorSelector(true)}><MoreVertical size={18} /></button>
      </header>

      {showTutorSelector && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)', zIndex: 200,
          display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
        }} onClick={() => setShowTutorSelector(false)}>
          <div className="senjr-fade-in" style={{
            width: '100%', maxWidth: 480, maxHeight: '75vh',
            background: '#F8FAFC', borderRadius: '24px 24px 0 0',
            padding: '24px 20px', overflow: 'auto',
            boxShadow: '0 -8px 32px rgba(0,0,0,0.15)',
          }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Bot size={20} style={{ color: 'var(--senjr-green)' }} /> Choose Your Tutor
              </h3>
              <button onClick={() => setShowTutorSelector(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, color: 'var(--senjr-text-muted)' }}><X size={20} /></button>
            </div>
            <p style={{ fontSize: 13, color: 'var(--senjr-text-muted)', marginBottom: 16 }}>
              Har tutor ka apna style hai. Jo aapko comfortable lage, woh chunein!
            </p>
            {tutorOptions.map(tutor => (
              <button key={tutor.id} onClick={() => { setCurrentTutor(tutor); setShowTutorSelector(false); setMessages([]) }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 14, width: '100%', padding: '16px',
                  marginBottom: 10, borderRadius: 14, textAlign: 'left', cursor: 'pointer',
                  border: currentTutor.id === tutor.id ? `2px solid ${tutor.color}` : '2px solid #E2E8F0',
                  background: currentTutor.id === tutor.id ? `${tutor.color}08` : 'white',
                  transition: 'all 0.15s',
                }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 14,
                  background: tutor.gradient,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 24, boxShadow: `0 4px 12px ${tutor.color}30`,
                  flexShrink: 0,
                }}>
                  {tutor.avatarEmoji}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 2 }}>{tutor.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--senjr-text-muted)', marginBottom: 4 }}>{tutor.role}</div>
                  <div style={{ fontSize: 12, color: tutor.color, fontWeight: 500 }}>{tutor.tagline}</div>
                </div>
                {currentTutor.id === tutor.id && (
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: tutor.color, flexShrink: 0 }} />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="senjr-page" style={{ display: 'flex', flexDirection: 'column', background: 'var(--senjr-bg)' }}>
        <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {messages.length === 1 && (
            <div style={{
              textAlign: 'center', marginBottom: 12, animation: 'fadeIn 0.5s ease',
            }}>
              <div style={{
                width: 60, height: 60, borderRadius: 16,
                background: currentTutor.gradient,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 12px', fontSize: 28,
                boxShadow: `0 4px 16px ${currentTutor.color}30`,
              }}>
                {currentTutor.avatarEmoji}
              </div>
              <p style={{ fontSize: 13, color: 'var(--senjr-text-muted)', fontStyle: 'italic' }}>
                "{currentTutor.tagline}"
              </p>
            </div>
          )}

          {messages.map((m, i) => (
            <div key={i} className="senjr-slide-up" style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: m.from === 'student' ? 'flex-end' : 'flex-start',
            }}>
              {m.from === 'mentor' && (
                <div style={{ maxWidth: '85%' }}>
                  <div className="senjr-message-bubble-mentor">
                    {m.name && (
                      <p style={{ fontSize: 11, fontWeight: 700, color: currentTutor.color, marginBottom: 4, display: 'flex', alignItems: 'center', gap: 4 }}>
                        <span>{currentTutor.avatarEmoji}</span>
                        {m.name} <span style={{ color: 'var(--senjr-text-muted)', fontWeight: 400 }}>&middot; {m.role}</span>
                      </p>
                    )}
                    <p style={{ fontSize: 14, lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{m.text}</p>
                  </div>
                  <span style={{ fontSize: 11, color: 'var(--senjr-text-muted)', marginLeft: 4, marginTop: 4, display: 'block' }}>{m.time}</span>
                </div>
              )}
              {m.from === 'student' && (
                <div style={{ maxWidth: '85%' }}>
                  <div className="senjr-message-bubble-student">
                    <p style={{ fontSize: 14, lineHeight: 1.7 }}>{m.text}</p>
                  </div>
                  <span style={{ fontSize: 11, color: 'var(--senjr-text-muted)', textAlign: 'right', display: 'block', marginRight: 4, marginTop: 4 }}>{m.time}</span>
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <div className="senjr-slide-up" style={{
                background: 'white', borderRadius: '16px 16px 16px 4px',
                padding: '14px 18px', border: '1px solid var(--senjr-border)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              }}>
                <div style={{ display: 'flex', gap: 5 }}>
                  {[0, 1, 2].map((i) => (<div key={i} className="senjr-typing-dot" />))}
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />

          {error && (
            <div style={{
              background: '#FEE2E2', border: '1px solid #FCA5A5', borderRadius: 8,
              padding: '12px 16px', color: '#DC2626', fontSize: 14,
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <HelpCircle size={16} /> {error}
            </div>
          )}
        </div>

        <div style={{
          padding: '12px 16px', borderTop: '1px solid var(--senjr-border)',
          background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(12px)',
        }}>
          <div style={{
            display: 'flex', gap: 6, marginBottom: 12, overflowX: 'auto',
            paddingBottom: 4,
          }} className="senjr-scrollbar-hide">
            {quickActions.map((action) => {
              const Icon = action.icon
              return (
                <button key={action.action} onClick={() => handleQuickAction(action.action)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 4,
                    padding: '7px 16px', borderRadius: 20,
                    border: `1px solid ${currentTutor.color}30`,
                    background: `${currentTutor.color}08`,
                    fontSize: 12, fontWeight: 500, whiteSpace: 'nowrap',
                    color: 'var(--senjr-text)', cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}>
                  <Icon size={14} style={{ color: currentTutor.color }} /> {action.label}
                </button>
              )
            })}
          </div>
          {selectedImage && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8,
              padding: '8px 12px', borderRadius: 8,
              background: 'var(--senjr-green-lighter)',
              border: '1px solid var(--senjr-green-light)',
            }}>
              <ImageIcon size={16} style={{ color: 'var(--senjr-green)' }} />
              <span style={{ fontSize: 13, flex: 1, color: 'var(--senjr-green-dark)' }}>{selectedImage.name}</span>
              <button onClick={clearImage} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--senjr-text-muted)' }}><Trash2 size={16} /></button>
            </div>
          )}
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageSelect} />
            <button style={{
              width: 44, height: 44, borderRadius: 12,
              background: 'var(--senjr-bg)', color: 'var(--senjr-text-muted)',
              border: '1.5px solid var(--senjr-border)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
            }} onClick={() => fileInputRef.current?.click()} title="Attach image">
              <ImageIcon size={18} />
            </button>
            <input style={{
              flex: 1, padding: '12px 16px', borderRadius: 24,
              border: `1.5px solid ${currentTutor.color}40`,
              fontSize: 15, outline: 'none',
              background: `${currentTutor.color}04`,
              color: 'var(--senjr-text)',
            }}
              placeholder={`Ask ${currentTutor.name} something...`}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()} />
            <button style={{
              width: 44, height: 44, borderRadius: 12,
              background: currentTutor.gradient,
              color: 'white', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 2px 8px ${currentTutor.color}40`,
            }} onClick={handleSend}>
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
