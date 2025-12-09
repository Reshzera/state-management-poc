import { create } from "zustand";

type AppState = {
  count: number;
  note: string;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  updateNote: (note: string) => void;
};

export const useAppStore = create<AppState>((set) => ({
  count: 1,
  note: "",
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: Math.max(0, state.count - 1) })),
  reset: () => set({ count: 0 }),
  updateNote: (note) => set({ note }),
}));
