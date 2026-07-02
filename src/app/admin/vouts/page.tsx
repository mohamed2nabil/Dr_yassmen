import { VoutsPage } from '@/views/vouts';
import { getProjects } from '@/app/actions/projectActions';
import { getCourses } from '@/app/actions/courseActions';
import { getTestimonials } from '@/app/actions/voutActions';

export default async function Page() {
  const [projects, courses, testimonials] = await Promise.all([
    getProjects(),
    getCourses(),
    getTestimonials(),
  ]);

  return (
    <VoutsPage
      initialProjects={projects}
      initialCourses={courses}
      initialTestimonials={testimonials}
    />
  );
}
