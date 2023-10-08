import { Server } from '@prisma/client';
import prisma from '../prisma';

export async function getUserServers(profileId: string): Promise<Server[]> {
  return await prisma.server.findMany({
    where: {
      profileId,
    },
  });
}

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
