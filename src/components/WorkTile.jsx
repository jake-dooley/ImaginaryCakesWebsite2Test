'use client'
import { useState } from 'react'

export function WorkTile({ cake }) {
  const [hover, setHover] = useState(false)
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative',
        aspectRatio: '3 / 4',
        borderRadius: 16,
        overflow: 'hidden',
        cursor: 'pointer',
        background: 'rgba(255,255,255,0.25)',
        transform: hover ? 'scale(1.02)' : 'scale(1)',
        transition: 'transform 320ms ease',
      }}
    >
      <img src={cake.photo} alt={cake.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: hover ? 'rgba(44,24,16,.52)' : 'rgba(44,24,16,0)',
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        padding: 20, transition: 'background 250ms ease', color: '#fff',
      }}>
        <div style={{
          fontFamily: 'var(--font-display)', fontSize: 11, letterSpacing: '2.5px', textTransform: 'uppercase',
          opacity: hover ? 1 : 0, transition: 'opacity 250ms ease',
        }}>
          {cake.title}
        </div>
        <div style={{
          fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 14, marginTop: 4,
          opacity: hover ? 0.85 : 0, transition: 'opacity 250ms ease 50ms',
        }}>
          {cake.baker}
        </div>
      </div>
    </div>
  )
}
