import { StoriesPage } from '@/views/stories';
import { getTherapyStories } from '@/app/actions/therapyStoryActions';

export default async function Page() {
  const stories = await getTherapyStories();
  return <StoriesPage initialStories={stories} />;
}
