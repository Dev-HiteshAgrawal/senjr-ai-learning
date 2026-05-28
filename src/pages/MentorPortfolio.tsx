import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Star, MapPin, BookOpen, Users, Award, Clock, CheckCircle, MessageSquare, Briefcase, GraduationCap, Globe } from 'lucide-react'

export default function MentorPortfolio() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'about' | 'reviews' | 'sessions'>('about')

  const mentor = {
    name: 'Riya Sharma',
    role: 'Senior AI & ML Mentor',
    rating: 4.8,
    reviews: 124,
    students: 342,
    sessions: 1560,
    hourlyRate: 349,
    tagline: 'Turning complex concepts into simple, memorable learning experiences',
    location: 'Mumbai, India',
    bio: 'Ex-Google ML Engineer with 6+ years of experience in AI/ML. I have mentored 300+ students across top Indian and global universities. My teaching philosophy focuses on building strong foundations through real-world projects and intuitive explanations.',
    skills: ['Machine Learning', 'Deep Learning', 'Python', 'TensorFlow', 'NLP', 'Computer Vision', 'Data Structures', 'System Design'],
    education: 'IIT Bombay - B.Tech Computer Science\nGoogle Brain Residency\nStanford Online - ML Certificate',
    work: 'Google (ML Engineer) - 3 yrs\nMicrosoft (Data Scientist) - 2 yrs\nFreelance AI Consultant - 1 yr',
    languages: ['Hindi', 'English', 'Marathi'],
    achievements: [
      { icon: <Award size={16} />, label: 'Best Mentor 2024' },
      { icon: <Users size={16} />, label: '300+ Students' },
      { icon: <Globe size={16} />, label: 'Pan-India Sessions' },
    ],
    reviews_data: [
      { name: 'Aman Verma', rating: 5, text: 'Best mentor I have ever had. She explains ML concepts so intuitively. Helped me land my dream internship!', date: '2 weeks ago' },
      { name: 'Priya Singh', rating: 5, text: 'Riya ma\'am is incredibly patient and knowledgeable. Every session feels like a breakthrough.', date: '1 month ago' },
      { name: 'Rohit Patel', rating: 4, text: 'Great sessions with practical examples. Would recommend for anyone preparing for AI interviews.', date: '2 months ago' },
    ],
  }

  return (
    <div className="senjr-app">
      <header className="senjr-header" style={{
        background: 'rgba(255,255,255,0.9)',
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
      }}>
        <button className="senjr-header-back" onClick={() => navigate(-1)}><ArrowLeft size={18} /></button>
        <span className="senjr-header-title">Mentor Profile</span>
        <div />
      </header>

      <div className="senjr-page">
        <div className="senjr-content">
          <div className="senjr-premium-card" style={{
            textAlign: 'center', padding: 24,
            background: 'linear-gradient(135deg, var(--senjr-green-lighter), var(--senjr-orange-lighter))',
          }}>
            <div className="senjr-avatar senjr-avatar-xl" style={{
              margin: '0 auto 14px',
              background: 'linear-gradient(135deg, var(--senjr-green), var(--senjr-orange))',
              color: 'white', fontSize: 36,
              border: '3px solid white',
              boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
            }}>
              {mentor.name.charAt(0)}
            </div>
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 2 }}>{mentor.name}</h2>
            <p style={{ fontSize: 14, color: 'var(--senjr-text-muted)', marginBottom: 8 }}>{mentor.role}</p>
            <p style={{ fontSize: 13, color: 'var(--senjr-text)', marginBottom: 14, lineHeight: 1.6 }}>{mentor.tagline}</p>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20, marginBottom: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Star size={16} style={{ color: 'var(--senjr-orange)', fill: 'var(--senjr-orange)' }} />
                <span style={{ fontSize: 18, fontWeight: 700 }}>{mentor.rating}</span>
                <span style={{ fontSize: 12, color: 'var(--senjr-text-muted)' }}>({mentor.reviews})</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <MapPin size={14} style={{ color: 'var(--senjr-text-muted)' }} />
                <span style={{ fontSize: 12, color: 'var(--senjr-text-muted)' }}>{mentor.location}</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
              <button className="senjr-btn-premium" style={{ width: 'auto', padding: '10px 24px', fontSize: 14, borderRadius: 50, background: 'linear-gradient(135deg, var(--senjr-green), var(--senjr-green-dark))' }} onClick={() => navigate('/book-session')}>
                Book Session
              </button>
              <button className="senjr-btn-premium" style={{ width: 'auto', padding: '10px 14px', background: 'var(--senjr-bg-card)', color: 'var(--senjr-text)', border: '1.5px solid var(--senjr-border-dark)', boxShadow: 'none', borderRadius: 'var(--senjr-radius)' }}>
                <MessageSquare size={16} />
              </button>
            </div>
          </div>

          <div className="senjr-stats-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginBottom: 22 }}>
            <div className="senjr-premium-card" style={{ textAlign: 'center', padding: 14, marginBottom: 0, border: '1.5px solid var(--senjr-green)' }}>
              <Users size={20} style={{ margin: '0 auto 6px', color: 'var(--senjr-green)' }} />
              <p className="senjr-stat-value" style={{ fontSize: 18 }}>{mentor.students}</p>
              <p className="senjr-stat-label">Students</p>
            </div>
            <div className="senjr-premium-card" style={{ textAlign: 'center', padding: 14, marginBottom: 0, border: '1.5px solid var(--senjr-orange)' }}>
              <BookOpen size={20} style={{ margin: '0 auto 6px', color: 'var(--senjr-orange)' }} />
              <p className="senjr-stat-value" style={{ fontSize: 18 }}>{mentor.sessions}</p>
              <p className="senjr-stat-label">Sessions</p>
            </div>
            <div className="senjr-premium-card" style={{ textAlign: 'center', padding: 14, marginBottom: 0, border: '1.5px solid var(--senjr-blue)' }}>
              <Clock size={20} style={{ margin: '0 auto 6px', color: 'var(--senjr-blue)' }} />
              <p className="senjr-stat-value" style={{ fontSize: 18 }}>&#8377;{mentor.hourlyRate}</p>
              <p className="senjr-stat-label">Per Hour</p>
            </div>
          </div>

          <div className="senjr-tabs" style={{ marginBottom: 16 }}>
            {(['about', 'reviews', 'sessions'] as const).map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`senjr-tab ${activeTab === tab ? 'senjr-tab-active' : ''}`}>
                {tab === 'about' ? 'About' : tab === 'reviews' ? 'Reviews' : 'Sessions'}
              </button>
            ))}
          </div>

          {activeTab === 'about' && (
            <>
              <div className="senjr-premium-card" style={{ marginBottom: 16 }}>
                <p style={{ fontSize: 15, fontWeight: 600, marginBottom: 10 }}>About</p>
                <p style={{ fontSize: 13, color: 'var(--senjr-text)', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{mentor.bio}</p>
              </div>

              <div className="senjr-premium-card" style={{ marginBottom: 16 }}>
                <p style={{ fontSize: 15, fontWeight: 600, marginBottom: 12 }}>Skills</p>
                <div className="senjr-chip-group">
                  {mentor.skills.map((skill) => (
                    <span key={skill} className="senjr-chip senjr-chip-active" style={{ fontSize: 12, cursor: 'default', background: 'linear-gradient(135deg, var(--senjr-green), var(--senjr-green-dark))', color: 'white', border: 'none' }}>{skill}</span>
                  ))}
                </div>
              </div>

              <div className="senjr-premium-card" style={{ marginBottom: 16 }}>
                <p style={{ fontSize: 15, fontWeight: 600, marginBottom: 12 }}>Education & Work</p>
                <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                  <GraduationCap size={18} style={{ color: 'var(--senjr-green)', marginTop: 2, flexShrink: 0 }} />
                  <p style={{ fontSize: 13, lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{mentor.education}</p>
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                  <Briefcase size={18} style={{ color: 'var(--senjr-orange)', marginTop: 2, flexShrink: 0 }} />
                  <p style={{ fontSize: 13, lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{mentor.work}</p>
                </div>
              </div>

              <div className="senjr-premium-card" style={{ marginBottom: 16 }}>
                <p style={{ fontSize: 15, fontWeight: 600, marginBottom: 12 }}>Achievements</p>
                <div style={{ display: 'flex', gap: 10 }}>
                  {mentor.achievements.map((ach, i) => (
                    <div key={i} className="senjr-premium-card" style={{ flex: 1, padding: 14, marginBottom: 0, background: 'var(--senjr-green-lightest)', border: '1.5px solid var(--senjr-green-dark)', textAlign: 'center' }}>
                      <div style={{ color: 'var(--senjr-green)', marginBottom: 6 }}>{ach.icon}</div>
                      <p style={{ fontSize: 11, color: 'var(--senjr-text-muted)' }}>{ach.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="senjr-premium-card" style={{ marginBottom: 16 }}>
                <p style={{ fontSize: 15, fontWeight: 600, marginBottom: 10 }}>Languages</p>
                <div className="senjr-chip-group">
                  {mentor.languages.map((lang) => (
                    <span key={lang} className="senjr-chip" style={{ fontSize: 12, cursor: 'default', border: '1.5px solid var(--senjr-green)', color: 'var(--senjr-green-dark)' }}>{lang}</span>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === 'reviews' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {mentor.reviews_data.map((review, i) => (
                <div key={i} className="senjr-premium-card" style={{ marginBottom: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                    <div className="senjr-avatar" style={{ width: 40, height: 40, fontSize: 16, background: 'var(--senjr-green-light)', color: 'var(--senjr-green)' }}>{review.name.charAt(0)}</div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 14, fontWeight: 600 }}>{review.name}</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <div style={{ display: 'flex', gap: 2 }}>{[...Array(5)].map((_, j) => <Star key={j} size={12} style={{ color: j < review.rating ? 'var(--senjr-orange)' : 'var(--senjr-border)', fill: j < review.rating ? 'var(--senjr-orange)' : 'none' }} />)}</div>
                        <span style={{ fontSize: 11, color: 'var(--senjr-text-muted)' }}>{review.date}</span>
                      </div>
                    </div>
                  </div>
                  <p style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--senjr-text)' }}>{review.text}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'sessions' && (
            <div className="senjr-premium-card" style={{ marginBottom: 16 }}>
              <p style={{ fontSize: 15, fontWeight: 600, marginBottom: 14 }}>Session Topics</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {['ML Fundamentals Crash Course', 'Python for Data Science', 'Deep Learning with TensorFlow', 'System Design for AI Interviews', 'NLP from Scratch'].map((topic, i) => (
                  <div key={i} className="senjr-list-item" style={{ cursor: 'default', marginBottom: 0 }}>
                    <CheckCircle size={18} style={{ color: 'var(--senjr-green)', flexShrink: 0 }} />
                    <span style={{ fontSize: 13, flex: 1 }}>{topic}</span>
                    <span className="senjr-tag-green-premium" style={{ marginLeft: 'auto' }}>Popular</span>
                  </div>
                ))}
              </div>
              <button className="senjr-btn-premium" style={{ marginTop: 16 }} onClick={() => navigate('/book-session')}>Book a Session</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
