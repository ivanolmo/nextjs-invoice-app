import {
  useCollectionData,
  useDocumentData,
} from 'react-firebase-hooks/firestore';

export function useCollectionDataSSR(ref, options) {
  const [data, loading, error] = useCollectionData(ref, options);

  if (options?.startsWith && loading) {
    return [options.startsWith, loading, error];
  } else {
    return [data, loading, error];
  }
}

export function useDocumentDataSSR(ref, options) {
  const [data, loading, error] = useDocumentData(ref, options);

  if (options?.startsWith && loading) {
    return [options.startsWith, loading, error];
  } else {
    return [data, loading, error];
  }
}
