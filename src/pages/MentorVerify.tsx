import { useState, useRef, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Shield, Upload, Loader2, CheckCircle, AlertCircle, X } from 'lucide-react'
import { AuthContext } from '../contexts/AuthContext'
import { submitMentorDocument, validateFileType, validateFileSize } from '../services/verification'

const idOptions = [
  { id: 'identity_front' as const, label: 'Aadhaar (Front)' },
  { id: 'identity_back' as const, label: 'Aadhaar (Back)' },
  { id: 'pan' as const, label: 'PAN Card' },
  { id: 'college' as const, label: 'College ID' },
]

type DocType = 'identity_front' | 'identity_back' | 'pan' | 'college'

export default function MentorVerify() {
  const navigate = useNavigate()
  const auth = useContext(AuthContext)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [idType, setIdType] = useState<DocType>('identity_front')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('')
    const file = e.target.files?.[0]
    if (!file) return
    if (!validateFileType(file)) {
      setError('Invalid file type. Allowed: PDF, JPG, PNG, WEBP')
      return
    }
    if (!validateFileSize(file)) {
      setError('File too large. Maximum 5MB allowed')
      return
    }
    setSelectedFile(file)
  }

  const handleVerify = async () => {
    if (!selectedFile || !auth?.user) return
    setError('')
    setLoading(true)
    try {
      const mapType = idType === 'pan' ? 'identity_front' : idType === 'college' ? 'education' : idType
      const result = await submitMentorDocument(
        auth.user.uid,
        mapType,
        selectedFile,
        `mentors/${auth.user.uid}/documents/${selectedFile.name}`
      )
      if (result.success) {
        setSuccess(true)
        setTimeout(() => navigate('/onboarding/mentor/video'), 1500)
      } else {
        setError(result.error || 'Verification failed')
      }
    } catch {
      setError('Failed to submit verification. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="senjr-app">
      <header className="senjr-header">
        <div />
        <div style={{ display: 'flex', gap: 4 }}>
          {[0,1,2,3,4].map((i) => <div key={i} style={{ width: 24, height: 4, borderRadius: 2, background: i < 2 ? 'var(--senjr-green)' : 'var(--senjr-border)' }} />)}
        </div>
        <span style={{ fontSize: 12, color: 'var(--senjr-text-muted)' }}>Step 2/5</span>
      </header>

      <div className="senjr-page">
        <div className="senjr-content" style={{ paddingTop: 20 }}>
          <div style={{ width: 56, height: 56, borderRadius: 16, background: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, color: '#D97706' }}>
            <Shield size={28} />
          </div>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 6 }}>Identity Verification</h2>
          <p style={{ fontSize: 14, color: 'var(--senjr-text-muted)', marginBottom: 24 }}>We verify all mentors to ensure a safe learning environment</p>

          {success ? (
            <div className="senjr-card" style={{ textAlign: 'center', border: '1px solid var(--senjr-green)', background: 'var(--senjr-green-light)', marginBottom: 24, padding: 32 }}>
              <CheckCircle size={48} style={{ color: 'var(--senjr-green)', marginBottom: 12 }} />
              <p style={{ fontSize: 18, fontWeight: 700, color: 'var(--senjr-green-dark)' }}>Document Submitted!</p>
              <p style={{ fontSize: 13, color: 'var(--senjr-text-muted)' }}>Redirecting to next step...</p>
            </div>
          ) : (
            <>
              <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>ID Type</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, marginBottom: 20 }}>
                {idOptions.map((opt) => (
                  <button key={opt.id} onClick={() => setIdType(opt.id)}
                    style={{ padding: 14, borderRadius: 12, background: idType === opt.id ? 'linear-gradient(135deg, #ECFDF5, #FFF7ED)' : 'var(--senjr-bg)', border: idType === opt.id ? '1.5px solid var(--senjr-green)' : '1px solid var(--senjr-border)', cursor: 'pointer', textAlign: 'center', fontWeight: 600, fontSize: 14, color: idType === opt.id ? 'var(--senjr-green)' : 'var(--senjr-text)' }}>
                    {opt.label}
                  </button>
                ))}
              </div>

              <div style={{ border: `2px dashed ${error ? '#EF4444' : selectedFile ? 'var(--senjr-green)' : 'var(--senjr-border)'}`, borderRadius: 12, padding: 24, textAlign: 'center', marginBottom: error ? 8 : 24, cursor: 'pointer', background: selectedFile ? 'var(--senjr-green-light)' : error ? '#FEF2F2' : 'transparent' }}
                onClick={() => fileInputRef.current?.click()}>
                {selectedFile ? (
                  <div>
                    <CheckCircle size={24} style={{ color: 'var(--senjr-green)', marginBottom: 8 }} />
                    <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>{selectedFile.name}</p>
                    <p style={{ fontSize: 11, color: 'var(--senjr-text-muted)' }}>{(selectedFile.size / 1024).toFixed(1)} KB</p>
                    <button onClick={(e) => { e.stopPropagation(); setSelectedFile(null) }}
                      style={{ marginTop: 8, background: 'none', border: 'none', cursor: 'pointer', color: '#EF4444', fontSize: 12, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                      <X size={14} /> Remove
                    </button>
                  </div>
                ) : (
                  <>
                    <Upload size={24} style={{ color: 'var(--senjr-text-muted)', marginBottom: 8 }} />
                    <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>Upload document photo</p>
                    <p style={{ fontSize: 11, color: 'var(--senjr-text-muted)' }}>JPG, PNG or PDF. Max 5MB</p>
                  </>
                )}
                <input ref={fileInputRef} type="file" accept=".pdf,.jpg,.jpeg,.png,.webp" onChange={handleFileSelect} style={{ display: 'none' }} />
              </div>

              {error && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 12px', background: '#FEF2F2', borderRadius: 8, marginBottom: 20, color: '#EF4444', fontSize: 13 }}>
                  <AlertCircle size={14} /> {error}
                </div>
              )}

              <button className="senjr-btn" style={{ background: selectedFile ? 'var(--senjr-green)' : 'var(--senjr-border)', color: selectedFile ? 'white' : 'var(--senjr-text-muted)' }} disabled={!selectedFile || loading} onClick={handleVerify}>
                {loading ? <><Loader2 size={18} className="animate-spin" /> Submitting...</> : <>Submit for Verification <ArrowRight size={18} /></>}
              </button>
            </>
          )}

          <p style={{ fontSize: 11, color: 'var(--senjr-text-muted)', textAlign: 'center', marginTop: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
            <AlertCircle size={12} /> Your information is kept secure and never shared
          </p>
        </div>
      </div>
    </div>
  )
}
