'use client';

import { useState, useEffect } from 'react';
import { getTestimonials } from '@/app/actions/testimonialActions';

const fallbackTestimonials = [
  {
    name: 'Laila Hassan',
    role: 'Interior Design Client',
    location: 'Cairo, Egypt',
    quote:
      "Dr. Allam didn't just redesign our home — she listened to how we live, what we dream about, and who we are as a family. The result is a space that feels entirely ours.",
    chapterColor: 'var(--chapter-interior)',
    chapterLabel: 'Interior Design',
  },
  {
    name: 'Prof. Tariq El-Sawy',
    role: 'University Dean, Fine Arts',
    location: 'Alexandria',
    quote:
      "In twenty years of academia, I have rarely encountered someone who can translate complex artistic theory into lived experience the way Dr. Allam does. Her students don't just learn — they are transformed.",
    chapterColor: 'var(--chapter-education)',
    chapterLabel: 'Art Education',
  },
  {
    name: 'Sara & Khaled M.',
    role: 'Parents of a Former Student',
    location: 'Dubai, UAE',
    quote:
      'Our daughter struggled with self-confidence for years. After one semester with Dr. Allam, she was presenting her work at an exhibition. The change was remarkable.',
    chapterColor: 'var(--chapter-education)',
    chapterLabel: 'Art Education',
  },
  {
    name: 'A Private Collector',
    role: 'Art Collector & Patron',
    location: 'Beirut, Lebanon',
    quote:
      "I have acquired works from many Arab artists. Dr. Allam's paintings hold something rare — a visual intelligence that never announces itself loudly, but rewards every second look.",
    chapterColor: 'var(--chapter-art)',
    chapterLabel: 'Visual Art',
  },
  {
    name: 'Dr. Mona Khalil',
    role: 'Clinical Psychologist',
    location: 'Cairo',
    quote:
      'I have referred several clients to Dr. Allam for adjunct art therapy work. Her attunement and clinical rigor are exceptional. I trust her completely with the people I care most about.',
    chapterColor: 'var(--chapter-therapy)',
    chapterLabel: 'Art Therapy',
  },
];

export function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const [items, setItems] = useState(fallbackTestimonials);

  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        const dbTestimonials = await getTestimonials();
        // filter visible
        const visible = dbTestimonials.filter((t) => t.isVisible);
        if (visible.length > 0) {
          const colors = {
            'Interior Design': 'var(--chapter-interior)',
            'Art Education': 'var(--chapter-education)',
            'Visual Art': 'var(--chapter-art)',
            'Art Therapy': 'var(--chapter-therapy)',
          };
          setItems(
            visible.map((t) => {
              // Try to resolve a logical color/label based on role or content keywords
              let chapterLabel = 'Visual Art';
              let chapterColor = 'var(--chapter-art)';

              const roleText = (t.role || '').toLowerCase();
              if (roleText.includes('interior') || roleText.includes('design')) {
                chapterLabel = 'Interior Design';
                chapterColor = 'var(--chapter-interior)';
              } else if (roleText.includes('education') || roleText.includes('student') || roleText.includes('teach')) {
                chapterLabel = 'Art Education';
                chapterColor = 'var(--chapter-education)';
              } else if (roleText.includes('therapy') || roleText.includes('wellness')) {
                chapterLabel = 'Art Therapy';
                chapterColor = 'var(--chapter-therapy)';
              }

              return {
                name: t.clientName,
                role: t.role,
                location: 'Cairo',
                quote: t.content,
                chapterColor,
                chapterLabel,
              };
            })
          );
        }
      } catch (error) {
        console.error('Failed to load testimonials:', error);
      }
    };
    loadTestimonials();
  }, []);

  if (items.length === 0) return null;

  // Safeguard active index out of bounds
  const currentActive = active >= items.length ? 0 : active;
  const currentItem = items[currentActive];

  return (
    <section
      className="py-24 lg:py-32"
      style={{ background: 'var(--background)' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Left */}
          <div className="lg:col-span-4">
            <div
              className="flex items-center gap-3 mb-6"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--muted-foreground)',
              }}
            >
              <span
                className="h-px w-6"
                style={{ background: 'var(--accent)' }}
              />
              Testimonials
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
                fontWeight: 400,
                lineHeight: 1.2,
                color: 'var(--foreground)',
                letterSpacing: '-0.02em',
              }}
            >
              Voices from
              <br />
              <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>
                those who know
              </em>
            </h2>
            <p
              className="mt-4"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem',
                lineHeight: 1.75,
                color: 'var(--muted-foreground)',
              }}
            >
              Clients, students, collaborators, and colleagues on what it means
              to work with Dr. Allam.
            </p>

            {/* Navigator */}
            <div className="mt-10 flex flex-col gap-2">
              {items.map((t, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className="text-left flex items-center gap-3 px-3 py-2 transition-all duration-200"
                  style={{
                    borderLeft: `2px solid ${currentActive === i ? t.chapterColor : 'transparent'}`,
                    background:
                      currentActive === i ? 'var(--secondary)' : 'transparent',
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.82rem',
                        color:
                          currentActive === i
                            ? 'var(--foreground)'
                            : 'var(--muted-foreground)',
                        fontWeight: 500,
                      }}
                    >
                      {t.name}
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.62rem',
                        color: t.chapterColor,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {t.chapterLabel}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right — active testimonial */}
          <div className="lg:col-span-8 flex items-center">
            <div
              className="p-10 lg:p-14 w-full"
              style={{
                background: 'var(--card)',
                border: '1px solid var(--border)',
                borderTop: `3px solid ${currentItem.chapterColor}`,
                borderRadius: '2px',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: currentItem.chapterColor,
                  marginBottom: '2rem',
                }}
              >
                {currentItem.chapterLabel} ·{' '}
                {currentItem.location}
              </div>
              <blockquote
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.2rem, 2.5vw, 1.7rem)',
                  fontWeight: 400,
                  lineHeight: 1.55,
                  color: 'var(--foreground)',
                  fontStyle: 'italic',
                }}
              >
                "{currentItem.quote}"
              </blockquote>
              <div className="mt-8 flex items-center gap-4">
                <div
                  className="w-10 h-10 flex items-center justify-center"
                  style={{
                    background: currentItem.chapterColor,
                    color: '#F9F6F1',
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    borderRadius: '50%',
                  }}
                >
                  {currentItem.name.charAt(0)}
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.9rem',
                      fontWeight: 500,
                      color: 'var(--foreground)',
                    }}
                  >
                    {currentItem.name}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.78rem',
                      color: 'var(--muted-foreground)',
                    }}
                  >
                    {currentItem.role}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
