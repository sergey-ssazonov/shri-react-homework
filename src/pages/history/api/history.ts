import { AGGREGATE_HISTORY } from '@/shared/constants/localStorage.const';
import type { TAggregateHistoryRecord } from '@/shared/types/aggregate';

export const getHistoryFromStorage = (): TAggregateHistoryRecord[] => {
  try {
    return JSON.parse(localStorage.getItem(AGGREGATE_HISTORY) || '[]');
  } catch {
    return [];
  }
};

export const saveHistoryToStorage = (history: TAggregateHistoryRecord[]): void => {
  localStorage.setItem(AGGREGATE_HISTORY, JSON.stringify(history));
};
