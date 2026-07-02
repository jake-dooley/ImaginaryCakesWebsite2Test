'use client'
import PageHero from '@/components/PageHero'
import GalleryGrid from '@/components/GalleryGrid'
import Marquee from '@/components/Marquee'
import ClosingCTA from '@/components/ClosingCTA'

export default function GalleryPage() {
  return (
    <div style={{ '--page-accent': 'var(--sprinkle-turquoise)', background: 'var(--sprinkle-turquoise)' }}>
      <PageHero
        eyebrow="Gallery"
        title="A Slice of Our"
        titleItalicPart="Recent Work."
        sub="Six hundred and counting. Filter by occasion to see what we've been up to."
        accentColor="#fff"
      />

      <section style={{ maxWidth: 1380, margin: '0 auto', padding: '0 40px 96px' }}>
        <GalleryGrid />
      </section>

      <Marquee items={['Cakes So Good', "They Can't Be Real", 'Wilmington, NC']} color="white" />
      <ClosingCTA />
    </div>
  )
}
