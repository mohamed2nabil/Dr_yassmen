export function PhilosophySection() {
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
              My Philosophy
            </div>
            <div
              className="mt-3"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.95rem',
                color: 'rgba(249,246,241,0.4)',
                fontStyle: 'italic',
              }}
            >
              فلسفتي في الفن
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
              "Art is not a discipline — it is a language. I use it to design
              spaces that breathe, teach minds that wonder, and heal hearts that
              ache."
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
              My practice was born from a single conviction: that creativity, in
              all its forms, is a force for human transformation. Whether I am
              mixing pigments on a canvas, selecting textures for an interior,
              guiding a student's first brushstroke, or sitting quietly beside a
              client as they process grief through color — I am doing the same
              work. I am making space for the human experience to be seen, held,
              and honored.
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
              The four disciplines I practice are not separate chapters — they
              are the same story told in different voices. Interior design is
              visual art applied to the spaces we inhabit. Education is
              creativity multiplied across generations. Therapy is the moment
              when art stops being beautiful and becomes necessary.
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
                Dr. Yassmin Allam
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
            {[
              { degree: 'Ph.D.', field: 'Fine Arts', inst: 'Cairo University' },
              { degree: 'M.A.', field: 'Interior Design', inst: 'AUC' },
              {
                degree: 'Cert.',
                field: 'Art Therapy',
                inst: 'BAAT Accredited',
              },
            ].map((c) => (
              <div
                key={c.degree}
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
