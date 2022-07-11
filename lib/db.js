import { doc, deleteDoc, setDoc, serverTimestamp } from 'firebase/firestore';

import { db } from './firebase';
import { formatCapitalize } from '../utils';

export const createFirestoreUser = (user, providerId, email) => {
  return setDoc(
    doc(db, 'users', user.uid),
    {
      name: user?.displayName,
      email: user?.email ?? email,
      providerId:
        formatCapitalize(providerId?.split('.')[0]) ?? 'Email and password',
      timestamp: serverTimestamp(),
    },
    { merge: true }
  );
};

export const deleteFirestoreUser = (uid) => {
  return deleteDoc(doc(db, 'users', uid));
};
