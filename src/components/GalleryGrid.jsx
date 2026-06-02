'use client'
import { useState, useEffect, useRef } from 'react'
import { CATEGORIES, CAKE_PHOTOS } from '@/data'

const CHIPS = [{ key: 'all', label: 'All' }, ...CATEGORIES]
const ALL_PHOTOS = [...CAKE_PHOTOS, ...CAKE_PHOTOS].map((p, i) => ({ ...p, uid: `${p.id}-${i}` }))

export default function GalleryGrid() {
  const [filter, setFilter] = useState('all')
  const gridRef = useRef(null)

  const filtered = filter === 'all' ? ALL_PHOTOS : ALL_PHOTOS.filter((p) => p.category === filter)

  useEffect(() => {
    // Initial stagger reveal on mount
    ;(async () => {
      const gsap = (await import('gsap')).default
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)
      const el = gridRef.current
      if (!el) return
      gsap.fromTo(
        el.querySelectorAll('.gallery-tile'),
        { opacity: 0, scale: 0.93, y: 20 },
        {
          opacity: 1, scale: 1, y: 0,
          duration: 0.6,
          stagger: { amount: 0.8, from: 'start' },
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
        }
      )
    })()
  }, [])

  const handleFilter = async (key) => {
    const gsap = (await import('gsap')).default
    const tiles = gridRef.current?.querySelectorAll('.gallery-tile')
    if (tiles?.length) {
      gsap.to(tiles, { opacity: 0, scale: 0.94, duration: 0.18, ease: 'power1.in', stagger: 0.02 })
      await new Promise((res) => setTimeout(res, 280))
    }
    setFilter(key)
  }

  // Re-animate when filter changes
  useEffect(() => {
    if (!gridRef.current) return
    ;(async () => {
      const gsap = (await import('gsap')).default
      gsap.fromTo(
        gridRef.current.querySelectorAll('.gallery-tile'),
        { opacity: 0, scale: 0.93, y: 15 },
        { opacity: 1, scale: 1, y: 0, duration: 0.5, stagger: { amount: 0.6 }, ease: 'power2.out' }
      )
    })()
  }, [filter])

  return (
    <>
      {/* Filter chips */}
      <div style={{
        display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center',
        paddingBottom: 28, borderBottom: '1px solid var(--color-hairline)', marginBottom: 32,
      }}>
        {CHIPS.map((c) => (
          <button
            key={c.key}
            onClick={() => handleFilter(c.key)}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              padding: '10px 18px',
              borderRadius: 9999,
              cursor: 'pointer',
              background: filter === c.key
                ? 'var(--gradient-gold)'
                : 'transparent',
              color: 'var(--color-ink)',
              border: filter === c.key
                ? '1px solid transparent'
                : '1px solid var(--color-border)',
              transition: 'all 160ms ease',
              boxShadow: filter === c.key ? '0 2px 8px rgba(201,168,76,.3)' : 'none',
            }}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div ref={gridRef} style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 20,
      }}>
        {filtered.map((cake, i) => (
          <GalleryTile key={cake.uid} cake={cake} tall={i % 5 === 0 || i % 7 === 0} />
        ))}
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .gallery-grid-wrap { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 680px) {
          .gallery-grid-wrap { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </>
  )
}

function GalleryTile({ cake, tall }) {
  const [hover, setHover] = useState(false)
  return (
    <div
      className="gallery-tile"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative',
        aspectRatio: tall ? '3 / 4' : '1 / 1',
        borderRadius: 16,
        overflow: 'hidden',
        background: 'var(--color-cream-deep)',
        cursor: 'pointer',
        transform: hover ? 'scale(1.02)' : 'scale(1)',
        transition: 'transform 300ms ease',
      }}
    >
      <img src={cake.photo} alt={cake.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: hover ? 'rgba(44,24,16,.52)' : 'rgba(44,24,16,0)',
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        padding: 16, transition: 'background 220ms ease', color: '#fff',
      }}>
        <div style={{
          fontFamily: 'var(--font-display)', fontSize: 11, letterSpacing: '2.5px', textTransform: 'uppercase',
          opacity: hover ? 1 : 0, transition: 'opacity 220ms ease 60ms',
        }}>
          {(CATEGORIES.find((c) => c.key === cake.category) || {}).label}
        </div>
        <div style={{
          fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 500, marginTop: 4,
          opacity: hover ? 1 : 0,
          transform: hover ? 'translateY(0)' : 'translateY(8px)',
          transition: 'opacity 220ms ease 80ms, transform 220ms ease 80ms',
        }}>
          {cake.title}
        </div>
        <div style={{
          fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 13, marginTop: 4,
          opacity: hover ? 0.9 : 0,
          transform: hover ? 'translateY(0)' : 'translateY(8px)',
          transition: 'opacity 220ms ease 110ms, transform 220ms ease 110ms',
        }}>
          {cake.baker}
        </div>
      </div>
    </div>
  )
}
