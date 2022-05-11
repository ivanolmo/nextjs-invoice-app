import { useContext } from 'react';
import Image from 'next/image';

import InvoiceContext from '../../store/context';

export default function NewInvoiceBtn() {
  const { setShowInvoiceForm } = useContext(InvoiceContext);
  return (
    <div
      onClick={() => setShowInvoiceForm(true)}
      className='bg-one hover:bg-two text-eleven flex items-center rounded-full cursor-pointer'
    >
      <div className='flex ml-1.5 -mr-2 p-3 bg-[white] rounded-full'>
        <Image
          src='/assets/icon-plus.svg'
          alt='plus icon on button'
          width={10}
          height={10}
        />
      </div>
      {/* check for window size and change button text on tablet size and up */}
      <span className='my-3 mx-4 text-sm font-bold leading-tight'>New</span>
    </div>
  );
}
