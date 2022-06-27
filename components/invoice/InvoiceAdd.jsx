import { useContext, useRef } from 'react';
import Image from 'next/image';
import { toast } from 'react-toastify';

import InvoiceContext from '../../context/InvoiceContext';
import InvoiceForm from './InvoiceForm';
import Button from '../ui/Button';

export default function InvoiceAdd() {
  const formRef = useRef(null);
  const { setShowAddInvoiceForm } = useContext(InvoiceContext);

  const handleSubmit = (status) => {
    if (status === 'draft') {
      onSubmit('draft', formRef.current.values);
    }

    if (status === 'pending') {
      formRef.current.handleSubmit();
    }
  };

  // default status is pending unless 'draft' is provided as arg
  const onSubmit = async (status = 'pending') => {
    const res = await toast.promise(
      fetch('/api/invoices/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status, ...formRef.current.values }),
      }),
      status === 'pending'
        ? {
            pending: 'Invoice is being created...',
            success: 'Invoice has been successfully created!',
            error: 'There was an error creating this invoice',
          }
        : {
            pending: 'Invoice is being saved...',
            success: 'Invoice has been successfully saved!',
            error: 'There was an error saving this invoice',
          }
    );
    setShowAddInvoiceForm(false);
  };

  return (
    <>
      <div className='hidden md:block absolute inset-0 md:top-[84px] lg:top-0 lg:left-[104px] bg-gradient'></div>
      <div className='row-start-1 col-start-1 md:w-[616px] bg-white dark:bg-twelve p-6 pb-0 md:p-14 md:pb-8 md:rounded-r-2xl z-50 md:justify-self-start'>
        <div
          className='cursor-pointer w-fit md:hidden'
          onClick={() => setShowAddInvoiceForm(false)}
        >
          <Image
            src='/assets/icon-arrow-left.svg'
            alt='left arrow'
            width='7px'
            height='10px'
          />
          <span className='text-xs dark:text-white hover:text-seven dark:hover:text-six tracking-tight font-bold ml-6'>
            Go Back
          </span>
        </div>

        <div className='mt-6 md:mt-0'>
          <span className='text-2xl font-bold dark:text-white'>
            New Invoice
          </span>
        </div>

        <div className='mt-6'>
          <InvoiceForm onSubmit={() => onSubmit()} formRef={formRef} />
        </div>

        <div className='flex justify-center md:justify-between items-center gap-2 bg-white dark:bg-three md:dark:bg-twelve mt-20 md:mt-12 -mx-6 md:mx-0 py-5 md:p-0 shadow-[0_-30px_30px_12px_rgba(0,0,0,0.1)] md:shadow-none'>
          <Button
            containerClasses='bg-buttonLight hover:bg-five dark:bg-eleven dark:hover:bg-four px-4'
            textClasses='text-seven dark:text-seven dark:hover:text-six'
            buttonText='Discard'
            onClick={() => setShowAddInvoiceForm(false)}
          />
          <div className='flex gap-2'>
            <Button
              containerClasses='bg-[#373b53] hover:bg-eight dark:hover:bg-[#373b53]/50 px-4'
              textClasses='text-xs text-six dark:text-five'
              buttonText='Save as Draft'
              onClick={() => handleSubmit('draft')}
            />
            <Button
              containerClasses='bg-one hover:bg-two px-4'
              textClasses='text-white'
              buttonText='Save & Send'
              onClick={() => handleSubmit('pending')}
            />
          </div>
        </div>
      </div>
    </>
  );
}
