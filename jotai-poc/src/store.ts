import { atom } from "jotai";

export type AppState = {
  count: number;
  note: string;
};

export const countAtom = atom<number>(1);
export const noteAtom = atom<string>("");

export const appAtom = atom<AppState>((get) => ({
  count: get(countAtom),
  note: get(noteAtom),
}));

export const incrementAtom = atom(null, (get, set) =>
  set(countAtom, get(countAtom) + 1)
);

export const decrementAtom = atom(null, (get, set) =>
  set(countAtom, Math.max(0, get(countAtom) - 1))
);

export const resetCountAtom = atom(null, (_, set) => set(countAtom, 0));

export const updateNoteAtom = atom(null, (_, set, note: string) =>
  set(noteAtom, note)
);
