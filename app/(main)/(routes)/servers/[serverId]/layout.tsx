import { ServerSidebar } from '@/components/server/server-sidebar';
import { useCurrentProfile } from '@/hooks/use-current-profile';
import { findServer } from '@/lib/servers/actions';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  params: { serverId: string };
}

export default async function ServerIdLayout({ children, params }: Props) {
  const profile = await useCurrentProfile();

  const server = await findServer(params.serverId, profile.id);
  if (!server) {
    return redirect('/');
  }

  return (
    <div className="h-full">
      <div className="hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
        <ServerSidebar serverId={server.id} />
      </div>
      <main className="h-full md:pl-60">{children}</main>
    </div>
  );
}
