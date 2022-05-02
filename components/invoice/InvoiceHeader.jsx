import React from 'react';
import { formatStatus, classNames } from '../../lib/formatUtils';

export default function InvoiceHeader({ status }) {
  return (
    <header className='flex justify-between items-center bg-white text-xs tracking-tight mt-8 p-6 rounded-md'>
      <h3 className='text-seven'>Status</h3>
      <div
        className={classNames(
          status === 'paid'
            ? 'text-green bg-green/10'
            : status === 'pending'
            ? 'text-orange bg-orange/10'
            : 'text-darkGray bg-darkGray/10',
          'p-3 font-bold rounded-md w-[6.5rem] text-center'
        )}
      >
        <span className='bg-current inline-block mr-2 w-2 h-2 rounded-full'></span>
        {formatStatus(status)}
      </div>
    </header>
  );
}
