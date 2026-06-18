import { ArrowDown } from 'lucide-react'

const chapters = [
  {
    label: 'الفن البصري',
    en: 'Visual Art',
    color: 'var(--chapter-art)',
    bg: 'var(--chapter-art-bg)',
  },
  {
    label: 'التصميم الداخلي',
    en: 'Interior Design',
    color: 'var(--chapter-interior)',
    bg: 'var(--chapter-interior-bg)',
  },
  {
    label: 'التعليم الفني',
    en: 'Art Education',
    color: 'var(--chapter-education)',
    bg: 'var(--chapter-education-bg)',
  },
  {
    label: 'العلاج بالفن',
    en: 'Art Therapy',
    color: 'var(--chapter-therapy)',
    bg: 'var(--chapter-therapy-bg)',
  },
]

export function HeroSection() {
  const scrollToPhilosophy = () => {
    document
      .getElementById('philosophy')
      ?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col"
      style={{ background: 'var(--background)' }}
    >
      {/* Decorative vertical line */}
      <div
        className="absolute left-12 top-0 bottom-0 hidden lg:block"
        style={{ width: '1px', background: 'var(--border)' }}
      />

      {/* Main hero content */}
      <div className="flex-1 flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-4 sm:pt-8 lg:pt-16 pb-4 sm:pb-8 lg:pb-16 w-full">
        <div className="grid gap-4 md:gap-6 lg:gap-8 lg:grid-cols-2 items-center">
          {/* Left — text */}
          <div>
            {/* Overline */}
            <div
              className="flex items-center gap-3 mb-8"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--muted-foreground)',
              }}
            >
              <span
                className="h-px w-8"
                style={{ background: 'var(--accent)' }}
              />
              Portfolio 2024 — مجموعة الأعمال
            </div>

            {/* Name */}
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.8rem, 6vw, 5.5rem)',
                fontWeight: 400,
                lineHeight: 1.05,
                color: 'var(--foreground)',
                letterSpacing: '-0.02em',
              }}
            >
              Dr. Yassmin
              <br />
              <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>
                Allam
              </em>
            </h1>

            {/* Arabic name */}
            <div
              className="mt-3 mb-8"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.4rem, 3vw, 2.2rem)',
                fontWeight: 400,
                color: 'var(--muted-foreground)',
                letterSpacing: '0.02em',
              }}
            >
              د. ياسمين علام
            </div>

            {/* Tagline */}
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1.05rem',
                lineHeight: 1.75,
                color: 'var(--muted-foreground)',
                maxWidth: '480px',
              }}
            >
              A multi-disciplinary creative who weaves visual art, interior
              design, art education, and therapeutic practice into a singular,
              coherent vision.
            </p>

            {/* Chapter pills */}
            <div className="flex flex-wrap gap-2 mt-8">
              {chapters.map((ch) => (
                <span
                  key={ch.en}
                  className="px-3 py-1.5 flex items-center gap-2"
                  style={{
                    background: ch.bg,
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    color: ch.color,
                    borderRadius: '2px',
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: ch.color }}
                  />
                  {ch.en}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mt-10">
              <button
                onClick={() =>
                  document
                    .getElementById('visual-art')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
                className="px-7 py-3.5 transition-all duration-200 hover:opacity-80"
                style={{
                  background: 'var(--foreground)',
                  color: 'var(--primary-foreground)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.82rem',
                  fontWeight: 500,
                  letterSpacing: '0.07em',
                  textTransform: 'uppercase',
                  borderRadius: '2px',
                }}
              >
                View Portfolio
              </button>
              <button
                onClick={() =>
                  document
                    .getElementById('contact')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
                className="px-7 py-3.5 transition-all duration-200 hover:bg-secondary"
                style={{
                  background: 'transparent',
                  color: 'var(--foreground)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.82rem',
                  fontWeight: 500,
                  letterSpacing: '0.07em',
                  textTransform: 'uppercase',
                  borderRadius: '2px',
                  border: '1px solid var(--border)',
                }}
              >
                Book a Session
              </button>
            </div>
          </div>

          {/* Right — editorial image collage */}
          <div className="relative grid grid-cols-2 grid-rows-2 gap-3 h-[320px] sm:h-[450px] lg:h-[560px] mt-10 lg:mt-0">
            {/* Large top-left */}
            <div
              className="row-span-2 rounded-sm overflow-hidden"
              style={{ background: 'var(--chapter-art-bg)' }}
            >
              <img
                src="https://images.unsplash.com/photo-1740710543611-80b658171bc3?w=600&h=800&fit=crop&auto=format"
                alt="Art studio with easel and paintbrushes"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Top right */}
            <div
              className="rounded-sm overflow-hidden"
              style={{ background: 'var(--chapter-interior-bg)' }}
            >
              <img
                src="https://images.unsplash.com/photo-1646987916641-1f3c8992daa2?w=400&h=300&fit=crop&auto=format"
                alt="Luxury interior design living room"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Bottom right */}
            <div
              className="rounded-sm overflow-hidden"
              style={{ background: 'var(--chapter-therapy-bg)' }}
            >
              <img
                src="https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?w=400&h=300&fit=crop&auto=format"
                alt="Abstract colorful painting"
                className="w-full h-full object-cover"
              />
            </div>


          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="flex justify-center pb-10">
        <button
          onClick={scrollToPhilosophy}
          className="flex flex-col items-center gap-2 transition-opacity hover:opacity-60"
          style={{ color: 'var(--muted-foreground)' }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
            }}
          >
            Scroll
          </span>
          <ArrowDown size={14} className="animate-bounce" />
        </button>
      </div>

      {/* Bottom chapter color bar */}
      <div className="flex h-1">
        {chapters.map((ch) => (
          <div
            key={ch.en}
            className="flex-1"
            style={{ background: ch.color }}
          />
        ))}
      </div>
    </section>
  )
}
