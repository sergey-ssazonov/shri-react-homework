import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useHistoryStore } from './history.store';
import { getHistoryFromStorage, saveHistoryToStorage } from '../api/history';
import type { TAggregateHistoryRecord } from '@/shared/types/aggregate';

vi.mock('../api/history');
const mockedGet = vi.mocked(getHistoryFromStorage);
const mockedSave = vi.mocked(saveHistoryToStorage);

describe('history.store', () => {
  beforeEach(() => {
    useHistoryStore.setState({ records: [] });
    mockedGet.mockReset();
    mockedSave.mockReset();
  });

  it('loadHistory: загружает и реверсирует данные из API', () => {
    const recordA = {
      id: '1',
      fileName: 'a',
      date: '',
      status: 'success',
      result: {},
    } as TAggregateHistoryRecord;
    const recordB = {
      id: '2',
      fileName: 'b',
      date: '',
      status: 'error',
      errorMessage: 'e',
    } as TAggregateHistoryRecord;
    const data = [recordA, recordB];
    const input = [...data];
    mockedGet.mockReturnValue(input);

    useHistoryStore.getState().loadHistory();

    expect(useHistoryStore.getState().records).toEqual([...data].reverse());
  });

  it('addRecord: добавляет запись и сохраняет реверс в storage', () => {
    const existing = [{ id: '1' } as TAggregateHistoryRecord];
    useHistoryStore.setState({ records: [...existing] });

    const newRec = { id: '2' } as TAggregateHistoryRecord;
    useHistoryStore.getState().addRecord(newRec);

    expect(useHistoryStore.getState().records[0]).toBe(newRec);
    expect(mockedSave).toHaveBeenCalledWith([...existing, newRec]);
  });

  it('deleteRecord: удаляет по id и сохраняет оставшиеся в storage', () => {
    const a = { id: 'a' } as TAggregateHistoryRecord;
    const b = { id: 'b' } as TAggregateHistoryRecord;
    useHistoryStore.setState({ records: [a, b] });

    useHistoryStore.getState().deleteRecord('a');
    expect(useHistoryStore.getState().records).toEqual([b]);
    expect(mockedSave).toHaveBeenCalledWith([b]);
  });

  it('clearHistory: очищает все и сохраняет []', () => {
    useHistoryStore.setState({ records: [{ id: 'x' } as TAggregateHistoryRecord] });
    useHistoryStore.getState().clearHistory();
    expect(useHistoryStore.getState().records).toEqual([]);
    expect(mockedSave).toHaveBeenCalledWith([]);
  });
});
