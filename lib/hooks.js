import useSWR from 'swr';
import { fetcher } from '../utils/fetcher';

export function useDocumentData(user, invoiceId) {
  const { data, error } = useSWR(
    user ? [`/api/invoice/${invoiceId}`, user.token] : null,
    fetcher,
    { refreshInterval: 2000 }
  );

  if (data) {
    data.invoice.id = invoiceId;
  }

  return {
    data,
    loading: !error && !data,
    error,
  };
}

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
