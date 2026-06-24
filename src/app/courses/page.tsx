"use client";

import { CourseCard } from '../components/CourseCard'

interface Course {
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

export default function CoursesPage() {
  const courses: Course[] = [
    {
      id: '1',
      title: 'Introduction to Visual Art Fundamentals',
      category: 'Art Education',
      description: 'Explore the foundational principles of visual art including color theory, composition, and form. Perfect for beginners and aspiring artists.',
      duration: '8 weeks',
      date: 'July 15, 2026',
      image: 'https://images.unsplash.com/photo-1740710543611-80b658171bc3?w=600&h=400&fit=crop&auto=format',
      categoryColor: 'var(--chapter-art)',
      categoryBg: 'var(--chapter-art-bg)',
    },
    {
      id: '2',
      title: 'Interior Design for Modern Spaces',
      category: 'Interior Design',
      description: 'Learn how to design functional and aesthetically pleasing interior spaces. Covering layout, materials, lighting, and spatial planning.',
      duration: '10 weeks',
      date: 'August 1, 2026',
      image: 'https://images.unsplash.com/photo-1646987916641-1f3c8992daa2?w=600&h=400&fit=crop&auto=format',
      categoryColor: 'var(--chapter-interior)',
      categoryBg: 'var(--chapter-interior-bg)',
    },
    {
      id: '3',
      title: 'Art Therapy for Emotional Expression',
      category: 'Art Therapy',
      description: 'Discover the healing power of art through therapeutic practices. Learn techniques to facilitate creative expression and emotional well-being.',
      duration: '6 weeks',
      date: 'July 22, 2026',
      image: 'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?w=600&h=400&fit=crop&auto=format',
      categoryColor: 'var(--chapter-therapy)',
      categoryBg: 'var(--chapter-therapy-bg)',
    },
    {
      id: '4',
      title: 'Teaching Art: Pedagogy & Creativity',
      category: 'Art Education',
      description: 'Master the art of teaching creativity. Learn instructional strategies, curriculum design, and how to inspire students of all ages.',
      duration: '9 weeks',
      date: 'August 12, 2026',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop&auto=format',
      categoryColor: 'var(--chapter-art)',
      categoryBg: 'var(--chapter-art-bg)',
    },
  ]

  return (
    <main style={{ background: 'var(--background)' }}>
      {/* Header Section */}
      <section className="py-16 md:py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          {/* Overline */}
          <div
            className="flex items-center gap-3 mb-6"
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
            Learning & Development
          </div>

          {/* Title */}
          <h1
            className="mb-6"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 400,
              lineHeight: 1.1,
              color: 'var(--foreground)',
              letterSpacing: '-0.01em',
            }}
          >
            Featured Courses
          </h1>

          {/* Subtitle */}
          <p
            className="max-w-2xl"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.05rem',
              lineHeight: 1.7,
              color: 'var(--muted-foreground)',
            }}
          >
            Explore a carefully curated selection of courses designed to inspire creativity, deepen artistic practice, and foster personal growth. From art education to therapeutic practices, find the perfect course for your journey.
          </p>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {courses.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-16 md:py-20 lg:py-28 border-t"
        style={{ borderColor: 'var(--border)' }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
          <h2
            className="mb-4"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
              fontWeight: 400,
              lineHeight: 1.2,
              color: 'var(--foreground)',
            }}
          >
            Can't find what you're looking for?
          </h2>

          <p
            className="mb-8"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1rem',
              lineHeight: 1.7,
              color: 'var(--muted-foreground)',
            }}
          >
            I offer custom workshops, private sessions, and tailored programs designed specifically for your needs. Let's create something meaningful together.
          </p>

          <button
            className="px-8 py-3.5 transition-all duration-200 hover:opacity-80"
            style={{
              background: 'var(--foreground)',
              color: 'var(--primary-foreground)',
              fontFamily: 'var(--font-body)',
              fontSize: '0.85rem',
              fontWeight: 500,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              borderRadius: '2px',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Get in Touch
          </button>
        </div>
      </section>
    </main>
  )
}
