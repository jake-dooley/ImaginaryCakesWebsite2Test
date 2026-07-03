'use client'
import { useState } from 'react'
import Link from 'next/link'

const BASE = {
  fontFamily: 'var(--font-display)',
  fontSize: 13,
  fontWeight: 600,
  letterSpacing: '2.5px',
  textTransform: 'uppercase',
  border: 0,
  cursor: 'pointer',
  padding: '13px 28px',
  borderRadius: 9999,
  whiteSpace: 'nowrap',
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  textDecoration: 'none',
}

// Gold gradient button — primary CTA style
export const GoldButton = ({ children, onClick, href, style, className, type = 'button', disabled }) => {
  const [hover, setHover] = useState(false)
  const sharedStyle = {
    ...BASE,
    background: 'var(--gradient-gold)',
    color: '#2C1810',
    boxShadow: hover && !disabled
      ? '0 8px 24px rgba(201,168,76,.45), 0 2px 8px rgba(201,168,76,.2)'
      : '0 4px 16px rgba(201,168,76,.25)',
    transform: hover && !disabled ? 'translateY(-2px)' : 'translateY(0)',
    transition: 'transform 180ms ease, box-shadow 180ms ease',
    opacity: disabled ? 0.6 : 1,
    cursor: disabled ? 'not-allowed' : 'pointer',
    ...style,
  }
  const handlers = {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: sharedStyle,
    className,
  }
  if (href) {
    return <Link href={href} {...handlers}>{children}</Link>
  }
  return <button type={type} onClick={onClick} disabled={disabled} {...handlers}>{children}</button>
}

// Outline / ghost button
export const OutlineButton = ({ children, onClick, href, style, className }) => {
  const [hover, setHover] = useState(false)
  const sharedStyle = {
    ...BASE,
    background: hover ? 'var(--page-accent, var(--color-ink))' : 'transparent',
    color: hover ? '#fff' : 'var(--color-ink)',
    border: `1.5px solid ${hover ? 'var(--page-accent, var(--color-ink))' : 'var(--color-ink)'}`,
    padding: '12px 27px',
    transition: 'background 200ms ease, color 200ms ease',
    ...style,
  }
  const handlers = {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: sharedStyle,
    className,
  }
  if (href) return <Link href={href} {...handlers}>{children}</Link>
  return <button type="button" onClick={onClick} {...handlers}>{children}</button>
}

// Lavender accent button
export const LavenderButton = ({ children, onClick, href, style, className }) => {
  const [hover, setHover] = useState(false)
  const sharedStyle = {
    ...BASE,
    background: hover ? '#8479C0' : '#9A8FD0',
    color: '#fff',
    transition: 'background 180ms ease, transform 180ms ease',
    transform: hover ? 'translateY(-1px)' : 'none',
    ...style,
  }
  const handlers = {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: sharedStyle,
    className,
  }
  if (href) return <Link href={href} {...handlers}>{children}</Link>
  return <button type="button" onClick={onClick} {...handlers}>{children}</button>
}
