/* eslint-disable  @typescript-eslint/no-explicit-any */
import { describe, it, expect, beforeEach } from 'vitest';
import { getHistoryFromStorage, saveHistoryToStorage } from './history';
import { AGGREGATE_HISTORY } from '@/shared/constants/localStorage.const';
import type { TAggregateHistoryRecord } from '@/shared/types/aggregate';

describe('history API', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('getHistoryFromStorage: возвращает распарсенный массив, если он есть', () => {
    const recs: TAggregateHistoryRecord[] = [
      { id: '1', fileName: 'a.csv', date: '2025-01-01', status: 'success', result: {} },
    ] as any;
    localStorage.setItem(AGGREGATE_HISTORY, JSON.stringify(recs));
    expect(getHistoryFromStorage()).toEqual(recs);
  });

  it('getHistoryFromStorage: возвращает [] если в storage пусто или JSON некорректен', () => {
    expect(getHistoryFromStorage()).toEqual([]);
    localStorage.setItem(AGGREGATE_HISTORY, 'not-json');
    expect(getHistoryFromStorage()).toEqual([]);
  });

  it('saveHistoryToStorage: записывает JSON в localStorage', () => {
    const recs: TAggregateHistoryRecord[] = [
      { id: 'x', fileName: 'b.csv', date: '2025-02-02', status: 'error', errorMessage: 'err' },
    ] as any;
    saveHistoryToStorage(recs);
    expect(localStorage.getItem(AGGREGATE_HISTORY)).toBe(JSON.stringify(recs));
  });
});
