import { ProjectsPage } from '@/views/projects';
import { getProjects } from '@/app/actions/projectActions';

export default async function Page() {
  const projects = await getProjects();
  return <ProjectsPage initialProjects={projects} />;
}
