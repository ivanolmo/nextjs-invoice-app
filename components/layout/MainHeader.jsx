import { useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import InvoiceContext from '../../store/context';

export default function MainHeader() {
  const { setShowInvoiceForm } = useContext(InvoiceContext);

  return (
    <header className='flex justify-between items-center bg-[#373b53] z-50'>
      <Link href='/'>
        <a onClick={() => setShowInvoiceForm(false)}>
          <div className='bg-one p-6 leading-zero  rounded-r-3xl'>
            <Image
              src='/assets/logo.svg'
              alt='main logo'
              width={28}
              height={26}
            />
          </div>
        </a>
      </Link>
      <div className=' flex items-center leading-zero'>
        <div className='pr-6 cursor-pointer'>
          <Image
            src='/assets/icon-moon.svg'
            alt='theme switcher'
            width={20}
            height={20}
          />
        </div>
        <div className='px-6 py-5 border-l border-[#494e6e]'>
          <div className='rounded-full overflow-hidden'>
            <Image
              src='/assets/image-avatar.jpg'
              alt='user avatar'
              width={32}
              height={32}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
