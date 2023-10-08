import prisma from '../prisma';

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
