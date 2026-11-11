import { useCallback, useEffect, useRef, useState } from 'react'
import introSrc from '../../892565286_1794385286558090.mp4'

const FADE_MS = 520

export default function IntroFilm({ onEnter }) {
  const videoRef = useRef(null)
  const timerRef = useRef(null)
  const enteredRef = useRef(false)
  const [leaving, setLeaving] = useState(false)
  const [muted, setMuted] = useState(true)
  const [blocked, setBlocked] = useState(false)
  const [failed, setFailed] = useState(false)
  const [progress, setProgress] = useState(0)

  const enter = useCallback(() => {
    if (enteredRef.current) return
    enteredRef.current = true
    setLeaving(true)
    timerRef.current = window.setTimeout(() => onEnter(), FADE_MS)
  }, [onEnter])

  const start = useCallback(() => {
    const video = videoRef.current
    if (!video) return
    video.muted = true
    setMuted(true)
    const attempt = video.play()
    if (attempt && typeof attempt.catch === 'function') attempt.catch(() => setBlocked(true))
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      enter()
      return
    }
    start()
  }, [enter, start])

  useEffect(() => () => window.clearTimeout(timerRef.current), [])

  useEffect(() => {
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [])

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') enter()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [enter])

  const handleTime = (event) => {
    const video = event.currentTarget
    if (!video.duration) return
    setProgress(Math.min(1, video.currentTime / video.duration))
  }

  const toggleSound = () => {
    const video = videoRef.current
    if (!video) return
    const next = !muted
    video.muted = next
    setMuted(next)
    if (!next) {
      const attempt = video.play()
      if (attempt && typeof attempt.catch === 'function') attempt.catch(() => {})
    }
  }

  return (
    <div
      role="dialog"
      aria-label="S R Food Court intro"
      aria-modal="true"
      className={`fixed inset-0 z-[80] overflow-hidden bg-iron transition-opacity duration-500 ${
        leaving ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      <video
        ref={videoRef}
        src={introSrc}
        playsInline
        muted={muted}
        preload="auto"
        autoPlay
        onTimeUpdate={handleTime}
        onEnded={enter}
        onError={() => {
          setFailed(true)
          setBlocked(false)
        }}
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-iron via-iron/30 to-iron/75" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.18] [background-image:repeating-linear-gradient(0deg,rgba(246,241,231,0.5)_0px,rgba(246,241,231,0.5)_1px,transparent_1px,transparent_3px)]" />

      {blocked && !failed ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            type="button"
            autoFocus
            onClick={start}
            className="hair-dark bg-iron/70 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-cotton backdrop-blur-sm transition-colors hover:bg-brass hover:text-iron"
          >
            Play intro
          </button>
        </div>
      ) : null}

      <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-4 p-4 sm:p-6">
        <div>
          <div className="track text-brass/80">Intro · 01 / 01</div>
          <div className="mt-2 font-display text-[19px] leading-none text-cotton">
            S R Food Court
          </div>
          <div className="mt-1 font-telugu text-[11px] text-cotton/45">ఎస్ ఆర్ ఫుడ్ కోర్ట్</div>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            autoFocus
            onClick={toggleSound}
            disabled={failed}
            className="hair-dark px-2.5 py-1.5 font-mono text-[9.5px] uppercase tracking-[0.14em] text-cotton/60 transition-colors hover:border-cotton/40 hover:text-cotton disabled:opacity-40"
          >
            Sound · {muted ? 'Off' : 'On'}
          </button>
          <button
            type="button"
            onClick={enter}
            className="hair-dark px-2.5 py-1.5 font-mono text-[9.5px] uppercase tracking-[0.14em] text-cotton/60 transition-colors hover:border-cotton/40 hover:text-cotton"
          >
            Skip intro
          </button>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
        <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
          <div className="max-w-[34ch]">
            <div className="track text-cotton/40">
              {failed ? 'Film unavailable' : 'Velgatoor · Aziznagar · Sri Ram Nagar · Ameerpet'}
            </div>
            <p className="mt-2 font-display text-[22px] font-light leading-[1.15] text-cotton sm:text-[26px]">
              Stone-ground before the <em className="italic text-brass">highway</em> wakes.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] tabular-nums text-cotton/45">
              {String(Math.round(progress * 100)).padStart(2, '0')}%
            </span>
            <button
              type="button"
              onClick={enter}
              className="bg-brass px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.16em] text-iron transition-colors hover:bg-cotton"
            >
              Enter site →
            </button>
          </div>
        </div>
        <div className="mt-4 h-px w-full bg-cotton/20">
          <div
            className="h-px origin-left bg-brass transition-transform duration-200 ease-linear"
            style={{ transform: `scaleX(${progress || 0.002})` }}
          />
        </div>
      </div>
    </div>
  )
}
