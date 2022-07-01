import { useContext } from 'react';
import Image from 'next/image';

import InvoiceContext from '../../context/InvoiceContext';
import Button from '../ui/Button';
import FilterButton from '../ui/FilterButton';
import AddIcon from '../ui/AddIcon';

export default function UtilityHeader({ invoiceCount, setFilters }) {
  const { setShowAddInvoiceForm } = useContext(InvoiceContext);

  return (
    <div className='flex justify-between items-center'>
      <div className='flex flex-col gap-1'>
        <span className='text-xl md:text-3xl lg:text-4xl font-bold tracking-tight dark:text-white'>
          Invoices
        </span>
        <span className='text-slate-400 dark:text-indigo-100 text-xs tracking-tight md:hidden'>
          {invoiceCount ? invoiceCount : 'No'} invoices
        </span>
        <span className='text-slate-400 dark:text-indigo-100 text-xs lg:text-sm tracking-tight hidden md:block'>
          There are {invoiceCount ? `${invoiceCount} total` : 'no'} invoices
        </span>
      </div>
      <div className='flex justify-between items-center gap-5 md:gap-10'>
        <FilterButton setFilters={setFilters} />
        <Button
          containerClasses='group bg-violet-500 hover:bg-violet-400 pr-3.5 lg:pr-4 pl-1.5 lg:pl-2 gap-2 lg:gap-4'
          textClasses='text-violet-50'
          buttonText={
            <>
              <span className='md:hidden'>New</span>
              <span className='hidden md:block'>New Invoice</span>
            </>
          }
          icon={
            <div className='bg-[white] p-[11px] flex rounded-full'>
              <AddIcon className='fill-current text-violet-500 group-hover:text-violet-400' />
            </div>
          }
          onClick={() => setShowAddInvoiceForm(true)}
        />
      </div>
    </div>
  );
}
