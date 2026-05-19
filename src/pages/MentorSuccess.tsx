import { useNavigate } from 'react-router-dom'
import { Share2, Copy, Trophy } from 'lucide-react'

export default function MentorSuccess() {
  const navigate = useNavigate()

  return (
    <div className="senjr-app" style={{
      background: 'linear-gradient(180deg, #F0FDF4 0%, #FFF7ED 50%, #F0FDF4 100%)',
      minHeight: '100vh'
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 24px',
        minHeight: '100vh',
        textAlign: 'center'
      }}>
        <div style={{
          width: 100, height: 100, borderRadius: '50%',
          background: 'var(--senjr-green)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 24,
          boxShadow: '6px 6px 0 rgba(0,0,0,0.15)'
        }}>
          <Trophy size={48} style={{ color: 'white' }} />
        </div>

        <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>
          🎉 Congratulations!
        </h1>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>
          You're now a verified mentor!
        </h2>

        <p style={{ fontSize: 15, color: 'var(--senjr-text-muted)', lineHeight: 1.6, marginBottom: 32 }}>
          Your expertise is ready to be shared.<br />
          Welcome to the Expert Peer community.
        </p>

        <div className="senjr-card" style={{ width: '100%', marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ fontSize: 13, color: 'var(--senjr-text-muted)', marginBottom: 4 }}>Your profile link:</p>
              <p style={{ fontSize: 14, fontWeight: 600, fontFamily: 'monospace' }}>senjr.com/mentor/@userna...</p>
            </div>
            <button className="senjr-btn-icon" style={{ width: 44, height: 44 }}>
              <Copy size={20} />
            </button>
          </div>
        </div>

        <button className="senjr-btn senjr-btn-orange" style={{ marginBottom: 12 }}>
          <Share2 size={18} /> Share
        </button>

        <button className="senjr-btn senjr-btn-outline" onClick={() => navigate('/mentor-hub')}>
          Go to Dashboard
        </button>
      </div>
    </div>
  )
}
