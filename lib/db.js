import { doc, serverTimestamp, setDoc } from 'firebase/firestore';

import { db } from './firebase';
import { formatCapitalize } from '../utils';

// create user doc
export const createFirestoreUser = async (user, providerId, email) => {
  return await setDoc(
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
