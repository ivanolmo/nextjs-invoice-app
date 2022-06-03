import { useContext, useRef } from 'react';
import Image from 'next/image';
import { toast } from 'react-toastify';

import InvoiceContext from '../../store/context';
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
    <div className='absolute top-[4.625rem] bg-white pt-8 px-6 inset-0'>
      <div
        className='cursor-pointer'
        onClick={() => setShowAddInvoiceForm(false)}
      >
        <Image
          src='/assets/icon-arrow-left.svg'
          alt='left arrow'
          width={6}
          height={8}
        />
        <span className='text-xs tracking-tight font-bold ml-6'>Go Back</span>
      </div>

      <h1 className='text-xl font-bold mt-6'>New Invoice</h1>

      <div className='mt-6'>
        <InvoiceForm onSubmit={() => onSubmit()} formRef={formRef} />
      </div>

      <div className='flex justify-center items-center gap-2 bg-white mt-20 -mx-6 py-5 shadow-[0_-30px_30px_12px_rgba(0,0,0,0.1)]'>
        <Button
          containerClasses='bg-buttonLight hover:bg-five px-4'
          textClasses='text-seven'
          buttonText='Discard'
          onClick={() => setShowAddInvoiceForm(false)}
        />
        <Button
          containerClasses='bg-[#373b53] hover:bg-eight px-4'
          textClasses='text-six'
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
  );
}
