import { getCurrentProfile } from '@/lib/profiles/actions';
import { redirectToSignIn } from '@clerk/nextjs';

export async function useCurrentProfile() {
  const profile = await getCurrentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  return profile;
}
