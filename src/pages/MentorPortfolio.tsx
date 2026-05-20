import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Share2, Bookmark, CheckCircle, Shield, MapPin, Calendar, BookOpen, Star, Award, FileText, PlayCircle, MessageSquare } from 'lucide-react'

export default function MentorPortfolio() {
  const navigate = useNavigate()

  const stats = [
    { value: '45', label: 'Sessions' },
    { value: '32', label: 'Students' },
    { value: '4.9', label: 'Rating', icon: 'star' },
    { value: '95%', label: 'Completion' },
  ]

  const expertise = ['BBA', 'Economics', 'UP Police', 'Reasoning', 'Communication']
  const pricePerHour = 200

  const certificates = [
    { name: 'BBA Graduate', institution: 'ITM College Aligarh', year: '2024', verified: true },
    { name: 'UP Police Constable', institution: 'UPPSC', year: '2023', verified: true },
    { name: 'Google Data Analytics', institution: 'Coursera', year: '2024', verified: false },
  ]

  const resources = [
    { title: 'UP Police Reasoning Shortcuts', type: 'PDF', downloads: 234 },
    { title: 'Economics Formula Sheet', type: 'PDF', downloads: 156 },
    { title: 'BBA Interview Questions', type: 'Video', downloads: 89 },
  ]

  const reviews = [
    { stars: 5, text: '"Rahul sir ne DSA bahut acche se samjhaya. Interview mein kaam aaya!"', author: 'Priya, BBA 3rd Year', date: '2 days ago' },
    { stars: 5, text: '"Best mentor for UP Police prep. Mock tests were spot on."', author: 'Amit, Aspirant', date: '1 week ago' },
    { stars: 4, text: '"Good explanations but could use more practice questions."', author: 'Sneha, BCom', date: '2 weeks ago' },
  ]

  const availability = [
    { day: 'Mon', slots: ['6-8 PM'] },
    { day: 'Tue', slots: ['6-8 PM'] },
    { day: 'Wed', slots: ['6-8 PM'] },
    { day: 'Thu', slots: ['4-6 PM', '6-8 PM'] },
    { day: 'Fri', slots: ['4-6 PM', '6-8 PM'] },
    { day: 'Sat', slots: ['10 AM-2 PM'] },
  ]

  return (
    <div className="senjr-app">
      <header className="senjr-header">
        <button className="senjr-header-back" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} />
        </button>
        <span className="senjr-header-title">Rahul's Portfolio</span>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="senjr-btn-icon">
            <Share2 size={18} />
          </button>
          <button className="senjr-btn-icon">
            <Bookmark size={18} />
          </button>
        </div>
      </header>

      <div className="senjr-page">
        <div className="senjr-content">
          <div style={{
            background: 'linear-gradient(135deg, var(--senjr-green-bg) 0%, var(--senjr-orange-bg) 100%)',
            borderRadius: 16,
            padding: 24,
            textAlign: 'center',
            marginBottom: 20,
            border: '2px solid var(--senjr-text)',
            boxShadow: '3px 3px 0 var(--senjr-text)',
          }}>
            <div style={{
              width: 90, height: 90, borderRadius: 16,
              background: 'linear-gradient(135deg, var(--senjr-green) 0%, var(--senjr-orange) 100%)',
              margin: '0 auto 12px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 40, color: 'white', fontWeight: 800,
              border: '3px solid var(--senjr-text)',
            }}>
              R
            </div>
            <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>Rahul Sharma</h1>
            <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginBottom: 8, flexWrap: 'wrap' }}>
              <span className="senjr-badge senjr-badge-green" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <CheckCircle size={12} /> Verified Mentor
              </span>
              <span className="senjr-badge" style={{ background: '#EFF6FF', color: '#1E40AF', display: 'flex', alignItems: 'center', gap: 4 }}>
                <Shield size={12} /> Documents Verified
              </span>
            </div>
            <p style={{ fontSize: 14, color: 'var(--senjr-text-muted)', marginBottom: 4 }}>
              BBA Graduate | UP Police Cleared | 2+ Yrs Teaching
            </p>
            <p style={{ fontSize: 13, color: 'var(--senjr-text-muted)' }}>
              <MapPin size={12} style={{ display: 'inline', verticalAlign: 'middle' }} /> Aligarh, UP
            </p>
          </div>

          <button className="senjr-btn senjr-btn-green" style={{ marginBottom: 20 }} onClick={() => navigate('/book-session')}>
            <Calendar size={18} /> BOOK SESSION • ₹{pricePerHour}/HR
          </button>

          <div className="senjr-grid-2" style={{ marginBottom: 20 }}>
            {stats.map((s) => (
              <div key={s.label} className="senjr-card-flat" style={{
                textAlign: 'center', padding: 14, marginBottom: 0,
                border: '2px solid var(--senjr-text)',
                boxShadow: '2px 2px 0 var(--senjr-text)',
              }}>
                <span className="senjr-stat-value" style={{
                  fontSize: 24,
                  color: s.icon === 'star' ? 'var(--senjr-orange)' : s.label === 'Completion' ? 'var(--senjr-green)' : 'var(--senjr-text)',
                }}>
                  {s.value}{s.icon === 'star' && ' '}
                </span>
                <span className="senjr-stat-label">{s.label.toUpperCase()}</span>
              </div>
            ))}
          </div>

          <div style={{ marginBottom: 20 }}>
            <h2 className="senjr-section-title" style={{ fontSize: 16 }}>
              <BookOpen size={18} style={{ display: 'inline', marginRight: 4 }} />
              Teaching Expertise
            </h2>
            <div className="senjr-chip-group">
              {expertise.map((e) => (
                <span key={e} className="senjr-chip" style={{
                  fontSize: 13, padding: '6px 14px', cursor: 'default',
                  border: '2px solid var(--senjr-text)',
                  boxShadow: '2px 2px 0 var(--senjr-text)',
                }}>
                  {e}
                </span>
              ))}
            </div>
          </div>

          <div className="senjr-card-flat" style={{ marginBottom: 20, border: '2px solid var(--senjr-text)', boxShadow: '2px 2px 0 var(--senjr-text)' }}>
            <h3 className="senjr-section-title" style={{ fontSize: 16 }}>
              <Award size={18} style={{ display: 'inline', marginRight: 4, color: 'var(--senjr-orange)' }} />
              Certificates & Proofs
            </h3>
            {certificates.map((c, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '12px',
                borderRadius: 10,
                marginBottom: i < certificates.length - 1 ? 8 : 0,
                background: 'var(--senjr-bg)',
                border: '1px solid var(--senjr-border)',
              }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 10,
                  background: c.verified ? 'var(--senjr-green-light)' : 'var(--senjr-bg)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <FileText size={18} style={{ color: c.verified ? 'var(--senjr-green)' : 'var(--senjr-text-muted)' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 14, fontWeight: 600 }}>{c.name}</p>
                  <p style={{ fontSize: 12, color: 'var(--senjr-text-muted)' }}>{c.institution} • {c.year}</p>
                </div>
                {c.verified && (
                  <span className="senjr-badge senjr-badge-green" style={{ fontSize: 11 }}>
                    <CheckCircle size={10} style={{ marginRight: 2 }} /> Verified
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="senjr-card-flat" style={{ marginBottom: 20, border: '2px solid var(--senjr-text)', boxShadow: '2px 2px 0 var(--senjr-text)' }}>
            <h3 className="senjr-section-title" style={{ fontSize: 16 }}>
              <PlayCircle size={18} style={{ display: 'inline', marginRight: 4, color: 'var(--senjr-green)' }} />
              Teaching Samples
            </h3>
            <div style={{
              background: 'var(--senjr-black)',
              borderRadius: 12,
              padding: 20,
              textAlign: 'center',
              marginBottom: 12,
            }}>
              <PlayCircle size={40} style={{ color: 'var(--senjr-green)', margin: '0 auto 8px' }} />
              <p style={{ fontSize: 14, color: 'white', fontWeight: 600 }}>Intro Video</p>
              <p style={{ fontSize: 12, color: '#94A3B8' }}>2:30 mins • Watch how Rahul teaches</p>
            </div>
            <div style={{
              background: 'var(--senjr-orange-bg)',
              borderRadius: 12,
              padding: 16,
              textAlign: 'center',
            }}>
              <p style={{ fontSize: 13, color: 'var(--senjr-orange-dark)', fontWeight: 600 }}>Sample Lesson: Economics Basics</p>
              <p style={{ fontSize: 12, color: 'var(--senjr-text-muted)' }}>Free preview • 15 mins</p>
            </div>
          </div>

          <div className="senjr-card-flat" style={{ marginBottom: 20, border: '2px solid var(--senjr-text)', boxShadow: '2px 2px 0 var(--senjr-text)' }}>
            <h3 className="senjr-section-title" style={{ fontSize: 16 }}>
              <FileText size={18} style={{ display: 'inline', marginRight: 4, color: 'var(--senjr-green)' }} />
              Resources Created
            </h3>
            {resources.map((r, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '12px',
                borderRadius: 10,
                marginBottom: i < resources.length - 1 ? 8 : 0,
                background: 'var(--senjr-bg)',
                border: '1px solid var(--senjr-border)',
              }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 10,
                  background: r.type === 'PDF' ? 'var(--senjr-green-light)' : 'var(--senjr-orange-light)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <FileText size={18} style={{ color: r.type === 'PDF' ? 'var(--senjr-green)' : 'var(--senjr-orange)' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 14, fontWeight: 600 }}>{r.title}</p>
                  <p style={{ fontSize: 12, color: 'var(--senjr-text-muted)' }}>{r.type} • {r.downloads} downloads</p>
                </div>
                <button className="senjr-btn senjr-btn-sm" style={{
                  padding: '4px 12px',
                  background: 'var(--senjr-green)',
                  color: 'white',
                  fontSize: 11,
                  fontWeight: 600,
                  border: 'none',
                }}>
                  Download
                </button>
              </div>
            ))}
          </div>

          <div className="senjr-card-flat" style={{ marginBottom: 20, border: '2px solid var(--senjr-text)', boxShadow: '2px 2px 0 var(--senjr-text)' }}>
            <h3 className="senjr-section-title" style={{ fontSize: 16 }}>
              <Calendar size={18} style={{ display: 'inline', marginRight: 4, color: 'var(--senjr-orange)' }} />
              Availability
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {availability.map((a) => (
                <div key={a.day} style={{
                  padding: '8px 12px',
                  borderRadius: 8,
                  background: 'var(--senjr-bg)',
                  border: '1px solid var(--senjr-border)',
                  textAlign: 'center',
                  minWidth: 60,
                }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--senjr-text)' }}>{a.day}</p>
                  {a.slots.map((s) => (
                    <p key={s} style={{ fontSize: 11, color: 'var(--senjr-green)', fontWeight: 500 }}>{s}</p>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="senjr-card-flat" style={{ marginBottom: 20, border: '2px solid var(--senjr-text)', boxShadow: '2px 2px 0 var(--senjr-text)' }}>
            <h3 className="senjr-section-title" style={{ fontSize: 16 }}>
              <Star size={18} style={{ display: 'inline', marginRight: 4, color: 'var(--senjr-orange)' }} />
              Recent Reviews
            </h3>
            {reviews.map((r, i) => (
              <div key={i} style={{
                marginBottom: 16,
                paddingBottom: 16,
                borderBottom: i < reviews.length - 1 ? '1px solid var(--senjr-border)' : 'none',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 6 }}>
                  {Array.from({ length: 5 }).map((_, si) => (
                    <Star key={si} size={14} style={{
                      color: si < r.stars ? 'var(--senjr-orange)' : 'var(--senjr-border)',
                      fill: si < r.stars ? 'var(--senjr-orange)' : 'none',
                    }} />
                  ))}
                </div>
                <p style={{ fontSize: 14, marginBottom: 6, lineHeight: 1.5 }}>{r.text}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 12, color: 'var(--senjr-text-muted)' }}>{r.author}</span>
                  <span style={{ fontSize: 12, color: 'var(--senjr-text-light)' }}>{r.date}</span>
                </div>
              </div>
            ))}
            <button style={{ fontSize: 13, color: 'var(--senjr-green)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>
              View All 24 Reviews →
            </button>
          </div>

          <div className="senjr-card-flat" style={{
            marginBottom: 100,
            background: 'linear-gradient(135deg, var(--senjr-green-bg) 0%, var(--senjr-orange-bg) 100%)',
            border: '2px solid var(--senjr-text)',
            boxShadow: '2px 2px 0 var(--senjr-text)',
          }}>
            <div style={{ textAlign: 'center' }}>
              <MessageSquare size={24} style={{ color: 'var(--senjr-green)', margin: '0 auto 8px' }} />
              <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>Have questions for Rahul?</p>
              <p style={{ fontSize: 13, color: 'var(--senjr-text-muted)', marginBottom: 12 }}>Send a message before booking</p>
              <button className="senjr-btn senjr-btn-outline senjr-btn-sm" style={{ width: 'auto', margin: '0 auto' }}>
                Message Mentor
              </button>
            </div>
          </div>
        </div>
      </div>

      <div style={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: 480,
        padding: '12px 16px',
        background: 'var(--senjr-bg-card)',
        borderTop: '2px solid var(--senjr-text)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 100,
        boxShadow: '0 -4px 12px rgba(0,0,0,0.1)',
      }}>
        <div>
          <p style={{ fontSize: 11, color: 'var(--senjr-text-muted)', fontWeight: 500 }}>SESSION PRICE</p>
          <p style={{ fontSize: 22, fontWeight: 800, color: 'var(--senjr-green)' }}>₹{pricePerHour} <span style={{ fontSize: 13, fontWeight: 400, color: 'var(--senjr-text-muted)' }}>/ hr</span></p>
        </div>
        <button className="senjr-btn senjr-btn-orange" style={{ width: 'auto', padding: '12px 28px' }} onClick={() => navigate('/book-session')}>
          BOOK NOW
        </button>
      </div>
    </div>
  )
}
