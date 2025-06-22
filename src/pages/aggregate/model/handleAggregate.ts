import { aggregateFile } from '../api/aggregate';
import { useAggregateStore } from '../storage/aggregateStore';
import { saveToLocalStorage } from '@/shared/utils/localStorage';
import type { TAggregateData, TAggregateHistoryRecord } from '@/shared/types/aggregate';
import { AGGREGATE_HISTORY } from '@/shared/constants/localStorage.const';

export const handleAggregate = async (file: File) => {
  const { reset, addChunk, setLoading, setError } = useAggregateStore.getState();

  reset();
  setLoading(true);

  const chunks: TAggregateData[] = [];

  const baseRecord: Omit<TAggregateHistoryRecord, 'status' | 'result' | 'errorMessage'> = {
    id: crypto.randomUUID(),
    fileName: file.name,
    date: new Date().toISOString(),
  };

  try {
    await aggregateFile(file, 10000, (chunk) => {
      chunks.push(chunk);
      addChunk(chunk);
    });

    const successRecord: TAggregateHistoryRecord = {
      ...baseRecord,
      status: 'success',
      result: chunks[chunks.length - 1],
    };

    saveToLocalStorage(AGGREGATE_HISTORY, successRecord);
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : String(e);

    const errorRecord: TAggregateHistoryRecord = {
      ...baseRecord,
      status: 'error',
      errorMessage,
    };

    setError(errorMessage);
    saveToLocalStorage(AGGREGATE_HISTORY, errorRecord);
  } finally {
    setLoading(false);
  }
};
