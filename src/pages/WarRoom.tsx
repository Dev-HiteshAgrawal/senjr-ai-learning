import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Clock, Trophy, Target, Sparkles, Zap, Brain, ChevronRight, BookOpen, Shield, BarChart3 } from 'lucide-react'

const examTypes = [
  { id: 'jee', label: 'JEE', icon: <Zap size={20} />, color: 'var(--senjr-orange)', bg: 'var(--senjr-orange-light)', desc: 'Joint Entrance Exam' },
  { id: 'neet', label: 'NEET', icon: <Brain size={20} />, color: 'var(--senjr-green)', bg: 'var(--senjr-green-light)', desc: 'Medical Entrance' },
  { id: 'gate', label: 'GATE', icon: <BarChart3 size={20} />, color: '#3B82F6', bg: '#EFF6FF', desc: 'Graduate Aptitude Test' },
  { id: 'upsc', label: 'UPSC', icon: <BookOpen size={20} />, color: '#8B5CF6', bg: '#F5F3FF', desc: 'Civil Services Exam' },
  { id: 'cat', label: 'CAT', icon: <Target size={20} />, color: '#EC4899', bg: '#FDF2F8', desc: 'Management Aptitude' },
  { id: 'other', label: 'Other', icon: <Sparkles size={20} />, color: '#6366F1', bg: '#EEF2FF', desc: 'Custom Prep' },
]

const exams = [
  { id: 1, name: 'JEE Advanced 2025', type: 'jee', questions: 75, duration: '3 hrs', date: 'May 25, 2025', status: 'Upcoming' },
  { id: 2, name: 'NEET UG 2025', type: 'neet', questions: 200, duration: '3 hrs 20 min', date: 'May 28, 2025', status: 'Upcoming' },
  { id: 3, name: 'Weekly Mocks - JEE', type: 'jee', questions: 45, duration: '1 hr', date: 'Completed', status: 'Completed', score: 82 },
  { id: 4, name: 'Topic Test: Organic Chem', type: 'neet', questions: 30, duration: '40 min', date: 'Last week', status: 'Completed', score: 74 },
]

const weakTopics = ['Electrochemistry', 'Calculus - Integration', 'Organic Reactions', 'Thermodynamics', 'Modern Physics']

