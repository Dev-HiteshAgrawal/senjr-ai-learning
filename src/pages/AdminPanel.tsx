import { Menu, Users, Calendar, DollarSign, Settings, AlertTriangle, CreditCard, Megaphone, ChevronRight, ArrowUp } from 'lucide-react'

export default function AdminPanel() {
  const stats = [
    { label: 'Total Users', value: '156', change: '+12%' },
    { label: 'Active Mentors', value: '23', change: null as string | null },
    { label: "Today's Sessions", value: '8', change: null as string | null },
    { label: 'Revenue', value: '₹4,200', change: null as string | null },
  ]

  const pendingActions = [
    { label: '5 Mentor Verifications Pending', color: 'var(--senjr-orange)', bg: '#FEF2F2', icon: AlertTriangle },
    { label: '3 Payments to Verify', color: '#8B5CF6', bg: '#F5F3FF', icon: CreditCard },
    { label: '2 Student Complaints', color: '#EF4444', bg: '#FEF2F2', icon: Megaphone },
  ]

  const recentSignups = [
    { name: 'Rahul K.', email: 'rahul@univ.edu', role: 'Student', time: '2m ago', avatar: 'RK' },
    { name: 'Dr. Sharma', email: 'sharma@mentors.org', role: 'Mentor', time: '1h ago', avatar: 'DS' },
    { name: 'Anita P.', email: 'anita.p@mail.com', role: 'Student', time: '3h ago', avatar: 'AP' },
    { name: 'Vikram S.', email: 'vikram.s@univ.edu', role: 'Student', time: '5h ago', avatar: 'VS' },
  ]

  return (
    <div className="senjr-app">
      <header className="senjr-header">
        <button className="senjr-btn-icon">
          <Menu size={20} />
        </button>
        <span className="senjr-header-title">Admin Panel</span>
        <button style={{ color: 'var(--senjr-green)', fontWeight: 600, fontSize: 14 }}>
          Logout
        </button>
      </header>

      <div className="senjr-page">
        <div className="senjr-content">
          <div className="senjr-grid-2" style={{ marginBottom: 24 }}>
            {stats.map((s) => (
              <div key={s.label} className="senjr-card-flat" style={{ background: 'white' }}>
                <p style={{ fontSize: 12, color: 'var(--senjr-text-muted)', marginBottom: 4 }}>{s.label.toUpperCase()}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: s.label === 'Revenue' ? 24 : 32, fontWeight: 800 }}>{s.value}</span>
                  {s.change && (
                    <span className="senjr-badge senjr-badge-green">
                      <ArrowUp size={10} /> {s.change}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <h2 className="senjr-section-title" style={{ fontSize: 18, marginBottom: 16 }}>Pending Actions</h2>
          {pendingActions.map((a) => {
            const Icon = a.icon
            return (
              <div key={a.label} className="senjr-card-flat" style={{
                display: 'flex', alignItems: 'center', gap: 12,
                background: a.bg,
                marginBottom: 8,
                cursor: 'pointer'
              }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 10,
                  background: 'white',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <Icon size={20} style={{ color: a.color }} />
                </div>
                <span style={{ flex: 1, fontSize: 14, fontWeight: 500, color: a.color }}>{a.label}</span>
                <ChevronRight size={18} style={{ color: 'var(--senjr-text-muted)' }} />
              </div>
            )
          })}

          <h2 className="senjr-section-title" style={{ fontSize: 18, marginTop: 24, marginBottom: 16 }}>Recent Signups</h2>
          {recentSignups.map((u) => (
            <div key={u.email} className="senjr-card-flat" style={{
              display: 'flex', alignItems: 'center', gap: 12,
              marginBottom: 8
            }}>
              <div className="senjr-avatar" style={{
                width: 40, height: 40, fontSize: 14,
                background: u.avatar ? 'var(--senjr-green-light)' : 'var(--senjr-bg)',
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
