'use client'
import { useState, useRef, useCallback } from 'react'
import { IconChevronLeft, IconChevronRight } from './Icons'
import { REVIEWS } from '@/data'

export default function TestimonialCarousel({ reviews = REVIEWS, tint = 'var(--sprinkle-blue-tint)', accent = 'var(--sprinkle-blue)' }) {
  const [idx, setIdx] = useState(0)
  const trackRef = useRef(null)

  const animateTransition = useCallback(async (newIdx) => {
    const gsap = (await import('gsap')).default
    const el = trackRef.current
    if (!el) { setIdx(newIdx); return }
    gsap.to(el, {
      opacity: 0, x: -20, duration: 0.22, ease: 'power2.in',
      onComplete: () => {
        setIdx(newIdx)
        gsap.fromTo(el, { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 0.35, ease: 'power2.out' })
      },
    })
  }, [])

  const prev = () => animateTransition((idx - 1 + reviews.length) % reviews.length)
  const next = () => animateTransition((idx + 1) % reviews.length)

  const r = reviews[idx]

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24 }}>
      <ArrowBtn onClick={prev} dir="left" />

      <div ref={trackRef} style={{
        background: tint,
        borderRadius: 20,
        padding: 48,
        textAlign: 'center',
        boxShadow: 'var(--shadow-card)',
        maxWidth: 580,
        width: '100%',
      }}>
        {/* Avatar */}
        <div style={{
          width: 64, height: 64, borderRadius: '50%',
          background: accent,
          margin: '0 auto 14px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 500,
          color: '#fff',
        }}>
          {r.initials}
        </div>

        <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 500 }}>{r.name}</div>
        <div style={{
          fontFamily: 'var(--font-ui)', fontSize: 11, letterSpacing: '1.5px',
          textTransform: 'uppercase', color: 'var(--color-muted)', marginTop: 4,
        }}>
          {r.city}
        </div>

        <div style={{ color: 'var(--color-star)', letterSpacing: 4, margin: '16px 0 14px', fontSize: 16 }}>
          ★★★★★
        </div>

        <p style={{
          fontFamily: 'var(--font-display)', fontSize: 18, fontStyle: 'italic',
          lineHeight: 1.6, color: 'var(--color-body)', margin: 0,
        }}>
          "{r.quote}"
        </p>

        <div style={{
          fontFamily: 'var(--font-ui)', fontSize: 11, letterSpacing: '1.5px',
          textTransform: 'uppercase', color: 'var(--color-muted)', marginTop: 16,
        }}>
          via {r.source}
        </div>

        {/* Dots */}
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 24 }}>
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => animateTransition(i)}
              style={{
                width: i === idx ? 20 : 8,
                height: 8,
                borderRadius: 9999,
                background: i === idx ? accent : 'var(--color-hairline)',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'width 300ms ease, background 300ms ease',
              }}
            />
          ))}
        </div>
      </div>

      <ArrowBtn onClick={next} dir="right" />
    </div>
  )
}

function ArrowBtn({ onClick, dir }) {
  return (
    <button onClick={onClick} style={{
      width: 44, height: 44, borderRadius: '50%',
      background: 'transparent',
      border: '1px solid var(--color-border)',
      color: 'var(--color-ink)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      cursor: 'pointer', flexShrink: 0,
      transition: 'background 180ms ease, transform 180ms ease',
    }}
    onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-cream-deep)'; e.currentTarget.style.transform = 'scale(1.05)' }}
    onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = 'scale(1)' }}
    >
      {dir === 'left' ? <IconChevronLeft size={18} /> : <IconChevronRight size={18} />}
    </button>
  )
}
