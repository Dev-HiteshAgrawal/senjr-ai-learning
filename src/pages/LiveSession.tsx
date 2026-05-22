import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Mic, MicOff, Camera, CameraOff, MonitorUp, BookOpenCheck, Hand, Users, MessageSquare, MoreVertical, PhoneOff } from 'lucide-react'

export default function LiveSession() {
  const navigate = useNavigate()
  const [micOn, setMicOn] = useState(true)
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

  async function toggleCamera() {
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
  }

  async function toggleMic() {
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
  }

  async function toggleScreenShare() {
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
  }

  return (
    <div className="senjr-app" style={{ background: '#0F172A' }}>
      <header className="senjr-header" style={{ background: '#0F172A', color: 'white', border: 'none' }}>
        <button className="senjr-header-back" style={{ borderColor: '#334155', color: 'white' }} onClick={() => navigate(-1)}>
          <ArrowLeft size={18} />
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#EF4444', animation: 'pulse 2s infinite' }} />
          <span className="senjr-header-title" style={{ color: 'white', fontSize: 16 }}>Live Session</span>
        </div>
        <button className="senjr-btn-icon" style={{ borderColor: '#334155', color: 'white' }}>
          <MoreVertical size={18} />
        </button>
      </header>

      <div className="senjr-page" style={{ padding: 0 }}>
        <div style={{ padding: 16 }}>
          <div style={{
            aspectRatio: '16/9',
            background: '#1E293B',
            borderRadius: 16,
            overflow: 'hidden',
            marginBottom: 16,
            position: 'relative',
            border: '2px solid #334155',
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
                background: 'rgba(0,0,0,0.6)', color: 'white',
                fontSize: 12, fontWeight: 500
              }}>
                BBA Economics • Mentor Riya
              </div>
            </div>

            {screenOn && (
              <div style={{
                position: 'absolute', top: 12, right: 12,
                padding: '4px 12px', borderRadius: 20,
                background: 'var(--senjr-green)', color: 'white',
                fontSize: 12, fontWeight: 600
              }}>
                Screen Sharing
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 20 }}>
            <button
              className="senjr-btn-icon"
              style={{
                background: micOn ? '#334155' : '#EF4444',
                color: 'white', border: 'none',
                width: 50, height: 50,
                transition: 'all 0.15s ease',
              }}
              onClick={toggleMic}
            >
              {micOn ? <Mic size={20} /> : <MicOff size={20} />}
            </button>
            <button
              className="senjr-btn-icon"
              style={{
                background: cameraOn ? 'var(--senjr-green)' : '#334155',
                color: 'white', border: 'none',
                width: 50, height: 50,
                transition: 'all 0.15s ease',
              }}
              onClick={toggleCamera}
            >
              {cameraOn ? <Camera size={20} /> : <CameraOff size={20} />}
            </button>
            <button
              className="senjr-btn-icon"
              style={{
                background: screenOn ? 'var(--senjr-green)' : '#334155',
                color: 'white', border: 'none',
                width: 50, height: 50,
                transition: 'all 0.15s ease',
              }}
              onClick={toggleScreenShare}
            >
              <MonitorUp size={20} />
            </button>
            <button
              className="senjr-btn-icon"
              style={{
                background: transcriptOn ? 'var(--senjr-green)' : '#334155',
                color: 'white', border: 'none',
                width: 50, height: 50,
                transition: 'all 0.15s ease',
              }}
              onClick={() => setTranscriptOn(!transcriptOn)}
            >
              <BookOpenCheck size={20} />
            </button>
            <button
              className="senjr-btn-icon"
              style={{
                background: handRaised ? 'var(--senjr-orange)' : '#334155',
                color: 'white', border: 'none',
                width: 50, height: 50,
                transition: 'all 0.15s ease',
                animation: handRaised ? 'pulse 1.5s infinite' : 'none',
              }}
              onClick={() => setHandRaised(!handRaised)}
            >
              <Hand size={20} />
            </button>
            <button
              className="senjr-btn-icon"
              style={{
                background: '#EF4444',
                color: 'white', border: 'none',
                width: 50, height: 50,
                transition: 'all 0.15s ease',
              }}
              onClick={() => navigate('/dashboard')}
            >
              <PhoneOff size={20} />
            </button>
          </div>

          <div className="senjr-card-flat" style={{ background: '#1E293B', borderColor: '#334155', marginBottom: 16 }}>
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
                <div className="senjr-avatar" style={{
                  width: 34, height: 34, fontSize: 13,
                  background: p.role === 'Mentor' ? 'var(--senjr-green)' : '#334155',
                  color: 'white'
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
                        style={{ padding: '2px 6px', borderRadius: 4, fontSize: 10, background: p.mic ? '#334155' : '#7F1D1D', color: p.mic ? '#94A3B8' : '#FCA5A5', border: 'none', cursor: 'pointer' }}>
                        {p.mic ? <MicOff size={12} /> : <MicOff size={12} />}
                      </button>
                      <button onClick={() => disableCameraParticipant(p.id)} title="Disable camera"
                        style={{ padding: '2px 6px', borderRadius: 4, fontSize: 10, background: p.camera ? '#334155' : '#7F1D1D', color: p.camera ? '#94A3B8' : '#FCA5A5', border: 'none', cursor: 'pointer' }}>
                        <CameraOff size={12} />
                      </button>
                    </>
                  ) : (
                    <>
                      <span style={{
                        padding: '2px 8px', borderRadius: 4, fontSize: 10,
                        background: p.mic ? 'var(--senjr-green-light)' : '#334155',
                        color: p.mic ? 'var(--senjr-green-dark)' : '#64748B'
                      }}>
                        {p.mic ? <Mic size={12} /> : <MicOff size={12} />}
                      </span>
                      <span style={{
                        padding: '2px 8px', borderRadius: 4, fontSize: 10,
                        background: p.camera ? 'var(--senjr-green-light)' : '#334155',
                        color: p.camera ? 'var(--senjr-green-dark)' : '#64748B'
                      }}>
                        {p.camera ? <Camera size={12} /> : <CameraOff size={12} />}
                      </span>
                    </>
                  )}
                  {p.raised && (
                    <span style={{
                      padding: '2px 8px', borderRadius: 4, fontSize: 10,
                      background: 'var(--senjr-orange-light)',
                      color: 'var(--senjr-orange-dark)',
                      animation: 'pulse 1.5s infinite',
                    }}>
                      <Hand size={12} />
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {transcriptOn && (
            <div className="senjr-card-flat" style={{ background: '#1E293B', borderColor: '#334155' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <MessageSquare size={16} style={{ color: 'var(--senjr-green)' }} />
                <span style={{ fontSize: 14, fontWeight: 600, color: 'white' }}>Live Transcript</span>
              </div>
              <p style={{ fontSize: 13, color: '#94A3B8', lineHeight: 1.6 }}>
                <span style={{ color: 'var(--senjr-green)', fontWeight: 600 }}>Mentor Riya:</span> Aaj hum AI ko shortcut nahi, skill amplifier ki tarah use karenge.
              </p>
              <p style={{ fontSize: 13, color: '#94A3B8', lineHeight: 1.6, marginTop: 6 }}>
                <span style={{ color: 'var(--senjr-orange)', fontWeight: 600 }}>Aman:</span> Isse internship ka proof kaise banega?
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
