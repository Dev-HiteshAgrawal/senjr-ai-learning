import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Lock, Camera, FileText, Award, ChevronDown } from 'lucide-react'

export default function MentorVerify() {
  const navigate = useNavigate()
  const [idType, setIdType] = useState('Aadhaar')
  const [upiId, setUpiId] = useState('')
  const [confirmUpi, setConfirmUpi] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    navigate('/mentor-video')
  }

  return (
    <div className="senjr-app">
      <header className="senjr-header">
        <button className="senjr-header-back" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} />
        </button>
        <span className="senjr-header-title" style={{ fontSize: 16 }}>Become a Mentor</span>
        <div style={{ width: 36 }} />
      </header>

      <div className="senjr-step-indicator">
        <div className="senjr-step-dot senjr-step-dot-orange" />
        <div className="senjr-step-dot senjr-step-dot-orange" />
        <div className="senjr-step-dot" />
        <div className="senjr-step-dot" />
      </div>

      <div className="senjr-page">
        <div className="senjr-content">
          <h2 className="senjr-section-title" style={{ fontSize: 18 }}>Verify Your Identity</h2>
          <p style={{ fontSize: 13, color: 'var(--senjr-text-muted)', marginBottom: 16 }}>Step 2 of 4</p>

          <div className="senjr-card-flat" style={{ background: '#EFF6FF', borderColor: '#93C5FD', marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Lock size={16} style={{ color: '#3B82F6' }} />
              <span style={{ fontSize: 13, color: '#1E40AF' }}>Your documents are secure and only used for verification.</span>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="senjr-card" style={{ marginBottom: 20 }}>
              <h3 className="senjr-section-title" style={{ fontSize: 14, marginBottom: 12 }}>Government ID</h3>

              <div className="senjr-input-group">
                <label className="senjr-input-label">ID Type</label>
                <div style={{ position: 'relative' }}>
                  <select className="senjr-input" value={idType} onChange={(e) => setIdType(e.target.value)}>
                    <option>Aadhaar</option>
                    <option>PAN Card</option>
                    <option>Passport</option>
                    <option>Driving License</option>
                  </select>
                  <ChevronDown size={18} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--senjr-text-muted)', pointerEvents: 'none' }} />
                </div>
              </div>

              <div className="senjr-grid-2">
                <div style={{
                  border: '2px dashed var(--senjr-orange)',
                  borderRadius: 12,
                  padding: 20,
                  textAlign: 'center',
                  background: 'var(--senjr-orange-bg)',
                  cursor: 'pointer'
                }}>
                  <p style={{ fontSize: 12, fontWeight: 600, marginBottom: 8 }}>Front Side</p>
                  <Camera size={24} style={{ color: 'var(--senjr-orange)', margin: '0 auto 8px' }} />
                  <p style={{ fontSize: 12, color: 'var(--senjr-text-muted)' }}>Tap to upload</p>
                </div>
                <div style={{
                  border: '2px dashed var(--senjr-orange)',
                  borderRadius: 12,
                  padding: 20,
                  textAlign: 'center',
                  background: 'var(--senjr-orange-bg)',
                  cursor: 'pointer'
                }}>
                  <p style={{ fontSize: 12, fontWeight: 600, marginBottom: 8 }}>Back Side</p>
                  <Camera size={24} style={{ color: 'var(--senjr-orange)', margin: '0 auto 8px' }} />
                  <p style={{ fontSize: 12, color: 'var(--senjr-text-muted)' }}>Tap to upload</p>
                </div>
              </div>
              <p style={{ fontSize: 11, color: 'var(--senjr-text-muted)', marginTop: 8 }}>💡 Tips: Good lighting, all corners visible</p>
            </div>

            <div className="senjr-card" style={{ marginBottom: 20 }}>
              <h3 className="senjr-section-title" style={{ fontSize: 14, marginBottom: 12 }}>Education Proof</h3>
              <label className="senjr-input-label">College Degree or Last Marksheet</label>
              <div style={{
                border: '2px dashed var(--senjr-orange)',
                borderRadius: 12,
                padding: 24,
                textAlign: 'center',
                background: 'var(--senjr-orange-bg)',
                cursor: 'pointer'
              }}>
                <FileText size={24} style={{ color: 'var(--senjr-orange)', margin: '0 auto 8px' }} />
                <p style={{ fontSize: 13, color: 'var(--senjr-text-muted)' }}>Tap to select file</p>
              </div>
              <p style={{ fontSize: 11, color: 'var(--senjr-text-muted)', marginTop: 8 }}>Supported: PDF, JPG, PNG (max 5MB)</p>
            </div>

            <div className="senjr-card" style={{ marginBottom: 20, position: 'relative' }}>
              <span className="senjr-badge senjr-badge-green" style={{ position: 'absolute', top: -8, right: 12 }}>+10 XP</span>
              <h3 className="senjr-section-title" style={{ fontSize: 14, marginBottom: 12 }}>Professional Certificate</h3>
              <label className="senjr-input-label">Any certification (optional but recommended)</label>
              <div style={{
                border: '2px dashed var(--senjr-orange)',
                borderRadius: 12,
                padding: 24,
                textAlign: 'center',
                background: 'var(--senjr-orange-bg)',
                cursor: 'pointer'
              }}>
                <Award size={24} style={{ color: 'var(--senjr-orange)', margin: '0 auto 8px' }} />
                <p style={{ fontSize: 13, color: 'var(--senjr-text-muted)' }}>Tap to select file</p>
              </div>
            </div>

            <div className="senjr-card" style={{ marginBottom: 20 }}>
              <h3 className="senjr-section-title" style={{ fontSize: 14, marginBottom: 12 }}>Payment Details</h3>
              <div className="senjr-input-group">
                <label className="senjr-input-label">UPI ID</label>
                <input className="senjr-input" placeholder="name@upi" value={upiId} onChange={(e) => setUpiId(e.target.value)} />
              </div>
              <div className="senjr-input-group">
                <label className="senjr-input-label">Confirm UPI ID</label>
                <input className="senjr-input" placeholder="name@upi" value={confirmUpi} onChange={(e) => setConfirmUpi(e.target.value)} />
              </div>
              <p style={{ fontSize: 12, color: 'var(--senjr-text-muted)' }}>💰 This is where your earnings will be sent</p>
            </div>

            <button type="submit" className="senjr-btn senjr-btn-orange">
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
