import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useAuth } from '../context/AuthContext';
import LoginIcon from '../components/ui/LoginIcon';
import SignUpIcon from '../components/ui/SignUpIcon';

export default function Home() {
  const router = useRouter();

  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      router.push('/invoices');
    }
  }, [router, user]);

  return (
    <div className='max-w-xl px-6 py-12 mx-auto md:p-20 lg:p-0 lg:my-auto md:max-w-3xl lg:max-w-4xl'>
      <div className='grid gap-8 p-6 text-base bg-white rounded-lg dark:bg-slate-900 lg:grid-cols-2 md:gap-12'>
        <div className='space-y-4'>
          <h2 className='font-bold'>About this app</h2>
          <p>
            This full stack web application is a{' '}
            <a
              href='https://www.frontendmentor.io/challenges/invoice-app-i7KaLTQjl'
              className='text-blue-900 border-b border-blue-900 dark:text-blue-400 dark:border-blue-400'
            >
              challenge on Frontendmentor.io
            </a>
            . It allows a user to create, read, update, and delete invoices.
          </p>
          <p>
            The layout and design system is provided with a Figma file from
            Frontendmentor, and the goal is to create a fully functional app
            using any tech stack.
          </p>
          <p>
            As an additonal challenge, I decided to integrate Firebase for both
            user authentication and the Firestore NoSQL database for invoice
            storage.
          </p>
        </div>
        <div className='space-y-4'>
          <h2 className='font-bold'>App features</h2>
          <p>
            Invoices are populated with client information, creation and due
            dates, project description, and a list of items with quantities and
            totals.
          </p>
          <p>
            New user data is seeded with 7 mock invoices, and any changes or
            additions persist. Users will receive form validations (Formik &
            Yup) when filling out an invoice. Invoices can also be partially
            filled out and saved as drafts.
          </p>
          <p>The design is responsive and has dark/light mode support.</p>
        </div>
        <div className='space-y-4'>
          <h2 className='font-bold'>Technologies used</h2>
          <ul className='space-y-4'>
            <li>
              <a href='https://reactjs.org/'>
                <div className='flex justify-between items-center bg-gray-200 dark:bg-gray-800 px-4 py-2.5 border rounded-lg dark:border-0'>
                  <span className='text-blue-900 border-b border-blue-900 dark:text-blue-400 dark:border-blue-400'>
                    React
                  </span>
                  <Image
                    src='/assets/icon-arrow-right.svg'
                    alt='navigation arrow'
                    width='7px'
                    height='10px'
                  />
                </div>
              </a>
            </li>
            <li>
              <a href='https://nextjs.org'>
                <div className='flex justify-between items-center bg-gray-200 dark:bg-gray-800 px-4 py-2.5 border rounded-lg dark:border-0'>
                  <span className='text-blue-900 border-b border-blue-900 dark:text-blue-400 dark:border-blue-400'>
                    Next.js
                  </span>
                  <Image
                    src='/assets/icon-arrow-right.svg'
                    alt='navigation arrow'
                    width='7px'
                    height='10px'
                  />
                </div>
              </a>
            </li>
            <li>
              <a href='https://tailwindcss.com/'>
                <div className='flex justify-between items-center bg-gray-200 dark:bg-gray-800 px-4 py-2.5 border rounded-lg dark:border-0'>
                  <span className='text-blue-900 border-b border-blue-900 dark:text-blue-400 dark:border-blue-400'>
                    Tailwind CSS
                  </span>
                  <Image
                    src='/assets/icon-arrow-right.svg'
                    alt='navigation arrow'
                    width='7px'
                    height='10px'
                  />
                </div>
              </a>
            </li>
            <li>
              <a href='https://firebase.google.com/'>
                <div className='flex justify-between items-center bg-gray-200 dark:bg-gray-800 px-4 py-2.5 border rounded-lg dark:border-0'>
                  <span className='text-blue-900 border-b border-blue-900 dark:text-blue-400 dark:border-blue-400'>
                    Firebase (Auth, Firestore, and Functions)
                  </span>
                  <Image
                    src='/assets/icon-arrow-right.svg'
                    alt='navigation arrow'
                    width='7px'
                    height='10px'
                  />
                </div>
              </a>
            </li>
          </ul>
        </div>
        {!user && (
          <div className='space-y-4'>
            <h2 className='font-bold'>Ready to get started?</h2>
            <div className='flex flex-col gap-8'>
              <p>
                Register a new account or sign in to your existing account below
              </p>
              <div>
                <Link href='/signup'>
                  <a>
                    <div className='flex items-center justify-center gap-2 px-6 py-4 rounded-full md:gap-4 bg-violet-500 hover:bg-violet-400'>
                      <span className='font-bold text-white'>Sign Up</span>
                      <SignUpIcon className='w-6 h-6 fill-current text-emerald-400' />
                    </div>
                  </a>
                </Link>
              </div>
              <div>
                <Link href='/signin'>
                  <a>
                    <div className='flex items-center justify-center gap-2 px-6 py-4 rounded-full md:gap-4 bg-violet-500 hover:bg-violet-400'>
                      <span className='font-bold text-white'>Sign In</span>
                      <LoginIcon className='w-6 h-6 fill-current text-emerald-400' />
                    </div>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
