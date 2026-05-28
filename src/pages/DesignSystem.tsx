import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Home, Bell, Check, Zap, Target, ArrowRight, Search, Mail, User, Upload, Plus, ChevronRight, Calendar, DollarSign, MessageSquare, Heart } from 'lucide-react'

const colors = [
  { name: 'Green', var: '--senjr-green', hex: '#10B981', token: 'senjr-green' },
  { name: 'Green Dark', var: '--senjr-green-dark', hex: '#059669', token: 'senjr-green-dark' },
  { name: 'Green Light', var: '--senjr-green-light', hex: '#D1FAE5', token: 'senjr-green-light' },
  { name: 'Orange', var: '--senjr-orange', hex: '#F97316', token: 'senjr-orange' },
  { name: 'Orange Dark', var: '--senjr-orange-dark', hex: '#EA580C', token: 'senjr-orange-dark' },
  { name: 'Orange Light', var: '--senjr-orange-light', hex: '#FFEDD5', token: 'senjr-orange-light' },
  { name: 'Black', var: '--senjr-black', hex: '#0F172A', token: 'senjr-black' },
  { name: 'Text', var: '--senjr-text', hex: '#0F172A', token: 'senjr-text' },
  { name: 'Text Muted', var: '--senjr-text-muted', hex: '#64748B', token: 'senjr-text-muted' },
  { name: 'Text Light', var: '--senjr-text-light', hex: '#94A3B8', token: 'senjr-text-light' },
  { name: 'Border', var: '--senjr-border', hex: '#E2E8F0', token: 'senjr-border' },
  { name: 'Bg', var: '--senjr-bg', hex: '#F8FAFC', token: 'senjr-bg' },
]

