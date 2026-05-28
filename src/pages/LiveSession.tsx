import { useState, useRef, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Mic, MicOff, Camera, CameraOff, MonitorUp, BookOpenCheck, Hand, Users, MessageSquare, MoreVertical, PhoneOff, Shield, Volume2 } from 'lucide-react'

export default function LiveSession() {
  const navigate = useNavigate()
  const [micOn, setMicOn] = useState(true)
  const [cameraOn, setCameraOn] = useState(true)
  const [screenOn, setScreenOn] = useState(false)
  const [transcriptOn, setTranscriptOn] = useState(true)
  const [handRaised, setHandRaised] = useState(false)
  const [isMentor, setIsMentor] = useState(false)
  const [showParticipants, setShowParticipants] = useState(true)
  const [participants, setParticipants] = useState([
    { id: 1, name: 'Riya Sharma', role: 'Mentor', mic: true, camera: true, raised: false },
    { id: 2, name: 'Aman Verma', role: 'Student', mic: true, camera: false, raised: true },
    { id: 3, name: 'Sana Khan', role: 'Student', mic: false, camera: false, raised: false },
    { id: 4, name: 'Vivek Patel', role: 'Student', mic: true, camera: true, raised: false },
    { id: 5, name: 'Priya Singh', role: 'Student', mic: false, camera: true, raised: false },
  ])

  function muteParticipant(id: number) {
    setParticipants(prev => prev.map(p =>
      p.id === id ? { ...p, mic: false } : p
    ))
  }

  function disableCameraParticipant(id: number) {
    setParticipants(prev => prev.map(p =>
      p.id === id ? { ...p, camera: false } : p
    ))
  }

  const videoRef = useRef<HTMLVideoElement | null>(null)
  const mediaStreamRef = useRef<MediaStream | null>(null)

  useEffect(() => {
    return () => {
      mediaStreamRef.current?.getTracks().forEach((track) => track.stop())
    }
  }, [])

  const toggleCamera = useCallback(async () => {
    if (cameraOn) {
      mediaStreamRef.current?.getVideoTracks().forEach((track) => track.stop())
      setCameraOn(false)
      return
     }
     try {
       const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: micOn })
       mediaStreamRef.current = stream
       if (videoRef.current) videoRef.current.srcObject = stream
       setCameraOn(true)
     } catch (error) {
       console.error('Error accessing camera:', error)
     }
  }, [cameraOn, micOn])

  const toggleMic = useCallback(async () => {
    if (micOn) {
      mediaStreamRef.current?.getAudioTracks().forEach((track) => track.stop())
      setMicOn(false)
      return
     }
     try {
       const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: cameraOn })
       mediaStreamRef.current = stream
       if (videoRef.current && cameraOn) videoRef.current.srcObject = stream
       setMicOn(true)
     } catch (error) {
       console.error('Error accessing microphone:', error)
     }
  }, [micOn, cameraOn])

  const toggleScreenShare = useCallback(async () => {
    if (screenOn) {
      setScreenOn(false)
      return
     }
     try {
       const stream = await navigator.mediaDevices.getDisplayMedia({ video: true })
       if (videoRef.current) videoRef.current.srcObject = stream
       setScreenOn(true)
     } catch (error) {
       console.error('Error accessing screen share:', error)
     }
  }, [screenOn])

  return (
    <div className="senjr-app" style={{ background: '#0A0F1E' }}>
      <header style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '12px 16px', background: 'rgba(10,15,30,0.95)',
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid #1E293B',
      }}>
        <button style={{
          width: 36, height: 36, borderRadius: 10,
          border: '1.5px solid #334155', background: '#131A2E',
          color: '#94A3B8', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        }} onClick={() => navigate(-1)}>
          <ArrowLeft size={18} />
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#EF4444', animation: 'pulse 2s infinite', boxShadow: '0 0 8px rgba(239,68,68,0.5)' }} />
          <span style={{ color: 'white', fontSize: 16, fontWeight: 700, letterSpacing: '-0.3px' }}>Live Session</span>
          <span style={{ padding: '2px 10px', borderRadius: 4, background: '#DC2626', color: 'white', fontSize: 10, fontWeight: 700, letterSpacing: '0.5px' }}>LIVE</span>
        </div>
        <button style={{
          width: 36, height: 36, borderRadius: 10,
          border: '1.5px solid #334155', background: '#131A2E',
          color: '#94A3B8', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        }}>
          <MoreVertical size={18} />
        </button>
      </header>

      <div style={{ flex: 1, overflow: 'auto', paddingBottom: 100 }}>
        <div style={{ padding: 16 }}>
          <div style={{
            aspectRatio: '16/9',
            background: 'linear-gradient(135deg, #0F172A, #1E293B)',
            borderRadius: 16, overflow: 'hidden', marginBottom: 16,
            position: 'relative', border: '1px solid #334155',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          }}>
            {cameraOn ? (
              <video ref={videoRef} autoPlay muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div style={{
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                height: '100%', gap: 12, color: '#64748B',
              }}>
                <div style={{
                  width: 72, height: 72, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #1E293B, #334155)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '2px solid #475569',
                }}>
                  <CameraOff size={30} />
                </div>
                <span style={{ fontSize: 14, color: '#94A3B8', fontWeight: 500 }}>Camera is off</span>
              </div>
            )}

            <div style={{ position: 'absolute', bottom: 12, left: 12, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <div style={{
                padding: '6px 14px', borderRadius: 20,
                background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)',
                color: 'white', fontSize: 12, fontWeight: 500,
                border: '1px solid rgba(255,255,255,0.1)',
                display: 'flex', alignItems: 'center', gap: 6,
              }}>
                <Volume2 size={12} style={{ color: micOn ? '#10B981' : '#DC2626' }} />
                {micOn ? 'Mic On' : 'Muted'}
              </div>
              {screenOn && (
                <div style={{
                  padding: '6px 14px', borderRadius: 20,
                  background: 'rgba(16,185,129,0.85)', backdropFilter: 'blur(8px)',
                  color: 'white', fontSize: 12, fontWeight: 600,
                  display: 'flex', alignItems: 'center', gap: 4,
                }}>
                  <MonitorUp size={12} /> Screen Sharing
                </div>
              )}
            </div>

            {handRaised && (
              <div style={{
                position: 'absolute', top: 12, left: 12,
                padding: '6px 14px', borderRadius: 20,
                background: 'rgba(249,115,22,0.9)', backdropFilter: 'blur(8px)',
                color: 'white', fontSize: 11, fontWeight: 600,
                display: 'flex', alignItems: 'center', gap: 6,
                animation: 'pulse 1.5s infinite',
                boxShadow: '0 4px 12px rgba(249,115,22,0.3)',
              }}>
                <Hand size={12} /> Hand Raised
              </div>
            )}
          </div>

          <div style={{
            display: 'flex', gap: 8, justifyContent: 'center',
            marginBottom: 20, flexWrap: 'wrap',
          }}>
            {[
              { icon: micOn ? Mic : MicOff, active: micOn, danger: !micOn, action: toggleMic, label: 'Mic' },
              { icon: cameraOn ? Camera : CameraOff, active: cameraOn, action: toggleCamera, label: 'Camera' },
              { icon: MonitorUp, active: screenOn, action: toggleScreenShare, label: 'Share' },
              { icon: BookOpenCheck, active: transcriptOn, action: () => setTranscriptOn(!transcriptOn), label: 'Notes' },
              { icon: Hand, active: handRaised, orange: handRaised, action: () => setHandRaised(!handRaised), label: 'Hand', pulse: handRaised },
              { icon: Users, active: showParticipants, action: () => setShowParticipants(!showParticipants), label: 'People' },
            ].map((btn, i) => {
              const BtnIcon = btn.icon
              return (
                <button key={i} onClick={btn.action} title={btn.label}
                  style={{
                    width: 50, height: 50, borderRadius: 12,
                    background: btn.danger ? '#DC2626' : btn.orange ? '#F97316' : btn.active ? '#10B981' : '#1E293B',
                    color: 'white', border: btn.active ? '2px solid rgba(255,255,255,0.15)' : '2px solid #334155',
                    cursor: 'pointer', display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center', gap: 1,
                    transition: 'all 0.15s ease', fontSize: 9, fontWeight: 600,
                    boxShadow: btn.active ? '0 4px 12px rgba(16,185,129,0.25)' : 'none',
                    animation: btn.pulse ? 'pulse 1.5s infinite' : 'none',
                  }}>
                  <BtnIcon size={18} />
                  <span style={{ fontSize: 9, opacity: 0.8 }}>{btn.label}</span>
                </button>
              )
            })}
            <button onClick={() => navigate('/dashboard/student')} title="Leave"
              style={{
                width: 50, height: 50, borderRadius: 12,
                background: '#DC2626', color: 'white',
                border: '2px solid #991B1B', cursor: 'pointer',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', gap: 1,
                transition: 'all 0.15s ease', fontSize: 9, fontWeight: 600,
                boxShadow: '0 4px 12px rgba(220,38,38,0.3)',
              }}>
              <PhoneOff size={18} />
              <span style={{ fontSize: 9, opacity: 0.8 }}>Leave</span>
            </button>
          </div>

          {showParticipants && (
            <div style={{
              background: '#131A2E', border: '1px solid #1E293B',
              borderRadius: 14, padding: 16, marginBottom: 16,
              boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Users size={16} style={{ color: '#10B981' }} />
                  <span style={{ fontSize: 14, fontWeight: 600, color: 'white' }}>Participants ({participants.length})</span>
                </div>
                <button onClick={() => setIsMentor(!isMentor)}
                  style={{
                    padding: '6px 14px', borderRadius: 8, fontSize: 11, fontWeight: 600,
                    background: isMentor ? '#10B981' : '#334155',
                    color: isMentor ? 'white' : '#94A3B8', border: 'none', cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}>
                  {isMentor ? 'Mentor Mode' : 'Host View'}
                </button>
              </div>
              {participants.map((p) => (
                <div key={p.id} style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '10px 0', borderBottom: '1px solid #1E293B',
                }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 10,
                    background: p.role === 'Mentor' ? 'linear-gradient(135deg, #10B981, #059669)' : '#1E293B',
                    color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 700, fontSize: 14, flexShrink: 0,
                    boxShadow: p.role === 'Mentor' ? '0 2px 8px rgba(16,185,129,0.3)' : 'none',
                  }}>
                    {p.name[0]}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 13, fontWeight: 500, color: 'white', display: 'flex', alignItems: 'center', gap: 4 }}>
                      {p.name}
                      {p.role === 'Mentor' && <Shield size={10} style={{ color: '#10B981' }} />}
                    </p>
                    <p style={{ fontSize: 11, color: '#64748B' }}>{p.role}</p>
                  </div>
                  <div style={{ display: 'flex', gap: 4 }}>
                    {isMentor && p.role !== 'Mentor' ? (
                      <>
                        <button onClick={() => muteParticipant(p.id)} title="Mute"
                          style={{ padding: '6px 8px', borderRadius: 6, background: p.mic ? '#334155' : '#7F1D1D', color: p.mic ? '#94A3B8' : '#FCA5A5', border: 'none', cursor: 'pointer', display: 'flex' }}>
                          <MicOff size={12} />
                        </button>
                        <button onClick={() => disableCameraParticipant(p.id)} title="Disable camera"
                          style={{ padding: '6px 8px', borderRadius: 6, background: p.camera ? '#334155' : '#7F1D1D', color: p.camera ? '#94A3B8' : '#FCA5A5', border: 'none', cursor: 'pointer', display: 'flex' }}>
                          <CameraOff size={12} />
                        </button>
                      </>
                    ) : (
                      <>
                        <span style={{ padding: '6px 8px', borderRadius: 6, background: p.mic ? 'rgba(16,185,129,0.15)' : '#1E293B', color: p.mic ? '#10B981' : '#64748B', display: 'flex' }}>
                          {p.mic ? <Mic size={12} /> : <MicOff size={12} />}
                        </span>
                        <span style={{ padding: '6px 8px', borderRadius: 6, background: p.camera ? 'rgba(16,185,129,0.15)' : '#1E293B', color: p.camera ? '#10B981' : '#64748B', display: 'flex' }}>
                          {p.camera ? <Camera size={12} /> : <CameraOff size={12} />}
                        </span>
                      </>
                    )}
                    {p.raised && (
                      <span style={{ padding: '6px 8px', borderRadius: 6, background: 'rgba(249,115,22,0.15)', color: '#F97316', animation: 'pulse 1.5s infinite', display: 'flex' }}>
                        <Hand size={12} />
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {transcriptOn && (
            <div style={{
              background: '#131A2E', border: '1px solid #1E293B',
              borderRadius: 14, padding: 16, marginBottom: 16,
              boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <MessageSquare size={16} style={{ color: '#10B981' }} />
                  <span style={{ fontSize: 14, fontWeight: 600, color: 'white' }}>Live Transcript</span>
                </div>
                <span style={{ fontSize: 10, color: '#64748B', fontWeight: 500, padding: '3px 8px', borderRadius: 4, background: '#1E293B' }}>AI-powered</span>
              </div>
              <div style={{
                background: '#0A0F1E', borderRadius: 10, padding: 14,
                border: '1px solid #1E293B',
              }}>
                <p style={{ fontSize: 13, color: '#CBD5E1', lineHeight: 1.8 }}>
                  <span style={{ color: '#10B981', fontWeight: 600 }}>Mentor Riya:</span> Aaj hum AI ko shortcut nahi, skill amplifier ki tarah use karenge.
                </p>
                <p style={{ fontSize: 13, color: '#CBD5E1', lineHeight: 1.8, marginTop: 10 }}>
                  <span style={{ color: '#F97316', fontWeight: 600 }}>Aman:</span> Isse internship ka proof kaise banega?
                </p>
                <p style={{ fontSize: 13, color: '#CBD5E1', lineHeight: 1.8, marginTop: 10, opacity: 0.8 }}>
                  <span style={{ color: '#3B82F6', fontWeight: 600 }}>Riya:</span> Bilkul! Projects and case studies se tum actual work dikha sakte ho.
                </p>
              </div>
            </div>
          )}

          <div style={{
            padding: '12px 16px', borderRadius: 10,
            background: 'rgba(234,179,8,0.08)', border: '1px solid rgba(234,179,8,0.2)',
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <Shield size={16} style={{ color: '#EAB308', flexShrink: 0 }} />
            <p style={{ fontSize: 12, color: '#EAB308', fontWeight: 500, lineHeight: 1.4 }}>
              Aapki privacy humari priority hai. Camera aur mic kabhi bina permission on nahi hote.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
