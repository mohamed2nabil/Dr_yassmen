"use client";

import { useEffect, useState } from 'react'
import { Navigation } from './components/Navigation'
import { HeroSection } from './components/HeroSection'
import { PhilosophySection } from './components/PhilosophySection'
import { ChapterSection } from './components/ChapterSection'
import { ArtTherapySection } from './components/ArtTherapySection'
import { StatsSection } from './components/StatsSection'
import { TestimonialsSection } from './components/TestimonialsSection'
import { ContactSection } from './components/ContactSection'

const visualArtProjects = [
  {
    title: 'Layers of Belonging',
    subtitle: 'Mixed Media Series',
    tag: '2023',
    description:
      'A nine-canvas series exploring the tension between cultural identity and diaspora. Oil, gold leaf, and Arabic calligraphy on linen.',
    image:
      'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?w=800&h=500&fit=crop&auto=format',
  },
  {
    title: 'Desert Geometries',
    subtitle: 'Acrylic on Canvas',
    tag: '2022',
    description:
      'Geometric abstraction inspired by Islamic architectural pattern-making. Large-scale triptych, 200×300cm.',
    image:
      'https://images.unsplash.com/photo-1618331833071-ce81bd50d300?w=800&h=500&fit=crop&auto=format',
  },
  {
    title: 'The Quiet Hours',
    subtitle: 'Oil Painting',
    tag: '2021',
    description:
      'An intimate series of domestic interiors painted in muted ochres and blues — a meditation on presence, solitude, and home.',
    image:
      'https://images.unsplash.com/photo-1541512416146-3cf58d6b27cc?w=800&h=500&fit=crop&auto=format',
  },
]

const interiorProjects = [
  {
    title: 'Zamalek Penthouse',
    subtitle: 'Residential',
    tag: 'Cairo 2023',
    description:
      'A full transformation of a 400m² penthouse. The brief asked for contemporary luxury that honored traditional Arabesque motifs. Custom joinery, hand-painted zellige, bespoke furniture.',
    image:
      'https://images.unsplash.com/photo-1720247520881-672bc136da8a?w=800&h=500&fit=crop&auto=format',
    before:
      'https://images.unsplash.com/photo-1720247520862-7e4b14176fa8?w=800&h=500&fit=crop&auto=format',
    after:
      'https://images.unsplash.com/photo-1720247520881-672bc136da8a?w=800&h=500&fit=crop&auto=format',
  },
  {
    title: 'New Cairo Art Gallery',
    subtitle: 'Commercial',
    tag: 'Cairo 2022',
    description:
      'Gallery design for a contemporary art space in New Cairo. Emphasis on flexible wall systems, lighting design, and circulation flow that puts the art first.',
    image:
      'https://images.unsplash.com/photo-1646987916641-1f3c8992daa2?w=800&h=500&fit=crop&auto=format',
    before:
      'https://images.unsplash.com/photo-1765812515298-f299f9e29b68?w=800&h=500&fit=crop&auto=format',
    after:
      'https://images.unsplash.com/photo-1646987916641-1f3c8992daa2?w=800&h=500&fit=crop&auto=format',
  },
  {
    title: 'Dubai Villa',
    subtitle: 'Residential',
    tag: 'Dubai 2021',
    description:
      'An 800m² villa with an extensive private art collection. The interior design was built around the artworks — creating dialogue between the collection and the architecture.',
    image:
      'https://images.unsplash.com/photo-1720247520862-7e4b14176fa8?w=800&h=500&fit=crop&auto=format',
    before:
      'https://images.unsplash.com/photo-1720247520862-7e4b14176fa8?w=800&h=500&fit=crop&auto=format',
    after:
      'https://images.unsplash.com/photo-1720247520881-672bc136da8a?w=800&h=500&fit=crop&auto=format',
  },
]

const educationProjects = [
  {
    title: 'Advanced Studio Practice',
    subtitle: 'University Course',
    tag: 'Graduate Level',
    description:
      'A semester-long graduate studio course exploring conceptual development, material experimentation, and professional critique. Delivered at Cairo University Fine Arts.',
    image:
      'https://images.unsplash.com/photo-1770096679916-2cd9c720d400?w=800&h=500&fit=crop&auto=format',
  },
  {
    title: 'Young Artists Program',
    subtitle: 'Youth Workshop Series',
    tag: 'Ages 8–16',
    description:
      'A structured 10-week program for children and adolescents exploring drawing, painting, and mixed media. Focused on building creative confidence alongside technical skill.',
    image:
      'https://images.unsplash.com/photo-1770096679844-57ca92c2b64b?w=800&h=500&fit=crop&auto=format',
  },
  {
    title: 'Art for Non-Artists',
    subtitle: 'Adult Workshop',
    tag: 'All Levels',
    description:
      "A popular 6-week workshop for adults with no prior art experience. Participants frequently describe it as transformative — discovering creativity they didn't know they had.",
    image:
      'https://images.unsplash.com/photo-1765812515298-f299f9e29b68?w=800&h=500&fit=crop&auto=format',
  },
]

const sections = [
  'hero',
  'philosophy',
  'visual-art',
  'interior-design',
  'education',
  'art-therapy',
  'contact',
]

export default function Page() {
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3 }
    )
    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <div
      style={{
        fontFamily: 'var(--font-body)',
        background: 'var(--background)',
        color: 'var(--foreground)',
        overflowX: 'hidden',
      }}
    >
      <Navigation activeSection={activeSection} />
      <HeroSection />
      <PhilosophySection />
      <StatsSection />
      <ChapterSection
        id="visual-art"
        chapterNum="01"
        arabicTitle="الفن البصري"
        englishTitle="Visual Art"
        tagline="Original paintings and mixed-media works that explore identity, memory, and the visual grammar of the Arab world."
        description="My studio practice spans oil painting, mixed media, and large-scale installation. I work primarily in figurative abstraction — paintings that carry recognizable forms while resisting literal interpretation. My subjects are drawn from personal memory, cultural inheritance, and the emotional textures of daily life."
        color="var(--chapter-art)"
        bg="var(--chapter-art-bg)"
        projects={visualArtProjects}
      />
      <ChapterSection
        id="interior-design"
        chapterNum="02"
        arabicTitle="التصميم الداخلي"
        englishTitle="Interior Design"
        tagline="Spaces designed as total environments — where architecture, art, and lived experience converge."
        description="My interior design practice is inseparable from my work as a visual artist. Every space I design is conceived as a curated environment — not a collection of objects, but a unified experience. I work closely with clients to understand how they inhabit space before I touch a single surface."
        color="var(--chapter-interior)"
        bg="var(--chapter-interior-bg)"
        projects={interiorProjects}
        hasBefore
      />
      <ChapterSection
        id="education"
        chapterNum="03"
        arabicTitle="التعليم الفني"
        englishTitle="Art Education"
        tagline="Teaching as a creative act — cultivating the next generation of artists, thinkers, and visual communicators."
        description="I have taught at undergraduate and graduate levels for over a decade, and also run a thriving independent program for children, adolescents, and adults. My teaching philosophy holds that everyone is creative — the work of education is to remove the obstacles that hide that fact."
        color="var(--chapter-education)"
        bg="var(--chapter-education-bg)"
        projects={educationProjects}
      />
      <ArtTherapySection />
      <TestimonialsSection />
      <ContactSection />
    </div>
  )
}
