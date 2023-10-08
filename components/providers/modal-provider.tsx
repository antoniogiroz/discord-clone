'use client';

import { useState, useEffect, ReactNode } from 'react';
import { CreateServerModal } from '../modals/create-server-modal';

export function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CreateServerModal />
    </>
  );
}
