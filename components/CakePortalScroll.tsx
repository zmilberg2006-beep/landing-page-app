'use client'

/**
 * CakePortalScroll
 * ─────────────────────────────────────────────────────────────────
 * Scroll-scrubbed video: the user scrolls through a 400 vh sticky
 * section while the video frame advances in sync, with lerp inertia
 * for buttery smoothness.
 *
 * SETUP
 *  1.  npm install gsap
 *  2.  Copy your video → public/cake-portal.mp4
 *  3.  Copy the start-frame image → public/cake-start.jpg
 *  4.  In app/page.tsx, import this and place it wherever you want
 *      the portal to appear (recommended: right before or after the
 *      hero section).
 *
 * VIDEO ENCODING (ffmpeg) — critical for smooth scrubbing:
 *  ffmpeg -i input.mp4 \
 *    -c:v libx264 -crf 22 -preset slow \
 *    -g 1 -keyint_min 1 \
 *    -movflags +faststart \
 *    -an \
 *    -vf "scale=1920:-2" \
 *    public/cake-portal.mp4
 *
 *  Key flags:
 *    -g 1          → a keyframe on every single frame (enables smooth seeking)
 *    -an           → strip audio (scrub-only, no audio needed)
 *    -movflags +faststart → metadata at start so video loads before fully downloaded
 */

import { useEffect, useRef, useState } from 'react'

// ─── Lerp helper ──────────────────────────────────────────────────
const lerp = (a: number, b: number, t: number) => a + (b - a) * t

