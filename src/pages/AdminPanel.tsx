import { useState, useEffect, useContext } from 'react'
import { Users, Calendar, DollarSign, Settings, AlertTriangle, CreditCard, Megaphone, ChevronRight, ArrowUp, CheckCircle, XCircle, Eye, FileText, Shield, Clock, Search, MessageSquare, Flag, Download, Filter } from 'lucide-react'
import {
  getPendingVerifications,
  reviewDocument,
  getVerificationFlags,
  getDocumentTypeLabel,
  getStatusColor,
  getStatusLabel,
  updateMentorVerificationStatus,
  type MentorDocument,
  type DocumentStatus,
} from '../services/verification'
import { AuthContext } from '../contexts/AuthContext'

interface PendingMentor {
  mentorId: string
  mentorName?: string
  mentorEmail?: string
  documents: MentorDocument[]
  riskLevel: 'low' | 'medium' | 'high'
  submittedAt: string
}

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('overview')
  const { user } = useContext(AuthContext) || { user: null }
  const [pendingMentors, setPendingMentors] = useState<PendingMentor[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedMentor, setSelectedMentor] = useState<PendingMentor | null>(null)
  const [reviewNotes, setReviewNotes] = useState('')
  const [showReviewModal, setShowReviewModal] = useState(false)
  const [pendingCount, setPendingCount] = useState(0)

  const stats = [
    { label: 'Total Users', value: '156', change: '+12%' },
    { label: 'Active Mentors', value: '23', change: null as string | null },
    { label: "Today's Sessions", value: '8', change: null as string | null },
    { label: 'Revenue', value: '₹4,200', change: null as string | null },
  ]

  const contentReviewQueue = [
    { id: 1, title: 'UP Police Reasoning Shortcuts', author: 'Rahul Sharma', type: 'PDF', submittedAt: '3 hours ago', status: 'pending' },
    { id: 2, title: 'Economics Formula Sheet', author: 'Neha Gupta', type: 'PDF', submittedAt: '1 day ago', status: 'pending' },
  ]

  const recentSignups = [
    { name: 'Rahul K.', email: 'rahul@univ.edu', role: 'Student', time: '2m ago', avatar: 'RK' },
    { name: 'Dr. Sharma', email: 'sharma@mentors.org', role: 'Mentor', time: '1h ago', avatar: 'DS' },
    { name: 'Anita P.', email: 'anita.p@mail.com', role: 'Student', time: '3h ago', avatar: 'AP' },
    { name: 'Vikram S.', email: 'vikram.s@univ.edu', role: 'Student', time: '5h ago', avatar: 'VS' },
  ]

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Users },
    { id: 'verification', label: 'Verification', icon: Shield },
    { id: 'content', label: 'Content', icon: FileText },
    { id: 'users', label: 'Users', icon: Users },
  ]

  const fetchPendingVerifications = async () => {
    setLoading(true)
    try {
      const docs = await getPendingVerifications()
      const mentorMap = new Map<string, PendingMentor>()
      for (const doc of docs) {
        if (!mentorMap.has(doc.mentorId)) {
          mentorMap.set(doc.mentorId, { mentorId: doc.mentorId, mentorName: doc.mentorName, mentorEmail: doc.mentorEmail, documents: [], riskLevel: 'low', submittedAt: doc.submittedAt })
        }
        mentorMap.get(doc.mentorId)!.documents.push(doc)
      }
      const pending = Array.from(mentorMap.values()).map(m => {
        let riskLevel: 'low' | 'medium' | 'high' = 'low'
        for (const doc of m.documents) {
          const flags = getVerificationFlags(doc, m.documents, m.mentorName)
          if (flags.duplicateHash || flags.suspicious) riskLevel = 'high'
          else if (flags.mismatchedNames || flags.lowQuality) riskLevel = 'medium'
        }
        return { ...m, riskLevel }
      })
      setPendingMentors(pending)
      setPendingCount(pending.length)
    } catch (err) { console.error('Failed to fetch verifications:', err) }
    setLoading(false)
  }

  useEffect(() => {
    if (activeTab === 'verification') { fetchPendingVerifications() }
  }, [activeTab])

  const handleReview = async (docId: string, status: DocumentStatus) => {
    if (!user) return
    const result = await reviewDocument(docId, status, reviewNotes, user.uid)
    if (result.success) {
      setShowReviewModal(false); setReviewNotes(''); setSelectedMentor(null); fetchPendingVerifications()
      if (selectedMentor) {
        const { doc, updateDoc: firestoreUpdate } = await import('firebase/firestore')
        const { db } = await import('../firebase/config')
        const allDocsApproved = selectedMentor.documents.every(d => d.id === docId ? status === 'approved' : d.status === 'approved')
        if (allDocsApproved) {
          await updateMentorVerificationStatus(selectedMentor.mentorId, 'verified')
          if (db) {
            await firestoreUpdate(doc(db, 'users', selectedMentor.mentorId), {
              role: 'mentor',
              updatedAt: new Date().toISOString(),
            })
          }
        } else if (selectedMentor.documents.every(d => d.id === docId ? status === 'rejected' : d.status === 'rejected')) {
          await updateMentorVerificationStatus(selectedMentor.mentorId, 'rejected')
        }
      }
    }
  }

  const openReviewModal = (mentor: PendingMentor) => { setSelectedMentor(mentor); setReviewNotes(''); setShowReviewModal(true) }

  const getRiskBadgeColor = (risk: 'low' | 'medium' | 'high') => {
    switch (risk) {
      case 'high': return { bg: '#FEF2F2', color: '#EF4444', border: '#FECACA' }
      case 'medium': return { bg: '#FFFBEB', color: '#F59E0B', border: '#FDE68A' }
      case 'low': return { bg: '#F0FDF4', color: '#10B981', border: '#A7F3D0' }
    }
  }

  const renderReviewModal = () => {
    if (!showReviewModal || !selectedMentor) return null
    return (
      <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 16 }}>
        <div style={{ background: 'white', borderRadius: 16, padding: 24, maxWidth: 480, width: '100%', maxHeight: '80vh', overflow: 'auto' }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Review Documents</h3>
          <p style={{ fontSize: 14, color: 'var(--senjr-text-muted)', marginBottom: 16 }}>{selectedMentor.mentorName} - {selectedMentor.mentorEmail}</p>
          <div style={{ marginBottom: 16 }}>
            {selectedMentor.documents.map((doc) => (
              <div key={doc.id} style={{ padding: 12, border: '1px solid var(--senjr-border)', borderRadius: 8, marginBottom: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <p style={{ fontSize: 14, fontWeight: 600 }}>{getDocumentTypeLabel(doc.documentType)}</p>
                  <span style={{ padding: '4px 8px', borderRadius: 4, background: getStatusColor(doc.status), color: 'white', fontSize: 11, fontWeight: 600 }}>{getStatusLabel(doc.status)}</span>
                </div>
                <p style={{ fontSize: 12, color: 'var(--senjr-text-muted)' }}>{doc.fileName}</p>
                {doc.flaggedReasons && doc.flaggedReasons.length > 0 && (
                  <div style={{ marginTop: 8 }}>
                    {doc.flaggedReasons.map((reason, i) => (
                      <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '2px 6px', background: '#FEF2F2', color: '#EF4444', fontSize: 10, borderRadius: 4, marginRight: 4 }}>
                        <Flag size={10} /> {reason}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="senjr-input-group" style={{ marginBottom: 16 }}>
            <label className="senjr-input-label">Reviewer Notes</label>
            <textarea className="senjr-input" rows={3} placeholder="Add notes about this verification..." value={reviewNotes} onChange={(e) => setReviewNotes(e.target.value)} />
          </div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            {selectedMentor.documents.map((doc) => (
              <div key={doc.id} style={{ flex: 1 }}>
                <p style={{ fontSize: 11, fontWeight: 600, marginBottom: 4, textAlign: 'center' }}>{getDocumentTypeLabel(doc.documentType).split(' ')[0]}</p>
                <div style={{ display: 'flex', gap: 4 }}>
                  <button onClick={() => handleReview(doc.id, 'approved')} style={{ flex: 1, padding: '8px 4px', background: '#F0FDF4', color: '#10B981', border: '1px solid #10B981', borderRadius: 6, fontSize: 11, fontWeight: 600, cursor: 'pointer' }}>
                    <CheckCircle size={12} style={{ display: 'inline', marginRight: 2 }} /> Approve
                  </button>
                  <button onClick={() => handleReview(doc.id, 'rejected')} style={{ flex: 1, padding: '8px 4px', background: '#FEF2F2', color: '#EF4444', border: '1px solid #EF4444', borderRadius: 6, fontSize: 11, fontWeight: 600, cursor: 'pointer' }}>
                    <XCircle size={12} style={{ display: 'inline', marginRight: 2 }} /> Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => selectedMentor.documents.forEach(d => handleReview(d.id, 'needs_clarification'))} className="senjr-btn senjr-btn-sm" style={{ flex: 1, border: '1px solid var(--senjr-border)', borderRadius: 'var(--senjr-radius)' }}>
              <MessageSquare size={14} style={{ display: 'inline', marginRight: 4 }} /> Request Clarification
            </button>
            <button onClick={() => setShowReviewModal(false)} className="senjr-btn senjr-btn-sm" style={{ padding: '8px 16px' }}>Close</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="senjr-app">
      <header className="senjr-header" style={{ background: 'var(--senjr-black)', color: 'white', border: 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 18, fontWeight: 800, color: 'var(--senjr-green)' }}>SENJR</span>
          <span style={{ fontSize: 12, color: '#94A3B8', fontWeight: 500 }}>Admin</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer' }}>
            <AlertTriangle size={20} style={{ color: 'var(--senjr-orange)' }} />
            <span style={{ position: 'absolute', top: -4, right: -4, width: 16, height: 16, borderRadius: '50%', background: '#EF4444', color: 'white', fontSize: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>{pendingCount}</span>
          </button>
          <div className="senjr-avatar" style={{ width: 32, height: 32, fontSize: 14, background: 'var(--senjr-green)', color: 'white' }}>A</div>
        </div>
      </header>

      <div style={{ display: 'flex', background: 'var(--senjr-bg-card)', borderBottom: '1px solid var(--senjr-border)', overflowX: 'auto' }}>
        {tabs.map((tab) => {
          const Icon = tab.icon; const count = tab.id === 'verification' ? pendingCount : 0
          return (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              style={{ flex: 1, padding: '12px 8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, borderBottom: activeTab === tab.id ? '2px solid var(--senjr-green)' : '2px solid transparent', background: activeTab === tab.id ? 'var(--senjr-green-lighter)' : 'transparent', color: activeTab === tab.id ? 'var(--senjr-green)' : 'var(--senjr-text-muted)', cursor: 'pointer', fontSize: 11, fontWeight: 600, minWidth: 70 }}>
              <Icon size={18} />
              {tab.label}
              {count > 0 && <span style={{ position: 'absolute', top: 8, right: '50%', transform: 'translateX(20px)', width: 8, height: 8, borderRadius: '50%', background: '#EF4444' }} />}
            </button>
          )
        })}
      </div>

      <div className="senjr-page">
        <div className="senjr-content">
          {activeTab === 'overview' && (
            <>
              <div className="senjr-grid-2" style={{ marginBottom: 24 }}>
                {stats.map((s) => (
                  <div key={s.label} className="senjr-card" style={{ border: 'none', marginBottom: 0 }}>
                    <p style={{ fontSize: 11, color: 'var(--senjr-text-muted)', marginBottom: 4, fontWeight: 600 }}>{s.label.toUpperCase()}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: s.label === 'Revenue' ? 22 : 28, fontWeight: 800 }}>{s.value}</span>
                      {s.change && <span className="senjr-badge senjr-badge-green"><ArrowUp size={10} /> {s.change}</span>}
                    </div>
                  </div>
                ))}
              </div>

              <h2 className="senjr-section-title" style={{ fontSize: 16, marginBottom: 12 }}>Pending Actions</h2>
              <div className="senjr-card" style={{ display: 'flex', alignItems: 'center', gap: 12, border: 'none', marginBottom: 8, cursor: 'pointer' }} onClick={() => setActiveTab('verification')}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: '#FEF2F2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Shield size={20} style={{ color: 'var(--senjr-orange)' }} />
                </div>
                <span style={{ flex: 1, fontSize: 14, fontWeight: 500, color: 'var(--senjr-orange)' }}>{pendingCount} Mentor Verifications Pending</span>
                <ChevronRight size={18} style={{ color: 'var(--senjr-text-muted)' }} />
              </div>
              <div className="senjr-card" style={{ display: 'flex', alignItems: 'center', gap: 12, border: 'none', marginBottom: 8, cursor: 'pointer' }} onClick={() => setActiveTab('content')}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: '#F5F3FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <CreditCard size={20} style={{ color: '#8B5CF6' }} />
                </div>
                <span style={{ flex: 1, fontSize: 14, fontWeight: 500, color: '#8B5CF6' }}>3 Payments to Verify</span>
                <ChevronRight size={18} style={{ color: 'var(--senjr-text-muted)' }} />
              </div>
              <div className="senjr-card" style={{ display: 'flex', alignItems: 'center', gap: 12, border: 'none', marginBottom: 8 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: '#FEF2F2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Megaphone size={20} style={{ color: '#EF4444' }} />
                </div>
                <span style={{ flex: 1, fontSize: 14, fontWeight: 500, color: '#EF4444' }}>2 Student Complaints</span>
                <ChevronRight size={18} style={{ color: 'var(--senjr-text-muted)' }} />
              </div>

              <h2 className="senjr-section-title" style={{ fontSize: 16, marginTop: 24, marginBottom: 12 }}>Recent Signups</h2>
              {recentSignups.map((u) => (
                <div key={u.email} className="senjr-card" style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8, border: 'none' }}>
                  <div className="senjr-avatar" style={{ width: 40, height: 40, fontSize: 14, background: 'var(--senjr-green-lighter)' }}>{u.avatar || u.name.slice(0, 2).toUpperCase()}</div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 14, fontWeight: 600 }}>{u.name}</p>
                    <p style={{ fontSize: 12, color: 'var(--senjr-text-muted)' }}>{u.email}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: 12, color: 'var(--senjr-text-muted)' }}>{u.time}</p>
                    <span className={`senjr-badge ${u.role === 'Mentor' ? 'senjr-badge-green' : 'senjr-badge-orange'}`} style={{ fontSize: 11 }}>{u.role}</span>
                  </div>
                </div>
              ))}
            </>
          )}

          {activeTab === 'verification' && (
            <>
              <div style={{ marginBottom: 16 }}>
                <h2 className="senjr-section-title" style={{ fontSize: 18, marginBottom: 4 }}>Mentor Verification Queue</h2>
                <p style={{ fontSize: 13, color: 'var(--senjr-text-muted)' }}>Review and verify mentor documents</p>
              </div>
              <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
                <div style={{ position: 'relative', flex: 1 }}>
                  <Search size={18} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--senjr-text-muted)' }} />
                  <input className="senjr-input" style={{ paddingLeft: 40 }} placeholder="Search mentors..." />
                </div>
                <button className="senjr-btn senjr-btn-sm" style={{ padding: '8px 12px', background: 'var(--senjr-bg)' }}><Filter size={14} /></button>
              </div>
              {loading ? (
                <div style={{ textAlign: 'center', padding: 40 }}><p style={{ color: 'var(--senjr-text-muted)' }}>Loading verifications...</p></div>
              ) : pendingMentors.length === 0 ? (
                <div style={{ textAlign: 'center', padding: 40, background: '#F0FDF4', borderRadius: 12 }}>
                  <CheckCircle size={32} style={{ color: '#10B981', marginBottom: 8 }} />
                  <p style={{ fontSize: 14, fontWeight: 600, color: '#059669' }}>All caught up!</p>
                  <p style={{ fontSize: 12, color: '#059669' }}>No pending verifications</p>
                </div>
              ) : (
                pendingMentors.map((v) => {
                  const riskStyle = getRiskBadgeColor(v.riskLevel)
                  return (
                    <div key={v.mentorId} className="senjr-card" style={{ marginBottom: 16, border: 'none' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          <div className="senjr-avatar" style={{ width: 44, height: 44, fontSize: 16, background: riskStyle.bg, color: riskStyle.color }}>
                            {(v.mentorName || 'UN').split(' ').map(n => n[0]).join('').slice(0, 2)}
                          </div>
                          <div>
                            <p style={{ fontSize: 15, fontWeight: 700 }}>{v.mentorName || 'Unknown'}</p>
                            <p style={{ fontSize: 12, color: 'var(--senjr-text-muted)' }}>{v.mentorEmail || 'No email'}</p>
                          </div>
                        </div>
                        <div style={{ padding: '4px 8px', borderRadius: 6, background: riskStyle.bg, color: riskStyle.color, border: `1px solid ${riskStyle.border}`, fontSize: 11, fontWeight: 600 }}>
                          {v.riskLevel === 'high' ? 'High Risk' : v.riskLevel === 'medium' ? 'Medium' : 'Low Risk'}
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                        {v.documents.map((doc) => (
                          <div key={doc.id} style={{ flex: 1, padding: '8px', borderRadius: 8, background: doc.flaggedReasons?.length ? '#FEF2F2' : 'var(--senjr-bg)', border: `1px solid ${doc.flaggedReasons?.length ? '#FECACA' : 'var(--senjr-border)'}`, textAlign: 'center' }}>
                            <FileText size={16} style={{ color: doc.flaggedReasons?.length ? '#EF4444' : 'var(--senjr-text-muted)', margin: '0 auto 4px' }} />
                            <p style={{ fontSize: 11, fontWeight: 600 }}>{getDocumentTypeLabel(doc.documentType).split(' ')[0]}</p>
                            <p style={{ fontSize: 10, color: doc.flaggedReasons?.length ? '#EF4444' : 'var(--senjr-text-muted)' }}>{doc.flaggedReasons?.length ? 'Flagged' : getStatusLabel(doc.status)}</p>
                          </div>
                        ))}
                      </div>
                      <p style={{ fontSize: 12, color: 'var(--senjr-text-muted)', marginBottom: 12 }}>
                        <Clock size={12} style={{ display: 'inline', marginRight: 4 }} /> Submitted {v.submittedAt}
                      </p>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button onClick={() => openReviewModal(v)} className="senjr-btn senjr-btn-sm" style={{ flex: 1, background: 'var(--senjr-green)', color: 'white', borderRadius: 'var(--senjr-radius)' }}>
                          <Eye size={14} style={{ display: 'inline', marginRight: 4 }} /> Review
                        </button>
                        <button className="senjr-btn senjr-btn-sm" style={{ padding: '8px 12px', border: '1px solid var(--senjr-border)', borderRadius: 'var(--senjr-radius)' }}>
                          <Download size={14} />
                        </button>
                      </div>
                    </div>
                  )
                })
              )}
            </>
          )}

          {activeTab === 'content' && (
            <>
              <div style={{ marginBottom: 16 }}>
                <h2 className="senjr-section-title" style={{ fontSize: 18, marginBottom: 4 }}>Content Review Queue</h2>
                <p style={{ fontSize: 13, color: 'var(--senjr-text-muted)' }}>Review and approve mentor resources</p>
              </div>
              {contentReviewQueue.map((c) => (
                <div key={c.id} className="senjr-card" style={{ marginBottom: 12, border: 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 10, background: 'var(--senjr-green-lighter)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <FileText size={20} style={{ color: 'var(--senjr-green)' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 14, fontWeight: 600 }}>{c.title}</p>
                      <p style={{ fontSize: 12, color: 'var(--senjr-text-muted)' }}>By {c.author} - {c.type}</p>
                    </div>
                    <span className="senjr-badge senjr-badge-orange" style={{ fontSize: 11 }}>Pending</span>
                  </div>
                  <p style={{ fontSize: 12, color: 'var(--senjr-text-muted)', marginBottom: 12 }}><Clock size={12} style={{ display: 'inline', marginRight: 4 }} /> Submitted {c.submittedAt}</p>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button className="senjr-btn senjr-btn-sm" style={{ flex: 1, background: 'var(--senjr-green)', color: 'white', borderRadius: 'var(--senjr-radius)' }}>
                      <CheckCircle size={14} style={{ display: 'inline', marginRight: 4 }} /> Approve
                    </button>
                    <button className="senjr-btn senjr-btn-sm" style={{ flex: 1, background: '#FEF2F2', color: '#EF4444', borderRadius: 'var(--senjr-radius)', border: '1px solid #EF4444' }}>
                      <XCircle size={14} style={{ display: 'inline', marginRight: 4 }} /> Reject
                    </button>
                    <button className="senjr-btn senjr-btn-sm" style={{ padding: '8px 12px', border: '1px solid var(--senjr-border)', borderRadius: 'var(--senjr-radius)' }}>
                      <Eye size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}

          {activeTab === 'users' && (
            <>
              <div style={{ marginBottom: 16 }}>
                <h2 className="senjr-section-title" style={{ fontSize: 18, marginBottom: 4 }}>All Users</h2>
                <p style={{ fontSize: 13, color: 'var(--senjr-text-muted)' }}>Manage student and mentor accounts</p>
              </div>
              <div style={{ position: 'relative', marginBottom: 20 }}>
                <Search size={18} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--senjr-text-muted)' }} />
                <input className="senjr-input" style={{ paddingLeft: 40 }} placeholder="Search users..." />
              </div>
              {recentSignups.map((u) => (
                <div key={u.email} className="senjr-card" style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8, border: 'none' }}>
                  <div className="senjr-avatar" style={{ width: 40, height: 40, fontSize: 14, background: 'var(--senjr-green-lighter)' }}>{u.avatar || u.name.slice(0, 2).toUpperCase()}</div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 14, fontWeight: 600 }}>{u.name}</p>
                    <p style={{ fontSize: 12, color: 'var(--senjr-text-muted)' }}>{u.email}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: 12, color: 'var(--senjr-text-muted)' }}>{u.time}</p>
                    <span className={`senjr-badge ${u.role === 'Mentor' ? 'senjr-badge-green' : 'senjr-badge-orange'}`} style={{ fontSize: 11 }}>{u.role}</span>
                  </div>
                </div>
              ))}
              <button className="senjr-btn senjr-btn-sm" style={{ marginTop: 16, border: '1px solid var(--senjr-border)', borderRadius: 'var(--senjr-radius)' }}>View All Users</button>
            </>
          )}
        </div>
      </div>

      {renderReviewModal()}

      <nav className="senjr-bottom-nav">
        <button className="senjr-nav-item senjr-nav-item-active"><Users size={20} /> Users</button>
        <button className="senjr-nav-item"><Calendar size={20} /> Sessions</button>
        <button className="senjr-nav-item"><DollarSign size={20} /> Payments</button>
        <button className="senjr-nav-item"><Settings size={20} /> Settings</button>
      </nav>
    </div>
  )
}
