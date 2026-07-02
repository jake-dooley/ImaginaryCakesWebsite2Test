'use client'
import { useScrollReveal } from '@/hooks/useScrollReveal'

export const Eyebrow = ({ children, align = 'center', style }) => (
  <div style={{
    fontFamily: 'var(--font-display)',
    fontSize: 13,
    fontWeight: 500,
    letterSpacing: '3.5px',
    textTransform: 'uppercase',
    color: 'var(--color-ink)',
    textAlign: align,
    ...style,
  }}>
    {children}
  </div>
)

export const OrnamentRule = ({ align = 'center', style, color }) => (
  <div
    className={align === 'left' ? 'ornament ornament--left' : 'ornament'}
    style={{ '--diamond-color': color, ...style }}
  >
    <div className="diamond" />
  </div>
)

export const SectionIntro = ({ eyebrow, title, titleItalicPart, sub, align = 'center', accentColor }) => {
  const ref = useScrollReveal({ y: 30 })
  return (
    <div ref={ref} style={{ textAlign: align, marginBottom: 48 }}>
      {eyebrow && <Eyebrow align={align}>{eyebrow}</Eyebrow>}
      {eyebrow && <OrnamentRule align={align} color={accentColor} />}
      {title && (
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(28px, 4vw, 42px)',
          fontWeight: 500,
          letterSpacing: '-0.2px',
          lineHeight: 1.15,
          margin: 0,
        }}>
          {title}
          {titleItalicPart && <em style={{ fontWeight: 500 }}> {titleItalicPart}</em>}
        </h2>
      )}
      {sub && (
        <p style={{
          marginTop: 14,
          fontStyle: 'italic',
          color: 'var(--color-body)',
          fontSize: 17,
          maxWidth: 560,
          marginLeft: align === 'center' ? 'auto' : 0,
          marginRight: align === 'center' ? 'auto' : 0,
        }}>
          {sub}
        </p>
      )}
    </div>
  )
}
