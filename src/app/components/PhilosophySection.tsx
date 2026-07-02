interface PhilosophySectionProps {
  profile?: any;
  credentials?: any[];
}

export function PhilosophySection({ profile, credentials }: PhilosophySectionProps) {
  const displayCredentials = credentials && credentials.length > 0 ? credentials.map(c => ({
    degree: c.degree,
    field: c.field,
    inst: c.institution
  })) : [
    { degree: 'Ph.D.', field: 'Fine Arts', inst: 'Cairo University' },
    { degree: 'M.A.', field: 'Interior Design', inst: 'AUC' },
    {
      degree: 'Cert.',
      field: 'Art Therapy',
      inst: 'BAAT Accredited',
    },
  ];

  return (
    <section
      id="philosophy"
      className="py-28 lg:py-36"
      style={{ background: 'var(--foreground)' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left label */}
          <div className="lg:col-span-3">
            <div
              className="flex items-center gap-3"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'rgba(249,246,241,0.4)',
              }}
            >
              <span
                className="h-px w-6"
                style={{ background: 'var(--accent)' }}
              />
              ABOUT ME
            </div>

            {/* Vertical quote line */}
            <div className="mt-10 hidden lg:block">
              <div
                className="w-px h-32"
                style={{ background: 'var(--accent)', opacity: 0.6 }}
              />
            </div>
          </div>

          {/* Center — main quote */}
          <div className="lg:col-span-6">
            <blockquote
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                fontWeight: 400,
                lineHeight: 1.4,
                color: '#F9F6F1',
                fontStyle: 'italic',
              }}
            >
              {profile?.aboutQuote || "Welcome to my creative world."}
            </blockquote>

            <p
              className="mt-8"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                lineHeight: 1.85,
                color: 'rgba(249,246,241,0.65)',
              }}
            >
              {profile?.aboutText1 || "I am Yasmen Allam, a multidisciplinary creative professional with expertise in Visual Arts, Interior Design, Art Education, and Art Therapy. My work is driven by a passion for transforming ideas into meaningful artistic experiences that inspire creativity, personal growth, and emotional well-being."}
            </p>

            <p
              className="mt-5"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                lineHeight: 1.85,
                color: 'rgba(249,246,241,0.65)',
              }}
            >
              {profile?.aboutText2 || "With a background in Applied Arts and Education, I have developed a diverse portfolio that combines artistic expression, innovative design, and therapeutic practices. Throughout my journey, I have worked with children, adolescents, and adults, creating engaging learning environments, artistic projects, and art-based interventions that foster creativity and self-expression."}
            </p>

            <p
              className="mt-5"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                lineHeight: 1.85,
                color: 'rgba(249,246,241,0.65)',
              }}
            >
              {profile?.aboutText3 || "My philosophy is rooted in the belief that art has the power to connect, heal, educate, and inspire. Whether through a painting, a designed space, an educational program, or an art therapy session, my goal is to create experiences that leave a lasting impact."}
            </p>

            <p
              className="mt-5"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                lineHeight: 1.85,
                color: 'rgba(249,246,241,0.65)',
              }}
            >
              {profile?.aboutText4 || "This portfolio showcases selected works, projects, exhibitions, educational initiatives, and creative achievements that reflect my artistic vision and professional journey."}
            </p>

            {/* Signature */}
            <div className="mt-10 flex items-center gap-4">
              <div
                className="w-10 h-px"
                style={{ background: 'var(--accent)' }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1rem',
                  color: 'rgba(249,246,241,0.6)',
                  fontStyle: 'italic',
                }}
              >
                {profile?.name || "Yasmen Allam"}
              </span>
            </div>
          </div>

          {/* Right — credentials */}
          <div className="lg:col-span-3">
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'rgba(249,246,241,0.35)',
                marginBottom: '1.5rem',
              }}
            >
              Credentials
            </div>
            {displayCredentials.map((c, idx) => (
              <div
                key={idx}
                className="mb-5 pb-5"
                style={{ borderBottom: '1px solid rgba(249,246,241,0.08)' }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    color: 'var(--accent)',
                    letterSpacing: '0.06em',
                  }}
                >
                  {c.degree}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.95rem',
                    color: '#F9F6F1',
                  }}
                >
                  {c.field}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.78rem',
                    color: 'rgba(249,246,241,0.4)',
                  }}
                >
                  {c.inst}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
