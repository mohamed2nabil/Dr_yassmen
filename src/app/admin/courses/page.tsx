import { CoursesPage } from '@/views/courses';
import { getCourses } from '@/app/actions/courseActions';

export default async function Page() {
  const courses = await getCourses();
  return <CoursesPage initialCourses={courses} />;
}
