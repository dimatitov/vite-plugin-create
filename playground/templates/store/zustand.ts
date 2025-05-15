import { create } from "zustand";

interface {{name}}State {
  count: number;
  increment: () => void;
}

export const use{{name}}Store = create<{{name}}State>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));