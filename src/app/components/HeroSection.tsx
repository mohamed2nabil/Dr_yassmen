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

export function HeroSection({ profile }: { profile?: any }) {
  const scrollToPhilosophy = () => {
    document
      .getElementById('philosophy')
      ?.scrollIntoView({ behavior: 'smooth' })
  }

  const name = profile?.name || 'Yasmen Allam';
  const spaceIndex = name.indexOf(' ');
  const firstName = spaceIndex > -1 ? name.substring(0, spaceIndex) : name;
  const lastName = spaceIndex > -1 ? name.substring(spaceIndex + 1) : '';

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
              {firstName}
              {lastName && (
                <>
                  <br />
                  <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>
                    {lastName}
                  </em>
                </>
              )}
            </h1>

            {/* Professions */}
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
              {profile?.professions || 'Visual Artist | Interior Designer | Art Educator | Art Therapist'}
            </div>

            {/* Tagline */}
            {profile?.bio ? (
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1.05rem',
                  lineHeight: 1.75,
                  color: 'var(--muted-foreground)',
                  maxWidth: '600px',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {profile.bio}
              </p>
            ) : (
              <>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '1.05rem',
                    lineHeight: 1.75,
                    color: 'var(--muted-foreground)',
                    maxWidth: '600px',
                  }}
                >
                  Welcome to my portfolio.
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                    lineHeight: 1.75,
                    color: 'var(--muted-foreground)',
                    maxWidth: '600px',
                    marginTop: '1rem',
                  }}
                >
                  I am a passionate Visual Artist, Interior Designer, Art Educator, and Art Therapist dedicated to inspiring creativity, fostering self-expression, and creating meaningful artistic experiences.
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                    lineHeight: 1.75,
                    color: 'var(--muted-foreground)',
                    maxWidth: '600px',
                    marginTop: '1rem',
                  }}
                >
                  With a multidisciplinary background in Fine Arts, Interior Design, Education, and Art Therapy, I combine artistic vision with educational expertise to design engaging learning environments, innovative creative projects, and therapeutic art experiences that support personal growth and emotional well-being.
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                    lineHeight: 1.75,
                    color: 'var(--muted-foreground)',
                    maxWidth: '600px',
                    marginTop: '1rem',
                  }}
                >
                  Throughout my professional journey, I have worked on a diverse range of projects, including visual arts, interior design, educational programs, art workshops, community initiatives, and art therapy activities for children, adolescents, and adults. My work reflects a commitment to creativity, innovation, cultural appreciation, and lifelong learning.
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                    lineHeight: 1.75,
                    color: 'var(--muted-foreground)',
                    maxWidth: '600px',
                    marginTop: '1rem',
                  }}
                >
                  This portfolio presents a selection of my professional achievements, creative projects, artistic works, educational experiences, and therapeutic practices. Each project represents my belief that art has the power to connect people, inspire change, and transform ideas into meaningful experiences.
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                    lineHeight: 1.75,
                    color: 'var(--muted-foreground)',
                    maxWidth: '600px',
                    marginTop: '1rem',
                  }}
                >
                  Thank you for taking the time to explore my work. I hope this portfolio reflects my passion for creativity, education, and the transformative power of art.
                </p>
              </>
            )}

            {/* Quote */}
            <blockquote
              className="mt-8"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)',
                fontWeight: 400,
                lineHeight: 1.6,
                color: 'var(--foreground)',
                fontStyle: 'italic',
                borderLeft: '3px solid var(--accent)',
                paddingLeft: '1.5rem',
              }}
            >
              "{profile?.quote || "Creativity is intelligence having fun."}"
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.95rem',
                  marginTop: '0.5rem',
                  fontStyle: 'normal',
                  color: 'var(--muted-foreground)',
                }}
              >
                — {profile?.quoteAuthor || "Albert Einstein"}
              </div>
            </blockquote>

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
                src={profile?.heroImage1 || "https://images.unsplash.com/photo-1740710543611-80b658171bc3?w=600&h=800&fit=crop&auto=format"}
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
                src={profile?.heroImage2 || "https://images.unsplash.com/photo-1646987916641-1f3c8992daa2?w=400&h=300&fit=crop&auto=format"}
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
                src={profile?.heroImage3 || "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?w=400&h=300&fit=crop&auto=format"}
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
