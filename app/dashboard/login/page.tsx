'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      const data = await res.json()
      if (data.ok) {
        router.push('/dashboard')
      } else {
        setError(data.error || 'שגיאה בכניסה')
      }
    } catch {
      setError('שגיאת רשת, נסי שוב')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div dir="rtl" className="login-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0 }
        body { background: #0B0909; margin: 0 }

        /* ── Keyframes ── */
        @keyframes brushStroke {
          0%   { stroke-dashoffset: 2400; opacity: 0 }
          8%   { opacity: 0.22 }
          70%  { stroke-dashoffset: 0; opacity: 0.18 }
          100% { stroke-dashoffset: 0; opacity: 0.14 }
        }
        @keyframes brushStroke2 {
          0%   { stroke-dashoffset: 1800; opacity: 0 }
          15%  { opacity: 0.12 }
          75%  { stroke-dashoffset: 0; opacity: 0.1 }
          100% { stroke-dashoffset: 0; opacity: 0.08 }
        }
        @keyframes cardReveal {
          from { opacity: 0; transform: translateY(18px) scale(.97); filter: blur(4px) }
          to   { opacity: 1; transform: none; filter: blur(0) }
        }
        @keyframes dotPulse {
          0%,100% { transform: scale(1); opacity: 0.6 }
          50%     { transform: scale(1.6); opacity: 0.2 }
        }
        @keyframes grainDrift {
          0%,100% { transform: translate(0,0) }
          33%     { transform: translate(-1%,-1%) }
          66%     { transform: translate(1%,0) }
        }

        /* ── Root ── */
        .login-root {
          min-height: 100vh;
          background: #0B0909;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: "Inter", system-ui, sans-serif;
          position: relative;
          overflow: hidden;
        }

        /* Grain texture */
        .login-root::before {
          content: '';
          position: fixed; inset: 0; pointer-events: none; z-index: 1;
          background-image: url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23g)' opacity='1'/%3E%3C/svg%3E");
          background-size: 160px 160px;
          opacity: 0.022; mix-blend-mode: overlay;
          animation: grainDrift 8s ease-in-out infinite;
        }

        /* Ambient warm glow */
        .login-glow {
          position: fixed;
          top: 50%; left: 50%;
          width: 700px; height: 500px;
          background: radial-gradient(ellipse at center,
            rgba(232,65,90,.07) 0%,
            rgba(180,70,55,.03) 40%,
            transparent 70%);
          transform: translate(-50%,-50%);
          pointer-events: none; z-index: 0;
        }

        /* SVG brush-stroke background */
        .login-brush {
          position: fixed; inset: 0;
          pointer-events: none; z-index: 0;
          width: 100%; height: 100%;
          overflow: visible;
        }
        .brush-path-1 {
          fill: none;
          stroke: rgba(232,65,90,.65);
          stroke-width: 2.2;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-dasharray: 2400;
          stroke-dashoffset: 2400;
          animation: brushStroke 3.2s cubic-bezier(.16,1,.3,1) 0.3s both;
        }
        .brush-path-2 {
          fill: none;
          stroke: rgba(210,140,80,.5);
          stroke-width: 1.4;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-dasharray: 1800;
          stroke-dashoffset: 1800;
          animation: brushStroke2 3.8s cubic-bezier(.16,1,.3,1) 0.8s both;
        }

        /* Card */
        .login-card {
          position: relative; z-index: 10;
          background: rgba(18,13,12,.92);
          border: 1px solid rgba(238,230,220,.09);
          border-radius: 22px;
          padding: 52px 44px 44px;
          width: 100%;
          max-width: 390px;
          box-shadow:
            0 40px 100px rgba(0,0,0,.7),
            0 0 0 1px rgba(238,230,220,.04),
            0 0 60px rgba(232,65,90,.05);
          animation: cardReveal .65s cubic-bezier(.22,1,.36,1) .15s both;
          backdrop-filter: blur(24px);
        }

        /* Logo mark */
        .login-logo {
          width: 54px; height: 54px;
          background: linear-gradient(135deg, #E8415A 0%, #C8344E 100%);
          border-radius: 15px;
          display: flex; align-items: center; justify-content: center;
          font-size: 24px;
          margin: 0 auto 28px;
          box-shadow:
            0 0 28px rgba(232,65,90,.45),
            inset 0 1px 0 rgba(255,255,255,.2);
        }

        /* Studio badge */
        .login-studio-tag {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          margin-bottom: 8px;
        }
        .studio-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: #E8415A;
          animation: dotPulse 2.4s ease-in-out infinite;
          box-shadow: 0 0 6px rgba(232,65,90,.6);
        }
        .studio-label {
          font-size: 9.5px;
          font-weight: 700;
          letter-spacing: .22em;
          color: rgba(238,230,220,.28);
          text-transform: uppercase;
        }

        /* Heading */
        .login-title {
          text-align: center;
          font-size: 24px;
          font-weight: 800;
          color: rgba(238,230,220,.92);
          margin-bottom: 6px;
          letter-spacing: -.01em;
        }
        .login-sub {
          text-align: center;
          font-size: 13px;
          color: rgba(238,230,220,.28);
          margin-bottom: 36px;
          letter-spacing: .02em;
        }

        /* Divider */
        .login-divider {
          height: 1px;
          background: linear-gradient(to left, transparent, rgba(238,230,220,.08), transparent);
          margin: 0 -8px 32px;
        }

        /* Labels */
        .login-label {
          font-size: 10px;
          font-weight: 700;
          color: rgba(238,230,220,.32);
          text-transform: uppercase;
          letter-spacing: .14em;
          margin-bottom: 7px;
          display: block;
        }

        /* Inputs */
        .login-input {
          width: 100%;
          background: rgba(238,230,220,.045);
          border: 1.5px solid rgba(238,230,220,.09);
          border-radius: 11px;
          color: rgba(238,230,220,.92);
          font-size: 15px;
          font-family: inherit;
          padding: 12px 15px;
          margin-bottom: 18px;
          outline: none;
          transition: border-color .22s, box-shadow .22s, background .22s;
          direction: ltr;
        }
        .login-input:focus {
          border-color: rgba(232,65,90,.48);
          background: rgba(238,230,220,.07);
          box-shadow: 0 0 0 3px rgba(232,65,90,.09), 0 0 18px rgba(232,65,90,.07);
        }
        .login-input::placeholder { color: rgba(238,230,220,.16) }

        /* Submit */
        .login-btn {
          width: 100%;
          background: linear-gradient(135deg, #E8415A, #C8344E);
          color: white;
          border: none;
          border-radius: 11px;
          padding: 14px;
          font-size: 14px;
          font-weight: 700;
          font-family: inherit;
          cursor: pointer;
          margin-top: 6px;
          letter-spacing: .04em;
          transition: opacity .2s, transform .18s, box-shadow .2s;
          box-shadow:
            0 4px 22px rgba(232,65,90,.42),
            inset 0 1px 0 rgba(255,255,255,.18);
        }
        .login-btn:hover:not(:disabled) {
          opacity: .92;
          transform: translateY(-1px);
          box-shadow: 0 8px 28px rgba(232,65,90,.52), inset 0 1px 0 rgba(255,255,255,.18);
        }
        .login-btn:active:not(:disabled) { transform: translateY(0); opacity: 1 }
        .login-btn:disabled { opacity: .5; cursor: not-allowed }

        /* Error */
        .login-error {
          background: rgba(239,68,68,.09);
          border: 1px solid rgba(239,68,68,.2);
          border-radius: 9px;
          color: rgba(252,165,165,.9);
          font-size: 13px;
          padding: 10px 14px;
          margin-top: 14px;
          text-align: center;
          letter-spacing: .01em;
        }

        /* Footer note */
        .login-footer {
          text-align: center;
          margin-top: 24px;
          font-size: 11px;
          color: rgba(238,230,220,.16);
          letter-spacing: .06em;
        }
      `}</style>

      {/* Ambient glow */}
      <div className="login-glow" />

      {/* Animated brush strokes in background */}
      <svg className="login-brush" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
        {/* Large sweeping stroke — top-left to bottom-right */}
        <path
          className="brush-path-1"
          d="M -80,180 C 120,140 280,260 420,220 C 580,175 680,310 820,290 C 980,268 1060,160 1200,190 C 1320,215 1400,280 1520,240"
        />
        {/* Secondary stroke — warmer, lower */}
        <path
          className="brush-path-2"
          d="M -60,680 C 100,710 220,640 380,660 C 520,678 620,740 780,720 C 940,700 1040,640 1200,658 C 1340,673 1420,720 1540,700"
        />
      </svg>

      {/* Login card */}
      <div className="login-card">
        <div className="login-logo">🎂</div>

        <div className="login-studio-tag">
          <div className="studio-dot" />
          <span className="studio-label">Creative Studio</span>
          <div className="studio-dot" />
        </div>

        <h1 className="login-title">כניסה לסטודיו</h1>
        <p className="login-sub">lalag &amp; more — ניהול האתר</p>

        <div className="login-divider" />

        <form onSubmit={handleSubmit}>
          <label className="login-label">שם משתמש</label>
          <input
            className="login-input"
            type="text"
            autoComplete="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            autoFocus
          />
          <label className="login-label">סיסמה</label>
          <input
            className="login-input"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button className="login-btn" type="submit" disabled={loading}>
            {loading ? 'מתחברת...' : 'כניסה לסטודיו'}
          </button>
          {error && <div className="login-error">{error}</div>}
        </form>

        <p className="login-footer">LALAG &amp; MORE · STUDIO DASHBOARD</p>
      </div>
    </div>
  )
}
