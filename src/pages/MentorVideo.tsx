import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Video, CameraOff, Upload, FileText, Check } from 'lucide-react'

export default function MentorVideo() {
  const navigate = useNavigate()
  const [, setCameraAccess] = useState(false)
  const [recording, setRecording] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    navigate('/mentor-profile')
  }

  return (
    <div className="senjr-app">
      <header className="senjr-header">
        <button className="senjr-header-back" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} />
        </button>
        <span className="senjr-header-title">Introduce Yourself</span>
        <div style={{ width: 36 }} />
      </header>

      <div className="senjr-step-indicator">
        <div className="senjr-step-dot" />
        <div className="senjr-step-dot" />
        <div className="senjr-step-dot senjr-step-dot-orange" />
        <div className="senjr-step-dot" />
      </div>

      <div className="senjr-page">
        <div className="senjr-content">
          <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--senjr-text-muted)', marginBottom: 16 }}>Step 3 of 4</p>

          <div className="senjr-card-orange" style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Video size={20} style={{ color: 'var(--senjr-orange)' }} />
              <span style={{ fontSize: 14, fontWeight: 600 }}>60-second video = Your first impression</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 0, marginBottom: 16 }}>
            <button
              type="button"
              style={{
                flex: 1, padding: '10px 0', fontSize: 14, fontWeight: 600,
                border: '2px solid var(--senjr-orange)',
                background: !recording ? 'var(--senjr-orange)' : 'var(--senjr-bg-card)',
                color: !recording ? 'white' : 'var(--senjr-text)',
                borderRadius: '8px 0 0 8px', cursor: 'pointer'
              }}
              onClick={() => setRecording(false)}
            >
              📹 Record Live
            </button>
            <button
              type="button"
              style={{
                flex: 1, padding: '10px 0', fontSize: 14, fontWeight: 600,
                border: '2px solid var(--senjr-orange)',
                background: recording ? 'var(--senjr-orange)' : 'var(--senjr-bg-card)',
                color: recording ? 'white' : 'var(--senjr-text)',
                borderRadius: '0 8px 8px 0', cursor: 'pointer'
              }}
              onClick={() => setRecording(true)}
            >
              <Upload size={16} style={{ display: 'inline', marginRight: 4 }} /> Upload Video
            </button>
          </div>

          <div style={{
            background: '#1A1A2E',
            borderRadius: 16,
            padding: 40,
            textAlign: 'center',
            marginBottom: 16,
            minHeight: 200,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12
          }}>
            <CameraOff size={48} style={{ color: '#94A3B8' }} />
            <p style={{ fontSize: 14, color: '#CBD5E1' }}>Camera access is required to record your introduction.</p>
            <button
              className="senjr-btn senjr-btn-orange"
              style={{ width: 'auto', padding: '10px 24px' }}
              onClick={() => setCameraAccess(true)}
            >
              <Video size={16} /> Allow camera access
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <h2 className="senjr-section-title" style={{ fontSize: 16 }}>
              Topic: Introduce yourself and why you want to mentor
            </h2>

            <div className="senjr-card-flat" style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <FileText size={18} style={{ color: 'var(--senjr-orange)' }} />
                  <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--senjr-orange)' }}>Sample script</span>
                </div>
                <span style={{ fontSize: 18, color: 'var(--senjr-text-muted)' }}>▾</span>
              </div>
            </div>

            <div className="senjr-card" style={{ marginBottom: 24 }}>
              <h3 className="senjr-section-title" style={{ fontSize: 14, marginBottom: 12 }}>Guidelines</h3>
              {[
                'Face clearly visible',
                'Speak in Hindi or Hinglish',
                '60 seconds ideal',
                'Smile and be yourself!'
              ].map((g) => (
                <div key={g} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <div style={{
                    width: 20, height: 20, borderRadius: '50%',
                    border: '2px solid var(--senjr-green)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    <Check size={12} style={{ color: 'var(--senjr-green)' }} />
                  </div>
                  <span style={{ fontSize: 14 }}>{g}</span>
                </div>
              ))}
            </div>

            <button type="submit" className="senjr-btn senjr-btn-orange">
              Submit Video <Check size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
