import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="h-full flex items-center justify-center">{children}</div>
  );
}
