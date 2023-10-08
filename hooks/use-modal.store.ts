import { Server } from '@prisma/client';
import { create } from 'zustand';

export type ModalType = 'createServer' | 'invite';

interface ModalData {
  server?: Server;
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  openModal: (type: ModalType, data?: ModalData) => void;
  closeModal: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  openModal: (type, data = {}) => set({ type, isOpen: true, data }),
  closeModal: () => set({ type: null, isOpen: false }),
}));
