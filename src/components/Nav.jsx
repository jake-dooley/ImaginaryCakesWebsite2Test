'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { GoldButton } from './Buttons'
import { IconMenu, IconX } from './Icons'

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/flavors', label: 'Flavors' },
  { href: '/contact', label: 'Contact' },
]

export default function Nav() {
  const pathname = usePathname()
  const [compact, setCompact] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const navRef = useRef(null)

  useEffect(() => {
    let trigger
    let cancelled = false
    ;(async () => {
      const gsap = (await import('gsap')).default
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      if (cancelled) return
      gsap.registerPlugin(ScrollTrigger)

      trigger = ScrollTrigger.create({
        start: 'top -80',
        onEnter: () => setCompact(true),
        onLeaveBack: () => setCompact(false),
      })
    })()

    return () => {
      cancelled = true
      trigger?.kill()
    }
  }, [])

  useEffect(() => {
    if (!navRef.current) return
    ;(async () => {
      const gsap = (await import('gsap')).default
      gsap.to(navRef.current, {
        height: compact ? 64 : 84,
        boxShadow: compact
          ? '0 2px 20px rgba(44,24,16,.10)'
          : '0 1px 0 rgba(44,24,16,.08)',
        duration: 0.35,
        ease: 'power2.out',
      })
    })()
  }, [compact])

  return (
    <>
      <header ref={navRef} style={{
        height: 84,
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center',
        padding: '0 48px',
        position: 'sticky',
        top: 0,
        background: 'var(--color-cream)',
        zIndex: 100,
        boxShadow: '0 1px 0 rgba(44,24,16,.08)',
      }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', padding: '6px 0' }}>
          <img
            className="nav-logo"
            src="/assets/Imaginary_cakes_Logo_final.png"
            alt="Imaginary Cakes logo"
            style={{
              maxHeight: compact ? 48 : 68,
              width: 'auto',
              transition: 'max-height 0.35s ease',
            }}
          />
        </Link>

        {/* Desktop links */}
        <nav style={{ display: 'flex', gap: 36 }}>
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} style={{
              position: 'relative',
              fontFamily: 'var(--font-display)',
              fontSize: 13,
              fontWeight: 500,
              letterSpacing: '1.8px',
              textTransform: 'uppercase',
              color: pathname === l.href ? 'var(--color-ink)' : 'var(--color-muted)',
              padding: '8px 0',
              transition: 'color 180ms ease',
            }}>
              {l.label}
              {pathname === l.href && (
                <span style={{
                  position: 'absolute',
                  left: '50%',
                  bottom: -4,
                  transform: 'translateX(-50%) rotate(45deg)',
                  width: 5,
                  height: 5,
                  border: '1px solid var(--color-ink)',
                }} />
              )}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 16 }}>
          <GoldButton href="/contact" className="nav-order-btn">
            Order Now
          </GoldButton>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--color-ink)',
              display: 'none',
              padding: 4,
            }}
            className="nav-hamburger"
            aria-label="Menu"
          >
            {mobileOpen ? <IconX size={22} /> : <IconMenu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div style={{
          position: 'fixed',
          top: compact ? 64 : 84,
          left: 0,
          right: 0,
          background: 'var(--color-cream)',
          zIndex: 99,
          padding: '24px 32px',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          boxShadow: '0 8px 32px rgba(44,24,16,.12)',
        }}>
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)} style={{
              fontFamily: 'var(--font-display)',
              fontSize: 18,
              fontWeight: 500,
              color: 'var(--color-ink)',
              padding: '8px 0',
              borderBottom: '1px solid var(--color-hairline)',
            }}>
              {l.label}
            </Link>
          ))}
          <GoldButton href="/contact" onClick={() => setMobileOpen(false)} style={{ marginTop: 8, width: '100%', justifyContent: 'center' }}>
            Order Now
          </GoldButton>
        </div>
      )}

      <style>{`
        .nav-order-btn { display: inline-flex; }
        @media (max-width: 768px) {
          .nav-hamburger { display: flex !important; }
          header nav { display: none !important; }
          .nav-order-btn { display: none !important; }
          .nav-logo { max-height: 44px !important; }
        }
      `}</style>
    </>
  )
}
