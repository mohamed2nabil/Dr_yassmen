"use client";

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'

interface Project {
  title: string
  subtitle: string
  description: string
  image: string
  tag?: string
  before?: string
  after?: string
}

interface ChapterSectionProps {
  id: string
  chapterNum: string
  arabicTitle: string
  englishTitle: string
  tagline: string
  description: string
  color: string
  bg: string
  projects: Project[]
  hasBefore?: boolean
}

export function ChapterSection({
  id,
  chapterNum,
  arabicTitle,
  englishTitle,
  tagline,
  description,
  color,
  bg,
  projects,
  hasBefore,
}: ChapterSectionProps) {
  const [activeProject, setActiveProject] = useState(0)
  const [showAfter, setShowAfter] = useState(false)

  return (
    <section
      id={id}
      className="py-12 md:py-16 lg:py-20"
      style={{ background: 'var(--background)' }}
    >
      {/* Chapter header band */}
      <div
        className="mb-16"
        style={{
          background: bg,
          borderTop: `3px solid ${color}`,
          borderBottom: `1px solid rgba(28,24,18,0.06)`,
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
                color,
              }}
            >
              <span className="h-px w-6" style={{ background: color }} />
              Chapter {chapterNum}
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
              {englishTitle}
            </h2>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.2rem',
                color,
                fontStyle: 'italic',
                marginTop: '4px',
              }}
            >
              {arabicTitle}
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
            {tagline}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Description */}
        <div className="grid lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-5">
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                lineHeight: 1.85,
                color: 'var(--muted-foreground)',
              }}
            >
              {description}
            </p>
          </div>
        </div>

        {/* Projects */}
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Project list */}
          <div className="lg:col-span-4 flex flex-col gap-1">
            {projects.map((p, i) => (
              <button
                key={i}
                onClick={() => {
                  setActiveProject(i)
                  setShowAfter(false)
                }}
                className="text-left p-5 transition-all duration-200 group"
                style={{
                  background: activeProject === i ? bg : 'transparent',
                  borderLeft: `2px solid ${activeProject === i ? color : 'transparent'}`,
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.05rem',
                    color:
                      activeProject === i
                        ? 'var(--foreground)'
                        : 'var(--muted-foreground)',
                    fontWeight: 500,
                  }}
                >
                  {p.title}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.68rem',
                    color,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    marginTop: '2px',
                    opacity: activeProject === i ? 1 : 0.6,
                  }}
                >
                  {p.tag || p.subtitle}
                </div>
              </button>
            ))}
          </div>

          {/* Project detail */}
          <div className="lg:col-span-8">
            <div
              className="rounded-sm overflow-hidden"
              style={{ border: '1px solid var(--border)' }}
            >
              {/* Before/after toggle for interior design */}
              {hasBefore &&
                projects[activeProject].before &&
                projects[activeProject].after && (
                  <div className="flex" style={{ background: bg }}>
                    {['Before', 'After'].map((label) => (
                      <button
                        key={label}
                        onClick={() => setShowAfter(label === 'After')}
                        className="flex-1 py-2.5 transition-all"
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.68rem',
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          background:
                            (label === 'After') === showAfter
                              ? color
                              : 'transparent',
                          color:
                            (label === 'After') === showAfter
                              ? '#F9F6F1'
                              : color,
                        }}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                )}

              {/* Image */}
              <div
                className="relative"
                style={{ height: '320px', background: bg }}
              >
                <img
                  src={
                    hasBefore && projects[activeProject].before
                      ? showAfter
                        ? projects[activeProject].after
                        : projects[activeProject].before
                      : projects[activeProject].image
                  }
                  alt={projects[activeProject].title}
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute top-4 right-4 px-2.5 py-1"
                  style={{
                    background: color,
                    color: '#F9F6F1',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    borderRadius: '1px',
                  }}
                >
                  {projects[activeProject].tag ||
                    projects[activeProject].subtitle}
                </div>
              </div>

              {/* Content */}
              <div className="p-6" style={{ background: 'var(--card)' }}>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.4rem',
                    fontWeight: 400,
                    color: 'var(--foreground)',
                  }}
                >
                  {projects[activeProject].title}
                </h3>
                <p
                  className="mt-3"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9rem',
                    lineHeight: 1.75,
                    color: 'var(--muted-foreground)',
                  }}
                >
                  {projects[activeProject].description}
                </p>
                <button
                  className="mt-5 flex items-center gap-2 transition-opacity hover:opacity-60"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.78rem',
                    fontWeight: 500,
                    color,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                  }}
                >
                  View Full Project
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
