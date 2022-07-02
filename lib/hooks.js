import { useCollection, useDocument } from 'react-firebase-hooks/firestore';

export function useCollectionData(ref, options) {
  const [value, loading, error] = useCollection(ref, options);

  const data = [];

  value?.forEach((doc) => {
    data.push({
      id: doc.id,
      ...doc.data(),
    });
  });

  if (options?.startsWith && loading) {
    return [options.startsWith, loading, error];
  } else {
    return [data, loading, error];
  }
}

export function useDocumentDataSSR(ref, options) {
  const [value, loading, error] = useDocument(ref, options);

  let data;

  if (value && value.exists()) {
    data = value.data();
    data.id = value.id;
  }

  if (options?.startsWith && loading) {
    return [options.startsWith, loading, error];
  } else {
    return [data, loading, error];
  }
}
