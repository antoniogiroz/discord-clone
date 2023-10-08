import { getOrCreateUserProfile } from '@/lib/profiles/actions';
import { getUserServers } from '@/lib/servers/actions';
import { redirect } from 'next/navigation';
import { ModeToggle } from '../mode-toggle';
import { ScrollArea } from '../ui/scroll-area';
import { Separator } from '../ui/separator';
import { NavigationAction } from './navigation-action';
import { NavigationItem } from './navigation-item';
import { UserButton } from '@clerk/nextjs';

export async function NavigationSidebar() {
  const profile = await getOrCreateUserProfile();

  if (!profile) {
    return redirect('/');
  }

  const servers = await getUserServers(profile.id);

  return (
    <div className="space-y-4 flex flex-col items-center h-full text-primary w-full py-3 dark: bg-[#1E1F22]">
      <NavigationAction />
      <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto" />
      <ScrollArea className="flex-1 w-full">
        {servers.map((server) => (
          <NavigationItem
            key={server.id}
            id={server.id}
            name={server.name}
            imageUrl={server.imageUrl}
          />
        ))}
      </ScrollArea>
      <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
        <ModeToggle />
        <UserButton
          afterSignOutUrl="/"
          appearance={{ elements: { avatarBox: 'h-[48px] w-[48px]' } }}
        />
      </div>
    </div>
  );
}
