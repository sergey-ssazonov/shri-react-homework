/* eslint-disable  @typescript-eslint/no-explicit-any */
import { describe, it, expect } from 'vitest';
import { useAggregateStore } from './aggregate.store';

describe('aggregate.store', () => {
  it('начальное состояние пустое и без ошибок', () => {
    const state = useAggregateStore.getState();
    expect(state.chunks).toEqual([]);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('addChunk', () => {
    const chunk = { foo: 'bar' } as any;
    useAggregateStore.getState().addChunk(chunk);
    expect(useAggregateStore.getState().chunks).toContain(chunk);
  });

  it('setLoading переключает флаг isLoading', () => {
    const store = useAggregateStore.getState();
    store.setLoading(true);
    expect(useAggregateStore.getState().isLoading).toBe(true);
    store.setLoading(false);
    expect(useAggregateStore.getState().isLoading).toBe(false);
  });

  it('setError сохраняет сообщение об ошибке', () => {
    const store = useAggregateStore.getState();
    store.setError('oops');
    expect(useAggregateStore.getState().error).toBe('oops');
  });

  it('reset возвращает всё к начальному состоянию', () => {
    const store = useAggregateStore.getState();
    store.addChunk({} as any);
    store.setLoading(true);
    store.setError('err');
    store.reset();

    const fresh = useAggregateStore.getState();
    expect(fresh.chunks).toEqual([]);
    expect(fresh.isLoading).toBe(false);
    expect(fresh.error).toBeNull();
  });
});
