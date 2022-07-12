import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';

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

export const deleteFirestoreUser = async (uid) => {
  const querySnapshot = await getDocs(collection(db, 'users', uid, 'invoices'));
  querySnapshot.docs.forEach(async (doc) => await deleteDoc(doc.ref));

  return deleteDoc(doc(db, 'users', uid));
};
