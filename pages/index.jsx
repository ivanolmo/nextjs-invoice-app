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
            This full stack web application allows users to create, read,
            update, and delete invoices. It&apos;s designed to be user-friendly
            and efficient in managing invoices.
          </p>
          <p>
            The layout and design system is modern and intuitive, aiming to
            provide a seamless user experience. The app is fully functional and
            is built with a versatile tech stack to ensure high performance and
            reliability.
          </p>
          <p>
            As an advanced feature, the app integrates Firebase for both user
            authentication and the Firestore NoSQL database for invoice storage.
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
              <Link href='https://react.dev/'>
                <a>
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
              </Link>
            </li>
            <li>
              <Link href='https://nextjs.org'>
                <a>
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
              </Link>
            </li>
            <li>
              <Link href='https://tailwindcss.com/'>
                <a>
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
              </Link>
            </li>
            <li>
              <Link href='https://firebase.google.com/'>
                <a>
                  <div className='flex justify-between items-center bg-gray-200 dark:bg-gray-800 px-4 py-2.5 border rounded-lg dark:border-0'>
                    <p className='text-blue-900 dark:text-blue-400'>
                      <span className='border-b border-blue-900 dark:border-blue-400'>
                        Firebase (Auth, Firestore, and Functions)
                      </span>
                    </p>
                    <Image
                      src='/assets/icon-arrow-right.svg'
                      alt='navigation arrow'
                      width='7px'
                      height='10px'
                    />
                  </div>
                </a>
              </Link>
            </li>
          </ul>
        </div>
        <div className='space-y-4'>
          <h2 className='font-bold'>Ready to get started?</h2>
          <div className='flex flex-col gap-8'>
            <div className='space-y-4'>
              <p>
                If you&apos;d like to explore the app without creating an
                account, feel free to use our test account. The credentials are
                as follows:
              </p>
              <p>Email: test@test.com</p>
              <p>Password: password</p>
            </div>
            <p>
              Register a new account or sign in to your existing account below:
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
      </div>
    </div>
  );
}
