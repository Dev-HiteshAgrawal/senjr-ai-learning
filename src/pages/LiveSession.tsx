import { useState, useRef, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Mic, MicOff, Camera, CameraOff, MonitorUp, BookOpenCheck, Hand, Users, MessageSquare, MoreVertical, PhoneOff } from 'lucide-react'

/* eslint-disable react-hooks/refs -- refs accessed only in useCallback event handlers */
export default function LiveSession() {
  const navigate = useNavigate()
  const [micOn, setMicOn] = useState(false)
  const [cameraOn, setCameraOn] = useState(false)
  const [screenOn, setScreenOn] = useState(false)
  const [transcriptOn, setTranscriptOn] = useState(true)
  const [handRaised, setHandRaised] = useState(false)
  const [isMentor, setIsMentor] = useState(false)
  const [participants, setParticipants] = useState([
    { id: 1, name: 'Mentor Riya', role: 'Mentor', mic: true, camera: true, raised: false },
    { id: 2, name: 'Aman', role: 'BBA student', mic: true, camera: false, raised: true },
    { id: 3, name: 'Sana', role: 'UP exam', mic: false, camera: false, raised: false },
    { id: 4, name: 'Vivek', role: 'AI beginner', mic: true, camera: true, raised: false },
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
    } catch {
      // Camera permission denied
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
    } catch {
      // Mic permission denied
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
    } catch {
      // Screen share cancelled
    }
  }, [screenOn])

  return (
    <div className="senjr-app" style={{ background: '#0F172A' }}>
      <header style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '12px 16px', background: '#0F172A',
        borderBottom: '2px solid #1E293B', position: 'sticky', top: 0, zIndex: 100,
      }}>
        <button className="senjr-header-back" style={{ border: '1.5px solid #334155', color: 'white', background: '#1E293B' }} onClick={() => navigate(-1)}>
          <ArrowLeft size={18} />
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#EF4444', animation: 'pulse 2s infinite' }} />
          <span style={{ color: 'white', fontSize: 16, fontWeight: 700, letterSpacing: '-0.3px' }}>Live Session</span>
          <span style={{ padding: '2px 8px', borderRadius: 4, background: 'var(--senjr-green)', color: 'white', fontSize: 10, fontWeight: 700 }}>LIVE</span>
        </div>
        <button style={{
          width: 36, height: 36, borderRadius: 'var(--senjr-radius)',
          border: '1.5px solid #334155', background: '#1E293B', color: 'white',
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        }}>
          <MoreVertical size={18} />
        </button>
      </header>

      <div className="senjr-page" style={{ padding: 0, paddingBottom: 0 }}>
        <div style={{ padding: 16 }}>
          <div style={{
            aspectRatio: '16/9',
            background: '#1E293B',
            borderRadius: 'var(--senjr-radius-lg)',
            overflow: 'hidden',
            marginBottom: 16,
            position: 'relative',
            border: '2px solid #334155',
            boxShadow: '4px 4px 0 #1E293B',
          }}>
            {cameraOn ? (
              <video ref={videoRef} autoPlay muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div style={{
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                height: '100%', gap: 12, color: '#64748B'
              }}>
                <div style={{
                  width: 64, height: 64, borderRadius: '50%',
                  background: '#334155',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <CameraOff size={28} />
                </div>
                <span style={{ fontSize: 14 }}>Camera is off</span>
              </div>
            )}

            <div style={{
              position: 'absolute', bottom: 12, left: 12,
              display: 'flex', gap: 8
            }}>
              <div style={{
                padding: '4px 12px', borderRadius: 20,
                background: 'rgba(0,0,0,0.7)', color: 'white',
                fontSize: 12, fontWeight: 500,
                border: '1px solid rgba(255,255,255,0.1)',
              }}>
                BBA Economics &bull; Mentor Riya
              </div>
            </div>

            {screenOn && (
              <div style={{
                position: 'absolute', top: 12, right: 12,
                padding: '4px 12px', borderRadius: 20,
                background: 'var(--senjr-green)', color: 'white',
                fontSize: 12, fontWeight: 600,
                boxShadow: '2px 2px 0 var(--senjr-green-dark)',
              }}>
                Screen Sharing
              </div>
            )}

            {handRaised && (
              <div style={{
                position: 'absolute', top: 12, left: 12,
                padding: '4px 10px', borderRadius: 20,
                background: 'var(--senjr-orange)', color: 'white',
                fontSize: 11, fontWeight: 600,
                display: 'flex', alignItems: 'center', gap: 4,
                animation: 'pulse 1.5s infinite',
              }}>
                <Hand size={12} /> Hand Raised
              </div>
            )}
          </div>

          <div style={{
            display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 20,
            flexWrap: 'wrap',
          }}>
            {[
              { icon: micOn ? Mic : MicOff, active: micOn, danger: !micOn, action: toggleMic, label: 'Mic' },
              { icon: cameraOn ? Camera : CameraOff, active: cameraOn, action: toggleCamera, label: 'Camera' },
              { icon: MonitorUp, active: screenOn, action: toggleScreenShare, label: 'Share' },
              { icon: BookOpenCheck, active: transcriptOn, action: () => setTranscriptOn(!transcriptOn), label: 'Transcript' },
              { icon: Hand, active: handRaised, orange: handRaised, action: () => setHandRaised(!handRaised), label: 'Hand', pulse: handRaised },
            ].map((btn, i) => {
              const BtnIcon = btn.icon
              return (
                <button key={i} onClick={btn.action} title={btn.label}
                  style={{
                    width: 52, height: 52, borderRadius: 14,
                    background: btn.danger ? '#EF4444' : btn.orange ? 'var(--senjr-orange)' : btn.active ? 'var(--senjr-green)' : '#1E293B',
                    color: 'white', border: btn.active ? '2px solid rgba(255,255,255,0.3)' : '2px solid #334155',
                    cursor: 'pointer', display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center', gap: 2,
                    transition: 'all 0.15s ease', fontSize: 10, fontWeight: 600,
                    boxShadow: btn.active ? '3px 3px 0 rgba(255,255,255,0.1)' : 'none',
                    animation: btn.pulse ? 'pulse 1.5s infinite' : 'none',
                  }}>
                  <BtnIcon size={18} />
                  <span style={{ fontSize: 9, opacity: 0.8 }}>{btn.label}</span>
                </button>
              )
            })}
            <button onClick={() => navigate('/dashboard/student')} title="Leave"
              style={{
                width: 52, height: 52, borderRadius: 14,
                background: '#DC2626', color: 'white',
                border: '2px solid #991B1B', cursor: 'pointer',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', gap: 2,
                transition: 'all 0.15s ease', fontSize: 10, fontWeight: 600,
              }}>
              <PhoneOff size={18} />
              <span style={{ fontSize: 9, opacity: 0.8 }}>Leave</span>
            </button>
          </div>

          <div style={{
            background: '#1E293B', border: '2px solid #334155',
            borderRadius: 'var(--senjr-radius-lg)', padding: 16, marginBottom: 16,
            boxShadow: '3px 3px 0 #0F172A',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <Users size={16} style={{ color: 'var(--senjr-green)' }} />
              <span style={{ fontSize: 14, fontWeight: 600, color: 'white', flex: 1 }}>Participants ({participants.length})</span>
              <button onClick={() => setIsMentor(!isMentor)}
                style={{ padding: '4px 10px', borderRadius: 6, fontSize: 11, fontWeight: 600, background: isMentor ? 'var(--senjr-green)' : '#334155', color: isMentor ? 'white' : '#94A3B8', border: 'none', cursor: 'pointer', transition: 'all 0.15s ease' }}>
                {isMentor ? 'Mentor' : 'Host'}
              </button>
            </div>
            {participants.map((p) => (
              <div key={p.id} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 0',
                borderBottom: '1px solid #334155'
              }}>
                <div style={{
                  width: 34, height: 34, borderRadius: '50%',
                  background: p.role === 'Mentor' ? 'var(--senjr-green)' : '#334155',
                  color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 700, fontSize: 13, flexShrink: 0,
                }}>
                  {p.name[0]}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 13, fontWeight: 500, color: 'white' }}>{p.name}</p>
                  <p style={{ fontSize: 11, color: '#64748B' }}>{p.role}</p>
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                  {isMentor && p.role !== 'Mentor' ? (
                    <>
                      <button onClick={() => muteParticipant(p.id)} title="Mute participant"
                        style={{ padding: '4px 6px', borderRadius: 4, background: p.mic ? '#334155' : '#7F1D1D', color: p.mic ? '#94A3B8' : '#FCA5A5', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                        <MicOff size={12} />
                      </button>
                      <button onClick={() => disableCameraParticipant(p.id)} title="Disable camera (privacy: will NOT turn on without permission)"
                        style={{ padding: '4px 6px', borderRadius: 4, background: p.camera ? '#334155' : '#7F1D1D', color: p.camera ? '#94A3B8' : '#FCA5A5', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                        <CameraOff size={12} />
                      </button>
                    </>
                  ) : (
                    <>
                      <span style={{
                        padding: '4px 6px', borderRadius: 4,
                        background: p.mic ? 'rgba(16,185,129,0.2)' : '#334155',
                        color: p.mic ? 'var(--senjr-green)' : '#64748B',
                        display: 'flex', alignItems: 'center',
                      }}>
                        {p.mic ? <Mic size={12} /> : <MicOff size={12} />}
                      </span>
                      <span style={{
                        padding: '4px 6px', borderRadius: 4,
                        background: p.camera ? 'rgba(16,185,129,0.2)' : '#334155',
                        color: p.camera ? 'var(--senjr-green)' : '#64748B',
                        display: 'flex', alignItems: 'center',
                      }}>
                        {p.camera ? <Camera size={12} /> : <CameraOff size={12} />}
                      </span>
                    </>
                  )}
                  {p.raised && (
                    <span style={{
                      padding: '4px 6px', borderRadius: 4,
                      background: 'rgba(249,115,22,0.2)',
                      color: 'var(--senjr-orange)',
                      animation: 'pulse 1.5s infinite',
                      display: 'flex', alignItems: 'center',
                    }}>
                      <Hand size={12} />
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div style={{
            padding: '12px 16px', marginBottom: 16,
            borderRadius: 'var(--senjr-radius-lg)',
            background: 'rgba(234,179,8,0.1)', border: '1.5px solid rgba(234,179,8,0.3)',
          }}>
            <p style={{ fontSize: 12, color: '#EAB308', fontWeight: 500, textAlign: 'center' }}>
              Your camera and mic are never turned on without your permission.
            </p>
          </div>

          {transcriptOn && (
            <div style={{
              background: '#1E293B', border: '2px solid #334155',
              borderRadius: 'var(--senjr-radius-lg)', padding: 16,
              boxShadow: '3px 3px 0 #0F172A',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <MessageSquare size={16} style={{ color: 'var(--senjr-green)' }} />
                <span style={{ fontSize: 14, fontWeight: 600, color: 'white', flex: 1 }}>Live Transcript</span>
                <span style={{ fontSize: 10, color: '#64748B', fontWeight: 500 }}>AI-powered</span>
              </div>
              <div style={{
                background: '#0F172A', borderRadius: 8, padding: 12,
                border: '1px solid #334155',
              }}>
                <p style={{ fontSize: 13, color: '#CBD5E1', lineHeight: 1.7 }}>
                  <span style={{ color: 'var(--senjr-green)', fontWeight: 600 }}>Mentor Riya:</span> Aaj hum AI ko shortcut nahi, skill amplifier ki tarah use karenge.
                </p>
                <p style={{ fontSize: 13, color: '#CBD5E1', lineHeight: 1.7, marginTop: 8 }}>
                  <span style={{ color: 'var(--senjr-orange)', fontWeight: 600 }}>Aman:</span> Isse internship ka proof kaise banega?
                </p>
                <p style={{ fontSize: 13, color: '#CBD5E1', lineHeight: 1.7, marginTop: 8, opacity: 0.7 }}>
                  <span style={{ color: '#3B82F6', fontWeight: 600 }}>Riya:</span> Bilkul! Projects and case studies se tum actual work dikha sakte ho.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
