import { useContext } from 'react';
import Image from 'next/image';

import Button from '../ui/Button';
import FilterButton from '../ui/FilterButton';
import InvoiceContext from '../../store/context';

export default function UtilityHeader({ invoiceCount }) {
  const { setShowAddInvoiceForm } = useContext(InvoiceContext);

  return (
    <div className='flex justify-between items-center'>
      <div>
        <h1 className='text-xl font-bold tracking-tight'>Invoices</h1>
        <h3 className='text-six text-xs tracking-tight'>
          {invoiceCount ? invoiceCount : 'No'} Invoices
        </h3>
      </div>
      <div className='flex justify-between items-center gap-4'>
        <FilterButton />
        <Button
          containerClasses='bg-one hover:bg-two pr-3.5 pl-1.5 gap-2'
          textClasses='text-eleven text-sm'
          buttonText={
            <>
              <span className='md:hidden'>New</span>
              <span className='hidden md:block'>New Invoice</span>
            </>
          }
          icon={
            <Image
              src='/assets/icon-plus.svg'
              alt='add invoice'
              width={10}
              height={10}
            />
          }
          onClick={() => setShowAddInvoiceForm(true)}
        />
      </div>
    </div>
  );
}
