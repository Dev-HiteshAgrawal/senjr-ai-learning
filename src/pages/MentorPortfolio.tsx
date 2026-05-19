import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Share2, Bookmark, CheckCircle, Shield, MapPin, Calendar, BookOpen } from 'lucide-react'

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
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <div style={{
              width: 100, height: 100, borderRadius: 16,
              background: 'linear-gradient(135deg, #F0FDF4 0%, #FFF7ED 100%)',
              margin: '0 auto 16px',
              overflow: 'hidden',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 64
            }}>
              
            </div>
            <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>Rahul Sharma</h1>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 8 }}>
              <span className="senjr-badge senjr-badge-green" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <CheckCircle size={12} /> Verified Mentor
              </span>
              <span className="senjr-badge" style={{ background: '#EFF6FF', color: '#1E40AF', display: 'flex', alignItems: 'center', gap: 4 }}>
                <Shield size={12} /> Document Verified
              </span>
            </div>
            <p style={{ fontSize: 14, color: 'var(--senjr-text-muted)', marginBottom: 4 }}>
              BBA Graduate | UP Police Cleared | 2+ Yrs Teaching
            </p>
            <p style={{ fontSize: 13, color: 'var(--senjr-text-muted)' }}>
              <MapPin size={12} style={{ display: 'inline', verticalAlign: 'middle' }} /> Aligarh, UP
            </p>
          </div>

          <button className="senjr-btn senjr-btn-green" style={{ marginBottom: 24 }} onClick={() => navigate('/book-session')}>
            <Calendar size={18} /> BOOK SESSION • ₹{pricePerHour}/HR
          </button>

          <div className="senjr-grid-2" style={{ marginBottom: 24 }}>
            {stats.map((s) => (
              <div key={s.label} className="senjr-card-flat" style={{ textAlign: 'center', padding: 16, marginBottom: 0 }}>
                <span className="senjr-stat-value" style={{ fontSize: 28, color: s.icon === 'star' ? 'var(--senjr-orange)' : s.label === 'Completion' ? 'var(--senjr-green)' : 'var(--senjr-orange)' }}>
                  {s.value}{s.icon === 'star' && ' '}
                </span>
                <span className="senjr-stat-label">{s.label.toUpperCase()}</span>
              </div>
            ))}
          </div>

          <div style={{ marginBottom: 24 }}>
            <h2 className="senjr-section-title" style={{ fontSize: 16 }}>
              <BookOpen size={18} style={{ display: 'inline', marginRight: 4 }} />
              Teaching Expertise
            </h2>
            <div className="senjr-chip-group">
              {expertise.map((e) => (
                <span key={e} className="senjr-chip" style={{ fontSize: 13, padding: '6px 14px', cursor: 'default' }}>
                  {e}
                </span>
              ))}
            </div>
          </div>

          <div className="senjr-card-flat" style={{ marginBottom: 24 }}>
            <h3 className="senjr-section-title" style={{ fontSize: 16 }}>Recent Reviews</h3>
            {[
              { stars: 5, text: '"Rahul sir ne DSA bahut acche se samjhaya. Interview mein kaam aaya!"', author: 'Priya, BBA 3rd Year', date: '2 days ago' },
              { stars: 5, text: '"Best mentor for UP Police prep. Mock tests were spot on."', author: 'Amit, Aspirant', date: '1 week ago' },
            ].map((r, i) => (
              <div key={i} style={{ marginBottom: 16, paddingBottom: 16, borderBottom: i < 1 ? '1px solid var(--senjr-border)' : 'none' }}>
                <div style={{ color: 'var(--senjr-orange)', marginBottom: 4 }}>{'★'.repeat(r.stars)}</div>
                <p style={{ fontSize: 14, marginBottom: 4 }}>{r.text}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 12, color: 'var(--senjr-text-muted)' }}>{r.author}</span>
                  <span style={{ fontSize: 12, color: 'var(--senjr-text-light)' }}>{r.date}</span>
                </div>
              </div>
            ))}
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
        borderTop: '1px solid var(--senjr-border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 100
      }}>
        <div>
          <p style={{ fontSize: 12, color: 'var(--senjr-text-muted)' }}>SESSION PRICE</p>
          <p style={{ fontSize: 22, fontWeight: 800, color: 'var(--senjr-green)' }}>{pricePerHour} <span style={{ fontSize: 14, fontWeight: 400, color: 'var(--senjr-text-muted)' }}>/ hr</span></p>
        </div>
        <button className="senjr-btn senjr-btn-orange" style={{ width: 'auto', padding: '12px 32px' }} onClick={() => navigate('/book-session')}>
          BOOK SESSION
        </button>
      </div>
    </div>
  )
}
