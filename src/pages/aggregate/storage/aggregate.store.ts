import type { TAggregateData } from '@/shared/types/aggregate';
import { create } from 'zustand';

type AgregateState = {
  chunks: TAggregateData[];
  isLoading: boolean;
  error: string | null;
};

type AgregateActions = {
  addChunk: (chunk: TAggregateData) => void;
  reset: () => void;
  setLoading: (value: boolean) => void;
  setError: (msg: string) => void;
};

export const useAggregateStore = create<AgregateState & AgregateActions>((set) => ({
  chunks: [],
  isLoading: false,
  error: null,

  addChunk: (chunk) =>
    set((state) => ({
      chunks: [...state.chunks, chunk],
    })),

  reset: () =>
    set({
      chunks: [],
      isLoading: false,
      error: null,
    }),

  setLoading: (value) => set({ isLoading: value }),
  setError: (msg) => set({ error: msg }),
}));
