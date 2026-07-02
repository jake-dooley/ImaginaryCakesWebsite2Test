'use client'
import { useEffect, useRef } from 'react'

export const ArchFrame = ({ src, width = 360, height = 480, style }) => {
  const ref = useRef(null)

  useEffect(() => {
    ;(async () => {
      const gsap = (await import('gsap')).default
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)
      const el = ref.current
      if (!el) return
      gsap.fromTo(
        el,
        { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0 },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          opacity: 1,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
        }
      )
    })()
  }, [])

  return (
    <div ref={ref} style={{
      width,
      height,
      borderRadius: `${width / 1.8}px ${width / 1.8}px 16px 16px`,
      overflow: 'hidden',
      background: 'rgba(255,255,255,0.25)',
      position: 'relative',
      boxShadow: 'var(--shadow-lift)',
      ...style,
    }}>
      {src && (
        <img
          src={src}
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      )}
    </div>
  )
}

export const OvalFrame = ({ src, width = 220, height = 320, label, sub, style }) => {
  const ref = useRef(null)

  useEffect(() => {
    ;(async () => {
      const gsap = (await import('gsap')).default
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)
      const el = ref.current
      if (!el) return
      gsap.fromTo(
        el,
        { scale: 0.88, opacity: 0, y: 30 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
        }
      )
    })()
  }, [])

  return (
    <div ref={ref} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, ...style }}>
      <div style={{
        width,
        height,
        borderRadius: 9999,
        overflow: 'hidden',
        background: 'rgba(255,255,255,0.25)',
      }}>
        {src && (
          <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        )}
      </div>
      {label && (
        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: 13,
            fontWeight: 500,
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: 'var(--color-ink)',
          }}>
            {label}
          </div>
          {sub && (
            <div style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontSize: 14,
              color: 'var(--color-muted)',
              marginTop: 6,
            }}>
              {sub}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
