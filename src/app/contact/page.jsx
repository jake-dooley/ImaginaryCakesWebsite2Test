'use client'
import { useState, useRef, useEffect } from 'react'
import PageHero from '@/components/PageHero'
import { GoldButton } from '@/components/Buttons'
import { Eyebrow } from '@/components/SectionIntro'
import Marquee from '@/components/Marquee'
import ClosingCTA from '@/components/ClosingCTA'
import { IconClock, IconPhone, IconMail, IconInstagram, IconFacebook } from '@/components/Icons'
import { CATEGORIES, BUSINESS } from '@/data'

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="Tell Us About"
        titleItalicPart="Your Sweet Moment."
        sub="Every cake starts with a conversation. Drop us a note with your event date, guest count, and any inspiration — we'll be back within one business day."
      />
      <ContactSection />
      <Marquee items={['Cakes So Good', "They Can't Be Real", 'Booking Spring 2026']} color="blush" />
      <ClosingCTA />
    </>
  )
}

function ContactSection() {
  const formRef = useRef(null)
  const infoRef = useRef(null)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', eventDate: '', guests: '', cakeType: 'Weddings', message: '' })

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  useEffect(() => {
    ;(async () => {
      const gsap = (await import('gsap')).default
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      if (formRef.current) {
        gsap.fromTo(
          formRef.current.querySelectorAll('.form-field'),
          { x: -30, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: 'power2.out',
            scrollTrigger: { trigger: formRef.current, start: 'top 85%', toggleActions: 'play none none none' },
          }
        )
      }
      if (infoRef.current) {
        gsap.fromTo(
          infoRef.current,
          { x: 30, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 0.9, ease: 'power2.out',
            scrollTrigger: { trigger: infoRef.current, start: 'top 85%', toggleActions: 'play none none none' },
          }
        )
      }
    })()
  }, [])

  const inputStyle = {
    fontFamily: 'var(--font-display)',
    fontSize: 17,
    color: 'var(--color-ink)',
    background: 'var(--color-cream-soft)',
    border: '1px solid var(--color-hairline)',
    borderRadius: 10,
    padding: '14px 16px',
    outline: 'none',
    width: '100%',
    transition: 'border-color 180ms ease, box-shadow 180ms ease',
  }

  const handleFocus = (e) => {
    e.target.style.borderColor = 'var(--color-gold)'
    e.target.style.boxShadow = '0 0 0 3px rgba(201,168,76,.15)'
  }
  const handleBlur = (e) => {
    e.target.style.borderColor = 'var(--color-hairline)'
    e.target.style.boxShadow = 'none'
  }

  return (
    <section style={{ maxWidth: 1080, margin: '0 auto', padding: '0 40px 96px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 48, alignItems: 'flex-start' }}>

        {/* Form */}
        <form ref={formRef} onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }}
          style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {submitted && (
            <div style={{
              background: 'var(--color-cream-soft)',
              border: '1px solid rgba(90,128,96,.4)',
              borderRadius: 12,
              padding: '14px 18px',
              fontFamily: 'var(--font-display)',
              fontSize: 16,
              color: 'var(--color-success)',
            }}>
              Thank you! We'll be in touch within one business day.
            </div>
          )}

          <div className="form-field" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <Field label="Your Name">
              <input style={inputStyle} value={form.name} onChange={set('name')} placeholder="Cindy Brown" onFocus={handleFocus} onBlur={handleBlur} />
            </Field>
            <Field label="Phone">
              <input style={inputStyle} value={form.phone} onChange={set('phone')} placeholder="(910) 555-0100" onFocus={handleFocus} onBlur={handleBlur} />
            </Field>
          </div>

          <div className="form-field">
            <Field label="Email">
              <input style={inputStyle} value={form.email} onChange={set('email')} placeholder="yum@imaginarycakes.com" onFocus={handleFocus} onBlur={handleBlur} />
            </Field>
          </div>

          <div className="form-field" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <Field label="Event Date">
              <input style={inputStyle} value={form.eventDate} onChange={set('eventDate')} placeholder="June 14, 2026" onFocus={handleFocus} onBlur={handleBlur} />
            </Field>
            <Field label="Guest Count">
              <input style={inputStyle} value={form.guests} onChange={set('guests')} placeholder="80" onFocus={handleFocus} onBlur={handleBlur} />
            </Field>
          </div>

          <div className="form-field">
            <Field label="Cake Type">
              <select value={form.cakeType} onChange={set('cakeType')} onFocus={handleFocus} onBlur={handleBlur}
                style={{
                  ...inputStyle,
                  appearance: 'none',
                  backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8'><polyline points='1,1 6,6 11,1' stroke='%232C1810' stroke-width='1.5' fill='none' stroke-linecap='round'/></svg>")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 16px center',
                  paddingRight: 42,
                }}>
                {CATEGORIES.map((c) => <option key={c.key} value={c.label}>{c.label}</option>)}
              </select>
            </Field>
          </div>

          <div className="form-field">
            <Field label="Tell Us About Your Event">
              <textarea value={form.message} onChange={set('message')} rows={6} onFocus={handleFocus} onBlur={handleBlur}
                placeholder="Theme, color palette, inspiration photos, dietary needs — anything that helps us picture the day."
                style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
              />
            </Field>
          </div>

          <div className="form-field" style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <GoldButton>Send Note</GoldButton>
            <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 14, color: 'var(--color-muted)' }}>
              We reply within one business day.
            </span>
          </div>
        </form>

        {/* Info card */}
        <aside ref={infoRef} style={{
          background: 'var(--color-cream-soft)',
          borderRadius: 16,
          padding: 32,
          display: 'flex',
          flexDirection: 'column',
          gap: 22,
          boxShadow: 'var(--shadow-card)',
        }}>
          <div>
            <Eyebrow align="left" style={{ fontSize: 11 }}>Visit the Shop</Eyebrow>
            <p style={{ marginTop: 12, fontFamily: 'var(--font-display)', fontSize: 16, lineHeight: 1.65 }}>
              5202 Carolina Beach Rd, Unit 12<br />Wilmington, NC 28412
            </p>
            <p style={{ marginTop: 10, fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 14, color: 'var(--color-muted)' }}>
              By appointment only — please call or email first.
            </p>
          </div>

          <div style={{ height: 1, background: 'var(--color-hairline)' }} />

          <InfoLine icon={<IconClock size={18} />} title="Hours">
            {BUSINESS.hours}<br />
            <span style={{ color: 'var(--color-muted)', fontSize: 14 }}>{BUSINESS.hoursNote}</span>
          </InfoLine>
          <InfoLine icon={<IconPhone size={18} />} title="Phone">{BUSINESS.phone}</InfoLine>
          <InfoLine icon={<IconMail size={18} />} title="Email">{BUSINESS.email}</InfoLine>

          <div style={{ height: 1, background: 'var(--color-hairline)' }} />

          <InfoLine icon={<IconInstagram size={18} />} title="Instagram">
            @imaginarycakes<br />
            <span style={{ color: 'var(--color-muted)', fontSize: 14 }}>3,600+ followers</span>
          </InfoLine>
          <InfoLine icon={<IconFacebook size={18} />} title="Facebook">
            facebook.com/imaginarycakes<br />
            <span style={{ color: 'var(--color-muted)', fontSize: 14 }}>98% recommend</span>
          </InfoLine>

          <div style={{ height: 1, background: 'var(--color-hairline)' }} />

          <div style={{
            background: 'linear-gradient(135deg, #FFEFC9, #FFF8E7)',
            borderRadius: 12,
            padding: 16,
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontSize: 15,
            color: 'var(--color-body)',
            lineHeight: 1.55,
          }}>
            All orders require a <strong style={{ fontStyle: 'normal', color: 'var(--color-ink)' }}>minimum of two weeks</strong> lead time. Wedding cakes book up 6–8 weeks ahead during peak season (April – October).
          </div>
        </aside>
      </div>

      <style>{`
        @media (max-width: 860px) {
          section > div[style*="1.4fr 1fr"] { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 560px) {
          div[style*="gridTemplateColumns: '1fr 1fr'"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

function Field({ label, children }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
      <span style={{
        fontFamily: 'var(--font-ui)',
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: '2px',
        textTransform: 'uppercase',
        color: 'var(--color-muted)',
      }}>
        {label}
      </span>
      {children}
    </label>
  )
}

function InfoLine({ icon, title, children }) {
  return (
    <div style={{ display: 'flex', gap: 14 }}>
      <div style={{ color: 'var(--color-gold)', marginTop: 2, flexShrink: 0 }}>{icon}</div>
      <div>
        <div style={{ fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--color-muted)' }}>
          {title}
        </div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, color: 'var(--color-ink)', marginTop: 4, lineHeight: 1.55 }}>
          {children}
        </div>
      </div>
    </div>
  )
}
