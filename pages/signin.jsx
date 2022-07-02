import { useRouter } from 'next/router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Form, Formik } from 'formik';
import { toast } from 'react-toastify';

import GoogleAuth from '../components/authProviders/GoogleAuth';
import Input from '../components/ui/Input';
import { auth } from '../lib/firebase';
import { signInValidationSchema } from '../utils/validationSchemas';

export default function SignIn() {
  const router = useRouter();

  const initialValues = {
    email: '',
    password: '',
  };

  const onSubmit = async ({ email, password }, resetForm) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (userCredential.user) {
        router.push('/');
      }
    } catch (error) {
      console.log(error);
      resetForm();
      toast.error('Please check your credentials and try again!');
    }
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={signInValidationSchema}
        onSubmit={async (values, { resetForm }) => {
          onSubmit(values, resetForm);
        }}
      >
        {({ values, errors, isSubmitting }) => {
          return (
            <>
              <Form className='p-6'>
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
