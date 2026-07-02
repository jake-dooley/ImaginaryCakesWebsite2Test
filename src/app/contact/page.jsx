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
    <div style={{ '--page-accent': 'var(--sprinkle-green)', background: 'var(--sprinkle-green)' }}>
      <PageHero
        eyebrow="Contact Us"
        title="Tell Us About"
        titleItalicPart="Your Sweet Moment."
        sub="Every cake starts with a conversation. Drop us a note with your event date, guest count, and any inspiration — we'll be back within one business day."
        accentColor="#fff"
      />
      <ContactSection />
      <Marquee items={['Cakes So Good', "They Can't Be Real", 'Booking Spring 2026']} color="white" />
      <ClosingCTA />
    </div>
  )
}

const SELECT_ARROW = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8'><polyline points='1,1 6,6 11,1' stroke='%232C1810' stroke-width='1.5' fill='none' stroke-linecap='round'/></svg>")`

const MAX_TOTAL_UPLOAD_BYTES = 10 * 1024 * 1024 // 10MB combined

function formatMB(bytes) {
  return (bytes / (1024 * 1024)).toFixed(1)
}

function ContactSection() {
  const formRef = useRef(null)
  const infoRef = useRef(null)

  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState(null)
  const [form, setForm] = useState({
    name: '', email: '', phone: '', eventDate: '',
    guests: '', cakeType: 'Weddings', fulfillment: '', message: '',
  })

  const [photos, setPhotos] = useState([])
  const [photoError, setPhotoError] = useState(null)
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef(null)

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const addPhotos = (fileList) => {
    const incoming = Array.from(fileList)
    const nonImages = incoming.filter((f) => !f.type.startsWith('image/'))
    const images = incoming.filter((f) => f.type.startsWith('image/'))

    if (nonImages.length) {
      const names = nonImages.map((f) => f.name).join(', ')
      setPhotoError(`${names} — only image files (JPG, PNG, HEIC, etc.) can be uploaded.`)
    } else {
      setPhotoError(null)
    }

    if (!images.length) return

    const combined = [...photos, ...images]
    const totalBytes = combined.reduce((sum, f) => sum + f.size, 0)
    if (totalBytes > MAX_TOTAL_UPLOAD_BYTES) {
      setPhotoError(`These photos total ${formatMB(totalBytes)}MB, which is over the 10MB limit. Please remove a photo or choose smaller files.`)
      return
    }
    setPhotos(combined)
  }

  const removePhoto = (index) => setPhotos(photos.filter((_, i) => i !== index))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    setError(null)
    try {
      const formData = new FormData()
      Object.entries(form).forEach(([k, v]) => formData.append(k, v))
      photos.forEach((file) => formData.append('attachment', file))
      formData.append('access_key', '7fc6669b-4903-42b5-a343-ecebbda3c330')
      const response = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: formData })
      const data = await response.json()
      if (response.ok) {
        setSubmitted(true)
        setForm({ name: '', email: '', phone: '', eventDate: '', guests: '', cakeType: 'Weddings', fulfillment: '', message: '' })
        setPhotos([])
        setPhotoError(null)
      } else {
        setError(data.message || 'Submission failed. Please try again.')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setSending(false)
    }
  }

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
    background: '#fff',
    border: '1px solid var(--color-hairline)',
    borderRadius: 10,
    padding: '14px 16px',
    outline: 'none',
    width: '100%',
    transition: 'border-color 180ms ease, box-shadow 180ms ease',
  }

  const selectStyle = {
    ...inputStyle,
    appearance: 'none',
    backgroundImage: SELECT_ARROW,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 16px center',
    paddingRight: 42,
  }

  const handleFocus = (e) => {
    e.target.style.borderColor = 'var(--sprinkle-green)'
    e.target.style.boxShadow = '0 0 0 3px rgba(139,195,74,.15)'
  }
  const handleBlur = (e) => {
    e.target.style.borderColor = 'var(--color-hairline)'
    e.target.style.boxShadow = 'none'
  }

  return (
    <section style={{ maxWidth: 1080, margin: '0 auto', padding: '0 40px 96px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 48, alignItems: 'flex-start' }}>

        {/* Form */}
        <form ref={formRef} onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>

          {submitted && (
            <div style={{
              background: '#fff',
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
          {error && (
            <div style={{
              background: '#fff5f5',
              border: '1px solid rgba(200,60,60,.35)',
              borderRadius: 12,
              padding: '14px 18px',
              fontFamily: 'var(--font-display)',
              fontSize: 16,
              color: '#c43c3c',
            }}>
              {error}
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

          <div className="form-field" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <Field label="Cake Type">
              <select value={form.cakeType} onChange={set('cakeType')} onFocus={handleFocus} onBlur={handleBlur} style={selectStyle}>
                {CATEGORIES.map((c) => <option key={c.key} value={c.label}>{c.label}</option>)}
              </select>
            </Field>

            <Field label="Pickup or Delivery?">
              <select
                value={form.fulfillment}
                onChange={set('fulfillment')}
                onFocus={handleFocus}
                onBlur={handleBlur}
                required
                style={{
                  ...selectStyle,
                  color: form.fulfillment === '' ? 'var(--color-muted)' : 'var(--color-ink)',
                }}
              >
                <option value="" disabled>Select an option</option>
                <option value="Pickup">Pickup</option>
                <option value="Delivery">Delivery</option>
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

          <div className="form-field" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span style={{
              fontFamily: 'var(--font-ui)',
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: 'var(--color-muted)',
            }}>
              Upload Inspiration Photos (optional)
            </span>

            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => { e.preventDefault(); setDragOver(false); addPhotos(e.dataTransfer.files) }}
              style={{
                border: `1.5px dashed ${dragOver ? 'var(--sprinkle-green)' : 'var(--color-hairline)'}`,
                borderRadius: 10,
                padding: '28px 16px',
                textAlign: 'center',
                cursor: 'pointer',
                background: dragOver ? 'rgba(139,195,74,.08)' : '#fff',
                transition: 'border-color 180ms ease, background 180ms ease',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <svg width={26} height={26} viewBox="0 0 24 24" fill="none" stroke="var(--sprinkle-green)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 15V4M12 4l-4 4M12 4l4 4" />
                <path d="M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" />
              </svg>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 15, color: 'var(--color-ink)' }}>
                Click to upload or drag and drop
              </span>
              <span style={{ fontFamily: 'var(--font-ui)', fontSize: 12, color: 'var(--color-muted)' }}>
                Images only, up to 10MB total
              </span>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                style={{ display: 'none' }}
                onChange={(e) => { addPhotos(e.target.files); e.target.value = null }}
              />
            </div>

            <span style={{ fontFamily: 'var(--font-ui)', fontSize: 13, color: 'var(--color-muted)', lineHeight: 1.5 }}>
              Share any photos of cakes or designs you love — this helps us bring your vision to life.
            </span>

            {photoError && (
              <span style={{ fontFamily: 'var(--font-ui)', fontSize: 13, color: 'var(--color-error)' }}>
                {photoError}
              </span>
            )}

            {photos.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {photos.map((file, i) => (
                  <span key={`${file.name}-${i}`} style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    fontFamily: 'var(--font-ui)',
                    fontSize: 12,
                    color: 'var(--color-body)',
                    background: 'var(--color-cream-soft)',
                    border: '1px solid var(--color-hairline)',
                    borderRadius: 999,
                    padding: '5px 10px',
                  }}>
                    {file.name} ({formatMB(file.size)}MB)
                    <button
                      type="button"
                      onClick={() => removePhoto(i)}
                      aria-label={`Remove ${file.name}`}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: 'var(--color-muted)',
                        fontSize: 14,
                        lineHeight: 1,
                        padding: 0,
                      }}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="form-field" style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <GoldButton type="submit" disabled={sending}>{sending ? 'Sending…' : 'Send Note'}</GoldButton>
            <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 14, color: 'var(--color-muted)' }}>
              We reply within one business day.
            </span>
          </div>
        </form>

        {/* Info card */}
        <aside ref={infoRef} style={{
          background: '#fff',
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

          <InfoLine icon={<IconClock size={18} />} title="Hours" iconColor="var(--sprinkle-green)">
            {BUSINESS.hours}<br />
            <span style={{ color: 'var(--color-muted)', fontSize: 14 }}>{BUSINESS.hoursNote}</span>
          </InfoLine>
          <InfoLine icon={<IconPhone size={18} />} title="Phone" iconColor="var(--sprinkle-green)">{BUSINESS.phone}</InfoLine>
          <InfoLine icon={<IconMail size={18} />} title="Email" iconColor="var(--sprinkle-green)">{BUSINESS.email}</InfoLine>

          <div style={{ height: 1, background: 'var(--color-hairline)' }} />

          <InfoLine icon={<IconInstagram size={18} />} title="Instagram" iconColor="var(--sprinkle-green)">
            @imaginarycakes<br />
            <span style={{ color: 'var(--color-muted)', fontSize: 14 }}>3,600+ followers</span>
          </InfoLine>
          <InfoLine icon={<IconFacebook size={18} />} title="Facebook" iconColor="var(--sprinkle-green)">
            facebook.com/imaginarycakes<br />
            <span style={{ color: 'var(--color-muted)', fontSize: 14 }}>98% recommend</span>
          </InfoLine>

          <div style={{ height: 1, background: 'var(--color-hairline)' }} />

          <div style={{
            background: '#fff',
            borderRadius: 12,
            padding: 16,
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontSize: 15,
            color: 'var(--color-body)',
            lineHeight: 1.55,
          }}>
            All orders require 24-48 hour lead time
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

function InfoLine({ icon, title, children, iconColor = 'var(--color-gold)' }) {
  return (
    <div style={{ display: 'flex', gap: 14 }}>
      <div style={{ color: iconColor, marginTop: 2, flexShrink: 0 }}>{icon}</div>
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
