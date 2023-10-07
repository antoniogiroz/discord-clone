import { getOrCreateUserProfile } from '@/lib/profiles/actions';
import { getFirstServerByProfileId } from '@/lib/servers/actions';
import { redirect } from 'next/navigation';

export default async function Page() {
  const profile = await getOrCreateUserProfile();

  const server = await getFirstServerByProfileId(profile.id);

  if (server) {
    return redirect(`/servers/${server.id}`);
  }

  return <div>Create a Server</div>;
}
