import { create } from "zustand";

interface firstStoreState {
  count: number;
  increment: () => void;
}

export const usefirstStoreStore = create<firstStoreState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));