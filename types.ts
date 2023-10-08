import { Member, Profile, Server } from '@prisma/client';

type MemberWithProfiles = Member & {
  profile: Profile;
};

export type ServerWithMembersWithProfiles = Server & {
  members: MemberWithProfiles[];
};
