import { create } from 'zustand';

/** Generic shell for list-backed domain stores. No business logic — Phase 2+ fills this in. */
export interface EntityStoreState<T> {
  items: T[];
  isLoading: boolean;
  error: string | null;
  setItems: (items: T[]) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

export function createEntityStore<T>() {
  return create<EntityStoreState<T>>((set) => ({
    items: [],
    isLoading: false,
    error: null,
    setItems: (items) => set({ items }),
    setLoading: (isLoading) => set({ isLoading }),
    setError: (error) => set({ error }),
  }));
}
