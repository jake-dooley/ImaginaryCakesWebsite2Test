'use client'
import { useEffect, useRef } from 'react'
import { AWARDS } from '@/data'

export default function AwardsRow() {
  const ref = useRef(null)

  useEffect(() => {
    ;(async () => {
      const gsap = (await import('gsap')).default
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)
      const el = ref.current
      if (!el) return
      gsap.fromTo(
        el.querySelectorAll('img'),
        { opacity: 0, y: 20, scale: 0.92 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
        }
      )
    })()
  }, [])

  return (
    <div ref={ref} style={{
      display: 'flex',
      gap: 40,
      alignItems: 'center',
      justifyContent: 'center',
      flexWrap: 'wrap',
    }}>
      {AWARDS.map((a) => (
        <img
          key={a.file}
          src={`/assets/awards/${a.file}`}
          alt={a.label}
          style={{ height: 92, width: 'auto', objectFit: 'contain' }}
        />
      ))}
    </div>
  )
}
