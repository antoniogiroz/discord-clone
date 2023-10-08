import { redirectToSignIn, currentUser, auth } from '@clerk/nextjs';
import prisma from '../prisma';
import { Profile } from '@prisma/client';

export async function getCurrentProfile(): Promise<Profile | null> {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  const profile = await prisma.profile.findUnique({
    where: {
      userId: user.id,
    },
  });

  return profile;
}

export async function getOrCreateUserProfile() {
  const user = await currentUser();

  if (!user) {
    return redirectToSignIn();
  }

  const profile = await prisma.profile.findUnique({
    where: {
      userId: user.id,
    },
  });

  if (profile) {
    return profile;
  }

  const newProfile = await prisma.profile.create({
    data: {
      userId: user.id,
      name: `${user.firstName} ${user.lastName}`,
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress,
    },
  });

  return newProfile;
}
