import { useSyncExternalStore } from "react";

type Listener<T> = (state: T) => void;
type Updater<T> = Partial<T> | ((prev: T) => T);

type Store<T> = {
  getState: () => T;
  setState: (next: Updater<T>) => void;
  subscribe: (listener: Listener<T>) => () => void;
};

function createStore<T>(initialState: T): Store<T> {
  let state = initialState;
  const listeners = new Set<Listener<T>>();

  const getState = () => state;

  const setState = (next: Updater<T>) => {
    let updatedState: T;

    if (typeof next === "function") {
      const updaterFn = next as (prev: T) => T;
      updatedState = updaterFn(state);
    } else {
      updatedState = { ...state, ...next };
    }

    if (updatedState === state) return;
    state = updatedState;

    listeners.forEach((listener) => {
      listener(state);
    });
  };

  const subscribe = (listener: Listener<T>) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  return { getState, setState, subscribe };
}

type AppState = {
  count: number;
  note: string;
};

const appStore = createStore<AppState>({
  count: 1,
  note: "",
});

export const useAppStore = <T>(selector: (state: AppState) => T): T =>
  useSyncExternalStore(appStore.subscribe, () => selector(appStore.getState()));

export const appActions = {
  increment: () =>
    appStore.setState((prev) => ({ ...prev, count: prev.count + 1 })),
  decrement: () =>
    appStore.setState((prev) => ({
      ...prev,
      count: Math.max(0, prev.count - 1),
    })),
  reset: () => appStore.setState({ count: 0 }),
  updateNote: (note: string) => appStore.setState({ note }),
};

export const getAppState = appStore.getState;
