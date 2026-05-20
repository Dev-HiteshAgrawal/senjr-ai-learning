import { useState, useRef, useCallback, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Lock, Camera, FileText, Award, ChevronDown, CheckCircle, XCircle, AlertCircle, Video } from 'lucide-react'
import {
  submitMentorDocument,
  validateFileType,
  validateFileSize,
  type DocumentType,
} from '../services/verification'
import { AuthContext } from '../contexts/AuthContext'

interface UploadedFile {
  type: DocumentType
  status: 'pending' | 'approved' | 'rejected' | 'needs_clarification'
  fileName: string
  error?: string
}

export default function MentorVerify() {
  const navigate = useNavigate()
  const { user } = useContext(AuthContext) || { user: null }
  const [idType, setIdType] = useState('Aadhaar')
  const [upiId, setUpiId] = useState('')
  const [confirmUpi, setConfirmUpi] = useState('')
  const [uploading, setUploading] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<Record<DocumentType, UploadedFile | null>>({
    identity_front: null,
    identity_back: null,
    education: null,
    professional: null,
    intro_video: null,
  })

  const fileInputRefs = useRef<Record<DocumentType, HTMLInputElement | null>>({
    identity_front: null,
    identity_back: null,
    education: null,
    professional: null,
    intro_video: null,
  })

  const handleFileSelect = useCallback(async (documentType: DocumentType, file: File) => {
    if (!user) return

    if (!validateFileType(file)) {
      setUploadedFiles(prev => ({
        ...prev,
        [documentType]: { type: documentType, status: 'pending', fileName: file.name, error: 'Invalid file type' }
      }))
      return
    }

    if (!validateFileSize(file)) {
      setUploadedFiles(prev => ({
        ...prev,
        [documentType]: { type: documentType, status: 'pending', fileName: file.name, error: 'File too large (max 5MB)' }
      }))
      return
    }

    setUploading(true)
    setUploadedFiles(prev => ({
      ...prev,
      [documentType]: { type: documentType, status: 'pending', fileName: file.name }
    }))

    const filePath = `mentors/${user.uid}/documents/${documentType}_${file.name}`

    const result = await submitMentorDocument(user.uid, documentType, file, filePath)

    setUploadedFiles(prev => ({
      ...prev,
      [documentType]: {
        type: documentType,
        status: result.success ? 'pending' : 'pending',
        fileName: file.name,
        error: result.error,
      }
    }))
    setUploading(false)
  }, [user])

  const triggerFileInput = (type: DocumentType) => {
    fileInputRefs.current[type]?.click()
  }

  const getUploadIcon = (type: DocumentType) => {
    if (type === 'intro_video') return <Video size={24} style={{ color: 'var(--senjr-orange)', margin: '0 auto 8px' }} />
    if (type === 'professional') return <Award size={24} style={{ color: 'var(--senjr-orange)', margin: '0 auto 8px' }} />
    if (type === 'education') return <FileText size={24} style={{ color: 'var(--senjr-orange)', margin: '0 auto 8px' }} />
    return <Camera size={24} style={{ color: 'var(--senjr-orange)', margin: '0 auto 8px' }} />
  }

  const renderUploadBox = (type: DocumentType, isRequired: boolean = true) => {
    const uploaded = uploadedFiles[type]
    const hasError = uploaded?.error

    return (
      <div
        style={{
          border: `2px dashed ${hasError ? '#EF4444' : uploaded ? '#10B981' : 'var(--senjr-orange)'}`,
          borderRadius: 12,
          padding: 20,
          textAlign: 'center',
          background: hasError ? '#FEF2F2' : uploaded ? '#F0FDF4' : 'var(--senjr-orange-bg)',
          cursor: uploaded && !hasError ? 'default' : 'pointer',
          transition: 'all 0.2s',
        }}
        onClick={() => !uploaded && !hasError && triggerFileInput(type)}
      >
        <input
          ref={el => { fileInputRefs.current[type] = el }}
          type="file"
          accept={type === 'intro_video' ? 'video/*' : '.pdf,.jpg,.jpeg,.png,.webp'}
          style={{ display: 'none' }}
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) handleFileSelect(type, file)
            e.target.value = ''
          }}
        />
        {uploaded ? (
          hasError ? (
            <>
              <XCircle size={24} style={{ color: '#EF4444', margin: '0 auto 8px' }} />
              <p style={{ fontSize: 12, fontWeight: 600, marginBottom: 4, color: '#EF4444' }}>{uploaded.fileName}</p>
              <p style={{ fontSize: 11, color: '#EF4444' }}>{uploaded.error}</p>
              <p style={{ fontSize: 10, color: '#EF4444', marginTop: 4 }}>Tap to retry</p>
            </>
          ) : (
            <>
              <CheckCircle size={24} style={{ color: '#10B981', margin: '0 auto 8px' }} />
              <p style={{ fontSize: 12, fontWeight: 600, marginBottom: 4, color: '#059669' }}>{uploaded.fileName}</p>
              <p style={{ fontSize: 11, color: '#059669' }}>Uploaded - {isRequired ? 'Verification Pending' : 'Optional'}</p>
            </>
          )
        ) : (
          <>
            {getUploadIcon(type)}
            <p style={{ fontSize: 12, color: 'var(--senjr-text-muted)' }}>Tap to upload</p>
          </>
        )}
      </div>
    )
  }

  const canContinue = uploadedFiles.identity_front && uploadedFiles.identity_back && uploadedFiles.education && !uploading

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sessionStorage.setItem('signupVerification', JSON.stringify({
      idType,
      upiId,
      uploadedDocuments: uploadedFiles,
    }))
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

          <div className="senjr-card-flat" style={{ background: '#FFFBEB', borderColor: '#FCD34D', marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
              <AlertCircle size={16} style={{ color: '#F59E0B', marginTop: 2, flexShrink: 0 }} />
              <div>
                <p style={{ fontSize: 13, color: '#92400E', fontWeight: 600, marginBottom: 4 }}>Pending Manual Review</p>
                <p style={{ fontSize: 12, color: '#92400E' }}>After submission, our team reviews your documents (usually within 24-48 hours). You'll receive an email notification once approved.</p>
              </div>
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
                <div>
                  <p style={{ fontSize: 12, fontWeight: 600, marginBottom: 8 }}>Front Side *</p>
                  {renderUploadBox('identity_front')}
                </div>
                <div>
                  <p style={{ fontSize: 12, fontWeight: 600, marginBottom: 8 }}>Back Side *</p>
                  {renderUploadBox('identity_back')}
                </div>
              </div>
              <p style={{ fontSize: 11, color: 'var(--senjr-text-muted)', marginTop: 8 }}>Tips: Good lighting, all corners visible</p>
            </div>

            <div className="senjr-card" style={{ marginBottom: 20 }}>
              <h3 className="senjr-section-title" style={{ fontSize: 14, marginBottom: 12 }}>Education Proof *</h3>
              <label className="senjr-input-label">College Degree or Last Marksheet</label>
              {renderUploadBox('education')}
              <p style={{ fontSize: 11, color: 'var(--senjr-text-muted)', marginTop: 8 }}>Supported: PDF, JPG, PNG (max 5MB)</p>
            </div>

            <div className="senjr-card" style={{ marginBottom: 20, position: 'relative' }}>
              <span className="senjr-badge senjr-badge-green" style={{ position: 'absolute', top: -8, right: 12 }}>+10 XP</span>
              <h3 className="senjr-section-title" style={{ fontSize: 14, marginBottom: 12 }}>Professional Certificate</h3>
              <label className="senjr-input-label">Any certification (optional but recommended)</label>
              {renderUploadBox('professional', false)}
            </div>

            <div className="senjr-card" style={{ marginBottom: 20, position: 'relative' }}>
              <span className="senjr-badge senjr-badge-green" style={{ position: 'absolute', top: -8, right: 12 }}>+10 XP</span>
              <h3 className="senjr-section-title" style={{ fontSize: 14, marginBottom: 12 }}>Intro Video</h3>
              <label className="senjr-input-label">Optional: Record a short intro video</label>
              {renderUploadBox('intro_video', false)}
              <p style={{ fontSize: 11, color: 'var(--senjr-text-muted)', marginTop: 8 }}>Max 30 seconds, MP4 format (max 20MB)</p>
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
              <p style={{ fontSize: 12, color: 'var(--senjr-text-muted)' }}>This is where your earnings will be sent</p>
            </div>

            <button type="submit" className="senjr-btn senjr-btn-orange" disabled={!canContinue} style={{ opacity: canContinue ? 1 : 0.5 }}>
              Continue
            </button>

            {!canContinue && (
              <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--senjr-text-muted)', marginTop: 8 }}>
                <AlertCircle size={12} style={{ display: 'inline', marginRight: 4 }} />
                Please upload required documents to continue
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}