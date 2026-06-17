"use client";

import { useEffect, useRef, useState } from 'react'

const stats = [
  {
    value: 15,
    suffix: '+',
    label: 'Years of Practice',
    arabic: 'سنوات الخبرة',
    color: 'var(--chapter-art)',
  },
  {
    value: 1200,
    suffix: '+',
    label: 'Students Taught',
    arabic: 'الطلاب',
    color: 'var(--chapter-education)',
  },
  {
    value: 87,
    suffix: '',
    label: 'Interior Projects',
    arabic: 'مشروع تصميم',
    color: 'var(--chapter-interior)',
  },
  {
    value: 340,
    suffix: '+',
    label: 'Therapy Clients',
    arabic: 'عميل علاج',
    color: 'var(--chapter-therapy)',
  },
  {
    value: 60,
    suffix: '+',
    label: 'Workshops',
    arabic: 'ورشة عمل',
    color: 'var(--chapter-art)',
  },
  {
    value: 8,
    suffix: '',
    label: 'Countries Reached',
    arabic: 'دول',
    color: 'var(--chapter-education)',
  },
]

function AnimatedNumber({
  target,
  suffix,
}: {
  target: number
  suffix: string
}) {
  const [current, setCurrent] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const duration = 1500
          const start = performance.now()
          const animate = (now: number) => {
            const progress = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCurrent(Math.round(eased * target))
            if (progress < 1) requestAnimationFrame(animate)
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return (
    <div ref={ref}>
      {current.toLocaleString()}
      {suffix}
    </div>
  )
}

export function StatsSection() {
  return (
    <section
      className="py-12 sm:py-16 lg:py-20"
      style={{
        background: 'var(--secondary)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div
          className="flex items-center gap-3 mb-12"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.68rem',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'var(--muted-foreground)',
          }}
        >
          <span className="h-px w-6" style={{ background: 'var(--accent)' }} />
          Impact & Reach — الأثر والانتشار
        </div>
        <div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px"
          style={{ background: 'var(--border)' }}
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="p-6 lg:p-8"
              style={{ background: 'var(--secondary)' }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2rem, 4vw, 2.8rem)',
                  fontWeight: 400,
                  color: s.color,
                  lineHeight: 1,
                }}
              >
                <AnimatedNumber target={s.value} suffix={s.suffix} />
              </div>
              <div
                className="mt-2"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.82rem',
                  color: 'var(--foreground)',
                  fontWeight: 500,
                }}
              >
                {s.label}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.75rem',
                  color: 'var(--muted-foreground)',
                  fontStyle: 'italic',
                }}
              >
                {s.arabic}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
