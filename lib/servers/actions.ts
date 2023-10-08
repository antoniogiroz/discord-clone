import { Server } from '@prisma/client';
import prisma from '../prisma';

export async function getAllUserServers(profileId: string): Promise<Server[]> {
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

export async function findServer(serverId: string, profileId: string) {
  return await prisma.server.findUnique({
    where: {
      id: serverId,
      members: {
        some: {
          profileId: profileId,
        },
      },
    },
  });
}

export async function getServer(serverId: string) {
  return await prisma.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: 'asc',
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: 'asc',
        },
      },
    },
  });
}
