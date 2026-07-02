import { StatsPage } from '@/views/stats';
import { getStats } from '@/app/actions/statActions';

export default async function Page() {
  const statsResult = await getStats();
  // Remember getStats returns { success: true, data } or throws. But wait, in our modified getStats, we changed getStats to return the raw data! Let's double check.
  // Yes! In getStats, we returned raw data to not break the UI initially. Let's look:
  // "Update statActions.ts to return raw values for get/read queries".
  // So statsResult is the raw array of stats!
  return <StatsPage initialStats={statsResult} />;
}
