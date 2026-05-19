import {
  Award,
  BookOpenCheck,
  Bot,
  BriefcaseBusiness,
  Camera,
  CameraOff,
  CheckCircle2,
  ClipboardCheck,
  FileQuestion,
  GraduationCap,
  Hand,
  Languages,
  Lightbulb,
  LogOut,
  Mic,
  MicOff,
  MonitorUp,
  Play,
  Radio,
  RefreshCcw,
  ShieldCheck,
  Sparkles,
  User,
  Users,
  Video,
} from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import { useAuth, useAuthActions } from './hooks/useAuth'

type Workspace = 'student' | 'mentor' | 'exam' | 'live' | 'ops'

type StudentForm = {
  name: string
  course: string
  target: string
  language: string
  confidence: string
  hours: string
}

type MentorForm = {
  name: string
  subject: string
  credential: string
  proof: string
  demo: string
}

type Participant = {
  id: number
  name: string
  role: string
  mic: boolean
  camera: boolean
  raised: boolean
}

const workspaces: Array<{ id: Workspace; label: string; icon: typeof GraduationCap }> = [
  { id: 'student', label: 'Student path', icon: GraduationCap },
  { id: 'mentor', label: 'Mentor quality', icon: ShieldCheck },
  { id: 'exam', label: 'Exam lab', icon: FileQuestion },
  { id: 'live', label: 'Live room', icon: Video },
  { id: 'ops', label: 'Zero budget ops', icon: Bot },
]

const launchMetrics = [
  { label: 'Day-14 target', value: '100', sub: 'student waitlist' },
  { label: 'Budget rule', value: '0', sub: 'paid tools for 60 days' },
  { label: 'First wedge', value: 'BBA', sub: 'AI internship starter' },
  { label: 'Exam demo', value: 'UP', sub: 'Constable mock paper' },
]

const agentTeam = [
  ['Research', 'Interview students, find Aligarh/UP leads, map competitor gaps.'],
  ['Curriculum', 'Convert college courses into short AI-assisted modules.'],
  ['Exam intelligence', 'Analyze syllabus and PYQ trend, generate fresh mocks.'],
  ['Mentor verification', 'Check proof, demo class, sample lesson, and quality score.'],
  ['Growth', 'Run free campus cohorts, LinkedIn outreach, WhatsApp community.'],
  ['Live classroom', 'Own LiveKit room, transcript, privacy and moderation rules.'],
]

const starterQuestions = [
  {
    topic: 'Hindi',
    question: 'Nimnalikhit mein se kaun sa shabd tatsam hai?',
    options: ['Aankh', 'Agni', 'Khet', 'Roti'],
    answer: 'Agni',
  },
  {
    topic: 'Reasoning',
    question: 'Series complete karein: 3, 9, 27, 81, ?',
    options: ['108', '162', '243', '324'],
    answer: '243',
  },
  {
    topic: 'GK',
    question: 'UP Police Recruitment & Promotion Board ka headquarters kis city mein hai?',
    options: ['Agra', 'Lucknow', 'Kanpur', 'Meerut'],
    answer: 'Lucknow',
  },
]

