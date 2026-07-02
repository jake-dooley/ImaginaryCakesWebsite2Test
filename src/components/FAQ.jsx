'use client'
import { useState, useRef, useEffect } from 'react'
import { IconPlus, IconMinus, IconHelp } from './Icons'
import { LavenderButton } from './Buttons'
import { FAQS } from '@/data'

export function FAQAccordion({ items = FAQS, tint = 'var(--sprinkle-blue-tint)' }) {
  const [open, setOpen] = useState(0)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {items.map((it, i) => (
        <FAQItem
          key={i}
          item={it}
          isOpen={open === i}
          onToggle={() => setOpen(open === i ? -1 : i)}
          bg={tint}
        />
      ))}
    </div>
  )
}

function FAQItem({ item, isOpen, onToggle, bg = 'var(--color-cream-soft)' }) {
  const bodyRef = useRef(null)

  useEffect(() => {
    ;(async () => {
      const gsap = (await import('gsap')).default
      const el = bodyRef.current
      if (!el) return
      if (isOpen) {
        gsap.fromTo(el, { height: 0, opacity: 0 }, { height: 'auto', opacity: 1, duration: 0.35, ease: 'power2.out' })
      } else {
        gsap.to(el, { height: 0, opacity: 0, duration: 0.25, ease: 'power2.in' })
      }
    })()
  }, [isOpen])

  return (
    <div onClick={onToggle} style={{
      background: bg,
      borderRadius: 16,
      padding: '20px 24px',
      cursor: 'pointer',
      border: `1px solid ${isOpen ? 'rgba(79,163,217,.4)' : 'transparent'}`,
      transition: 'border-color 200ms ease',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 17,
          fontWeight: 500,
          color: 'var(--color-ink)',
        }}>
          {item.q}
        </div>
        <div style={{ color: 'var(--color-ink)', flexShrink: 0, transition: 'transform 300ms ease', transform: isOpen ? 'rotate(180deg)' : 'none' }}>
          {isOpen ? <IconMinus size={18} /> : <IconPlus size={18} />}
        </div>
      </div>
      <div ref={bodyRef} style={{ overflow: 'hidden', height: 0, opacity: 0 }}>
        <div style={{
          marginTop: 12,
          fontFamily: 'var(--font-display)',
          fontSize: 16,
          lineHeight: 1.6,
          color: 'var(--color-body)',
        }}>
          {item.a}
        </div>
      </div>
    </div>
  )
}

export function FAQHelpCard({ href = '/contact', tint = 'var(--sprinkle-blue-tint)', accent = 'var(--sprinkle-blue)' }) {
  return (
    <div style={{
      background: tint,
      borderRadius: 16,
      padding: 28,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      gap: 14,
    }}>
      <div style={{
        width: 44, height: 44, borderRadius: '50%',
        background: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: accent,
      }}>
        <IconHelp size={22} />
      </div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 17 }}>
        <b style={{ fontWeight: 600 }}>Didn't find your question?</b>
        <div style={{ marginTop: 4, color: 'var(--color-body)' }}>
          Reach out to Cindy directly — we love talking cake.
        </div>
      </div>
      <LavenderButton href={href}>Get In Touch</LavenderButton>
    </div>
  )
}
