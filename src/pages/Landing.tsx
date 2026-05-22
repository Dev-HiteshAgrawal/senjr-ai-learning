import { useNavigate } from 'react-router-dom'
import { Home, GraduationCap, BookOpen, User, Star, Users, Trophy, Sparkles, ArrowRight, ChevronRight, TrendingUp, Shield, MessageSquare, Search, Rocket, Laptop, Palette } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Landing() {
  const navigate = useNavigate()
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisibleSections(prev => ({ ...prev, [entry.target.id]: true }))
        }
      })
    }, { threshold: 0.1 })
    document.querySelectorAll('[data-observe]').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const features = [
    { icon: Users, title: 'Learn from Seniors', desc: 'Real guidance from those who have already cracked it', color: 'var(--senjr-green)' },
    { icon: Sparkles, title: 'AI Tutor 24/7', desc: 'Get instant doubt-solving anytime, anywhere', color: 'var(--senjr-orange)' },
    { icon: Trophy, title: 'Mock Tests', desc: 'Practice with real exam patterns & analytics', color: '#3B82F6' },
    { icon: Shield, title: 'Vetted Mentors', desc: 'Verified seniors with proven expertise', color: '#8B5CF6' },
  ]

  const howItWorks = [
    { step: '1', title: 'Sign up free', desc: 'Create your account in 30 seconds', icon: User },
    { step: '2', title: 'Find your mentor', desc: 'Choose from verified senior mentors', icon: Search },
    { step: '3', title: 'Learn & grow', desc: '1:1 sessions, AI help, mock tests', icon: TrendingUp },
  ]

   const stats = [
     { value: '500+', label: 'Students', color: 'var(--senjr-green)' },
     { value: '50+', label: 'Mentors', color: 'var(--senjr-orange)' },
     { value: '4.8', label: 'Avg Rating', color: '#3B82F6' },
     { value: 'High', label: 'Satisfaction', color: '#8B5CF6' },
   ]

  const popularLessons = [
    {
      title: 'Mastering DSA for FAANG',
      mentor: 'Rahul S., IIT Delhi \'24',
      duration: '45 mins',
      tags: ['Algorithms', 'Interview'],
      rating: 4.9,
      students: 234,
      badge: '#1',
      icon: <Laptop size={36} style={{ color: 'white' }} />,
      color: '#1a1a2e',
    },
    {
      title: 'UP Police Complete Prep',
      mentor: 'Amit K., UP Cleared',
      duration: '30 days',
      tags: ['GK', 'Reasoning'],
      rating: 4.8,
      students: 567,
      badge: 'Popular',
      icon: <Shield size={36} style={{ color: 'white' }} />,
      color: '#065F46',
    },
    {
      title: 'UI/UX Basics for Devs',
      mentor: 'Priya M., NID \'23',
      duration: '1.5 hrs',
      tags: ['Design', 'Portfolio'],
      rating: 4.7,
      students: 156,
      badge: 'New',
      icon: <Palette size={36} style={{ color: 'white' }} />,
      color: '#BE123C',
    },
  ]

  return (
    <div className="senjr-app">
      <header className="senjr-header" style={{ background: 'var(--senjr-black)', color: 'white', border: 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'var(--senjr-green)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '2px solid var(--senjr-green-dark)',
          }}>
            <span style={{ fontSize: 18, fontWeight: 800, color: 'white' }}>S</span>
          </div>
          <span style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.5px' }}>SENJR</span>
        </div>
        <button
          className="senjr-btn senjr-btn-sm"
          style={{
            width: 'auto', padding: '8px 20px',
            background: 'var(--senjr-green)', color: 'white',
            border: '2px solid var(--senjr-green-dark)',
            boxShadow: '2px 2px 0 rgba(0,0,0,0.3)',
          }}
          onClick={() => navigate('/auth')}
        >
          Login
        </button>
      </header>

      <div className="senjr-page">
        <div className="senjr-content">

          <div className="senjr-fade-in" style={{ marginBottom: 28 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
              <span className="senjr-tag senjr-tag-green">
                <Sparkles size={12} /> India's #1 Peer Learning Platform
              </span>
            </div>

            <h1 style={{ fontSize: 34, fontWeight: 800, lineHeight: 1.1, marginBottom: 8 }}>
              Learn from{' '}
              <span className="senjr-gradient-text">Seniors.</span>
            </h1>
            <h1 style={{ fontSize: 34, fontWeight: 800, lineHeight: 1.1, marginBottom: 8 }}>
              Not Teachers.
            </h1>
            <p style={{ fontSize: 15, color: 'var(--senjr-text-muted)', lineHeight: 1.5, marginBottom: 20 }}>
              Real guidance from seniors who've actually cleared the exams<br />and landed the jobs you're aiming for.
            </p>

            <div className="senjr-card" style={{
              overflow: 'hidden', padding: 0, marginBottom: 20, position: 'relative',
              boxShadow: '3px 3px 0 var(--senjr-text)',
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #F0FDF4 0%, #FFF7ED 100%)',
                padding: 24, textAlign: 'center', position: 'relative', zIndex: 1,
              }}>
                <div style={{
                  width: 48, height: 48, borderRadius: '50%',
                  background: 'var(--senjr-black)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 12px',
                }}>
                  <MessageSquare size={22} style={{ color: 'var(--senjr-green)' }} />
                </div>
                <p style={{ fontSize: 14, fontWeight: 500, marginBottom: 8, fontStyle: 'italic' }}>
                  "Maine khud yeh exams clear kiye hain - ab main aapki madad kar sakta hoon. Real guidance, real results."
                </p>
                <p style={{ fontSize: 12, color: 'var(--senjr-text-muted)' }}>
                  - Rahul, IIT Delhi '24
                </p>
              </div>
            </div>

            <button
              className="senjr-btn senjr-btn-green senjr-ripple"
              style={{ marginBottom: 10, boxShadow: '3px 3px 0 var(--senjr-green-dark)' }}
              onClick={() => navigate('/student-signup')}
            >
              Start Learning Free <ArrowRight size={18} />
            </button>

            <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
              <button
                className="senjr-btn senjr-btn-outline senjr-btn-sm"
                style={{ flex: 1, fontSize: 13 }}
                onClick={() => navigate('/mentor-signup')}
              >
                Become a Mentor
              </button>
              <button
                className="senjr-btn senjr-btn-outline senjr-btn-sm"
                style={{ flex: 1, fontSize: 13 }}
                onClick={() => navigate('/auth')}
              >
                Sign In
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              <div className="senjr-avatar-group">
                {['P', 'A', 'R', 'K'].map((initial, i) => (
                  <div key={i} className="senjr-avatar" style={{
                    width: 32, height: 32, fontSize: 12,
                    background: i % 2 === 0 ? 'var(--senjr-green)' : 'var(--senjr-orange)',
                    color: 'white', border: '2px solid white',
                  }}>
                    {initial}
                  </div>
                ))}
              </div>
              <span style={{ fontSize: 13, color: 'var(--senjr-text-muted)' }}>
                <strong style={{ color: 'var(--senjr-text)' }}>500+</strong> students joined
              </span>
            </div>
          </div>

          <div id="how-it-works" data-observe className="senjr-card" style={{
            overflow: 'hidden', padding: 20, marginBottom: 28,
            background: 'var(--senjr-black)', color: 'white', border: 'none',
            boxShadow: '4px 4px 0 var(--senjr-text)',
          }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 20, textAlign: 'center' }}>
              How It <span style={{ color: 'var(--senjr-green)' }}>Works</span>
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
               {howItWorks.map((item, i) => {
                 const Icon = item.icon
                 return (
                   <div key={item.step} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                     <div style={{
                       width: 40, height: 40, borderRadius: '50%',
                       background: i === 1 ? 'var(--senjr-orange)' : 'var(--senjr-green)',
                       display: 'flex', alignItems: 'center', justifyContent: 'center',
                       fontSize: 16, fontWeight: 800, flexShrink: 0,
                     }}>
                       <Icon size={20} />
                     </div>
                     <div style={{ flex: 1 }}>
                       <p style={{ fontSize: 15, fontWeight: 700, marginBottom: 2 }}>{item.title}</p>
                       <p style={{ fontSize: 13, color: '#94A3B8' }}>{item.desc}</p>
                     </div>
                      {i < howItWorks.length - 1 && (
                        <ArrowRight size={18} style={{ color: '#334155' }} />
                      )}
                   </div>
                 )
               })}
            </div>
          </div>

          <div id="stats" className="senjr-card" style={{
            overflow: 'hidden', padding: 0, marginBottom: 28,
            border: '2px solid var(--senjr-text)', boxShadow: '4px 4px 0 var(--senjr-text)',
          }}>
            <div className="senjr-grid-2" style={{ gap: 0 }}>
              {stats.map((s, i) => (
                <div key={s.label} style={{
                  padding: '20px 16px', textAlign: 'center',
                  borderRight: i % 2 === 0 ? '1px solid var(--senjr-border)' : 'none',
                  borderBottom: i < 2 ? '1px solid var(--senjr-border)' : 'none',
                }}>
                  <p style={{ fontSize: 24, fontWeight: 800, color: s.color, marginBottom: 2 }}>
                    {s.value}
                  </p>
                  <p style={{ fontSize: 13, color: 'var(--senjr-text-muted)', fontWeight: 500 }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div id="features" data-observe className={`${visibleSections['features'] ? 'senjr-fade-in' : ''}`} style={{ marginBottom: 28 }}>
            <h2 className="senjr-section-title" style={{ fontSize: 18, marginBottom: 16 }}>
              Why Students <span className="senjr-gradient-text">Love</span> Senjr
            </h2>
            <div className="senjr-grid-2">
              {features.map((f) => {
                const Icon = f.icon
                return (
                  <div key={f.title} className="senjr-card-flat" style={{
                    padding: 16, marginBottom: 0,
                    border: '2px solid var(--senjr-text)',
                    boxShadow: '2px 2px 0 var(--senjr-text)',
                  }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: 10,
                      background: `${f.color}15`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      marginBottom: 8,
                    }}>
                      <Icon size={20} style={{ color: f.color }} />
                    </div>
                    <p style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>{f.title}</p>
                    <p style={{ fontSize: 12, color: 'var(--senjr-text-muted)' }}>{f.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>

          <div id="lessons" data-observe className={`${visibleSections['lessons'] ? 'senjr-slide-up' : ''}`} style={{ marginBottom: 28 }}>
            <div className="senjr-flex-between" style={{ marginBottom: 16 }}>
              <h2 className="senjr-section-title" style={{ fontSize: 18, marginBottom: 0 }}>
                Popular <span className="senjr-gradient-text">Lessons</span>
              </h2>
              <button style={{ fontSize: 13, color: 'var(--senjr-green)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 2 }}>
                View All <ChevronRight size={14} />
              </button>
            </div>

            {popularLessons.map((lesson, i) => (
              <div key={i} className="senjr-card-flat senjr-ripple" style={{
                marginBottom: 16, cursor: 'pointer',
                border: '2px solid var(--senjr-text)',
                boxShadow: '2px 2px 0 var(--senjr-text)',
                transition: 'all 0.2s ease',
              }} onClick={() => navigate('/auth')}>
                <div style={{
                  background: lesson.color,
                  borderRadius: 10, padding: 20, marginBottom: 12,
                  position: 'relative', minHeight: 80,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {lesson.icon}
                  <span className="senjr-tag senjr-tag-orange" style={{
                    position: 'absolute', top: 8, right: 8,
                  }}>
                    {lesson.badge}
                  </span>
                  <span className="senjr-tag" style={{
                    position: 'absolute', bottom: 8, left: 8,
                    background: 'rgba(255,255,255,0.2)', color: 'white',
                    border: '1px solid rgba(255,255,255,0.3)',
                  }}>
                    {lesson.duration}
                  </span>
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{lesson.title}</h3>
                <p style={{ fontSize: 13, color: 'var(--senjr-text-muted)', marginBottom: 8 }}>
                  By {lesson.mentor}
                </p>
                <div className="senjr-flex-between">
                  <div style={{ display: 'flex', gap: 6 }}>
                    {lesson.tags.map((tag) => (
                      <span key={tag} className="senjr-tag" style={{
                        background: 'var(--senjr-bg)', color: 'var(--senjr-text-muted)',
                        border: '1px solid var(--senjr-border)',
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Star size={14} style={{ color: 'var(--senjr-orange)', fill: 'var(--senjr-orange)' }} />
                    <span style={{ fontSize: 13, fontWeight: 600 }}>{lesson.rating}</span>
                    <span style={{ fontSize: 12, color: 'var(--senjr-text-muted)' }}>({lesson.students})</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div id="cta" data-observe className={`${visibleSections['cta'] ? 'senjr-pop' : ''}`} style={{ marginBottom: 28 }}>
            <div className="senjr-card" style={{
              overflow: 'hidden', padding: 0,
              background: 'linear-gradient(135deg, var(--senjr-black) 0%, #2D2D44 100%)',
              border: '2px solid var(--senjr-text)',
              boxShadow: '4px 4px 0 var(--senjr-text)',
            }}>
              <div style={{ padding: 28, textAlign: 'center', position: 'relative' }}>
                <Rocket size={48} style={{ color: 'var(--senjr-orange)', margin: '0 auto 12px' }} />
                <p style={{ fontSize: 16, fontWeight: 700, color: 'white', marginBottom: 4 }}>
                  Apni preparation ko next level le jao
                </p>
                <p style={{ fontSize: 13, color: '#94A3B8', marginBottom: 16 }}>
                  Join 500+ students preparing together with senior mentors
                </p>
                <button
                  className="senjr-btn senjr-btn-orange senjr-ripple"
                  style={{ width: 'auto', padding: '12px 28px', margin: '0 auto', boxShadow: '3px 3px 0 var(--senjr-orange-dark)' }}
                  onClick={() => navigate('/student-signup')}
                >
                  Get Started Free <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center', padding: '24px 0', borderTop: '1px solid var(--senjr-border)' }}>
            <p style={{ fontSize: 18, fontWeight: 800, color: 'var(--senjr-green)', marginBottom: 12, letterSpacing: '-0.5px' }}>SENJR</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginBottom: 12 }}>
              <a href="#" style={{ fontSize: 13, color: 'var(--senjr-text-muted)', fontWeight: 500 }}>Terms</a>
              <a href="#" style={{ fontSize: 13, color: 'var(--senjr-text-muted)', fontWeight: 500 }}>Privacy</a>
              <a href="#" style={{ fontSize: 13, color: 'var(--senjr-text-muted)', fontWeight: 500 }}>Support</a>
            </div>
            <p style={{ fontSize: 12, color: 'var(--senjr-text-light)' }}>
              &copy; 2026 Senjr EdTech. Made in India
            </p>
          </div>
        </div>
      </div>

      <nav className="senjr-bottom-nav">
        <button className="senjr-nav-item senjr-nav-item-active" onClick={() => navigate('/')}>
          <Home size={20} /> Home
        </button>
        <button className="senjr-nav-item" onClick={() => navigate('/auth')}>
          <GraduationCap size={20} /> Courses
        </button>
        <button className="senjr-nav-item" onClick={() => navigate('/auth')}>
          <BookOpen size={20} /> My Learning
        </button>
        <button className="senjr-nav-item" onClick={() => navigate('/auth')}>
          <User size={20} /> Profile
        </button>
      </nav>
    </div>
  )
}
