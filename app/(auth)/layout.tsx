import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return <div className="h-full bg-red-100">{children}</div>;
}
