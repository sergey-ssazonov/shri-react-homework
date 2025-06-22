import { create } from 'zustand';
import type { TAggregateHistoryRecord } from '@/shared/types/aggregate';
import { getHistoryFromStorage, saveHistoryToStorage } from '../api/history';

type HistoryState = {
  records: TAggregateHistoryRecord[];
};

type HistoryActions = {
  loadHistory: () => void;
  deleteRecord: (id: string) => void;
  clearHistory: () => void;
  addRecord: (record: TAggregateHistoryRecord) => void;
};

export const useHistoryStore = create<HistoryState & HistoryActions>((set) => ({
  records: [],

  loadHistory: () => {
    const data = getHistoryFromStorage().reverse();
    set({ records: data });
  },

  deleteRecord: (id) => {
    set((state) => {
      const updated = state.records.filter((r) => r.id !== id);
      saveHistoryToStorage([...updated].reverse());
      return { records: updated };
    });
  },

  clearHistory: () => {
    saveHistoryToStorage([]);
    set({ records: [] });
  },

  addRecord: (record) => {
    set((state) => {
      const updated = [record, ...state.records];
      saveHistoryToStorage([...updated].reverse());
      return { records: updated };
    });
  },
}));
