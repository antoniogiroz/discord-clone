import { useCurrentProfile } from '@/hooks/use-current-profile';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';

interface Props {
  params: {
    inviteCode: string;
  };
}

export default async function InviteCodePage({ params }: Props) {
  const profile = await useCurrentProfile();

  if (!params.inviteCode) {
    return redirect('/');
  }

  // TODO: Move outside the component
  const existingServer = await prisma.server.findFirst({
    where: {
      inviteCode: params.inviteCode,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (existingServer) {
    return redirect(`/servers/${existingServer.id}`);
  }

  const server = await prisma.server.update({
    where: {
      inviteCode: params.inviteCode,
    },
    data: {
      members: {
        create: [
          {
            profileId: profile.id,
          },
        ],
      },
    },
  });

  if (server) {
    return redirect(`/servers/${server.id}`);
  }

  return null;
}
