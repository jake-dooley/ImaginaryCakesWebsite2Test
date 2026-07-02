'use client'
import PageHero from '@/components/PageHero'
import { SectionIntro, Eyebrow, OrnamentRule } from '@/components/SectionIntro'
import { LavenderButton } from '@/components/Buttons'
import { IconHelp } from '@/components/Icons'
import ClosingCTA from '@/components/ClosingCTA'
import { useScrollReveal, useStaggerReveal } from '@/hooks/useScrollReveal'
import { FLAVORS } from '@/data'

export default function FlavorsPage() {
  return (
    <>
      <PageHero
        eyebrow="The Flavor Menu"
        title="Pick a Cake,"
        titleItalicPart="Then Build a Flavor."
        sub="Every order starts with a cake flavor, an icing, and (optionally) a filling. Mix and match — there are over a thousand combinations on this page alone."
      />

      <section style={{ maxWidth: 1080, margin: '0 auto', padding: '8px 40px 96px' }}>
        <FlavorSection eyebrow="Cake — Standard" note="Included with every order." flavors={FLAVORS.cakeStandard} accentColor="var(--sprinkle-yellow)" />
        <FlavorSection eyebrow="Cake — Premium" note="Small additional charge per serving." flavors={FLAVORS.cakePremium} variant="premium" accentColor="var(--sprinkle-pink)" />
        <FlavorSection eyebrow="Buttercream Icing" note="Italian buttercream base, whipped to order." flavors={FLAVORS.buttercream} accentColor="var(--sprinkle-blue)" />
        <FlavorSection eyebrow="Premium Fillings" note="Inside the cake only — additional charge." flavors={FLAVORS.fillings} variant="cream" accentColor="var(--sprinkle-green)" />
        <FlavorSection eyebrow="Fondant" note="For sculpted cakes and crisp tier finishes." flavors={FLAVORS.fondant} accentColor="var(--sprinkle-coral)" />
        <FlavorSection eyebrow="Dietary" note="Vegan and gluten-free options — additional charge applies." flavors={FLAVORS.dietary} accentColor="var(--sprinkle-turquoise)" />
        <HelpCard />
      </section>

      <ClosingCTA />
    </>
  )
}

function FlavorSection({ eyebrow, note, flavors, variant, accentColor = 'var(--color-gold)' }) {
  const ref = useScrollReveal({ y: 24 })
  const bg = variant === 'cream'
    ? 'var(--color-cream-soft)'
    : variant === 'premium'
    ? 'var(--color-blush-soft)'
    : 'transparent'

  return (
    <div ref={ref} style={{ padding: '32px 0', borderTop: '1px solid var(--color-hairline)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 40, alignItems: 'flex-start' }}>
        <div>
          <Eyebrow align="left">{eyebrow}</Eyebrow>
          <div style={{
            marginTop: 14,
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontSize: 15,
            color: 'var(--color-muted)',
          }}>
            {note}
          </div>
        </div>
        <div style={{
          background: bg,
          borderRadius: bg !== 'transparent' ? 16 : 0,
          padding: bg !== 'transparent' ? 24 : 0,
        }}>
          <ul style={{
            listStyle: 'none',
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            columnGap: 32,
            rowGap: 12,
          }}>
            {flavors.map((f) => (
              <li key={f} style={{
                fontFamily: 'var(--font-display)',
                fontSize: 17,
                color: 'var(--color-ink)',
                display: 'flex',
                gap: 12,
                alignItems: 'baseline',
              }}>
                <span style={{
                  width: 5, height: 5, border: `1px solid ${accentColor}`,
                  transform: 'rotate(45deg)', flexShrink: 0, marginTop: 6,
                  background: accentColor, opacity: 0.7,
                }} />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <style>{`
        @media (max-width: 700px) {
          div[style*="260px 1fr"] { grid-template-columns: 1fr !important; }
          ul[style*="repeat(2, 1fr)"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}

function HelpCard() {
  const ref = useScrollReveal({ y: 24 })
  return (
    <div ref={ref} style={{
      marginTop: 64,
      background: 'linear-gradient(135deg, #FFEFC9, #FFF8E7)',
      borderRadius: 16,
      padding: '32px 40px',
      display: 'grid',
      gridTemplateColumns: 'auto 1fr auto',
      gap: 24,
      alignItems: 'center',
      boxShadow: 'var(--shadow-card)',
    }}>
      <div style={{
        width: 64, height: 64, borderRadius: '50%',
        background: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'var(--sprinkle-yellow)',
      }}>
        <IconHelp size={28} />
      </div>
      <div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 500 }}>Not sure where to start?</div>
        <div style={{ marginTop: 6, fontFamily: 'var(--font-display)', fontSize: 16, color: 'var(--color-body)' }}>
          We host tastings by appointment. Bring three favorite combinations and we'll bake you samples to try in the shop.
        </div>
      </div>
      <LavenderButton href="/contact">Book a Tasting</LavenderButton>
      <style>{`
        @media (max-width: 700px) {
          div[style*="auto 1fr auto"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
