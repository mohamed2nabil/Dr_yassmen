"use client";

import { ArrowRight } from 'lucide-react'

interface CourseCardProps {
  id: string
  title: string
  category: string
  description: string
  duration: string
  date: string
  image: string
  categoryColor: string
  categoryBg: string
}

export function CourseCard({
  title,
  category,
  description,
  duration,
  date,
  image,
  categoryColor,
  categoryBg,
}: CourseCardProps) {
  return (
    <div
      className="h-full flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
      style={{ background: 'var(--background)', border: '1px solid var(--border)' }}
    >
      {/* Image */}
      <div className="relative w-full aspect-video overflow-hidden bg-secondary">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col p-4 sm:p-5 md:p-6 lg:p-6">
        {/* Category Badge */}
        <div className="mb-3 sm:mb-4">
          <span
            className="inline-flex items-center px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm font-medium"
            style={{
              background: categoryBg,
              color: categoryColor,
            }}
          >
            {category}
          </span>
        </div>

        {/* Title */}
        <h3
          className="mb-2 sm:mb-3"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1rem, 2vw, 1.3rem)',
            fontWeight: 400,
            lineHeight: 1.3,
            color: 'var(--foreground)',
          }}
        >
          {title}
        </h3>

        {/* Description */}
        <p
          className="mb-3 sm:mb-4 flex-grow text-xs sm:text-sm"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.875rem, 1vw, 0.95rem)',
            lineHeight: 1.6,
            color: 'var(--muted-foreground)',
          }}
        >
          {description}
        </p>

        {/* Course Details */}
        <div className="mb-4 sm:mb-5 md:mb-6 space-y-1.5 sm:space-y-2">
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(0.7rem, 0.9vw, 0.75rem)',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              color: 'var(--muted-foreground)',
            }}
          >
            Duration: <span style={{ color: 'var(--foreground)' }}>{duration}</span>
          </div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(0.7rem, 0.9vw, 0.75rem)',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              color: 'var(--muted-foreground)',
            }}
          >
            Starts: <span style={{ color: 'var(--foreground)' }}>{date}</span>
          </div>
        </div>

        {/* Book Now Button */}
        <button
          className="w-full px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 flex items-center justify-center gap-2 transition-all duration-200 hover:opacity-90 hover:shadow-md active:scale-95"
          style={{
            background: 'var(--foreground)',
            color: 'var(--primary-foreground)',
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.75rem, 0.9vw, 0.85rem)',
            fontWeight: 500,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            borderRadius: '0.75rem',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Book Now
          <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  )
}