// ─── Scroll-hint arrow SVG ─────────────────────────────────────────
function ScrollArrow() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 5v14M5 12l7 7 7-7"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// ─── Main component ────────────────────────────────────────────────
export default function CakePortalScroll() {
  const outerRef  = useRef<HTMLDivElement>(null)   // the tall scrollable wrapper
  const stickyRef = useRef<HTMLDivElement>(null)   // the sticky 100vh panel
  const videoRef  = useRef<HTMLVideoElement>(null)

  // Lerped & target times (refs so they never cause re-renders)
  const smoothedTime = useRef(0)
  const targetTime   = useRef(0)
  const rafId        = useRef<number | null>(null)

  const [videoLoaded, setVideoLoaded] = useState(false)
  const [scrollPct,   setScrollPct]   = useState(0)   // 0–1, for overlay opacity

  // ── GSAP ScrollTrigger setup ────────────────────────────────────
  useEffect(() => {
    const outer  = outerRef.current
    const sticky = stickyRef.current
    const video  = videoRef.current
    if (!outer || !sticky || !video) return

    let st: { kill: () => void } | null = null

    const init = async () => {
      const { default: gsap }    = await import('gsap')
      const { ScrollTrigger }    = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      // ── RAF loop: smoothly drive video.currentTime ────────────
      const tick = () => {
        if (video.readyState >= 2 && video.duration) {
          smoothedTime.current = lerp(smoothedTime.current, targetTime.current, 0.09)

          // Only seek when there's a meaningful delta (saves CPU)
          const delta = Math.abs(video.currentTime - smoothedTime.current)
          if (delta > 0.008) {
            video.currentTime = smoothedTime.current
          }
        }
        rafId.current = requestAnimationFrame(tick)
      }
      rafId.current = requestAnimationFrame(tick)

      // ── ScrollTrigger on the OUTER tall div ───────────────────
      st = ScrollTrigger.create({
        trigger : outer,
        start   : 'top top',
        end     : 'bottom bottom',
        onUpdate: (self: { progress: number }) => {
          const p = self.progress
          setScrollPct(p)
          if (video.duration) {
            targetTime.current = p * video.duration
          }
        },
      })
    }

    init()

    return () => {
      st?.kill()
      if (rafId.current !== null) cancelAnimationFrame(rafId.current)
    }
  }, [])

  // ── Overlay copy fades out as user scrolls deeper ──────────────
  const copyOpacity  = Math.max(0, 1 - scrollPct * 4)       // gone by 25%
  const arrowOpacity = Math.max(0, 1 - scrollPct * 6)       // gone by 16%

  return (
    /*
     * OUTER: 400 vh tall — provides the scrollable distance.
     * STICKY INNER: stays pinned at the top for the full 400 vh.
     */
    <div
      ref={outerRef}
      style={{ height: '400vh', position: 'relative' }}
      aria-label="אנימציית כניסה לסטודיו"
    >
      {/* ── Sticky panel ──────────────────────────────────────────── */}
      <div
        ref={stickyRef}
        style={{
          position : 'sticky',
          top      : 0,
          height   : '100vh',
          overflow : 'hidden',
          background: '#0a0a0a',
        }}
      >
        {/* ── Placeholder image (shown while video loads) ─────────── */}
        <div
          aria-hidden="true"
          style={{
            position  : 'absolute',
            inset     : 0,
            zIndex    : 5,
            transition: 'opacity 0.9s ease',
            opacity   : videoLoaded ? 0 : 1,
            pointerEvents: videoLoaded ? 'none' : 'auto',
          }}
        >
          <img
            src="/cake-start.jpg"
            alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          {/* Loading spinner */}
          {!videoLoaded && (
            <div style={{
              position       : 'absolute',
              inset          : 0,
              display        : 'flex',
              alignItems     : 'center',
              justifyContent : 'center',
              background     : 'rgba(0,0,0,0.25)',
            }}>
              <div style={{
                width       : 40,
                height      : 40,
                borderRadius: '50%',
                border      : '2px solid rgba(255,255,255,0.2)',
                borderTopColor: 'rgba(255,255,255,0.8)',
                animation   : 'spin 0.8s linear infinite',
              }} />
            </div>
          )}
        </div>

        {/* ── The scroll-scrubbed video ───────────────────────────── */}
        <video
          ref={videoRef}
          src="/cake-portal-scrub.mp4"
          muted
          playsInline
          preload="auto"
          style={{
            position  : 'absolute',
            inset     : 0,
            width     : '100%',
            height    : '100%',
            objectFit : 'cover',
            zIndex    : 1,
          }}
          onLoadedData={() => setVideoLoaded(true)}
        />

        {/* ── Text overlay (fades out as you scroll) ──────────────── */}
        <div style={{
          position      : 'absolute',
          inset         : 0,
          zIndex        : 10,
          display       : 'flex',
          flexDirection : 'column',
          alignItems    : 'center',
          justifyContent: 'center',
          pointerEvents : 'none',
          padding       : '0 24px',
          textAlign     : 'center',
        }}>
          <div style={{ opacity: copyOpacity, transition: 'opacity 0.1s', willChange: 'opacity' }}>
            {/* Eyebrow */}
            <p style={{
              fontSize    : '11px',
              fontWeight  : 700,
              letterSpacing: '0.3em',
              color       : 'rgba(255,255,255,0.55)',
              textTransform: 'uppercase',
              marginBottom: '16px',
              fontFamily  : 'system-ui, sans-serif',
            }}>
              lalag &amp; more
            </p>

            {/* Main headline */}
            <h2 style={{
              fontSize    : 'clamp(36px, 6vw, 80px)',
              fontWeight  : 900,
              color       : '#fff',
              lineHeight  : 1.05,
              letterSpacing: '-1px',
              margin      : 0,
              fontFamily  : "'Heebo', system-ui, sans-serif",
              textShadow  : '0 2px 40px rgba(0,0,0,0.6)',
            }}>
              הסטודיו
              <br />
              <span style={{ color: 'rgba(240,81,106,0.9)' }}>מחכה לך</span>
            </h2>

            {/* Sub */}
            <p style={{
              marginTop   : '20px',
              fontSize    : 'clamp(14px, 1.4vw, 18px)',
              color       : 'rgba(255,255,255,0.5)',
              fontWeight  : 300,
              letterSpacing: '0.02em',
              fontFamily  : "'Heebo', system-ui, sans-serif",
            }}>
              גלול להיכנס פנימה
            </p>
          </div>
        </div>

        {/* ── Scroll hint arrow ───────────────────────────────────── */}
        <div style={{
          position      : 'absolute',
          bottom        : 32,
          left          : 0,
          right         : 0,
          display       : 'flex',
          justifyContent: 'center',
          zIndex        : 10,
          pointerEvents : 'none',
          opacity       : arrowOpacity,
          transition    : 'opacity 0.1s',
          animation     : 'bounce 2s ease-in-out infinite',
        }}>
          <ScrollArrow />
        </div>

        {/* ── Progress bar at bottom ──────────────────────────────── */}
        <div style={{
          position        : 'absolute',
          bottom          : 0,
          left            : 0,
          height          : '2px',
          width           : `${scrollPct * 100}%`,
          background      : 'linear-gradient(to right, rgba(240,81,106,0.8), rgba(240,81,106,0.4))',
          zIndex          : 20,
          transition      : 'width 0.05s linear',
          boxShadow       : '0 0 8px rgba(240,81,106,0.5)',
        }} />
      </div>

      {/* Keyframe animations injected once */}
      <style>{`
        @keyframes spin   { to { transform: rotate(360deg) } }
        @keyframes bounce {
          0%, 100% { transform: translateY(0) }
          50%       { transform: translateY(6px) }
        }
      `}</style>
    </div>
  )
}
