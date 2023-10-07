import prisma from '../client';

export async function getFirstServerByProfileId(profileId: string) {
  return await prisma.server.findFirst({
    where: {
      members: {
        some: {
          profileId,
        },
      },
    },
  });
}
