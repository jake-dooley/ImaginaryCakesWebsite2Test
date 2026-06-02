'use client'

export default function Marquee({ items, color = 'gold' }) {
  const repeated = [...items, ...items, ...items, ...items, ...items, ...items]
  const bg = color === 'gold'
    ? 'var(--gradient-gold)'
    : 'linear-gradient(135deg, #F9E4E4, #F0C8C8, #F9E4E4)'
  const textColor = color === 'gold' ? 'var(--color-ink)' : 'var(--color-ink)'

  return (
    <div style={{
      background: bg,
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      padding: '16px 0',
    }}>
      <div style={{
        display: 'inline-flex',
        gap: 32,
        fontFamily: 'var(--font-display)',
        fontSize: 13,
        fontWeight: 500,
        letterSpacing: '3px',
        textTransform: 'uppercase',
        color: textColor,
        animation: 'marqueeScroll 40s linear infinite',
      }}>
        {repeated.map((t, i) => (
          <span key={i} style={{ display: 'inline-flex', gap: 32, alignItems: 'center' }}>
            <span>{t}</span>
            <span style={{ opacity: 0.5, fontSize: 8 }}>✦</span>
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marqueeScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}
