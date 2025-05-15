import { create } from "zustand";

export const use{{name}}Store = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));