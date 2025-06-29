/* eslint-disable  @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach, afterAll } from 'vitest';
import { generateCSV } from './generator';

describe('generateCSV', () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterAll(() => {
    global.fetch = originalFetch;
  });

  it('возвращает Blob при response.ok=true', async () => {
    const fakeBlob = new Blob(['a,b\n1,2'], { type: 'text/csv' });
    const mockResponse = {
      ok: true,
      blob: () => Promise.resolve(fakeBlob),
    } as any;
    global.fetch = vi.fn().mockResolvedValue(mockResponse);

    const result = await generateCSV({ size: 1, withErrors: true, maxSpend: '500' });
    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:3000/report?size=1&withErrors=on&maxSpend=500'
    );
    expect(result).toBe(fakeBlob);
  });

  it('скипает default-параметры и возвращает Blob', async () => {
    const fakeBlob = new Blob([], { type: 'text/csv' });
    const mockResponse = { ok: true, blob: () => Promise.resolve(fakeBlob) } as any;
    global.fetch = vi.fn().mockResolvedValue(mockResponse);

    const result = await generateCSV({});
    // проверяем что size=0.5, withErrors=off, maxSpend=1000
    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:3000/report?size=0.5&withErrors=off&maxSpend=1000'
    );
    expect(result).toBe(fakeBlob);
  });

  it('бросает ошибку, если response.ok=false', async () => {
    const mockResponse = { ok: false } as any;
    global.fetch = vi.fn().mockResolvedValue(mockResponse);

    await expect(generateCSV({})).rejects.toThrow('Ошибка генерации файла');
  });

  it('бросает ошибку при сети', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('network'));
    await expect(generateCSV({})).rejects.toThrow('network');
  });
});
