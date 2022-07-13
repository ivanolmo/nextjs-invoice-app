import useSWR from 'swr';

import { fetcher } from '../utils/fetcher';

export function useCollectionData(user) {
  const { data, error } = useSWR(
    user ? ['/api/invoices', user.token] : null,
    fetcher,
    { refreshInterval: 5000 }
  );

  return {
    data,
    loading: !error && !data,
    error,
  };
}
