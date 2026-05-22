import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Video, Upload, Play, Loader2 } from 'lucide-react'
import { AuthContext } from '../contexts/AuthContext'
import { submitMentorDocument } from '../services/verification'

export default function MentorVideo() {
  const navigate = useNavigate()
  const auth = useContext(AuthContext)
  const [videoUploaded, setVideoUploaded] = useState(false)
  const [videoUrl, setVideoUrl] = useState('')
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  const handleContinue = async () => {
    if (!videoUploaded || !auth?.user) return
    setLoading(true)
    try {
      if (videoFile) {
        await submitMentorDocument(
          auth.user.uid,
          'intro_video',
          videoFile,
          `mentors/${auth.user.uid}/documents/${videoFile.name}`
        )
      }
      localStorage.setItem('mentor_video_url', videoUrl || videoFile?.name || 'intro.mp4')
      navigate('/onboarding/mentor/profile')
    } catch {
      navigate('/onboarding/mentor/profile')
    }
  }

  const handleVideoSelect = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'video/mp4,video/webm'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        setVideoFile(file)
        setVideoUploaded(true)
      }
    }
    input.click()
  }

  return (
    <div className="senjr-app">
      <header className="senjr-header">
        <div />
        <div style={{ display: 'flex', gap: 4 }}>
          {[0,1,2,3,4].map((i) => <div key={i} style={{ width: 24, height: 4, borderRadius: 2, background: i < 3 ? 'var(--senjr-green)' : 'var(--senjr-border)' }} />)}
        </div>
        <span style={{ fontSize: 12, color: 'var(--senjr-text-muted)' }}>Step 3/5</span>
      </header>

      <div className="senjr-page">
        <div className="senjr-content" style={{ paddingTop: 20 }}>
          <div style={{ width: 56, height: 56, borderRadius: 16, background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, color: '#3B82F6' }}>
            <Video size={28} />
          </div>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 6 }}>Intro Video</h2>
          <p style={{ fontSize: 14, color: 'var(--senjr-text-muted)', marginBottom: 24 }}>Record a short intro video so students can get to know you</p>

          <div style={{ aspectRatio: '16/9', borderRadius: 16, background: '#1E293B', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: 20, cursor: 'pointer' }}>
            {videoUploaded ? (
              <div style={{ textAlign: 'center', color: 'white' }}>
                <Play size={48} style={{ marginBottom: 8, opacity: 0.8 }} />
                <p style={{ fontSize: 14 }}>Your intro video</p>
                <p style={{ fontSize: 12, opacity: 0.5 }}>Intro_Video.mp4</p>
              </div>
            ) : (
              <>
                <Upload size={36} style={{ color: '#64748B', marginBottom: 12 }} />
                <p style={{ color: '#94A3B8', fontSize: 14, marginBottom: 4 }}>Tap to upload video</p>
                <p style={{ color: '#64748B', fontSize: 11 }}>MP4, max 2 minutes, 50MB</p>
              </>
            )}
          </div>

          <div style={{ padding: 16, borderRadius: 12, background: '#FEF3C7', marginBottom: 24 }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: '#D97706', marginBottom: 4 }}>Tips for a great intro video:</p>
            <ul style={{ fontSize: 11, color: '#B45309', lineHeight: 1.8, paddingLeft: 16, margin: 0 }}>
              <li>Introduce yourself and your expertise</li>
              <li>Share what you love about teaching</li>
              <li>Keep it under 60 seconds</li>
              <li>Good lighting and clear audio</li>
            </ul>
          </div>

          {videoUploaded && (
            <div className="senjr-input-group" style={{ marginBottom: 24 }}>
              <label className="senjr-input-label">YouTube link (optional)</label>
              <input className="senjr-input" placeholder="https://youtube.com/..." value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} />
            </div>
          )}

          {!videoUploaded && (
            <button className="senjr-btn" style={{ background: 'var(--senjr-green)', color: 'white' }} onClick={handleVideoSelect}>
              <Upload size={16} /> Upload Video
            </button>
          )}

          {videoUploaded && (
            <button className="senjr-btn" style={{ background: 'var(--senjr-green)', color: 'white' }} onClick={handleContinue} disabled={loading}>
              {loading ? <><Loader2 size={18} className="animate-spin" /> Saving...</> : <>Continue <ArrowRight size={18} /></>}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
