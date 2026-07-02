'use client'
import { useEffect, useRef } from 'react'
import { Eyebrow, OrnamentRule } from './SectionIntro'

export default function PageHero({ eyebrow, title, titleItalicPart, sub, children, accentColor = 'var(--page-accent, var(--color-ink))' }) {
  const ref = useRef(null)

  useEffect(() => {
    ;(async () => {
      const gsap = (await import('gsap')).default
      const el = ref.current
      if (!el) return
      gsap.fromTo(
        el.children,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power2.out', delay: 0.1 }
      )
    })()
  }, [])

  return (
    <section ref={ref} style={{ padding: '72px 40px 56px', textAlign: 'center', maxWidth: 1080, margin: '0 auto' }}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      {eyebrow && <OrnamentRule color={accentColor} />}
      {title && (
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(36px, 5vw, 58px)',
          fontWeight: 500,
          letterSpacing: '-0.4px',
          lineHeight: 1.08,
          margin: 0,
        }}>
          {title}
          {titleItalicPart && <><br /><em>{titleItalicPart}</em></>}
        </h1>
      )}
      {sub && (
        <p style={{
          marginTop: 18,
          fontStyle: 'italic',
          color: 'var(--color-body)',
          fontSize: 19,
          maxWidth: 640,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
          {sub}
        </p>
      )}
      {children}
    </section>
  )
}