function AuthScreen({ onLogin }: { onLogin: () => void }) {
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [role, setRole] = useState<'student' | 'mentor'>('student')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const { signupWithEmail, loginWithEmail, loginWithGoogle, loading } = useAuthActions()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    let result
    if (mode === 'signup') {
      result = await signupWithEmail(email, password, name, role)
    } else {
      result = await loginWithEmail(email, password)
    }

    if (result.success) {
      onLogin()
    } else {
      setError(result.error || 'Authentication failed')
    }
  }

  const handleGoogle = async () => {
    const result = await loginWithGoogle()
    if (result.success) {
      onLogin()
    } else {
      setError(result.error || 'Google login failed')
    }
  }

  return (
    <div className="auth-screen">
      <div className="auth-card">
        <div className="auth-header">
          <span className="brand-mark">S</span>
          <h1>{mode === 'login' ? 'Welcome back' : 'Join Senjr'}</h1>
          <p>{mode === 'login' ? 'Sign in to continue' : 'Create your account'}</p>
        </div>

        <form onSubmit={handleSubmit}>
          {mode === 'signup' && (
            <>
              <div className="role-toggle">
                <button type="button" className={role === 'student' ? 'active' : ''} onClick={() => setRole('student')}>
                  <GraduationCap size={16} /> Student
                </button>
                <button type="button" className={role === 'mentor' ? 'active' : ''} onClick={() => setRole('mentor')}>
                  <ShieldCheck size={16} /> Mentor
                </button>
              </div>
              <label>
                Full name
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
              </label>
            </>
          )}
          <label>
            Email
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
          <label>
            Password
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
          </label>

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="primary wide" disabled={loading}>
            {loading ? 'Please wait...' : mode === 'login' ? 'Sign in' : 'Create account'}
          </button>
        </form>

        <div className="auth-divider">
          <span>or</span>
        </div>

        <button type="button" className="google-btn" onClick={handleGoogle} disabled={loading}>
          Continue with Google
        </button>

        <p className="auth-switch">
          {mode === 'login' ? (
            <>Don't have an account? <button type="button" onClick={() => setMode('signup')}>Sign up</button></>
          ) : (
            <>Already have an account? <button type="button" onClick={() => setMode('login')}>Sign in</button></>
          )}
        </p>
      </div>
    </div>
  )
}

