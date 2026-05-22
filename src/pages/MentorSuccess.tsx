import { useNavigate } from 'react-router-dom'
import { CheckCircle, ArrowRight, Clock, Shield, Users } from 'lucide-react'

export default function MentorSuccess() {
  const navigate = useNavigate()

  return (
    <div className="senjr-app">
      <div className="senjr-page">
        <div className="senjr-content" style={{ textAlign: 'center', paddingTop: 60 }}>
          <div className="senjr-pop" style={{ width: 88, height: 88, borderRadius: '50%', background: 'var(--senjr-green-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', border: '3px solid var(--senjr-green)' }}>
            <CheckCircle size={48} style={{ color: 'var(--senjr-green)' }} />
          </div>
          <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: 6 }}>Application Submitted!</h2>
          <p style={{ fontSize: 14, color: 'var(--senjr-text-muted)', marginBottom: 4, lineHeight: 1.6 }}>
            Your mentor profile is under review.
          </p>
          <p style={{ fontSize: 13, color: 'var(--senjr-orange)', marginBottom: 28, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            <Clock size={14} /> Verification usually takes 24-48 hours
          </p>

          <div className="senjr-card-neo" style={{ textAlign: 'left', marginBottom: 24 }}>
            <p style={{ fontSize: 14, fontWeight: 700, marginBottom: 14 }}>What happens next?</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 13 }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--senjr-green-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Shield size={14} style={{ color: 'var(--senjr-green)' }} />
                </div>
                <div>
                  <p style={{ fontWeight: 600, marginBottom: 2 }}>Document Verification</p>
                  <p style={{ color: 'var(--senjr-text-muted)', fontSize: 12 }}>We review your submitted documents</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--senjr-orange-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Users size={14} style={{ color: 'var(--senjr-orange)' }} />
                </div>
                <div>
                  <p style={{ fontWeight: 600, marginBottom: 2 }}>Profile Approval</p>
                  <p style={{ color: 'var(--senjr-text-muted)', fontSize: 12 }}>Once approved, students can book sessions</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--senjr-green-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <CheckCircle size={14} style={{ color: 'var(--senjr-green)' }} />
                </div>
                <div>
                  <p style={{ fontWeight: 600, marginBottom: 2 }}>Start Mentoring</p>
                  <p style={{ color: 'var(--senjr-text-muted)', fontSize: 12 }}>Set availability and start earning</p>
                </div>
              </div>
            </div>
          </div>

          <button className="senjr-btn" style={{ background: 'var(--senjr-green)', color: 'white', boxShadow: '3px 3px 0 var(--senjr-green-dark)' }} onClick={() => navigate('/mentor/apply')}>
            Check Application Status <ArrowRight size={18} />
          </button>

          <p style={{ fontSize: 12, color: 'var(--senjr-text-muted)', marginTop: 16 }}>
            We'll send you an email once your profile is approved.
          </p>
        </div>
      </div>
    </div>
  )
}
