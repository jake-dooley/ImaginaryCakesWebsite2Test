'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { GoldButton, OutlineButton, LavenderButton } from '@/components/Buttons'
import { SectionIntro, Eyebrow, OrnamentRule } from '@/components/SectionIntro'
import { ArchFrame, OvalFrame } from '@/components/Frames'
import { WorkTile } from '@/components/WorkTile'
import TestimonialCarousel from '@/components/Testimonials'
import Marquee from '@/components/Marquee'
import { FAQAccordion, FAQHelpCard } from '@/components/FAQ'
import AwardsRow from '@/components/Awards'
import ClosingCTA from '@/components/ClosingCTA'
import { BotanicalSprig } from '@/components/Icons'
import { useScrollReveal, useStaggerReveal } from '@/hooks/useScrollReveal' // stagger used in OurWorks
import { CAKE_PHOTOS, FAQS } from '@/data'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TraditionBand />
      <CategoriesSection />
      <OurWorksSection />
      <TestimonialsSection />
      <Marquee items={['Cakes So Good', "They Can't Be Real", 'Handcrafted With Love', 'Wilmington, NC Since 2009']} />
      <FAQSection />
      <AwardsSection />
      <ClosingCTA />
    </>
  )
}

// ─── Hero ───────────────────────────────────────────────────────────────────
function HeroSection() {
  const titleRef = useRef(null)
  const textRef = useRef(null)
  const ctaRef = useRef(null)

  useEffect(() => {
    ;(async () => {
      const gsap = (await import('gsap')).default
      const tl = gsap.timeline({ delay: 0.15 })

      if (titleRef.current) {
        tl.fromTo(
          titleRef.current.children,
          { y: 80, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.0, stagger: 0.18, ease: 'power3.out' }
        )
      }
      if (textRef.current) {
        tl.fromTo(
          textRef.current.children,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power2.out' },
          '-=0.5'
        )
      }
      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' },
          '-=0.4'
        )
      }
    })()
  }, [])

  return (
    <section style={{ padding: '48px 48px 96px', position: 'relative', overflow: 'hidden' }}>
      {/* Botanical sprigs */}
      <BotanicalSprig side="left" size={120} style={{ position: 'absolute', left: -8, bottom: 80 }} />
      <BotanicalSprig side="right" size={120} style={{ position: 'absolute', right: -8, bottom: 80 }} />

      <div style={{
        maxWidth: 1240,
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1.05fr 1fr',
        gap: 64,
        alignItems: 'center',
      }}>
        {/* Text */}
        <div>
          <div ref={titleRef}>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(44px, 6vw, 72px)',
              fontWeight: 500,
              lineHeight: 1.04,
              letterSpacing: '-0.6px',
              color: 'var(--color-ink)',
              margin: 0,
            }}>
              <span style={{ display: 'block' }}>Handcrafted Cakes</span>
              <em style={{ display: 'block', fontWeight: 500 }}>Made With Love.</em>
            </h1>
          </div>

          {/* Diamond rule */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '26px 0 18px' }}>
            <div style={{ width: 60, height: 1, background: 'var(--color-border)' }} />
            <div style={{ width: 6, height: 6, border: '1px solid var(--color-ink)', transform: 'rotate(45deg)' }} />
            <div style={{ width: 60, height: 1, background: 'var(--color-border)' }} />
          </div>

          <div ref={textRef}>
            <p style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontSize: 19,
              color: 'var(--color-body)',
              maxWidth: 460,
              margin: '0 0 12px',
            }}>
              For your sweetest moments, because every occasion deserves something beautiful.
            </p>
            <p style={{
              fontFamily: 'var(--font-display)',
              fontSize: 16,
              color: 'var(--color-muted)',
              maxWidth: 460,
              margin: 0,
            }}>
              Indulge in our signature butter pound cake, made with the finest ingredients.
            </p>
          </div>

          <div ref={ctaRef} style={{ display: 'flex', gap: 14, marginTop: 32, flexWrap: 'wrap' }}>
            <GoldButton href="/contact">Order Now</GoldButton>
            <OutlineButton href="/gallery">View Gallery</OutlineButton>
          </div>
        </div>

        {/* Visual */}
        <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
          <ArchFrame
            src="https://static.wixstatic.com/media/af4445_3fb2b3e952fe4b3b8b9f9ff9d4500a8a~mv2.jpg/v1/fill/w_800,h_1067,q_90,enc_avif,quality_auto/af4445_3fb2b3e952fe4b3b8b9f9ff9d4500a8a~mv2.jpg"
            width={400} height={520}
          />
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          section:first-of-type > div { grid-template-columns: 1fr !important; }
          section:first-of-type > div > div:last-child { display: none !important; }
        }
        @media (max-width: 600px) {
          section:first-of-type { padding: 32px 24px 64px !important; }
        }
      `}</style>
    </section>
  )
}

// ─── Full-bleed tradition band ────────────────────────────────────────────
function TraditionBand() {
  const imgRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    ;(async () => {
      const gsap = (await import('gsap')).default
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      // Parallax on the image
      if (imgRef.current) {
        gsap.to(imgRef.current, {
          yPercent: -15,
          ease: 'none',
          scrollTrigger: {
            trigger: imgRef.current.parentElement,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      }

      // Text reveal
      if (textRef.current) {
        gsap.fromTo(
          textRef.current.children,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.9, stagger: 0.15, ease: 'power2.out',
            scrollTrigger: { trigger: textRef.current, start: 'top 80%', toggleActions: 'play none none none' },
          }
        )
      }
    })()
  }, [])

  return (
    <section style={{ position: 'relative', height: 480, overflow: 'hidden' }}>
      <img
        ref={imgRef}
        src="https://static.wixstatic.com/media/af4445_88cacdd33be74a80918b1b2f2fa21781~mv2.jpg/v1/fill/w_1800,h_1080,q_90,enc_avif,quality_auto/af4445_88cacdd33be74a80918b1b2f2fa21781~mv2.jpg"
        alt=""
        style={{ width: '100%', height: '120%', objectFit: 'cover', display: 'block' }}
      />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'rgba(44,24,16,.30)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div ref={textRef} style={{ maxWidth: 720, textAlign: 'center', padding: '0 24px', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 46px)',
            fontWeight: 500, lineHeight: 1.1, margin: 0, color: '#fff',
          }}>
            A Slice of <em>Tradition,</em><br />Freshly Baked.
          </h2>
          <p style={{
            fontFamily: 'var(--font-display)', fontStyle: 'italic',
            fontSize: 18, color: 'rgba(255,255,255,.92)', maxWidth: 480, margin: 0,
          }}>
            Every cake is hand-finished the morning of pickup — never frozen, never rushed.
          </p>
          <GoldButton href="/about">Our Story</GoldButton>
        </div>
      </div>
    </section>
  )
}

// ─── Categories ──────────────────────────────────────────────────────────
function CategoriesSection() {
  return (
    <section style={{ padding: '96px 48px 0', maxWidth: 1240, margin: '0 auto', position: 'relative' }}>
      <BotanicalSprig side="left" size={110} style={{ position: 'absolute', left: 8, top: 90, opacity: 0.4 }} />
      <BotanicalSprig side="right" size={110} style={{ position: 'absolute', right: 8, top: 90, opacity: 0.4 }} />

      <SectionIntro
        eyebrow="Cake Category"
        title="A Delight for Every Celebration —"
        titleItalicPart="Choose Your Slice."
        sub="From garden weddings to sculpted 3D showstoppers, every cake we make is fully custom."
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 32, alignItems: 'end' }}>
        <OvalFrame
          src="https://static.wixstatic.com/media/af4445_637521836d53407ea85648660f530d3f~mv2.jpeg/v1/fill/w_600,h_800,q_90,enc_avif,quality_auto/af4445_637521836d53407ea85648660f530d3f~mv2.jpeg"
          label="Birthday & Celebration" sub="From smash cakes to milestone tiers"
          width={260} height={360}
        />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <OvalFrame
            src="/assets/cakes/wedding-lavender-tier.avif"
            label="Wedding Cakes" sub="The signature — 6 to 600 guests"
            width={300} height={420}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <OvalFrame
            src="https://static.wixstatic.com/media/af4445_347a8ed0d3e5473796f716acc29e2cde~mv2.jpg/v1/fill/w_600,h_880,q_90,enc_avif,quality_auto/af4445_347a8ed0d3e5473796f716acc29e2cde~mv2.jpg"
            label="3D & Sculpted" sub="Cake that doesn't look like cake"
            width={260} height={360}
          />
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: 40 }}>
        <GoldButton href="/gallery">See More</GoldButton>
      </div>

      <style>{`
        @media (max-width: 760px) {
          .oval-item { justify-content: center !important; }
          section > div[style*="grid-template-columns: 1fr 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

// ─── Our Works ───────────────────────────────────────────────────────────
function OurWorksSection() {
  const ref = useStaggerReveal('.work-tile', { stagger: 0.1, scale: 0.94 })

  return (
    <section style={{ padding: '96px 48px 0', maxWidth: 1240, margin: '0 auto' }}>
      <SectionIntro
        eyebrow="Our Works"
        title="Every Cake"
        titleItalicPart="Tells a Sweet Story."
        sub="A peek at recent celebrations baked from our Wilmington kitchen."
      />
      <div ref={ref} style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {CAKE_PHOTOS.slice(0, 4).map((c) => (
          <div key={c.id} className="work-tile">
            <WorkTile cake={c} />
          </div>
        ))}
      </div>
      <div style={{ textAlign: 'center', marginTop: 40 }}>
        <GoldButton href="/gallery">See All</GoldButton>
      </div>
      <style>{`
        @media (max-width: 860px) {
          section > div[style*="repeat(4, 1fr)"] { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          section > div[style*="repeat(4, 1fr)"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

// ─── Testimonials ────────────────────────────────────────────────────────
function TestimonialsSection() {
  const ref = useScrollReveal({ y: 40 })
  return (
    <section style={{ padding: '96px 48px' }}>
      <SectionIntro
        eyebrow="What You Say"
        title="Every Review Tells a Story —"
        titleItalicPart="Here's What You Think."
        sub="Five years of weddings, birthdays, and impossible 3D cakes — and the kindest words."
      />
      <div ref={ref}>
        <TestimonialCarousel />
      </div>
    </section>
  )
}

// ─── FAQ ─────────────────────────────────────────────────────────────────
function FAQSection() {
  const ref = useScrollReveal({ y: 30 })
  return (
    <section style={{ padding: '96px 48px', maxWidth: 1080, margin: '0 auto', position: 'relative' }}>
      <SectionIntro eyebrow="FAQ" title="Find Answers to Your Most" titleItalicPart="Common Questions." />
      <div ref={ref} style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 32, alignItems: 'flex-start' }}>
        <FAQAccordion items={FAQS.slice(0, 5)} />
        <FAQHelpCard href="/contact" />
      </div>
      <style>{`
        @media (max-width: 760px) {
          section > div[style*="1.5fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

// ─── Awards ──────────────────────────────────────────────────────────────
function AwardsSection() {
  const ref = useScrollReveal({ y: 20 })
  return (
    <section style={{ padding: '0 48px 96px' }}>
      <Eyebrow style={{ marginBottom: 16 }}>Featured On</Eyebrow>
      <OrnamentRule />
      <div ref={ref} style={{ maxWidth: 1240, margin: '0 auto' }}>
        <AwardsRow />
      </div>
    </section>
  )
}
