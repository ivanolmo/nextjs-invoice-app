import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Form, Formik } from 'formik';
import { toast } from 'react-toastify';

import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { registerValidationSchema } from '../utils/validationSchemas';

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();

  const { user, registerEmailPassword, signInWithGoogle, signInWithGithub } =
    useAuth();

  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  useEffect(() => {
    if (user) {
      router.push('/invoices');
    }
  }, [router, user]);

  const onSubmit = async ({ name, email, password }, resetForm) => {
    try {
      const response = await registerEmailPassword(name, email, password);

      if (!response) throw new Error();

      router.push('/invoices');
    } catch (error) {
      resetForm();
      toast.error(
        'There was an error signing in with that email address or it may already be in use, please try again!'
      );
    }
  };

  return (
    <div className='grid w-full grid-cols-1 p-6 auto-rows-min gap-y-8 md:gap-y-12 justify-items-center lg:content-center md:p-8'>
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={registerValidationSchema}
        onSubmit={async (values, { resetForm }) => {
          onSubmit(values, resetForm);
        }}
      >
        {({ errors, isSubmitting, touched }) => {
          return (
            <div className='w-full max-w-3xl'>
              <div className='my-6'>
                <span className='text-xl font-bold'>Sign Up</span>
              </div>
              <Form className='grid grid-cols-1 md:grid-cols-2 md:gap-x-8'>
                <Input
                  label='Name'
                  name='name'
                  type='text'
                  placeholder='Optional'
                  classes='md:col-span-1'
                />
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
                <Input
                  label='Confirm Password'
                  name='confirmPassword'
                  type={showConfirmPassword ? 'text' : 'password'}
                  showError={errors.confirmPassword && touched.confirmPassword}
                  classes='md:col-span-1'
                  icon={
                    <div
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      <Image
                        src={
                          showConfirmPassword
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
                  buttonText='Sign Up'
                />
              </Form>
            </div>
          );
        }}
      </Formik>

      <div className='w-full max-w-3xl'>
        <div className='grid grid-cols-2 gap-6'>
          <div className='flex justify-center w-full col-span-2 gap-4 place-self-center'>
            <div className='flex-auto my-auto border-t border-indigo-400 dark:border-indigo-100'></div>
            <div>
              <span className='text-indigo-400 dark:text-indigo-100'>or</span>
            </div>
            <div className='flex-auto my-auto border-t border-indigo-400 dark:border-indigo-100'></div>
          </div>
          <Button
            onClick={() => signInWithGoogle()}
            containerClasses='col-span-2 md:col-span-1 bg-violet-500 hover:bg-violet-400 gap-6'
            buttonText='Sign up with Google'
            textClasses='text-white'
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
            buttonText='Sign up with Github'
            textClasses='text-white'
            icon={
              <Image
                src='/assets/github.svg'
                alt='github'
                width='24px'
                height='24px'
              />
            }
          />
          <div className='col-span-2 mt-6 place-self-center'>
            <span>
              Already have an account?{' '}
              <Link href='/signin'>
                <a className='text-blue-900 border-b border-blue-900 dark:text-blue-400 dark:border-blue-400'>
                  Sign In
                </a>
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
