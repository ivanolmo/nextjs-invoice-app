import { useRouter } from 'next/router';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { Form, Formik } from 'formik';
import { toast } from 'react-toastify';

import GoogleAuth from '../components/authProviders/GoogleAuth';
import Input from '../components/ui/Input';
import { auth, db } from '../lib/firebase';
import { signUpValidationSchema } from '../utils/validationSchemas';

export default function SignUp() {
  const router = useRouter();

  const initialValues = {
    name: '',
    email: '',
    password: '',
  };

  const onSubmit = async ({ name, email, password }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      updateProfile(auth.currentUser, {
        displayName: name,
      });

      const userData = { name, email, timestamp: serverTimestamp() };

      await setDoc(doc(db, 'users', user.uid), userData);

      router.push('/');
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={signUpValidationSchema}
        onSubmit={async (values) => {
          onSubmit(values);
        }}
      >
        {({ values, errors, isSubmitting }) => {
          return (
            <>
              <Form className='p-6'>
                <Input label='Name' name='name' type='text' />
                <Input label='Email' name='email' type='email' />
                <Input label='Password' name='password' type='password' />
                <button type='submit' disabled={isSubmitting}>
                  Submit
                </button>
              </Form>
              <div className='mt-20'>
                <GoogleAuth />
              </div>
            </>
          );
        }}
      </Formik>
    </div>
  );
}
