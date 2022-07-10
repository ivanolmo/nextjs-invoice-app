import { doc, deleteDoc, setDoc, serverTimestamp } from 'firebase/firestore';

import { db } from './firebase';
import { formatCapitalize } from '../utils/utils';

export const handleCreateUser = async (user, providerId, email) => {
  try {
    await setDoc(
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
  } catch (error) {
    console.log(error);
  }
};

export const handleDeleteUser = async (uid) => {
  // TODO only deletes user doc, not the subcollection of invoices. create cloud function to handle deletes
  try {
    await deleteDoc(doc(db, 'users', uid));
  } catch (error) {
    console.log(error);
  }
};
