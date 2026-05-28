import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Clock, Trophy, Target, Sparkles, Zap, Brain, ChevronRight, BookOpen, Shield, BarChart3, Flame, Swords, Crosshair, AlertTriangle } from 'lucide-react'

const examTypes = [
  { id: 'jee', label: 'JEE', icon: <Zap size={20} />, color: 'var(--senjr-orange)', bg: '#1E293B', desc: 'Joint Entrance Exam' },
  { id: 'neet', label: 'NEET', icon: <Brain size={20} />, color: 'var(--senjr-green)', bg: '#064E3B', desc: 'Medical Entrance' },
  { id: 'gate', label: 'GATE', icon: <BarChart3 size={20} />, color: '#3B82F6', bg: '#1E3A5F', desc: 'Graduate Aptitude Test' },
  { id: 'upsc', label: 'UPSC', icon: <BookOpen size={20} />, color: '#8B5CF6', bg: '#2E1065', desc: 'Civil Services Exam' },
  { id: 'cat', label: 'CAT', icon: <Target size={20} />, color: '#EC4899', bg: '#4C1D95', desc: 'Management Aptitude' },
  { id: 'other', label: 'Other', icon: <Sparkles size={20} />, color: '#6366F1', bg: '#1E1B4B', desc: 'Custom Prep' },
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
    <div className="senjr-app" style={{ background: '#0A0F1E' }}>
      <header style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '12px 16px', background: 'rgba(10,15,30,0.95)',
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid #1E293B', position: 'sticky', top: 0, zIndex: 100,
      }}>
        <button onClick={() => navigate(-1)} style={{
          width: 36, height: 36, borderRadius: 10,
          border: '1.5px solid #1E293B', background: '#131A2E',
          color: '#94A3B8', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        }}>
          <ArrowLeft size={18} />
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Swords size={18} style={{ color: 'var(--senjr-orange)' }} />
          <span style={{ color: 'white', fontSize: 17, fontWeight: 700, letterSpacing: '-0.3px' }}>War Room</span>
          <span style={{ padding: '3px 10px', borderRadius: 4, background: '#DC2626', color: 'white', fontSize: 10, fontWeight: 700, letterSpacing: '0.5px', animation: 'pulse 2s infinite' }}>LIVE</span>
        </div>
        <div style={{ width: 36 }} />
      </header>

      <div className="senjr-page" style={{ padding: 0, background: '#0A0F1E' }}>
        <div className="senjr-content" style={{ padding: '16px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
            border: '1px solid #334155', borderRadius: 14, padding: 20,
            marginBottom: 20, position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, var(--senjr-orange), var(--senjr-green), #3B82F6)' }} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
              <div style={{ textAlign: 'center', padding: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 6 }}>
                  <Clock size={14} style={{ color: '#F97316' }} />
                  <span style={{ color: '#F97316', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Study</span>
                </div>
                <p style={{ fontSize: 24, fontWeight: 800, color: 'white' }}>42<span style={{ fontSize: 13, fontWeight: 500, color: '#64748B' }}>h</span></p>
              </div>
              <div style={{ textAlign: 'center', padding: 10, borderLeft: '1px solid #1E293B', borderRight: '1px solid #1E293B' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 6 }}>
                  <Crosshair size={14} style={{ color: '#10B981' }} />
                  <span style={{ color: '#10B981', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Tests</span>
                </div>
                <p style={{ fontSize: 24, fontWeight: 800, color: 'white' }}>156</p>
              </div>
              <div style={{ textAlign: 'center', padding: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 6 }}>
                  <Trophy size={14} style={{ color: '#F59E0B' }} />
                  <span style={{ color: '#F59E0B', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Accuracy</span>
                </div>
                <p style={{ fontSize: 24, fontWeight: 800, color: 'white' }}>78<span style={{ fontSize: 13, fontWeight: 500, color: '#64748B' }}>%</span></p>
              </div>
            </div>
          </div>

          <div style={{
            display: 'flex', gap: 4, padding: 4,
            background: '#131A2E', borderRadius: 10,
            border: '1px solid #1E293B', marginBottom: 20,
          }}>
            {(['exams', 'practice', 'analytics'] as const).map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)} style={{
                flex: 1, padding: '10px 16px', borderRadius: 8,
                fontSize: 13, fontWeight: 600,
                background: activeTab === tab ? 'linear-gradient(135deg, var(--senjr-orange), #EA580C)' : 'transparent',
                color: activeTab === tab ? 'white' : '#64748B',
                border: 'none', cursor: 'pointer', transition: 'all 0.15s',
              }}>
                {tab === 'exams' ? 'Exams' : tab === 'practice' ? 'Practice' : 'Analytics'}
              </button>
            ))}
          </div>

          {activeTab === 'exams' && (
            <>
              <p style={{ fontSize: 11, fontWeight: 700, color: '#64748B', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.8px' }}>Select Battle</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 24 }}>
                {examTypes.map((exam) => (
                  <button key={exam.id} style={{
                    padding: 16, marginBottom: 0, cursor: 'pointer', textAlign: 'center',
                    background: exam.bg, border: '1px solid #334155', borderRadius: 12,
                    transition: 'all 0.15s',
                  }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: 10,
                      background: `${exam.color}20`, border: `1px solid ${exam.color}40`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      margin: '0 auto 8px', color: exam.color,
                    }}>{exam.icon}</div>
                    <p style={{ fontSize: 13, fontWeight: 600, color: 'white' }}>{exam.label}</p>
                    <p style={{ fontSize: 10, color: '#64748B', lineHeight: 1.3 }}>{exam.desc}</p>
                  </button>
                ))}
              </div>

              <p style={{ fontSize: 11, fontWeight: 700, color: '#64748B', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.8px' }}>Mission Log</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {exams.map((exam) => (
                  <div key={exam.id} style={{
                    display: 'flex', alignItems: 'center', gap: 14, padding: 14,
                    background: exam.score ? '#064E3B' : '#131A2E',
                    border: `1px solid ${exam.score ? '#065F46' : '#1E293B'}`,
                    borderRadius: 12,
                  }}>
                    <div style={{
                      width: 42, height: 42, borderRadius: 10,
                      background: '#1E293B', border: '1px solid #334155',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: examTypes.find(e => e.id === exam.type)?.color || '#64748B',
                      flexShrink: 0,
                    }}>
                      {examTypes.find(e => e.id === exam.type)?.icon || <BookOpen size={18} />}
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 14, fontWeight: 600, color: 'white' }}>{exam.name}</p>
                      <div style={{ display: 'flex', gap: 14, fontSize: 11, color: '#64748B' }}>
                        <span>{exam.questions} Q</span>
                        <span>{exam.duration}</span>
                        <span>{exam.date}</span>
                      </div>
                    </div>
                    {exam.score ? (
                      <div style={{ textAlign: 'center' }}>
                        <p style={{ fontSize: 22, fontWeight: 800, color: exam.score >= 80 ? '#10B981' : '#F97316' }}>{exam.score}%</p>
                        <p style={{ fontSize: 10, color: '#64748B' }}>Score</p>
                      </div>
                    ) : (
                      <button style={{
                        padding: '8px 18px', fontSize: 13, fontWeight: 600, borderRadius: 8,
                        background: 'linear-gradient(135deg, var(--senjr-orange), #EA580C)',
                        color: 'white', border: 'none', cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(249,115,22,0.3)',
                      }}>Start</button>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === 'practice' && (
            <>
              <div style={{
                marginBottom: 20, textAlign: 'center', padding: 28,
                background: 'linear-gradient(135deg, #064E3B, #065F46)',
                border: '1px solid #059669', borderRadius: 14,
                position: 'relative', overflow: 'hidden',
              }}>
                <div style={{ position: 'absolute', top: -20, right: -20, opacity: 0.1 }}>
                  <Shield size={120} style={{ color: '#10B981' }} />
                </div>
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <Flame size={40} style={{ color: '#10B981', margin: '0 auto 12px' }} />
                  <p style={{ fontSize: 18, fontWeight: 700, color: 'white', marginBottom: 6 }}>AI Battle Practice</p>
                  <p style={{ fontSize: 14, color: '#6EE7B7', marginBottom: 18 }}>Practice any topic with AI-generated questions</p>
                  <button style={{
                    padding: '12px 28px', fontSize: 14, fontWeight: 600, borderRadius: 50,
                    background: 'linear-gradient(135deg, #10B981, #059669)',
                    color: 'white', border: 'none', cursor: 'pointer',
                    boxShadow: '0 4px 16px rgba(16,185,129,0.3)',
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                  }}>
                    <Sparkles size={16} /> Start Practice
                  </button>
                </div>
              </div>

              <p style={{ fontSize: 11, fontWeight: 700, color: '#64748B', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.8px' }}>Weak Zones</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 22 }}>
                {weakTopics.map((topic) => (
                  <div key={topic} style={{
                    display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px',
                    background: '#1E293B', border: '1px solid #334155', borderRadius: 10,
                  }}>
                    <AlertTriangle size={14} style={{ color: '#F97316', flexShrink: 0 }} />
                    <span style={{ fontSize: 13, flex: 1, color: '#CBD5E1' }}>{topic}</span>
                    <span style={{
                      padding: '3px 10px', borderRadius: 20,
                      background: '#F9731620', color: '#F97316',
                      fontSize: 11, fontWeight: 600, border: '1px solid #F9731630',
                    }}>Weak</span>
                  </div>
                ))}
              </div>

              <button style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                padding: '14px 0', width: '100%', borderRadius: 12,
                background: 'linear-gradient(135deg, var(--senjr-orange), #EA580C)',
                color: 'white', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 15,
                boxShadow: '0 4px 16px rgba(249,115,22,0.3)',
              }}>
                <Sparkles size={18} /> Generate Custom Quiz
              </button>
            </>
          )}

          {activeTab === 'analytics' && (
            <>
              <div style={{
                marginBottom: 18, background: '#131A2E',
                border: '1px solid #1E293B', borderRadius: 14, padding: 18,
              }}>
                <p style={{ fontSize: 15, fontWeight: 600, color: 'white', marginBottom: 14 }}>Combat Stats</p>
                <div style={{ display: 'flex', gap: 12 }}>
                  {[
                    { label: 'Accuracy', value: '78%', color: '#10B981', icon: <Crosshair size={16} /> },
                    { label: 'Avg Time', value: '32s', color: '#F97316', icon: <Clock size={16} /> },
                    { label: 'Streak', value: '7d', color: '#3B82F6', icon: <Flame size={16} /> },
                  ].map((stat) => (
                    <div key={stat.label} style={{
                      flex: 1, padding: 14,
                      background: '#0A0F1E', borderRadius: 10,
                      textAlign: 'center', border: '1px solid #1E293B',
                    }}>
                      <div style={{ color: stat.color, marginBottom: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{stat.icon}</div>
                      <p style={{ fontSize: 22, fontWeight: 800, color: stat.color }}>{stat.value}</p>
                      <p style={{ fontSize: 11, color: '#64748B' }}>{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{
                marginBottom: 18, background: '#131A2E',
                border: '1px solid #1E293B', borderRadius: 14, padding: 18,
              }}>
                <p style={{ fontSize: 15, fontWeight: 600, color: 'white', marginBottom: 14 }}>Subject Readiness</p>
                {[
                  { subject: 'Physics', score: 72, color: '#F97316' },
                  { subject: 'Chemistry', score: 85, color: '#10B981' },
                  { subject: 'Mathematics', score: 68, color: '#3B82F6' },
                ].map((sub) => (
                  <div key={sub.subject} style={{ marginBottom: 14 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span style={{ fontSize: 13, fontWeight: 500, color: '#CBD5E1' }}>{sub.subject}</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: sub.color }}>{sub.score}%</span>
                    </div>
                    <div style={{ height: 8, background: '#1E293B', borderRadius: 4, overflow: 'hidden' }}>
                      <div style={{ width: `${sub.score}%`, height: '100%', background: `linear-gradient(90deg, ${sub.color}, ${sub.color}88)`, borderRadius: 4, transition: 'width 0.5s ease' }} />
                    </div>
                  </div>
                ))}
              </div>

              <button style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                padding: '14px 0', width: '100%', borderRadius: 12,
                background: '#131A2E', color: '#CBD5E1',
                border: '1px solid #1E293B', cursor: 'pointer', fontWeight: 600, fontSize: 14,
              }}>
                View Detailed Report <ChevronRight size={16} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
