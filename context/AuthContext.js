import { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  deleteUser,
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';

import { auth } from '../lib/firebase';
import { createFirestoreUser, deleteFirestoreUser } from '../lib/db';
import { formatCapitalize } from '../utils';
import { toast } from 'react-toastify';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL ?? null,
          providerId:
            formatCapitalize(user.providerData[0].providerId.split('.')[0]) ??
            'Email and password',
          token: user.accessToken,
        });
      } else {
        setUser(null);
      }
      setUserLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // auth functions
  const registerEmailPassword = async (name, email, password) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (name) {
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
      }

      await createFirestoreUser(response.user, response.providerId);

      return response;
    } catch (error) {
      toast.error(
        'There was an error creating your account, please try again!'
      );
    }
  };

  const signInEmailPassword = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = async () => {
    try {
      const response = await signInWithPopup(auth, new GoogleAuthProvider());

      await createFirestoreUser(response.user, response.providerId);
    } catch (error) {
      toast.error(
        'There was an error signing in with Google, please try again!'
      );
    }
  };

  const signInWithGithub = async () => {
    try {
      const response = await signInWithPopup(auth, new GithubAuthProvider());

      const email = response.user.providerData[0].email;

      await createFirestoreUser(response.user, response.providerId, email);
    } catch (error) {
      toast.error(
        'There was an error signing in with Github, please try again!'
      );
    }
  };

  const logOut = async () => {
    setUser(null);
    await signOut(auth);
  };

  const deleteAuthUser = async () => {
    try {
      await deleteFirestoreUser(auth.currentUser.uid);
      await deleteUser(auth.currentUser);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        deleteAuthUser,
        logOut,
        registerEmailPassword,
        signInEmailPassword,
        signInWithGithub,
        signInWithGoogle,
        user,
        userLoading,
      }}
    >
      {userLoading ? null : children}
    </AuthContext.Provider>
  );
};
