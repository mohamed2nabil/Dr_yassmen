import { WorkshopsPage } from '@/views/workshops';
import { getWorkshops } from '@/app/actions/workshopActions';

export default async function Page() {
  const workshops = await getWorkshops();
  return <WorkshopsPage initialWorkshops={workshops} />;
}
