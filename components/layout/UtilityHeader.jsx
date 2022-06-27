import { useContext } from 'react';
import Image from 'next/image';

import InvoiceContext from '../../context/InvoiceContext';
import Button from '../ui/Button';
import FilterButton from '../ui/FilterButton';

export default function UtilityHeader({ invoiceCount, setFilters }) {
  const { setShowAddInvoiceForm } = useContext(InvoiceContext);

  return (
    <div className='flex justify-between items-center'>
      <div className='flex flex-col gap-1'>
        <span className='text-xl md:text-3xl lg:text-4xl font-bold tracking-tight dark:text-white'>
          Invoices
        </span>
        <span className='text-six dark:text-five text-xs tracking-tight md:hidden'>
          {invoiceCount ? invoiceCount : 'No'} invoices
        </span>
        <span className='text-six dark:text-five text-xs lg:text-sm tracking-tight hidden md:block'>
          There are {invoiceCount ? `${invoiceCount} total` : 'no'} invoices
        </span>
      </div>
      <div className='flex justify-between items-center gap-5 md:gap-10'>
        <FilterButton setFilters={setFilters} />
        <Button
          containerClasses='bg-one hover:bg-two pr-3.5 lg:pr-4 pl-1.5 lg:pl-2 gap-2 lg:gap-4'
          textClasses='text-eleven'
          buttonText={
            <>
              <span className='md:hidden'>New</span>
              <span className='hidden md:block'>New Invoice</span>
            </>
          }
          icon={
            <Image
              src='/assets/icon-plus.svg'
              alt='add icon'
              width='11px'
              height='11px'
            />
          }
          onClick={() => setShowAddInvoiceForm(true)}
        />
      </div>
    </div>
  );
}
