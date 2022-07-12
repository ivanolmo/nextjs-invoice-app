import { useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from 'next-themes';

import { useAuth } from '../../context/AuthContext';
import InvoiceContext from '../../context/InvoiceContext';
import LoginIcon from '../ui/LoginIcon';
import UserIcon from '../ui/UserIcon';

export default function MainHeader() {
  const { clearAll } = useContext(InvoiceContext);
  const { resolvedTheme, setTheme } = useTheme();

  const { user } = useAuth();

  return (
    <header className='flex items-center justify-between lg:flex-col bg-slate-700 dark:bg-slate-900 lg:rounded-r-3xl lg:h-screen'>
      <Link href='/invoices'>
        <a onClick={() => clearAll()}>
          <div className='relative p-6 bg-violet-500 md:p-7 lg:p-8 leading-zero rounded-r-3xl'>
            <div className='absolute bottom-0 left-0 right-0 top-1/2 bg-violet-400 rounded-tl-3xl rounded-br-3xl'></div>
            <div className='w-7 h-7 lg:w-10 lg:h-10'>
              <Image
                src='/assets/logo.svg'
                alt='main logo'
                width='28px'
                height='26px'
                layout='responsive'
              />
            </div>
          </div>
        </a>
      </Link>
      <div className='flex items-center lg:flex-col lg:gap-7 leading-zero'>
        <div
          className='w-8 h-8 mr-6 cursor-pointer lg:m-0 lg:w-10 lg:h-10'
          onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
        >
          {resolvedTheme === 'light' ? (
            <Image
              src='/assets/dark-mode.svg'
              alt='theme switcher'
              width='32px'
              height='32px'
              layout='responsive'
            />
          ) : (
            <Image
              src='/assets/light-mode.svg'
              alt='theme switcher'
              width='32px'
              height='32px'
              layout='responsive'
            />
          )}
        </div>
        <div className='px-6 py-5 border-l md:py-6 lg:px-8 lg:py-6 lg:border-l-0 lg:border-t-2 border-slate-600'>
          <div
            className='w-8 h-8 overflow-hidden rounded-full lg:w-10 lg:h-10'
            id='login'
          >
            {!user ? (
              <Link href='/signin'>
                <a>
                  <LoginIcon className='w-8 h-8 fill-current lg:w-10 lg:h-10 text-emerald-400' />
                </a>
              </Link>
            ) : (
              <Link href='/profile'>
                <a aria-label='User Profile'>
                  {user && !user.photoURL ? (
                    <UserIcon className='w-8 h-8 lg:w-10 lg:h-10' />
                  ) : (
                    user && (
                      <Image
                        src={user?.photoURL}
                        alt='user avatar'
                        width='32px'
                        height='32px'
                        layout='responsive'
                      />
                    )
                  )}
                </a>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
