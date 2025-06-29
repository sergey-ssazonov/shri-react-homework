/* eslint-disable  @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach, afterAll } from 'vitest';
import { aggregateFile } from './aggregate';
import type { TAggregateData } from '@/shared/types/aggregate';

describe('aggregateFile', () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterAll(() => {
    global.fetch = originalFetch;
  });

  it('разбивает поток на строки и вызывает onChunk для каждого', async () => {
    const chunks: TAggregateData[] = [{ a: 1 } as any, { b: 2 } as any];
    const text = JSON.stringify(chunks[0]) + '\n' + JSON.stringify(chunks[1]) + '\n';
    const encoder = new TextEncoder();
    const reader = {
      read: vi
        .fn()
        .mockResolvedValueOnce({ value: encoder.encode(text), done: false })
        .mockResolvedValueOnce({ value: new Uint8Array(), done: true }),
    };
    const mockResponse = {
      ok: true,
      body: { getReader: () => reader },
    } as any;
    global.fetch = vi.fn().mockResolvedValue(mockResponse);

    const onChunk = vi.fn();
    await aggregateFile(new File([], 'f.csv'), 10, onChunk);

    expect(onChunk).toHaveBeenCalledTimes(2);
    expect(onChunk).toHaveBeenNthCalledWith(1, chunks[0]);
    expect(onChunk).toHaveBeenNthCalledWith(2, chunks[1]);
  });

  it('бросает ошибку, если !response.ok или нет body', async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: false, body: null });
    await expect(aggregateFile(new File([], 'f.csv'), 5, () => {})).rejects.toThrow(
      'Ошибка при соединении с сервером'
    );

    global.fetch = vi.fn().mockResolvedValue({ ok: true, body: null });
    await expect(aggregateFile(new File([], 'f.csv'), 5, () => {})).rejects.toThrow(
      'Ошибка при соединении с сервером'
    );
  });
});
