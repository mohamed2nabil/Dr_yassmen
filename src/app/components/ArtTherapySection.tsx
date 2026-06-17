"use client";

import { useState } from 'react'
import { Heart, Users, Sparkles, Shield } from 'lucide-react'

const workshops = [
  {
    title: 'Grief & Loss Processing',
    arabic: 'تجاوز الحزن والفقدان',
    description:
      'A structured 8-session program using collage, color, and mark-making to help participants navigate bereavement and loss.',
    sessions: '8 Sessions',
    format: 'Group / Individual',
    icon: Heart,
  },
  {
    title: 'Trauma Recovery',
    arabic: 'التعافي من الصدمات',
    description:
      'Somatic-informed art therapy using clay, textile, and embodied drawing to support survivors of trauma in rebuilding safety.',
    sessions: '12 Sessions',
    format: 'Individual',
    icon: Shield,
  },
  {
    title: 'Creative Self-Expression',
    arabic: 'التعبير الإبداعي الذاتي',
    description:
      'Open studio sessions for adults seeking greater self-awareness and emotional literacy through visual art and journaling.',
    sessions: 'Ongoing',
    format: 'Group',
    icon: Sparkles,
  },
  {
    title: 'Children & Adolescents',
    arabic: 'الأطفال والمراهقون',
    description:
      'Developmentally attuned art therapy for children 6–18 years, addressing anxiety, school challenges, and family transitions.',
    sessions: 'Flexible',
    format: 'Individual / Family',
    icon: Users,
  },
]

const stories = [
  {
    initials: 'S.M.',
    age: '34',
    context: 'Grief Processing',
    quote:
      "After losing my mother, I couldn't find words for what I felt. In Dr. Allam's sessions, I painted what I couldn't speak. Three months later, I understood myself in a way I never had before.",
    color: 'var(--chapter-therapy)',
  },
  {
    initials: 'A.K.',
    age: '16',
    context: 'Adolescent Anxiety',
    quote:
      "My son came in refusing to talk. He left the first session with a painting he was proud of. By session six, he was talking about things he'd never shared with anyone.",
    color: 'var(--chapter-education)',
  },
  {
    initials: 'N.R.',
    age: '41',
    context: 'Trauma Recovery',
    quote:
      'The clay work felt strange at first. But Dr. Allam held the space so gently. The process gave my body a way to say what my mind had been protecting me from.',
    color: 'var(--chapter-art)',
  },
]

