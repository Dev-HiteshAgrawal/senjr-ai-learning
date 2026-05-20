import { useState } from 'react'
import { Menu, Users, Calendar, DollarSign, Settings, AlertTriangle, CreditCard, Megaphone, ChevronRight, ArrowUp, CheckCircle, XCircle, Eye, FileText, Shield, Clock, Search } from 'lucide-react'

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('overview')

  const stats = [
    { label: 'Total Users', value: '156', change: '+12%' },
    { label: 'Active Mentors', value: '23', change: null as string | null },
    { label: "Today's Sessions", value: '8', change: null as string | null },
    { label: 'Revenue', value: '₹4,200', change: null as string | null },
  ]

  const pendingVerifications = [
    {
      id: 1,
      name: 'Rahul Sharma',
      email: 'rahul@email.com',
      submittedAt: '2 hours ago',
      documents: [
        { type: 'Aadhaar', status: 'pending' },
        { type: 'Degree', status: 'pending' },
        { type: 'Certificate', status: 'pending' },
      ],
      riskLevel: 'low',
    },
    {
      id: 2,
      name: 'Priya Singh',
      email: 'priya@email.com',
      submittedAt: '5 hours ago',
      documents: [
        { type: 'PAN Card', status: 'pending' },
        { type: 'Marksheet', status: 'pending' },
      ],
      riskLevel: 'medium',
    },
    {
      id: 3,
      name: 'Amit Kumar',
      email: 'amit@email.com',
      submittedAt: '1 day ago',
      documents: [
        { type: 'Aadhaar', status: 'flagged' },
        { type: 'Degree', status: 'pending' },
      ],
      riskLevel: 'high',
    },
  ]

  const contentReviewQueue = [
    {
      id: 1,
      title: 'UP Police Reasoning Shortcuts',
      author: 'Rahul Sharma',
      type: 'PDF',
      submittedAt: '3 hours ago',
      status: 'pending',
    },
    {
      id: 2,
      title: 'Economics Formula Sheet',
      author: 'Neha Gupta',
      type: 'PDF',
      submittedAt: '1 day ago',
      status: 'pending',
    },
  ]

  const recentSignups = [
    { name: 'Rahul K.', email: 'rahul@univ.edu', role: 'Student', time: '2m ago', avatar: 'RK' },
    { name: 'Dr. Sharma', email: 'sharma@mentors.org', role: 'Mentor', time: '1h ago', avatar: 'DS' },
    { name: 'Anita P.', email: 'anita.p@mail.com', role: 'Student', time: '3h ago', avatar: 'AP' },
    { name: 'Vikram S.', email: 'vikram.s@univ.edu', role: 'Student', time: '5h ago', avatar: 'VS' },
  ]

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Menu },
    { id: 'verification', label: 'Verification', icon: Shield },
    { id: 'content', label: 'Content', icon: FileText },
    { id: 'users', label: 'Users', icon: Users },
  ]

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
            <span style={{
              position: 'absolute', top: -4, right: -4,
              width: 16, height: 16, borderRadius: '50%',
              background: '#EF4444', color: 'white',
              fontSize: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700
            }}>5</span>
          </button>
          <div className="senjr-avatar" style={{ width: 32, height: 32, fontSize: 14, background: 'var(--senjr-green)', color: 'white' }}>A</div>
        </div>
      </header>

      <div style={{
        display: 'flex',
        background: 'var(--senjr-bg-card)',
        borderBottom: '1px solid var(--senjr-border)',
        overflowX: 'auto',
      }}>
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                flex: 1,
                padding: '12px 8px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
                borderBottom: activeTab === tab.id ? '2px solid var(--senjr-green)' : '2px solid transparent',
                background: activeTab === tab.id ? 'var(--senjr-green-bg)' : 'transparent',
                color: activeTab === tab.id ? 'var(--senjr-green)' : 'var(--senjr-text-muted)',
                cursor: 'pointer',
                fontSize: 11,
                fontWeight: 600,
                minWidth: 70,
              }}
            >
              <Icon size={18} />
              {tab.label}
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
                  <div key={s.label} className="senjr-card-flat" style={{
                    background: 'white',
                    border: '2px solid var(--senjr-text)',
                    boxShadow: '2px 2px 0 var(--senjr-text)',
                  }}>
                    <p style={{ fontSize: 11, color: 'var(--senjr-text-muted)', marginBottom: 4, fontWeight: 600 }}>{s.label.toUpperCase()}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: s.label === 'Revenue' ? 22 : 28, fontWeight: 800 }}>{s.value}</span>
                      {s.change && (
                        <span className="senjr-badge senjr-badge-green">
                          <ArrowUp size={10} /> {s.change}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <h2 className="senjr-section-title" style={{ fontSize: 16, marginBottom: 12 }}>Pending Actions</h2>
              <div className="senjr-card-flat" style={{
                display: 'flex', alignItems: 'center', gap: 12,
                background: '#FEF2F2',
                marginBottom: 8,
                cursor: 'pointer',
                border: '2px solid var(--senjr-text)',
                boxShadow: '2px 2px 0 var(--senjr-text)',
              }} onClick={() => setActiveTab('verification')}>
                <div style={{
                  width: 40, height: 40, borderRadius: 10,
                  background: 'white',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <Shield size={20} style={{ color: 'var(--senjr-orange)' }} />
                </div>
                <span style={{ flex: 1, fontSize: 14, fontWeight: 500, color: 'var(--senjr-orange)' }}>
                  {pendingVerifications.length} Mentor Verifications Pending
                </span>
                <ChevronRight size={18} style={{ color: 'var(--senjr-text-muted)' }} />
              </div>
              <div className="senjr-card-flat" style={{
                display: 'flex', alignItems: 'center', gap: 12,
                background: '#F5F3FF',
                marginBottom: 8,
                cursor: 'pointer',
                border: '2px solid var(--senjr-text)',
                boxShadow: '2px 2px 0 var(--senjr-text)',
              }} onClick={() => setActiveTab('content')}>
                <div style={{
                  width: 40, height: 40, borderRadius: 10,
                  background: 'white',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <CreditCard size={20} style={{ color: '#8B5CF6' }} />
                </div>
                <span style={{ flex: 1, fontSize: 14, fontWeight: 500, color: '#8B5CF6' }}>
                  3 Payments to Verify
                </span>
                <ChevronRight size={18} style={{ color: 'var(--senjr-text-muted)' }} />
              </div>
              <div className="senjr-card-flat" style={{
                display: 'flex', alignItems: 'center', gap: 12,
                background: '#FEF2F2',
                marginBottom: 8,
                cursor: 'pointer',
                border: '2px solid var(--senjr-text)',
                boxShadow: '2px 2px 0 var(--senjr-text)',
              }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 10,
                  background: 'white',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <Megaphone size={20} style={{ color: '#EF4444' }} />
                </div>
                <span style={{ flex: 1, fontSize: 14, fontWeight: 500, color: '#EF4444' }}>
                  2 Student Complaints
                </span>
                <ChevronRight size={18} style={{ color: 'var(--senjr-text-muted)' }} />
              </div>

              <h2 className="senjr-section-title" style={{ fontSize: 16, marginTop: 24, marginBottom: 12 }}>Recent Signups</h2>
              {recentSignups.map((u) => (
                <div key={u.email} className="senjr-card-flat" style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  marginBottom: 8,
                  border: '1px solid var(--senjr-border)',
                }}>
                  <div className="senjr-avatar" style={{
                    width: 40, height: 40, fontSize: 14,
                    background: 'var(--senjr-green-light)',
                  }}>
                    {u.avatar || u.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 14, fontWeight: 600 }}>{u.name}</p>
                    <p style={{ fontSize: 12, color: 'var(--senjr-text-muted)' }}>{u.email}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: 12, color: 'var(--senjr-text-muted)' }}>{u.time}</p>
                    <span className={`senjr-badge ${u.role === 'Mentor' ? 'senjr-badge-green' : 'senjr-badge-orange'}`} style={{ fontSize: 11 }}>
                      {u.role}
                    </span>
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

              <div style={{ position: 'relative', marginBottom: 20 }}>
                <Search size={18} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--senjr-text-muted)' }} />
                <input
                  className="senjr-input"
                  style={{ paddingLeft: 40 }}
                  placeholder="Search mentors..."
                />
              </div>

              {pendingVerifications.map((v) => (
                <div key={v.id} className="senjr-card-flat" style={{
                  marginBottom: 16,
                  border: '2px solid var(--senjr-text)',
                  boxShadow: '2px 2px 0 var(--senjr-text)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div className="senjr-avatar" style={{
                        width: 44, height: 44, fontSize: 16,
                        background: v.riskLevel === 'high' ? '#FEF2F2' : 'var(--senjr-green-light)',
                        color: v.riskLevel === 'high' ? '#EF4444' : 'var(--senjr-green-dark)',
                      }}>
                        {v.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p style={{ fontSize: 15, fontWeight: 700 }}>{v.name}</p>
                        <p style={{ fontSize: 12, color: 'var(--senjr-text-muted)' }}>{v.email}</p>
                      </div>
                    </div>
                    <span className={`senjr-badge ${v.riskLevel === 'high' ? 'senjr-badge-orange' : v.riskLevel === 'medium' ? 'senjr-badge-orange' : 'senjr-badge-green'}`} style={{ fontSize: 11 }}>
                      {v.riskLevel === 'high' ? ' High Risk' : v.riskLevel === 'medium' ? 'Medium' : 'Low Risk'}
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                    {v.documents.map((doc, i) => (
                      <div key={i} style={{
                        flex: 1,
                        padding: '8px',
                        borderRadius: 8,
                        background: doc.status === 'flagged' ? '#FEF2F2' : 'var(--senjr-bg)',
                        border: `1px solid ${doc.status === 'flagged' ? '#FECACA' : 'var(--senjr-border)'}`,
                        textAlign: 'center',
                      }}>
                        <FileText size={16} style={{ color: doc.status === 'flagged' ? '#EF4444' : 'var(--senjr-text-muted)', margin: '0 auto 4px' }} />
                        <p style={{ fontSize: 11, fontWeight: 600 }}>{doc.type}</p>
                        <p style={{ fontSize: 10, color: doc.status === 'flagged' ? '#EF4444' : 'var(--senjr-text-muted)' }}>
                          {doc.status === 'flagged' ? '⚠ Flagged' : 'Pending'}
                        </p>
                      </div>
                    ))}
                  </div>

                  <p style={{ fontSize: 12, color: 'var(--senjr-text-muted)', marginBottom: 12 }}>
                    <Clock size={12} style={{ display: 'inline', marginRight: 4 }} />
                    Submitted {v.submittedAt}
                  </p>

                  <div style={{ display: 'flex', gap: 8 }}>
                    <button className="senjr-btn senjr-btn-sm" style={{
                      flex: 1,
                      padding: '8px 0',
                      background: 'var(--senjr-green)',
                      color: 'white',
                      fontSize: 13,
                      fontWeight: 600,
                      border: 'none',
                    }}>
                      <CheckCircle size={14} style={{ display: 'inline', marginRight: 4 }} /> Approve
                    </button>
                    <button className="senjr-btn senjr-btn-sm" style={{
                      flex: 1,
                      padding: '8px 0',
                      background: '#FEF2F2',
                      color: '#EF4444',
                      fontSize: 13,
                      fontWeight: 600,
                      border: '2px solid #EF4444',
                    }}>
                      <XCircle size={14} style={{ display: 'inline', marginRight: 4 }} /> Reject
                    </button>
                    <button className="senjr-btn senjr-btn-sm" style={{
                      padding: '8px 12px',
                      background: 'var(--senjr-bg)',
                      color: 'var(--senjr-text)',
                      fontSize: 13,
                      fontWeight: 600,
                      border: '2px solid var(--senjr-text)',
                    }}>
                      <Eye size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}

          {activeTab === 'content' && (
            <>
              <div style={{ marginBottom: 16 }}>
                <h2 className="senjr-section-title" style={{ fontSize: 18, marginBottom: 4 }}>Content Review Queue</h2>
                <p style={{ fontSize: 13, color: 'var(--senjr-text-muted)' }}>Review and approve mentor resources</p>
              </div>

              {contentReviewQueue.map((c) => (
                <div key={c.id} className="senjr-card-flat" style={{
                  marginBottom: 12,
                  border: '2px solid var(--senjr-text)',
                  boxShadow: '2px 2px 0 var(--senjr-text)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: 10,
                      background: 'var(--senjr-green-bg)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <FileText size={20} style={{ color: 'var(--senjr-green)' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 14, fontWeight: 600 }}>{c.title}</p>
                      <p style={{ fontSize: 12, color: 'var(--senjr-text-muted)' }}>By {c.author} • {c.type}</p>
                    </div>
                    <span className="senjr-badge senjr-badge-orange" style={{ fontSize: 11 }}>Pending</span>
                  </div>

                  <p style={{ fontSize: 12, color: 'var(--senjr-text-muted)', marginBottom: 12 }}>
                    <Clock size={12} style={{ display: 'inline', marginRight: 4 }} />
                    Submitted {c.submittedAt}
                  </p>

                  <div style={{ display: 'flex', gap: 8 }}>
                    <button className="senjr-btn senjr-btn-sm" style={{
                      flex: 1,
                      padding: '8px 0',
                      background: 'var(--senjr-green)',
                      color: 'white',
                      fontSize: 13,
                      fontWeight: 600,
                      border: 'none',
                    }}>
                      <CheckCircle size={14} style={{ display: 'inline', marginRight: 4 }} /> Approve
                    </button>
                    <button className="senjr-btn senjr-btn-sm" style={{
                      flex: 1,
                      padding: '8px 0',
                      background: '#FEF2F2',
                      color: '#EF4444',
                      fontSize: 13,
                      fontWeight: 600,
                      border: '2px solid #EF4444',
                    }}>
                      <XCircle size={14} style={{ display: 'inline', marginRight: 4 }} /> Reject
                    </button>
                    <button className="senjr-btn senjr-btn-sm" style={{
                      padding: '8px 12px',
                      background: 'var(--senjr-bg)',
                      color: 'var(--senjr-text)',
                      fontSize: 13,
                      fontWeight: 600,
                      border: '2px solid var(--senjr-text)',
                    }}>
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
                <input
                  className="senjr-input"
                  style={{ paddingLeft: 40 }}
                  placeholder="Search users..."
                />
              </div>

              {recentSignups.map((u) => (
                <div key={u.email} className="senjr-card-flat" style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  marginBottom: 8,
                  border: '2px solid var(--senjr-text)',
                  boxShadow: '2px 2px 0 var(--senjr-text)',
                }}>
                  <div className="senjr-avatar" style={{
                    width: 40, height: 40, fontSize: 14,
                    background: 'var(--senjr-green-light)',
                  }}>
                    {u.avatar || u.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 14, fontWeight: 600 }}>{u.name}</p>
                    <p style={{ fontSize: 12, color: 'var(--senjr-text-muted)' }}>{u.email}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: 12, color: 'var(--senjr-text-muted)' }}>{u.time}</p>
                    <span className={`senjr-badge ${u.role === 'Mentor' ? 'senjr-badge-green' : 'senjr-badge-orange'}`} style={{ fontSize: 11 }}>
                      {u.role}
                    </span>
                  </div>
                </div>
              ))}

              <button className="senjr-btn senjr-btn-outline" style={{ marginTop: 16 }}>
                View All Users
              </button>
            </>
          )}
        </div>
      </div>

      <nav className="senjr-bottom-nav">
        <button className="senjr-nav-item senjr-nav-item-active">
          <Users size={20} />
          Users
        </button>
        <button className="senjr-nav-item">
          <Calendar size={20} />
          Sessions
        </button>
        <button className="senjr-nav-item">
          <DollarSign size={20} />
          Payments
        </button>
        <button className="senjr-nav-item">
          <Settings size={20} />
          Settings
        </button>
      </nav>
    </div>
  )
}
