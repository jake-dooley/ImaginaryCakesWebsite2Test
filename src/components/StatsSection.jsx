'use client'
import { useEffect, useRef } from 'react'

const STATS = [
  { display: '16+', target: 16, suffix: '+', label: 'Years Baking' },
  { display: '1,000+', target: 1000, suffix: '+', label: 'Cakes Delivered' },
  { display: '6 – 600', label: 'Guests Per Event' },
  { display: '4.9 ★', label: 'Average Rating' },
]

export default function StatsSection() {
  const ref = useRef(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      const gsap = (await import('gsap')).default
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      if (cancelled) return
      gsap.registerPlugin(ScrollTrigger)
      const el = ref.current
      if (!el) return

      // Slide up the whole section
      gsap.fromTo(el, { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.9, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
      })

      // Count-up for numeric stats
      el.querySelectorAll('[data-counter]').forEach((counter) => {
        const target = +counter.dataset.counter
        const suffix = counter.dataset.suffix || ''
        const obj = { val: 0 }
        gsap.to(obj, {
          val: target,
          duration: 1.8,
          ease: 'power1.out',
          onUpdate() { counter.textContent = Math.round(obj.val).toLocaleString() + suffix },
          scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
        })
      })
    })()
    return () => { cancelled = true }
  }, [])

  return (
    <section ref={ref} style={{ background: '#fff', padding: '72px 48px' }}>
      <div style={{
        maxWidth: 1080, margin: '0 auto',
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 32, textAlign: 'center',
      }}>
        {STATS.map((s, i) => (
          <div key={i}>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(36px, 4vw, 58px)',
              fontWeight: 500, lineHeight: 1, letterSpacing: '-0.5px',
              color: 'var(--color-ink)',
            }}>
              {s.target !== undefined
                ? <span data-counter={s.target} data-suffix={s.suffix || ''}>{s.display}</span>
                : s.display}
            </div>
            <div style={{
              marginTop: 10, fontFamily: 'var(--font-ui)',
              fontSize: 12, fontWeight: 600, letterSpacing: '2.5px',
              textTransform: 'uppercase', color: 'var(--color-muted)',
            }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>
      <style>{`
        @media (max-width: 680px) {
          section > div { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  )
}