export function ArtTherapySection() {
  const [activeWorkshop, setActiveWorkshop] = useState(0)
  const [activeStory, setActiveStory] = useState(0)

  return (
    <section
      id="art-therapy"
      className="py-24 lg:py-32"
      style={{ background: 'var(--background)' }}
    >
      {/* Chapter header */}
      <div
        className="mb-16"
        style={{
          background: 'var(--chapter-therapy-bg)',
          borderTop: '3px solid var(--chapter-therapy)',
          borderBottom: '1px solid rgba(28,24,18,0.06)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <div
              className="flex items-center gap-3 mb-3"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--chapter-therapy)',
              }}
            >
              <span
                className="h-px w-6"
                style={{ background: 'var(--chapter-therapy)' }}
              />
              Chapter 04
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                fontWeight: 400,
                lineHeight: 1.1,
                color: 'var(--foreground)',
                letterSpacing: '-0.02em',
              }}
            >
              Art Therapy
            </h2>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.2rem',
                color: 'var(--chapter-therapy)',
                fontStyle: 'italic',
                marginTop: '4px',
              }}
            >
              العلاج بالفن
            </div>
          </div>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.95rem',
              lineHeight: 1.75,
              color: 'var(--muted-foreground)',
              maxWidth: '400px',
            }}
          >
            When art becomes a pathway to healing — working with individuals and
            groups to support emotional wellbeing, trauma recovery, and
            psychological growth.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Intro */}
        <div className="grid lg:grid-cols-12 gap-12 mb-20">
          <div className="lg:col-span-5">
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                lineHeight: 1.85,
                color: 'var(--muted-foreground)',
              }}
            >
              With over 12 years of clinical practice, I offer art therapy as a
              BAAT-accredited practitioner. My approach is trauma-informed,
              person-centered, and grounded in the belief that creativity is an
              innate human capacity for healing — not a talent that needs to be
              earned.
            </p>
            <p
              className="mt-5"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                lineHeight: 1.85,
                color: 'var(--muted-foreground)',
              }}
            >
              Sessions are conducted in Arabic and English. I work with adults,
              adolescents, and children in both individual and group settings.
            </p>
          </div>
          <div className="lg:col-span-3 lg:col-start-8">
            <img
              src="https://images.unsplash.com/photo-1560831340-b9679dc9e9f0?w=500&h=400&fit=crop&auto=format"
              alt="Art therapy group workshop"
              className="w-full rounded-sm"
              style={{ height: '200px', objectFit: 'cover' }}
            />
          </div>
          <div className="lg:col-span-3">
            <img
              src="https://images.unsplash.com/photo-1501366062246-723b4d3e4eb6?w=500&h=400&fit=crop&auto=format"
              alt="Hands with paint in art therapy session"
              className="w-full rounded-sm"
              style={{ height: '200px', objectFit: 'cover' }}
            />
          </div>
        </div>

        {/* Workshops */}
        <div className="mb-20">
          <div
            className="flex items-center gap-3 mb-8"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.68rem',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--chapter-therapy)',
            }}
          >
            <span
              className="h-px w-6"
              style={{ background: 'var(--chapter-therapy)' }}
            />
            Workshop Programs
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {workshops.map((w, i) => {
              const Icon = w.icon
              return (
                <button
                  key={i}
                  onClick={() => setActiveWorkshop(i)}
                  className="text-left p-6 transition-all duration-200"
                  style={{
                    background:
                      activeWorkshop === i
                        ? 'var(--chapter-therapy-bg)'
                        : 'var(--card)',
                    border: `1px solid ${activeWorkshop === i ? 'var(--chapter-therapy)' : 'var(--border)'}`,
                    borderRadius: '2px',
                  }}
                >
                  <div
                    className="w-9 h-9 flex items-center justify-center mb-4"
                    style={{
                      background: 'var(--chapter-therapy-bg)',
                      borderRadius: '50%',
                    }}
                  >
                    <Icon
                      size={16}
                      style={{ color: 'var(--chapter-therapy)' }}
                    />
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1rem',
                      color: 'var(--foreground)',
                    }}
                  >
                    {w.title}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.8rem',
                      color: 'var(--chapter-therapy)',
                      fontStyle: 'italic',
                      marginTop: '2px',
                    }}
                  >
                    {w.arabic}
                  </div>
                  {activeWorkshop === i && (
                    <div className="mt-4">
                      <p
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.82rem',
                          lineHeight: 1.7,
                          color: 'var(--muted-foreground)',
                        }}
                      >
                        {w.description}
                      </p>
                      <div className="flex gap-3 mt-3">
                        <span
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.65rem',
                            color: 'var(--chapter-therapy)',
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                          }}
                        >
                          {w.sessions}
                        </span>
                        <span
                          style={{
                            color: 'var(--muted-foreground)',
                            fontSize: '0.65rem',
                          }}
                        >
                          ·
                        </span>
                        <span
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.65rem',
                            color: 'var(--muted-foreground)',
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                          }}
                        >
                          {w.format}
                        </span>
                      </div>
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Success Stories */}
        <div>
          <div
            className="flex items-center gap-3 mb-8"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.68rem',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--chapter-therapy)',
            }}
          >
            <span
              className="h-px w-6"
              style={{ background: 'var(--chapter-therapy)' }}
            />
            Client Voices — قصص التعافي
          </div>
          <div
            className="p-2 rounded-sm"
            style={{
              background: 'var(--chapter-therapy-bg)',
              border: '1px solid rgba(74,122,95,0.15)',
            }}
          >
            <div
              className="mb-1 px-4 py-2"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.62rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--chapter-therapy)',
                opacity: 0.7,
              }}
            >
              All testimonials are anonymized to protect client confidentiality
            </div>
            <div className="grid lg:grid-cols-3 gap-1">
              {stories.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setActiveStory(i)}
                  className="text-left p-6 transition-all duration-200 rounded-sm"
                  style={{
                    background:
                      activeStory === i ? 'var(--card)' : 'transparent',
                  }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-9 h-9 flex items-center justify-center"
                      style={{
                        background: s.color,
                        color: '#F9F6F1',
                        fontFamily: 'var(--font-display)',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        borderRadius: '50%',
                      }}
                    >
                      {s.initials}
                    </div>
                    <div>
                      <div
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.65rem',
                          color: s.color,
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                        }}
                      >
                        {s.context}
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.75rem',
                          color: 'var(--muted-foreground)',
                        }}
                      >
                        Age {s.age}
                      </div>
                    </div>
                  </div>
                  <p
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.9rem',
                      lineHeight: 1.7,
                      color: 'var(--foreground)',
                      fontStyle: 'italic',
                    }}
                  >
                    "{s.quote}"
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
