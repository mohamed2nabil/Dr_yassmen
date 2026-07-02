import { OverviewPage } from '@/views/overview';
import { getProjects } from '@/app/actions/projectActions';
import { getCourses } from '@/app/actions/courseActions';
import { getMessages } from '@/app/actions/inboxActions';
import { getViews } from '@/app/actions/analyticsActions';

export default async function Page() {
  const [projects, courses, messages, views] = await Promise.all([
    getProjects(),
    getCourses(),
    getMessages(),
    getViews(),
  ]);

  return (
    <OverviewPage
      initialProjects={projects}
      initialCourses={courses}
      initialMessages={messages}
      initialViews={views}
    />
  );
}
