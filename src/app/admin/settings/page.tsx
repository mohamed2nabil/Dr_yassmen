import { SettingsPage } from '@/views/settings';
import { getProfile, getAdminCredentials } from '@/app/actions/profileActions';
import { getCredentials } from '@/app/actions/credentialActions';

export default async function Page() {
  const [profile, credentials, credentialsList] = await Promise.all([
    getProfile(),
    getAdminCredentials(),
    getCredentials(),
  ]);

  return (
    <SettingsPage
      initialProfile={profile}
      initialCredentials={credentials}
      initialCredentialsList={credentialsList}
    />
  );
}
