'use client';

import { useState, useEffect } from 'react';

interface UseEffectFetcherProps<T> {
  url: string;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}

interface UseEffectFetcherReturn<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

/**
 * Custom hook for useEffect-based data fetching
 * Useful for creating reusable fetching logic
 */
export function useEffectFetcher<T>({
  url,
  onSuccess,
  onError,
}: UseEffectFetcherProps<T>): UseEffectFetcherReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch');
      const result = await response.json();
      setData(result);
      onSuccess?.(result);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setError(error);
      onError?.(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, loading, error, refetch: fetchData };
}
