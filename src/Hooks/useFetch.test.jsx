import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, renderHook, waitFor } from '@testing-library/react';
import useFetch, { clearFetchCache } from './useFetch';

function createResponse(json, ok = true) {
  return {
    ok,
    json: vi.fn().mockResolvedValue(json),
  };
}

describe('useFetch', () => {
  beforeEach(() => {
    clearFetchCache();
    globalThis.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('reusa resposta em cache para a mesma URL', async () => {
    const payload = { data: [{ displayName: 'Raze' }] };
    globalThis.fetch.mockResolvedValue(createResponse(payload));
    const { result } = renderHook(() => useFetch());

    await act(async () => {
      await result.current.request('/agents', { method: 'GET' });
      await result.current.request('/agents', { method: 'GET' });
    });

    expect(globalThis.fetch).toHaveBeenCalledTimes(1);
    expect(result.current.data).toEqual(payload);
  });

  it('deduplica chamadas simultaneas para a mesma URL', async () => {
    const payload = { data: [{ displayName: 'Vandal' }] };
    globalThis.fetch.mockResolvedValue(createResponse(payload));
    const firstHook = renderHook(() => useFetch());
    const secondHook = renderHook(() => useFetch());

    await act(async () => {
      await Promise.all([
        firstHook.result.current.request('/weapons', { method: 'GET' }),
        secondHook.result.current.request('/weapons', { method: 'GET' }),
      ]);
    });

    expect(globalThis.fetch).toHaveBeenCalledTimes(1);
    expect(firstHook.result.current.data).toEqual(payload);
    expect(secondHook.result.current.data).toEqual(payload);
  });

  it('nao salva erros em cache', async () => {
    globalThis.fetch
      .mockResolvedValueOnce(createResponse({ message: 'Falhou' }, false))
      .mockResolvedValueOnce(createResponse({ data: [] }));
    const { result } = renderHook(() => useFetch());

    await act(async () => {
      await result.current.request('/sprays', { method: 'GET' });
    });

    await waitFor(() => {
      expect(result.current.error).toBe('Falhou');
    });

    await act(async () => {
      await result.current.request('/sprays', { method: 'GET' });
    });

    expect(globalThis.fetch).toHaveBeenCalledTimes(2);
    expect(result.current.data).toEqual({ data: [] });
  });
});
