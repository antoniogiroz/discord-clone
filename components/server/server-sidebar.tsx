import { useCurrentProfile } from '@/hooks/use-current-profile';
import { getCurrentProfile } from '@/lib/profiles/actions';
import { findServer, getServer } from '@/lib/servers/actions';
import { redirectToSignIn } from '@clerk/nextjs';
import { ChannelType, MemberRole } from '@prisma/client';
import { redirect } from 'next/navigation';
import { ServerHeader } from './server-header';

interface Props {
  serverId: string;
}

export async function ServerSidebar({ serverId }: Props) {
  const profile = await useCurrentProfile();

  const server = await getServer(serverId);

  if (!server) {
    return redirect('/');
  }

  const textChannels = server.channels.filter((channel) => channel.type === ChannelType.TEXT);
  const audioChannels = server.channels.filter((channel) => channel.type === ChannelType.AUDIO);
  const videoChannels = server.channels.filter((channel) => channel.type === ChannelType.VIDEO);
  const members = server.members.filter((member) => member.profileId !== profile.id);

  const role: MemberRole = server.members.find((member) => member.profileId === profile.id)?.role!;

  return (
    <div className="flex flex-col h-full text-primary w-full dark:bg-[#2b2d31] bg-[#f2f3f5]">
      <ServerHeader server={server} role={role} />
    </div>
  );
}
