# Backend & Dashboard Architecture Plan

**Goal:** Implement the database schema, Server Actions, and Admin UI for the CMS without altering the existing public frontend design.

## 1. Prisma Schema Updates (`prisma/schema.prisma`)
Define the following models:
- **Project:** `id`, `title`, `category` (Visual Art, Interior Design, etc.), `description`, `dateLocation` (e.g., "Cairo 2023"), `mainImage` (URL), `beforeImage` (URL - optional, for Interior Design), `afterImage` (URL - optional).
- **Course:** `id`, `title`, `category`, `duration`, `date`, `description`, `imageUrl`.
- **Stat:** `id`, `value` (e.g., "15+"), `label` (e.g., "Years of Practice").
- **Testimonial (Vouts):** `id`, `clientName`, `content`, `role`.
- **Message (Inbox):** `id`, `name`, `email`, `phone` (optional), `interests` (JSON or string), `message`, `isRead` (boolean).
- **Profile (Settings):** `id`, `name`, `bio`, `contactEmail`.

*Action:* Generate the schema and run `npx prisma db push` and `npx prisma generate`.

## 2. Server Actions (`src/app/actions/`)
Create separate files for each entity (e.g., `projectActions.ts`, `messageActions.ts`).
- Implement strict CRUD operations (Create, Read, Update, Delete) for each Prisma model.
- Use `revalidatePath` after every mutation to ensure the dashboard and frontend update instantly.
- For `Message`, only implement Create (for the frontend) and Read/Delete/Mark-as-read (for the admin).

## 3. Dashboard UI Construction (`src/app/admin/`)
Build the following pages using the existing dashboard layout:
- **`/admin/projects`:** Table of projects. "Add New" form must include fields for Title, Category, and use `<UploadButton>` from UploadThing to handle `mainImage`, `beforeImage`, and `afterImage`.
- **`/admin/courses`:** Table of courses. "Add New" form utilizing UploadThing for the course thumbnail.
- **`/admin/stats`:** A simple grid to update the numeric values and labels for the Impact & Reach section.
- **`/admin/testimonials`:** Text-based forms to add/edit client reviews.
- **`/admin/inbox`:** A clean table to read submitted contact forms. Clicking a row expands the full message.

*Constraint:* Keep the admin UI clean, using Tailwind CSS and existing form styles. Ensure UploadThing correctly passes the uploaded `url` string to the Server Actions.