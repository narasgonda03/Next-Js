'use client';

import useSWR, { SWRConfiguration } from 'swr';

interface UseSWRFetcherProps<T> {
  url: string;
  config?: SWRConfiguration;
}

/**
 * Wrapper/helper for SWR hook with common configuration
 * Provides a consistent fetcher function
 */
export function fetcher(url: string) {
  return fetch(url).then((res) => {
    if (!res.ok) throw new Error('Failed to fetch');
    return res.json();
  });
}

export function useSWRFetcher<T>(
  { url, config }: UseSWRFetcherProps<T>
) {
  const { data, error, isLoading, mutate } = useSWR<T>(url, fetcher, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    dedupingInterval: 2000,
    focusThrottleInterval: 300000, // 5 minutes
    ...config,
  });

  return {
    data,
    error,
    isLoading,
    isError: !!error,
    mutate,
  };
}
