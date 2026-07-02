'use client'
import { useEffect, useRef } from 'react'
import PageHero from '@/components/PageHero'
import { SectionIntro, Eyebrow, OrnamentRule } from '@/components/SectionIntro'
import { GoldButton } from '@/components/Buttons'
import AwardsRow from '@/components/Awards'
import ClosingCTA from '@/components/ClosingCTA'
import StatsSection from '@/components/StatsSection'
import { useScrollReveal, useStaggerReveal } from '@/hooks/useScrollReveal'
import { RATINGS } from '@/data'

export default function AboutPage() {
  return (
    <div style={{ '--page-accent': 'var(--sprinkle-pink)', background: 'var(--sprinkle-pink)' }}>
      <PageHero
        eyebrow="About Us"
        title="A Family Recipe, Baked with Love"
        sub="Have a vision for your next celebration? We'd love to hear about it."
        accentColor="#fff"
      />
      <StorySection />
      <StatsSection />
      <WhatWeMakeSection />
      <AwardsSection />
      <ClosingCTA />
    </div>
  )
}

function StorySection() {
  const imgRef = useRef(null)
  const textRef = useScrollReveal({ y: 40 })

  useEffect(() => {
    ;(async () => {
      const gsap = (await import('gsap')).default
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)
      if (!imgRef.current) return
      gsap.fromTo(
        imgRef.current,
        { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
        {
          clipPath: 'inset(0 0% 0 0)', opacity: 1, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: imgRef.current, start: 'top 85%', toggleActions: 'play none none none' },
        }
      )
    })()
  }, [])

  return (
    <section style={{ maxWidth: 1240, margin: '0 auto', padding: '16px 48px 96px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 40, alignItems: 'center' }}>
        <div ref={imgRef} style={{ borderRadius: 16, overflow: 'hidden', aspectRatio: '5 / 4' }}>
          <img
            src="https://static.wixstatic.com/media/af4445_a40060ed7c0c4a0d869c9aadecaf7930~mv2.jpg/v1/fill/w_1200,h_960,q_90,enc_avif,quality_auto/af4445_a40060ed7c0c4a0d869c9aadecaf7930~mv2.jpg"
            alt="Our story"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        <div ref={textRef}>
          <Eyebrow align="left">Since 2009</Eyebrow>
          <OrnamentRule align="left" style={{ marginLeft: 0 }} color="#fff" />
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 3vw, 38px)', fontWeight: 500, lineHeight: 1.15, margin: 0 }}>
            From a small home kitchen to <em>Carolina Beach Road.</em>
          </h2>
          <p style={{ marginTop: 18, fontFamily: 'var(--font-display)', fontSize: 17, lineHeight: 1.65 }}>
            Imaginary Cakes is a mother-daughter bakery built on butter, patience, and a shared love of making people smile. Owner Caris Loomis brings years of hands-on baking experience and an eye for detail to every custom creation, while her daughter Addi adds fresh ideas and creative flair to keep things exciting.
          </p>
          <p style={{ marginTop: 14, fontFamily: 'var(--font-display)', fontSize: 17, lineHeight: 1.65 }}>
            Together, they treat every cake like it's for their own family's celebration — because to them, your special day feels just like one.
          </p>
          <div style={{ marginTop: 28 }}>
            <GoldButton href="/contact">Bring Us Your Idea</GoldButton>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 860px) {
          section > div[style*="1.2fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

function WhatWeMakeSection() {
  const ref = useStaggerReveal('.feature-card', { stagger: 0.12 })
  return (
    <section style={{ maxWidth: 1240, margin: '0 auto', padding: '0 48px 96px' }}>
      <SectionIntro eyebrow="What We Make" title="Custom, By Definition —" titleItalicPart="Never From a Catalogue." accentColor="#fff" />
      <div ref={ref} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
        {[
          { title: 'Buttercream & Fondant', body: 'Italian and Swiss buttercream piped fresh; smooth fondant in vanilla and chocolate. We pick the medium that suits your design, never the other way round.', bg: '#fff' },
          { title: 'Fully Sculpted 3D Cakes', body: 'From hand-painted teapots to life-size animal portraits. Internal supports and edible cake — even the seashells were edible.', bg: '#fff' },
          { title: 'Dietary Considerations', body: 'Vegan chocolate with vegan buttercream, and gluten-free options on most flavors. We\'ll talk through the right adjustment for your guests.', bg: '#fff' },
        ].map((c) => (
          <div key={c.title} className="feature-card" style={{
            background: c.bg, borderRadius: 16, padding: 28,
            boxShadow: 'var(--shadow-card)',
          }}>
            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 500, margin: 0 }}>{c.title}</h4>
            <div style={{ height: 1, background: 'var(--color-hairline)', margin: '14px 0' }} />
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 16, lineHeight: 1.65, margin: 0 }}>{c.body}</p>
          </div>
        ))}
      </div>
      <style>{`
        @media (max-width: 860px) {
          section > div[style*="repeat(3, 1fr)"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

function AwardsSection() {
  const ref = useScrollReveal({ y: 30 })
  return (
    <section style={{ padding: '72px 48px 96px' }}>
      <Eyebrow style={{ marginBottom: 16 }}>Recognized By</Eyebrow>
      <OrnamentRule color="#fff" />
      <h2 style={{ textAlign: 'center', fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 500, margin: '0 0 48px' }}>
        A few kind words from the <em>wedding world.</em>
      </h2>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <AwardsRow />
      </div>
      <div ref={ref} style={{
        marginTop: 48,
        display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 40,
      }}>
        {RATINGS.map((r) => (
          <div key={r.source} style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 500, color: 'var(--color-ink)' }}>{r.value}</div>
            <div style={{ fontSize: 12, color: 'var(--color-muted)', marginTop: 4, letterSpacing: '2px', textTransform: 'uppercase', fontFamily: 'var(--font-ui)' }}>
              {r.source}{r.count ? ` · ${r.count}` : ''}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
