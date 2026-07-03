import Link from 'next/link'
import { IconMapPin, IconClock, IconPhone, IconMail, IconInstagram, IconFacebook } from './Icons'
import { BUSINESS } from '@/data'

export default function Footer() {
  return (
    <footer style={{ padding: '72px 48px 24px', background: 'var(--color-cream)' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.6fr 1fr 1fr 1fr',
          gap: 48,
        }}>
          {/* Brand */}
          <div>
            <img src="/assets/Imaginary_cakes_Logo_final.png" alt="Imaginary Cakes logo" style={{ height: 80, width: 'auto' }} />
            <p style={{ marginTop: 18, fontStyle: 'italic', color: 'var(--color-body)', fontSize: 16, maxWidth: 360 }}>
              &ldquo;{BUSINESS.tagline}&rdquo;
            </p>
            <p style={{ marginTop: 12, fontSize: 14, color: 'var(--color-muted)' }}>
              Mother-daughter custom cake bakery in Wilmington, NC. Established {BUSINESS.established}.
            </p>
          </div>

          {/* Visit */}
          <FooterCol title="Visit">
            <FooterRow icon={<IconMapPin size={14} />}>{BUSINESS.address}</FooterRow>
            <FooterRow icon={<IconClock size={14} />}>{BUSINESS.hours}<br />{BUSINESS.hoursSaturday}</FooterRow>
            <FooterRow muted>{BUSINESS.hoursNote}</FooterRow>
          </FooterCol>

          {/* Reach Us */}
          <FooterCol title="Reach Us">
            <FooterRow icon={<IconPhone size={14} />}>{BUSINESS.phone}</FooterRow>
            <FooterRow icon={<IconMail size={14} />}>{BUSINESS.email}</FooterRow>
            <FooterRow icon={<IconInstagram size={14} />}>{BUSINESS.instagram}</FooterRow>
            <FooterRow icon={<IconFacebook size={14} />}>{BUSINESS.facebook}</FooterRow>
          </FooterCol>

          {/* Browse */}
          <FooterCol title="Browse">
            {[
              { label: 'Gallery', href: '/gallery' },
              { label: 'Flavors', href: '/flavors' },
              { label: 'About Us', href: '/about' },
              { label: 'Contact', href: '/contact' },
            ].map((l) => (
              <li key={l.label} style={{ listStyle: 'none' }}>
                <Link href={l.href} style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 15,
                  color: 'var(--color-ink)',
                }}>
                  {l.label}
                </Link>
              </li>
            ))}
          </FooterCol>
        </div>

        <div style={{
          marginTop: 56,
          paddingTop: 24,
          borderTop: '1px solid var(--color-hairline)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontFamily: 'var(--font-ui)',
          fontSize: 12,
          color: 'var(--color-muted)',
          flexWrap: 'wrap',
          gap: 8,
        }}>
          <div>© 2026 Imaginary Cakes. All rights reserved.</div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          footer > div > div { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          footer > div > div { grid-template-columns: 1fr !important; }
          footer { padding: 48px 24px 16px !important; }
        }
      `}</style>
    </footer>
  )
}

function FooterCol({ title, children }) {
  return (
    <div>
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: 13,
        fontWeight: 500,
        letterSpacing: '3px',
        textTransform: 'uppercase',
        color: 'var(--color-ink)',
        marginBottom: 16,
      }}>
        {title}
      </div>
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {children}
      </ul>
    </div>
  )
}

function FooterRow({ icon, muted, children }) {
  return (
    <li style={{
      display: 'flex',
      gap: 10,
      alignItems: 'flex-start',
      fontFamily: 'var(--font-display)',
      fontSize: 15,
      color: muted ? 'var(--color-muted)' : 'var(--color-body)',
    }}>
      {icon && <span style={{ marginTop: 2, color: 'var(--color-ink)', flexShrink: 0 }}>{icon}</span>}
      <span>{children}</span>
    </li>
  )
}
