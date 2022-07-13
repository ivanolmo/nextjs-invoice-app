import { useContext } from 'react';

import InvoiceContext from '../../context/InvoiceContext';
import AddIcon from '../ui/AddIcon';
import Button from '../ui/Button';
import FilterButton from '../ui/FilterButton';
import LoadingSpinner from '../ui/LoadingSpinner';

export default function UtilityHeader({ invoiceCount, loading, setFilters }) {
  const { setShowAddInvoiceForm } = useContext(InvoiceContext);

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-col gap-1'>
        <span className='text-xl font-bold tracking-tight md:text-3xl lg:text-4xl dark:text-white'>
          Invoices
        </span>
        {loading ? (
          <LoadingSpinner size={12} />
        ) : (
          <>
            <span className='text-xs tracking-tight text-slate-400 dark:text-indigo-100 md:hidden'>
              {invoiceCount ? invoiceCount : 'No'} invoices
            </span>
            <span className='hidden text-xs tracking-tight text-slate-400 dark:text-indigo-100 lg:text-sm md:block'>
              There are {invoiceCount ? `${invoiceCount} total` : 'no'} invoices
            </span>
          </>
        )}
      </div>
      <div className='flex items-center justify-between gap-5 md:gap-10'>
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
