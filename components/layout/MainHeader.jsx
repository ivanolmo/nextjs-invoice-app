import { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from 'next-themes';

import InvoiceContext from '../../context/InvoiceContext';

export default function MainHeader() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const { clearAll } = useContext(InvoiceContext);

  useEffect(() => setMounted(true), []);

  return (
    <header className='flex lg:flex-col justify-between items-center bg-slate-700 dark:bg-slate-900 lg:rounded-r-3xl lg:h-screen'>
      <Link href='/'>
        <a onClick={() => clearAll()}>
          <div className='relative bg-violet-500 p-6 md:p-7 lg:p-8 leading-zero rounded-r-3xl'>
            <div className='absolute top-1/2 bottom-0 left-0 right-0 bg-violet-400 rounded-tl-3xl rounded-br-3xl'></div>
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
      <div className='flex lg:flex-col lg:gap-7 items-center leading-zero'>
        <div
          className='mr-6 lg:m-0 cursor-pointer w-5 h-5'
          onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
        >
          {resolvedTheme === 'light' ? (
            <Image
              src='/assets/icon-moon.svg'
              alt='theme switcher'
              width='20px'
              height='20px'
              layout='responsive'
            />
          ) : (
            <Image
              src='/assets/icon-sun.svg'
              alt='theme switcher'
              width='20px'
              height='20px'
              layout='responsive'
            />
          )}
        </div>
        <div className='px-6 py-5 md:py-6 lg:px-8 lg:py-6 border-l lg:border-l-0 lg:border-t-2 border-slate-600'>
          <div className='rounded-full overflow-hidden w-8 h-8 lg:w-10 lg:h-10'>
            <Image
              src='/assets/image-avatar.jpg'
              alt='user avatar'
              width='32px'
              height='32px'
              layout='responsive'
            />
          </div>
        </div>
      </div>
    </header>
  );
}