export default function WarRoom() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'exams' | 'practice' | 'analytics'>('exams')

  return (
    <div className="senjr-app">
      <header className="senjr-header">
        <button className="senjr-header-back" onClick={() => navigate(-1)}><ArrowLeft size={18} /></button>
        <span className="senjr-header-title">Exam Center</span>
        <div />
      </header>

      <div className="senjr-page">
        <div className="senjr-content">
          <div className="senjr-card" style={{ background: 'linear-gradient(135deg, #064E3B 0%, #065F46 100%)', border: 'none', color: 'white', marginBottom: 20 }}>
            <div className="senjr-stats-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
              <div className="senjr-stat-card" style={{ background: 'rgba(255,255,255,0.1)', textAlign: 'center', padding: 12 }}>
                <Clock size={18} style={{ margin: '0 auto 4px', opacity: 0.8 }} />
                <p className="senjr-stat-value" style={{ fontSize: 18, color: 'white' }}>42<span style={{ fontSize: 12 }}> hrs</span></p>
                <p className="senjr-stat-label" style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>Study Time</p>
              </div>
              <div className="senjr-stat-card" style={{ background: 'rgba(255,255,255,0.1)', textAlign: 'center', padding: 12 }}>
                <Brain size={18} style={{ margin: '0 auto 4px', opacity: 0.8 }} />
                <p className="senjr-stat-value" style={{ fontSize: 18, color: 'white' }}>156</p>
                <p className="senjr-stat-label" style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>Tests</p>
              </div>
              <div className="senjr-stat-card" style={{ background: 'rgba(255,255,255,0.1)', textAlign: 'center', padding: 12 }}>
                <Trophy size={18} style={{ margin: '0 auto 4px', opacity: 0.8 }} />
                <p className="senjr-stat-value" style={{ fontSize: 18, color: 'white' }}>78%</p>
                <p className="senjr-stat-label" style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>Avg Score</p>
              </div>
            </div>
          </div>

          <div className="senjr-tabs" style={{ marginBottom: 20 }}>
            {(['exams', 'practice', 'analytics'] as const).map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`senjr-tab ${activeTab === tab ? 'senjr-tab-active' : ''}`}>
                {tab === 'exams' ? 'Exams' : tab === 'practice' ? 'Practice' : 'Analytics'}
              </button>
            ))}
          </div>

          {activeTab === 'exams' && (
            <>
              <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--senjr-text-muted)', marginBottom: 8, textTransform: 'uppercase' }}>Select Exam Type</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 24 }}>
                {examTypes.map((exam) => (
                  <button key={exam.id} style={{ padding: 14, borderRadius: 12, background: exam.bg, border: 'none', cursor: 'pointer', textAlign: 'center' }}>
                    <div style={{ color: exam.color, marginBottom: 4 }}>{exam.icon}</div>
                    <p style={{ fontSize: 13, fontWeight: 600 }}>{exam.label}</p>
                    <p style={{ fontSize: 10, color: 'var(--senjr-text-muted)' }}>{exam.desc}</p>
                  </button>
                ))}
              </div>

              <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--senjr-text-muted)', marginBottom: 8, textTransform: 'uppercase' }}>Upcoming & Past Exams</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {exams.map((exam) => (
                  <div key={exam.id} className="senjr-card" style={{ display: 'flex', alignItems: 'center', gap: 12, border: exam.score ? '1px solid var(--senjr-green-light)' : undefined }}>
                    <div style={{ width: 44, height: 44, borderRadius: 10, background: examTypes.find(e => e.id === exam.type)?.bg || '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: examTypes.find(e => e.id === exam.type)?.color || '#6B7280' }}>
                      {examTypes.find(e => e.id === exam.type)?.icon || <BookOpen size={18} />}
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 14, fontWeight: 600 }}>{exam.name}</p>
                      <div style={{ display: 'flex', gap: 12, fontSize: 11, color: 'var(--senjr-text-muted)' }}>
                        <span>{exam.questions} Q</span>
                        <span>{exam.duration}</span>
                        <span>{exam.date}</span>
                      </div>
                    </div>
                    {exam.score ? (
                      <div style={{ textAlign: 'center' }}>
                        <p style={{ fontSize: 20, fontWeight: 800, color: exam.score >= 80 ? 'var(--senjr-green)' : 'var(--senjr-orange)' }}>{exam.score}%</p>
                        <p style={{ fontSize: 10, color: 'var(--senjr-text-muted)' }}>Score</p>
                      </div>
                    ) : (
                      <button className="senjr-btn" style={{ background: 'var(--senjr-green)', color: 'white', width: 'auto', padding: '8px 14px', fontSize: 12 }}>Start</button>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === 'practice' && (
            <>
              <div className="senjr-card" style={{ background: 'linear-gradient(135deg, #ECFDF5, #FFF7ED)', border: 'none', marginBottom: 20, textAlign: 'center', padding: 24 }}>
                <Shield size={32} style={{ color: 'var(--senjr-green)', marginBottom: 8, margin: '0 auto 8px' }} />
                <p style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>AI Practice Session</p>
                <p style={{ fontSize: 13, color: 'var(--senjr-text-muted)', marginBottom: 12 }}>Practice any topic with AI-generated questions</p>
                <button className="senjr-btn" style={{ background: 'var(--senjr-green)', color: 'white', margin: '0 auto', fontSize: 13 }}><Sparkles size={14} /> Start Practice</button>
              </div>

              <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--senjr-text-muted)', marginBottom: 8, textTransform: 'uppercase' }}>Focus Areas</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
                {weakTopics.map((topic) => (
                  <div key={topic} className="senjr-card" style={{ display: 'flex', alignItems: 'center', gap: 8, border: '1px solid var(--senjr-border)', padding: 10 }}>
                    <Target size={14} style={{ color: 'var(--senjr-orange)', flexShrink: 0 }} />
                    <span style={{ fontSize: 13, flex: 1 }}>{topic}</span>
                    <span className="senjr-badge" style={{ background: '#FEF3C7', color: '#D97706' }}>Weak</span>
                  </div>
                ))}
              </div>

              <button className="senjr-btn" style={{ background: 'var(--senjr-orange)', color: 'white' }}>Generate Custom Quiz <Sparkles size={16} /></button>
            </>
          )}

          {activeTab === 'analytics' && (
            <>
              <div className="senjr-card" style={{ marginBottom: 16 }}>
                <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Performance Overview</p>
                <div style={{ display: 'flex', gap: 12 }}>
                  {[{ label: 'Accuracy', value: '78%', color: 'var(--senjr-green)' }, { label: 'Avg Time', value: '32s', color: 'var(--senjr-orange)' }, { label: 'Streak', value: '7d', color: '#3B82F6' }].map((stat) => (
                    <div key={stat.label} style={{ flex: 1, padding: 12, background: 'var(--senjr-bg)', borderRadius: 8, textAlign: 'center' }}>
                      <p style={{ fontSize: 22, fontWeight: 800, color: stat.color }}>{stat.value}</p>
                      <p style={{ fontSize: 11, color: 'var(--senjr-text-muted)' }}>{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="senjr-card" style={{ marginBottom: 16 }}>
                <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Subject-wise Performance</p>
                {[{ subject: 'Physics', score: 72 }, { subject: 'Chemistry', score: 85 }, { subject: 'Mathematics', score: 68 }].map((sub) => (
                  <div key={sub.subject} style={{ marginBottom: 10 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontSize: 13 }}>{sub.subject}</span>
                      <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--senjr-green)' }}>{sub.score}%</span>
                    </div>
                    <div className="senjr-progress-bar">
                      <div className="senjr-progress-fill" style={{ width: `${sub.score}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              <button className="senjr-btn" style={{ background: 'transparent', border: '1.5px solid var(--senjr-border)', color: 'var(--senjr-text)' }}>View Detailed Report <ChevronRight size={16} /></button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
