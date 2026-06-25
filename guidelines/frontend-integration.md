
# Frontend Data Integration Plan

**Goal:** Connect the static public-facing UI components to the Prisma database via Server Actions, maintaining 100% of the current Tailwind layout, typography, and responsive design.

## 1. Dynamic Statistics (`src/app/components/StatsSection.tsx`)
- Convert to an Async Server Component.
- Fetch data using `getStats()` Server Action.
- Map through the fetched stats to replace the hardcoded "15+", "1,200+", "87", etc. Maintain the elegant serif typography and layout.

## 2. Dynamic Projects & Chapters (`src/app/components/ChapterSection.tsx` or similar)
- Fetch projects using `getProjects()`.
- Filter projects by category to display in their respective sections (Visual Art, Interior Design, etc.).
- **Crucial:** For the Interior Design section, implement conditional rendering. If `beforeImage` and `afterImage` exist in the database record, render the "Before & After" image slider/layout exactly as it is currently hardcoded. Otherwise, render the standard single `mainImage`.

## 3. Dynamic Courses (`src/app/courses/page.tsx`)
- Convert the page to an Async Server Component.
- Fetch courses from the database.
- Map the data to the existing `CourseCard` components. Ensure the UploadThing image URLs render correctly within the Next.js `<Image />` tags.

## 4. Testimonials (`src/app/components/TestimonialsSection.tsx`)
- Fetch data from the `Testimonial` model.
- Map the reviews into the existing UI carousel or grid.

## 5. Contact Form Submission (`src/app/components/ContactSection.tsx`)
- Keep this as a Client Component (`"use client"`).
- Connect the form's `onSubmit` handler to the `createMessage` Server Action.
- Pass all fields (Name, Email, Phone, selected Checkboxes/Interests, and Message text).
- Implement a loading state on the button and a success toast/message ("Message sent successfully!") upon completion. Clear the form fields after submission.

*Constraint:* DO NOT modify any core CSS, Tailwind classes, flexbox layouts, or color variables during this integration. The visual output must remain identical to the static version.