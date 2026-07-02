'use client'
import Link from 'next/link'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { GoldButton, OutlineButton } from './Buttons'

export default function ClosingCTA() {
  const ref = useScrollReveal({ y: 30 })
  return (
    <section style={{
      background: 'transparent',
      padding: '80px 40px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Subtle decorative circle */}
      <div style={{
        position: 'absolute', top: -60, right: -60,
        width: 240, height: 240, borderRadius: '50%',
        background: 'rgba(201,168,76,.06)',
        pointerEvents: 'none',
      }} />
      <div ref={ref} style={{
        maxWidth: 1080,
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        gap: 40,
        alignItems: 'center',
      }}>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(28px, 4vw, 46px)',
          fontWeight: 500,
          lineHeight: 1.15,
          letterSpacing: '-0.3px',
          color: 'var(--color-ink)',
          margin: 0,
        }}>
          Ready to taste<br /><em>sweet elegance?</em>
        </h2>
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          <GoldButton href="/contact">Start Your Order</GoldButton>
          <OutlineButton href="/gallery">View Gallery</OutlineButton>
        </div>
      </div>
      <style>{`
        @media (max-width: 680px) {
          section > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
