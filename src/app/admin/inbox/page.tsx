import { InboxPage } from '@/views/inbox';
import { getMessages } from '@/app/actions/inboxActions';

export default async function Page() {
  const messages = await getMessages();
  return <InboxPage initialMessages={messages} />;
}