function App() {
  const { user, loading, configured, signOut } = useAuth()
  const { getUserRole, getUserName } = useAuthActions()
  const [workspace, setWorkspace] = useState<Workspace>('student')
  const [student, setStudent] = useState<StudentForm>({
    name: 'Aman',
    course: 'BBA 2nd year',
    target: 'AI internship in 45 days',
    language: 'Hinglish',
    confidence: 'Beginner',
    hours: '6',
  })
  const [mentor, setMentor] = useState<MentorForm>({
    name: 'Riya Sharma',
    subject: 'Business analytics',
    credential: 'MBA + 2 years training experience',
    proof: 'LinkedIn, certificate PDF, demo video',
    demo: 'AI for BBA project research',
  })
  const [paperSeed, setPaperSeed] = useState(1)
  const [micOn, setMicOn] = useState(false)
  const [cameraOn, setCameraOn] = useState(false)
  const [screenOn, setScreenOn] = useState(false)
  const [transcriptOn, setTranscriptOn] = useState(true)
  const [roomStatus, setRoomStatus] = useState('Ready for local preview')
  const [participants, setParticipants] = useState<Participant[]>([
    { id: 1, name: 'Mentor Riya', role: 'Mentor', mic: true, camera: true, raised: false },
    { id: 2, name: 'Aman', role: 'BBA student', mic: true, camera: false, raised: true },
    { id: 3, name: 'Sana', role: 'UP exam', mic: false, camera: false, raised: false },
    { id: 4, name: 'Vivek', role: 'AI beginner', mic: true, camera: true, raised: false },
  ])
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const mediaStreamRef = useRef<MediaStream | null>(null)
  const screenStreamRef = useRef<MediaStream | null>(null)

  const plan = useMemo(() => {
    const hours = Number.parseInt(student.hours, 10) || 4
    const daily = Math.max(25, Math.round((hours * 60) / 6))
    return [
      `${daily} min daily: short concept video, AI tutor practice, one reflection note.`,
      `Week 1: ${student.course} foundations plus AI tools for assignments and internships.`,
      `Week 2: portfolio task, mock interview, and certificate test at 60% pass mark.`,
    ]
  }, [student])

  const verificationScore = useMemo(() => {
    const fields = Object.values(mentor).filter((value) => value.trim().length > 6).length
    return Math.round((fields / Object.keys(mentor).length) * 100)
  }, [mentor])

  const generatedPaper = useMemo(() => {
    const shift = paperSeed % starterQuestions.length
    return [...starterQuestions.slice(shift), ...starterQuestions.slice(0, shift)]
  }, [paperSeed])

  useEffect(() => {
    return () => {
      mediaStreamRef.current?.getTracks().forEach((track) => track.stop())
      screenStreamRef.current?.getTracks().forEach((track) => track.stop())
    }
  }, [])

  async function toggleCamera() {
    if (cameraOn) {
      mediaStreamRef.current?.getVideoTracks().forEach((track) => track.stop())
      setCameraOn(false)
      setRoomStatus('Camera off')
      return
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: micOn })
      mediaStreamRef.current = stream
      if (videoRef.current) videoRef.current.srcObject = stream
      setCameraOn(true)
      setRoomStatus('Camera preview active')
    } catch {
      setRoomStatus('Camera permission needed')
    }
  }

  async function toggleMic() {
    if (micOn) {
      mediaStreamRef.current?.getAudioTracks().forEach((track) => track.stop())
      setMicOn(false)
      setRoomStatus('Mic muted')
      return
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: cameraOn })
      mediaStreamRef.current = stream
      if (videoRef.current && cameraOn) videoRef.current.srcObject = stream
      setMicOn(true)
      setRoomStatus('Mic live')
    } catch {
      setRoomStatus('Microphone permission needed')
    }
  }

  async function toggleScreenShare() {
    if (screenOn) {
      screenStreamRef.current?.getTracks().forEach((track) => track.stop())
      setScreenOn(false)
      setRoomStatus('Screen share stopped')
      return
    }

    try {
      const displayMedia = navigator.mediaDevices.getDisplayMedia
      if (!displayMedia) {
        setRoomStatus('Screen share is not available in this browser')
        return
      }
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true })
      screenStreamRef.current = stream
      setScreenOn(true)
      setRoomStatus('Screen share active')
    } catch {
      setRoomStatus('Screen share cancelled')
    }
  }

  function mentorMuteAll() {
    setParticipants((current) => current.map((participant) => ({ ...participant, mic: false })))
    setRoomStatus('Mentor muted all student microphones')
  }

  function mentorCameraOffAll() {
    setParticipants((current) => current.map((participant) => ({ ...participant, camera: participant.role === 'Mentor' ? participant.camera : false })))
    setRoomStatus('Mentor turned student cameras off')
  }

  if (loading) {
    return <div className="loading-screen">Loading...</div>
  }

  if (!configured) {
    return (
      <div className="config-needed">
        <h2>Firebase Setup Required</h2>
        <p>Copy .env.example to .env and add your Firebase configuration.</p>
        <code>cp .env.example .env</code>
      </div>
    )
  }

  if (!user) {
    return <AuthScreen onLogin={() => {}} />
  }

  const userRole = getUserRole()
  const userName = getUserName()

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Senjr home">
          <span className="brand-mark">S</span>
          <span>
            <strong>Senjr</strong>
            <small>AI learning company</small>
          </span>
        </a>
        {user && (
          <div className="user-menu">
            <span className="user-info">
              <User size={16} />
              {userName || user.email}
              {userRole && <span className="role-badge">{userRole}</span>}
            </span>
            <button type="button" onClick={signOut} title="Sign out">
              <LogOut size={16} />
            </button>
          </div>
        )}
        <nav className="topnav" aria-label="Primary">
          <a href="#product">Product</a>
          <a href="#live">Live</a>
          <a href="#launch">Launch</a>
        </nav>
        <button className="nav-action" type="button" onClick={() => setWorkspace('live')}>
          <Radio size={18} />
          Live demo
        </button>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">
            <Sparkles size={16} />
            Built for AI-scared students, practical mentors, and exam aspirants
          </p>
          <h1>Turn outdated courses into personal AI tutors, live practice, and job-ready proof.</h1>
          <p className="hero-lede">
            Senjr starts with BBA and UP exam learners: short Hinglish lessons, verified mentors, fresh mock papers, and a strict zero-budget operating model for the first 60 days.
          </p>
          <div className="hero-actions">
            <button className="primary" type="button" onClick={() => setWorkspace('student')}>
              <Play size={18} />
              Build student path
            </button>
            <button className="secondary" type="button" onClick={() => setWorkspace('exam')}>
              <FileQuestion size={18} />
              Generate mock
            </button>
          </div>
        </div>

        <div className="hero-visual" aria-label="Senjr product preview">
          <div className="visual-toolbar">
            <span>Senjr cockpit</span>
            <span className="live-dot">LiveKit-ready</span>
          </div>
          <div className="visual-grid">
            <div className="preview-panel tutor-preview">
              <span className="panel-label">AI tutor</span>
              <strong>Hinglish explain + practice</strong>
              <p>Micro lesson: market research for BBA project</p>
              <div className="progress-track"><span style={{ width: '72%' }} /></div>
            </div>
            <div className="preview-panel call-preview">
              <span className="panel-label">Live room</span>
              <div className="mini-video-row">
                <span />
                <span />
                <span />
              </div>
              <p>Mentor can mute all, students control consent.</p>
            </div>
            <div className="preview-panel paper-preview">
              <span className="panel-label">Exam paper</span>
              <strong>150Q trend map</strong>
              <p>Hindi, GK, Reasoning, Quant</p>
            </div>
          </div>
        </div>
      </section>

      <section className="metric-strip" aria-label="Launch metrics">
        {launchMetrics.map((metric) => (
          <div className="metric" key={metric.label}>
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
            <small>{metric.sub}</small>
          </div>
        ))}
      </section>

      <section className="workspace-section" id="product">
        <div className="section-heading">
          <p className="eyebrow">
            <Lightbulb size={16} />
            First version
          </p>
          <h2>One cockpit for learning, mentors, exams, and launch ops.</h2>
        </div>

        <div className="workspace-tabs" role="tablist" aria-label="Senjr workspace">
          {workspaces.map((item) => {
            const Icon = item.icon
            return (
              <button
                className={workspace === item.id ? 'tab active' : 'tab'}
                key={item.id}
                type="button"
                onClick={() => setWorkspace(item.id)}
              >
                <Icon size={18} />
                {item.label}
              </button>
            )
          })}
        </div>

        {workspace === 'student' && (
          <div className="feature-layout">
            <div className="form-panel">
              <h3>Student intake</h3>
              <Field label="Name" value={student.name} onChange={(value) => setStudent({ ...student, name: value })} />
              <Field label="Course or exam" value={student.course} onChange={(value) => setStudent({ ...student, course: value })} />
              <Field label="Target" value={student.target} onChange={(value) => setStudent({ ...student, target: value })} />
              <div className="two-col">
                <Field label="Language" value={student.language} onChange={(value) => setStudent({ ...student, language: value })} />
                <Field label="Weekly hours" value={student.hours} onChange={(value) => setStudent({ ...student, hours: value })} />
              </div>
              <label>
                AI comfort
                <select value={student.confidence} onChange={(event) => setStudent({ ...student, confidence: event.target.value })}>
                  <option>Beginner</option>
                  <option>Can use ChatGPT</option>
                  <option>Ready for projects</option>
                </select>
              </label>
            </div>

            <div className="result-panel">
              <div className="result-header">
                <GraduationCap size={28} />
                <div>
                  <h3>{student.name}'s path</h3>
                  <p>{student.course} → {student.target}</p>
                </div>
              </div>
              <ol className="clean-list">
                {plan.map((item) => <li key={item}>{item}</li>)}
              </ol>
              <div className="certificate-band">
                <Award size={22} />
                Certificate unlocks after test score: 60%+
              </div>
            </div>
          </div>
        )}

        {workspace === 'mentor' && (
          <div className="feature-layout">
            <div className="form-panel">
              <h3>Mentor application</h3>
              <Field label="Name" value={mentor.name} onChange={(value) => setMentor({ ...mentor, name: value })} />
              <Field label="Subject" value={mentor.subject} onChange={(value) => setMentor({ ...mentor, subject: value })} />
              <Field label="Qualification / experience" value={mentor.credential} onChange={(value) => setMentor({ ...mentor, credential: value })} />
              <Field label="Proof links" value={mentor.proof} onChange={(value) => setMentor({ ...mentor, proof: value })} />
              <Field label="Demo class topic" value={mentor.demo} onChange={(value) => setMentor({ ...mentor, demo: value })} />
            </div>

            <div className="result-panel">
              <div className="result-header">
                <ShieldCheck size={28} />
                <div>
                  <h3>Quality gate</h3>
                  <p>Mentor score: {verificationScore}%</p>
                </div>
              </div>
              <div className="checklist">
                {['Identity proof', 'Certificate or work proof', 'Demo class', 'Sample lesson plan', 'Student safety rules'].map((item, index) => (
                  <span className={verificationScore > index * 18 ? 'checked' : ''} key={item}>
                    <CheckCircle2 size={18} />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {workspace === 'exam' && (
          <div className="feature-layout">
            <div className="form-panel">
              <h3>Mock paper generator</h3>
              <label>
                Exam
                <select>
                  <option>UP Police Constable</option>
                  <option>UP Home Guard</option>
                  <option>BBA semester practice</option>
                </select>
              </label>
              <label>
                Source pack
                <select>
                  <option>Syllabus + PYQ trend</option>
                  <option>Weak-topic revision</option>
                  <option>Speed test</option>
                </select>
              </label>
              <div className="weight-grid">
                {['Hindi', 'GK', 'Reasoning', 'Quant'].map((topic, index) => (
                  <span key={topic}>
                    {topic}
                    <strong>{[30, 28, 26, 16][index]}%</strong>
                  </span>
                ))}
              </div>
              <button className="primary wide" type="button" onClick={() => setPaperSeed((seed) => seed + 1)}>
                <RefreshCcw size={18} />
                Generate fresh paper
              </button>
            </div>

            <div className="result-panel">
              <div className="result-header">
                <ClipboardCheck size={28} />
                <div>
                  <h3>Trend-matched sample</h3>
                  <p>Fresh questions with answer key and topics</p>
                </div>
              </div>
              <div className="question-stack">
                {generatedPaper.map((item, index) => (
                  <article key={item.question}>
                    <span>{index + 1}. {item.topic}</span>
                    <strong>{item.question}</strong>
                    <p>{item.options.join('  |  ')}</p>
                    <small>Answer: {item.answer}</small>
                  </article>
                ))}
              </div>
            </div>
          </div>
        )}

        {workspace === 'live' && (
          <LiveRoom
            cameraOn={cameraOn}
            micOn={micOn}
            screenOn={screenOn}
            transcriptOn={transcriptOn}
            roomStatus={roomStatus}
            participants={participants}
            videoRef={videoRef}
            onCamera={toggleCamera}
            onMic={toggleMic}
            onScreen={toggleScreenShare}
            onTranscript={() => setTranscriptOn((value) => !value)}
            onMuteAll={mentorMuteAll}
            onCameraOffAll={mentorCameraOffAll}
            onRequestSpeak={() => setParticipants((current) => current.map((participant) => participant.id === 3 ? { ...participant, raised: true } : participant))}
          />
        )}

        {workspace === 'ops' && (
          <div className="ops-grid" id="launch">
            <div className="ops-panel">
              <h3>60-day zero-budget stack</h3>
              <ul className="plain-list">
                <li><Bot size={18} /> OpenCode free model: minimax-m2.5-free</li>
                <li><BookOpenCheck size={18} /> Local LM Studio/Gemma as backup</li>
                <li><Video size={18} /> Self-host LiveKit path for live rooms</li>
                <li><Users size={18} /> Manual outreach before paid ads</li>
              </ul>
            </div>
            <div className="ops-panel">
              <h3>Agent team for CEO</h3>
              <div className="agent-list">
                {agentTeam.map(([name, detail]) => (
                  <div key={name}>
                    <strong>{name}</strong>
                    <p>{detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      <section className="live-section" id="live">
        <div>
          <p className="eyebrow">
            <Languages size={16} />
            Positioning
          </p>
          <h2>Start free, earn trust, then sell outcomes.</h2>
          <p>
            First launch should avoid heavy paid tech. Validate demand with a waitlist, one BBA cohort, one government-exam demo, and verified mentor sessions. The paid layer comes only after students are returning.
          </p>
        </div>
        <div className="revenue-path">
          <span><GraduationCap size={18} /> Free AI starter</span>
          <span><Users size={18} /> Mentor sessions</span>
          <span><FileQuestion size={18} /> Exam packs</span>
          <span><BriefcaseBusiness size={18} /> Local business automations</span>
        </div>
      </section>
    </main>
  )
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label>
      {label}
      <input value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  )
}

function LiveRoom({
  cameraOn,
  micOn,
  screenOn,
  transcriptOn,
  roomStatus,
  participants,
  videoRef,
  onCamera,
  onMic,
  onScreen,
  onTranscript,
  onMuteAll,
  onCameraOffAll,
  onRequestSpeak,
}: {
  cameraOn: boolean
  micOn: boolean
  screenOn: boolean
  transcriptOn: boolean
  roomStatus: string
  participants: Participant[]
  videoRef: React.RefObject<HTMLVideoElement | null>
  onCamera: () => void
  onMic: () => void
  onScreen: () => void
  onTranscript: () => void
  onMuteAll: () => void
  onCameraOffAll: () => void
  onRequestSpeak: () => void
}) {
  return (
    <div className="live-room">
      <div className="room-stage">
        <div className="video-frame">
          {cameraOn ? (
            <video ref={videoRef} autoPlay muted playsInline />
          ) : (
            <div className="video-placeholder">
              <CameraOff size={40} />
              <span>Camera preview off</span>
            </div>
          )}
          <span className="room-status">{roomStatus}</span>
        </div>

        <div className="control-row" aria-label="Class controls">
          <IconButton active={micOn} label={micOn ? 'Mic on' : 'Mic off'} onClick={onMic}>
            {micOn ? <Mic size={20} /> : <MicOff size={20} />}
          </IconButton>
          <IconButton active={cameraOn} label={cameraOn ? 'Camera on' : 'Camera off'} onClick={onCamera}>
            {cameraOn ? <Camera size={20} /> : <CameraOff size={20} />}
          </IconButton>
          <IconButton active={screenOn} label={screenOn ? 'Screen sharing' : 'Share screen'} onClick={onScreen}>
            <MonitorUp size={20} />
          </IconButton>
          <IconButton active={transcriptOn} label={transcriptOn ? 'Transcript on' : 'Transcript off'} onClick={onTranscript}>
            <BookOpenCheck size={20} />
          </IconButton>
          <IconButton active={false} label="Raise hand" onClick={onRequestSpeak}>
            <Hand size={20} />
          </IconButton>
        </div>

        <div className="mentor-controls">
          <button type="button" onClick={onMuteAll}>
            <MicOff size={18} />
            Mute all
          </button>
          <button type="button" onClick={onCameraOffAll}>
            <CameraOff size={18} />
            Cameras off
          </button>
        </div>
      </div>

      <div className="participant-panel">
        <h3>Class roster</h3>
        {participants.map((participant) => (
          <div className="participant" key={participant.id}>
            <span className="avatar">{participant.name.slice(0, 1)}</span>
            <div>
              <strong>{participant.name}</strong>
              <small>{participant.role}</small>
            </div>
            <span className={participant.mic ? 'state-chip on' : 'state-chip'}>{participant.mic ? 'mic' : 'muted'}</span>
            <span className={participant.camera ? 'state-chip on' : 'state-chip'}>{participant.camera ? 'cam' : 'off'}</span>
            {participant.raised && <span className="hand-chip">hand</span>}
          </div>
        ))}

        <div className="transcript-box">
          <strong>Transcript</strong>
          {transcriptOn ? (
            <p>Mentor: Aaj hum AI ko shortcut nahi, skill amplifier ki tarah use karenge. Student: Isse internship ka proof kaise banega?</p>
          ) : (
            <p>Transcript paused.</p>
          )}
        </div>
      </div>
    </div>
  )
}

function IconButton({ active, label, onClick, children }: { active: boolean; label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button className={active ? 'icon-button active' : 'icon-button'} type="button" onClick={onClick} aria-label={label} title={label}>
      {children}
      <span>{label}</span>
    </button>
  )
}

export default App
