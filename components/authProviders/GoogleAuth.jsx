import { useRouter } from 'next/router';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';

import { auth, db } from '../../lib/firebase';
import Image from 'next/image';

export default function GoogleAuth() {
  const router = useRouter();

  const onClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // TODO maybe move doc creation logic to separate file in lib
      const docRef = doc(db, 'users', user.uid);
      const checkDoc = await getDoc(docRef);

      if (!checkDoc.exists()) {
        await setDoc(doc(db, 'users', user.uid), {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }

      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='flex flex-col justify-center items-center gap-4'>
      <p>Sign {router.pathname === '/signin' ? 'In' : 'Up'} With</p>
      <button className='' onClick={onClick}>
        <Image
          src='/assets/google.svg'
          alt='google'
          width='30px'
          height='30px'
        />
      </button>
    </div>
  );
}