export default function DesignSystem() {
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState('colors')
  const [toggleOn, setToggleOn] = useState(false)
  const [chipSelected, setChipSelected] = useState('')

  const sections = [
    { id: 'colors', label: 'Colors', icon: Zap },
    { id: 'cards', label: 'Cards', icon: Home },
    { id: 'buttons', label: 'Buttons', icon: Target },
    { id: 'inputs', label: 'Inputs', icon: Search },
    { id: 'badges', label: 'Badges', icon: Bell },
    { id: 'avatars', label: 'Avatars', icon: User },
    { id: 'nav', label: 'Navigation', icon: ArrowRight },
  ]

  return (
    <div className="senjr-app">
      <header className="senjr-header">
        <button className="senjr-header-back" onClick={() => navigate(-1)}><ArrowLeft size={18} /></button>
        <span className="senjr-header-title">Design System</span>
        <div />
      </header>

      <div style={{ display: 'flex', gap: 6, padding: '12px 16px', borderBottom: '1px solid var(--senjr-border)', overflowX: 'auto' }} className="senjr-scrollbar-hide">
        {sections.map(s => {
          const Icon = s.icon
          return (
            <button key={s.id} onClick={() => setActiveSection(s.id)}
              style={{ flexShrink: 0, padding: '8px 14px', borderRadius: 20, background: activeSection === s.id ? 'var(--senjr-green)' : 'var(--senjr-bg)', color: activeSection === s.id ? 'white' : 'var(--senjr-text)', border: `1.5px solid ${activeSection === s.id ? 'var(--senjr-green-dark)' : 'var(--senjr-border)'}`, cursor: 'pointer', fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4, transition: 'all 0.15s' }}>
              <Icon size={14} /> {s.label}
            </button>
          )
        })}
      </div>

      <div className="senjr-page">
        <div className="senjr-content">
          {/* COLORS */}
          {activeSection === 'colors' && (
            <div className="senjr-fade-in">
              <h2 className="senjr-section-title" style={{ marginBottom: 16 }}>Brand Colors</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {colors.map(c => (
                  <div key={c.var} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 10, background: 'white', border: '1px solid var(--senjr-border)' }}>
                    <div style={{ width: 40, height: 40, borderRadius: 8, background: `var(${c.var})`, border: '1px solid var(--senjr-border)' }} />
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 13, fontWeight: 600 }}>{c.name}</p>
                      <p style={{ fontSize: 11, color: 'var(--senjr-text-muted)' }}>{c.hex} &middot; <code style={{ background: 'var(--senjr-bg)', padding: '1px 4px', borderRadius: 3 }}>{c.token}</code></p>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 24 }}>
                <h2 className="senjr-section-title" style={{ marginBottom: 12 }}>Gradients</h2>
                <div className="senjr-grid-2">
                  <div className="senjr-gradient-green" style={{ padding: 24, borderRadius: 12, textAlign: 'center', border: '1px solid var(--senjr-border)' }}>
                    <span style={{ fontSize: 13, fontWeight: 600 }}>Green Gradient</span>
                  </div>
                  <div className="senjr-gradient-orange" style={{ padding: 24, borderRadius: 12, textAlign: 'center', border: '1px solid var(--senjr-border)' }}>
                    <span style={{ fontSize: 13, fontWeight: 600 }}>Orange Gradient</span>
                  </div>
                  <div className="senjr-gradient-dark" style={{ padding: 24, borderRadius: 12, textAlign: 'center', color: 'white' }}>
                    <span style={{ fontSize: 13, fontWeight: 600 }}>Dark Gradient</span>
                  </div>
                  <div className="senjr-gradient-mixed" style={{ padding: 24, borderRadius: 12, textAlign: 'center', border: '1px solid var(--senjr-border)' }}>
                    <span style={{ fontSize: 13, fontWeight: 600 }}>Mixed Gradient</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CARDS */}
          {activeSection === 'cards' && (
            <div className="senjr-fade-in">
              <h2 className="senjr-section-title" style={{ marginBottom: 12 }}>Card Variants</h2>
              <div className="senjr-card">.senjr-card — Default card with border + shadow</div>
              <div className="senjr-card-flat">.senjr-card-flat — Flat card for grids</div>
              <div className="senjr-card-green">.senjr-card-green — Green background</div>
              <div className="senjr-card-orange">.senjr-card-orange — Orange background</div>
              <div className="senjr-card-neo">.senjr-card-neo — Neo-brutalist card</div>
              <div className="senjr-card-neo-green">.senjr-card-neo-green — Neo green card</div>
              <div className="senjr-card-neo-orange">.senjr-card-neo-orange — Neo orange card</div>
              <h2 className="senjr-section-title" style={{ marginTop: 24, marginBottom: 12 }}>Special Cards</h2>
              <div className="senjr-card" style={{ background: 'var(--senjr-black)', color: 'white', border: 'none' }}>
                <p style={{ fontWeight: 600 }}>Dark Card</p>
                <p style={{ fontSize: 12, color: '#94A3B8' }}>Used for hero sections, CTAs</p>
              </div>
              <div className="senjr-card" style={{ background: 'linear-gradient(135deg, #064E3B, #065F46)', color: 'white', border: 'none' }}>
                <p style={{ fontWeight: 600 }}>Exam Stats Card</p>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>War room header style</p>
              </div>
            </div>
          )}

          {/* BUTTONS */}
          {activeSection === 'buttons' && (
            <div className="senjr-fade-in">
              <h2 className="senjr-section-title" style={{ marginBottom: 12 }}>Buttons</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <button className="senjr-btn senjr-btn-green">Green Primary</button>
                <button className="senjr-btn senjr-btn-orange">Orange Primary</button>
                <button className="senjr-btn senjr-btn-outline">Outline Button</button>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button className="senjr-btn senjr-btn-sm" style={{ background: 'var(--senjr-green)', color: 'white' }}>Small</button>
                  <button className="senjr-btn senjr-btn-xs" style={{ background: 'var(--senjr-orange)', color: 'white' }}>XS</button>
                  <button className="senjr-btn-icon"><Heart size={18} /></button>
                </div>
                <button className="senjr-btn" style={{ background: 'var(--senjr-border)', color: 'var(--senjr-text-muted)' }} disabled>Disabled</button>
              </div>
              <h2 className="senjr-section-title" style={{ marginTop: 24, marginBottom: 12 }}>Floating Actions</h2>
              <div style={{ display: 'flex', gap: 12, position: 'relative', height: 60 }}>
                <div className="senjr-floating-btn senjr-floating-btn-green" style={{ position: 'relative', bottom: 'auto', right: 'auto' }}><MessageSquare size={24} /></div>
                <div className="senjr-floating-btn senjr-floating-btn-orange" style={{ position: 'relative', bottom: 'auto', right: 'auto' }}><Plus size={24} /></div>
              </div>
            </div>
          )}

          {/* INPUTS */}
          {activeSection === 'inputs' && (
            <div className="senjr-fade-in">
              <h2 className="senjr-section-title" style={{ marginBottom: 12 }}>Inputs</h2>
              <div className="senjr-input-group">
                <label className="senjr-input-label">Text Input</label>
                <input className="senjr-input" placeholder="Apna naam likhein" />
              </div>
              <div className="senjr-input-group">
                <label className="senjr-input-label">With Icon</label>
                <div className="senjr-input-icon">
                  <span className="senjr-input-icon-inner"><Mail size={18} /></span>
                  <input className="senjr-input" style={{ paddingLeft: 40 }} placeholder="you@email.com" />
                </div>
              </div>
              <div className="senjr-input-group">
                <label className="senjr-input-label">Textarea</label>
                <textarea className="senjr-input" rows={3} placeholder="Your message..." />
              </div>
              <div className="senjr-input-group">
                <label className="senjr-input-label">Select</label>
                <div style={{ position: 'relative' }}>
                  <select className="senjr-input" style={{ appearance: 'none' }}>
                    <option>Option 1</option>
                    <option>Option 2</option>
                    <option>Option 3</option>
                  </select>
                  <ChevronRight size={18} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%) rotate(90deg)', color: 'var(--senjr-text-muted)', pointerEvents: 'none' }} />
                </div>
              </div>
              <div className="senjr-input-group">
                <label className="senjr-input-label">File Upload</label>
                <div className="senjr-file-upload" style={{ marginBottom: 8 }}>
                  <Upload size={24} style={{ color: 'var(--senjr-orange)', marginBottom: 8 }} />
                  <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>Upload document</p>
                  <p style={{ fontSize: 12, color: 'var(--senjr-text-muted)' }}>PDF, JPG, PNG &middot; Max 5MB</p>
                </div>
                <div className="senjr-file-upload senjr-file-upload-success">
                  <Check size={24} style={{ color: 'var(--senjr-green)', marginBottom: 8 }} />
                  <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 4, color: 'var(--senjr-green-dark)' }}>File uploaded successfully</p>
                </div>
              </div>
              <div className="senjr-input-group">
                <label className="senjr-input-label">Toggle</label>
                <button className={`senjr-toggle ${toggleOn ? 'senjr-toggle-on' : 'senjr-toggle-off'}`} onClick={() => setToggleOn(!toggleOn)}>
                  <div className={`senjr-toggle-knob ${toggleOn ? 'senjr-toggle-knob-on' : 'senjr-toggle-knob-off'}`} />
                </button>
              </div>
              <div className="senjr-input-group">
                <label className="senjr-input-label">Range Slider</label>
                <input type="range" min="0" max="100" style={{ width: '100%' }} />
              </div>
            </div>
          )}

          {/* BADGES */}
          {activeSection === 'badges' && (
            <div className="senjr-fade-in">
              <h2 className="senjr-section-title" style={{ marginBottom: 12 }}>Badges & Tags</h2>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
                <span className="senjr-badge senjr-badge-green">Student</span>
                <span className="senjr-badge senjr-badge-orange">Mentor</span>
                <span className="senjr-badge" style={{ background: '#FEF3C7', color: '#D97706' }}>Pending</span>
                <span className="senjr-badge" style={{ background: '#EFF6FF', color: '#3B82F6' }}>Admin</span>
              </div>
              <h2 className="senjr-section-title" style={{ marginBottom: 12 }}>Tags</h2>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
                <span className="senjr-tag senjr-tag-green">Popular</span>
                <span className="senjr-tag senjr-tag-orange">New</span>
                <span className="senjr-tag" style={{ background: '#FEE2E2', color: '#DC2626' }}>Expiring</span>
              </div>
              <h2 className="senjr-section-title" style={{ marginBottom: 12 }}>Chips</h2>
              <div className="senjr-chip-group" style={{ marginBottom: 16 }}>
                {['Maths', 'Physics', 'Chemistry', 'Biology'].map(s => (
                  <button key={s} className={`senjr-chip ${chipSelected === s ? 'senjr-chip-active' : ''}`} onClick={() => setChipSelected(s)}>{s}</button>
                ))}
              </div>
              <h2 className="senjr-section-title" style={{ marginBottom: 12 }}>Status Dots</h2>
              <div style={{ display: 'flex', gap: 16 }}>
                <span style={{ fontSize: 13 }}><span className="senjr-status-dot senjr-status-dot-online" /> Online</span>
                <span style={{ fontSize: 13 }}><span className="senjr-status-dot senjr-status-dot-offline" /> Offline</span>
                <span style={{ fontSize: 13 }}><span className="senjr-status-dot senjr-status-dot-away" /> Away</span>
              </div>
              <h2 className="senjr-section-title" style={{ marginTop: 24, marginBottom: 12 }}>Progress Bars</h2>
              <div style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}><span style={{ fontSize: 12 }}>Maths</span><span style={{ fontSize: 12, fontWeight: 600 }}>75%</span></div>
                <div className="senjr-progress-bar"><div className="senjr-progress-fill" style={{ width: '75%' }} /></div>
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}><span style={{ fontSize: 12 }}>Reasoning</span><span style={{ fontSize: 12, fontWeight: 600 }}>45%</span></div>
                <div className="senjr-progress-bar"><div className="senjr-progress-fill senjr-progress-fill-orange" style={{ width: '45%' }} /></div>
              </div>
            </div>
          )}

          {/* AVATARS */}
          {activeSection === 'avatars' && (
            <div className="senjr-fade-in">
              <h2 className="senjr-section-title" style={{ marginBottom: 12 }}>Avatars</h2>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 20 }}>
                <div className="senjr-avatar">A</div>
                <div className="senjr-avatar senjr-avatar-orange">B</div>
                <div className="senjr-avatar senjr-avatar-lg">C</div>
                <div className="senjr-avatar senjr-avatar-xl">D</div>
              </div>
              <h2 className="senjr-section-title" style={{ marginBottom: 12 }}>Avatar Group</h2>
              <div className="senjr-avatar-group" style={{ marginBottom: 20 }}>
                <div className="senjr-avatar" style={{ background: 'var(--senjr-green)', color: 'white' }}>P</div>
                <div className="senjr-avatar" style={{ background: 'var(--senjr-orange)', color: 'white' }}>A</div>
                <div className="senjr-avatar" style={{ background: '#3B82F6', color: 'white' }}>R</div>
                <div className="senjr-avatar" style={{ background: '#8B5CF6', color: 'white' }}>K</div>
              </div>
              <h2 className="senjr-section-title" style={{ marginBottom: 12 }}>With Status</h2>
              <div style={{ position: 'relative', width: 48 }}>
                <div className="senjr-avatar">A</div>
                <span className="senjr-status-dot senjr-status-dot-online" style={{ position: 'absolute', bottom: 0, right: 0, border: '2px solid white' }} />
              </div>
            </div>
          )}

          {/* NAVIGATION */}
          {activeSection === 'nav' && (
            <div className="senjr-fade-in">
              <h2 className="senjr-section-title" style={{ marginBottom: 12 }}>Step Indicator</h2>
              <div className="senjr-step-indicator">
                <div className="senjr-step-dot senjr-step-dot-active" />
                <div className="senjr-step-dot senjr-step-dot-active" />
                <div className="senjr-step-dot senjr-step-dot-orange" />
                <div className="senjr-step-dot" />
              </div>

              <h2 className="senjr-section-title" style={{ marginTop: 24, marginBottom: 12 }}>Tabs</h2>
              <div className="senjr-tabs" style={{ marginBottom: 16 }}>
                {['Exams', 'Practice', 'Analytics'].map(t => (
                  <button key={t} className={`senjr-tab ${t === 'Exams' ? 'senjr-tab-active' : ''}`}>{t}</button>
                ))}
              </div>

              <h2 className="senjr-section-title" style={{ marginBottom: 12 }}>Pill Navigation</h2>
              <div className="senjr-pill-nav" style={{ marginBottom: 16 }}>
                <button className="senjr-pill-nav-item senjr-pill-nav-item-active">Student</button>
                <button className="senjr-pill-nav-item">Mentor</button>
              </div>

              <h2 className="senjr-section-title" style={{ marginBottom: 12 }}>Bottom Navigation</h2>
              <div className="senjr-bottom-nav" style={{ position: 'relative', transform: 'none', left: 'auto', maxWidth: '100%' }}>
                <button className="senjr-nav-item senjr-nav-item-active"><Home size={20} /> Home</button>
                <button className="senjr-nav-item"><Calendar size={20} /> Schedule</button>
                <button className="senjr-nav-item"><DollarSign size={20} /> Earnings</button>
                <button className="senjr-nav-item"><User size={20} /> Profile</button>
              </div>

              <h2 className="senjr-section-title" style={{ marginTop: 24, marginBottom: 12 }}>Header Pattern</h2>
              <div className="senjr-header" style={{ position: 'relative' }}>
                <button className="senjr-header-back"><ArrowLeft size={18} /></button>
                <span className="senjr-header-title">Page Title</span>
                <button className="senjr-btn-icon"><Bell size={18} /></button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
