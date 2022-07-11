import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Form, Formik } from 'formik';
import { toast } from 'react-toastify';

import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { signInValidationSchema } from '../utils/validationSchemas';

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const { user, signInEmailPassword, signInWithGoogle, signInWithGithub } =
    useAuth();

  const router = useRouter();

  const initialValues = {
    email: '',
    password: '',
  };

  useEffect(() => {
    if (user) {
      router.push('/invoices');
    }
  }, [router, user]);

  const onSubmit = async ({ email, password }, resetForm) => {
    try {
      await signInEmailPassword(email, password);

      router.push('/invoices');
    } catch (error) {
      resetForm();
      toast.error('Please check your credentials and try again!');
    }
  };

  return (
    <div className='grid grid-cols-1 auto-rows-min gap-y-8 md:gap-y-12 justify-items-center lg:content-center p-6 md:p-8 w-full'>
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={signInValidationSchema}
        onSubmit={async (values, { resetForm }) => {
          onSubmit(values, resetForm);
        }}
      >
        {({ errors, isSubmitting, touched }) => {
          return (
            <div className='w-full max-w-3xl'>
              <div className='my-6'>
                <span className='text-xl font-bold'>Sign In</span>
              </div>
              <Form className='grid grid-cols-1 md:grid-cols-2 md:gap-x-8'>
                <Input
                  label='Email'
                  name='email'
                  type='email'
                  showError={errors.email && touched.email}
                  classes='md:col-span-1'
                />
                <Input
                  label='Password'
                  name='password'
                  type={showPassword ? 'text' : 'password'}
                  showError={errors.password && touched.password}
                  classes='md:col-span-1'
                  icon={
                    <div onClick={() => setShowPassword(!showPassword)}>
                      <Image
                        src={
                          showPassword
                            ? '/assets/eye.svg'
                            : '/assets/closed-eye.svg'
                        }
                        alt='toggle show password'
                        width='24px'
                        height='24px'
                      />
                    </div>
                  }
                />
                <Button
                  type='submit'
                  disabled={isSubmitting}
                  containerClasses='md:col-span-2 bg-violet-500 hover:bg-violet-400 mt-10'
                  textClasses='text-white'
                  buttonText='Sign In'
                />
              </Form>
            </div>
          );
        }}
      </Formik>

      <div className='w-full max-w-3xl'>
        <div className='grid grid-cols-2 gap-6'>
          <div className='col-span-2 flex justify-center gap-4 place-self-center w-full'>
            <div className='my-auto border-t border-indigo-400 dark:border-indigo-100 flex-auto'></div>
            <div>
              <span className='text-indigo-400 dark:text-indigo-100'>or</span>
            </div>
            <div className='my-auto border-t border-indigo-400 dark:border-indigo-100 flex-auto'></div>
          </div>
          <Button
            onClick={() => signInWithGoogle()}
            containerClasses='col-span-2 md:col-span-1 bg-violet-500 hover:bg-violet-400 gap-6'
            textClasses='text-white'
            buttonText='Sign in with Google'
            icon={
              <Image
                src='/assets/google.svg'
                alt='google'
                width='24px'
                height='24px'
              />
            }
          />
          <Button
            onClick={() => signInWithGithub()}
            containerClasses='col-span-2 md:col-span-1 bg-violet-500 hover:bg-violet-400 gap-6'
            textClasses='text-white'
            buttonText='Sign in with Github'
            icon={
              <Image
                src='/assets/github.svg'
                alt='github'
                width='24px'
                height='24px'
              />
            }
          />
          <div className='col-span-2 place-self-center mt-6'>
            <span>
              Don&apos;t have an account?{' '}
              <Link href='/signup'>
                <a className='text-blue-900 dark:text-blue-400 border-b border-blue-900 dark:border-blue-400'>
                  Sign Up
                </a>
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
