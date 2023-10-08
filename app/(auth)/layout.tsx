import { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <div className="h-full flex items-center justify-center">{children}</div>;
}
