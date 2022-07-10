import { useContext, useRef } from 'react';
import Image from 'next/image';
import { toast } from 'react-toastify';

import { useAuth } from '../../context/AuthContext';
import InvoiceContext from '../../context/InvoiceContext';
import InvoiceForm from './InvoiceForm';
import Button from '../ui/Button';

export default function InvoiceAdd() {
  const { user } = useAuth();

  const { setShowAddInvoiceForm } = useContext(InvoiceContext);

  const formRef = useRef(null);

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
    try {
      await toast.promise(
        fetch('/api/invoices/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            token: user.token,
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className='hidden md:block absolute inset-0 md:top-[84px] lg:top-0 lg:left-[104px] bg-gradient'></div>
      <div className='row-start-1 col-start-1 md:w-[616px] bg-white dark:bg-gray-800 p-6 pb-0 md:p-14 md:pb-8 md:rounded-r-2xl z-50 md:justify-self-start'>
        <div
          className='group flex items-center cursor-pointer w-fit md:hidden'
          onClick={() => setShowAddInvoiceForm(false)}
        >
          <div className='w-2 h-3'>
            <Image
              src='/assets/icon-arrow-left.svg'
              alt='left arrow'
              width='7px'
              height='10px'
              layout='responsive'
            />
          </div>
          <span className='text-xs dark:text-white group-hover:text-indigo-400 dark:group-hover:text-slate-400 tracking-tight font-bold ml-6'>
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

        <div className='flex justify-center md:justify-between items-center gap-2 bg-white dark:bg-slate-900 md:dark:bg-gray-800 mt-20 md:mt-12 -mx-6 md:mx-0 py-5 md:p-0 shadow-[0_-30px_30px_12px_rgba(0,0,0,0.1)] md:shadow-none'>
          <Button
            containerClasses='bg-gray-200 hover:bg-indigo-100 dark:bg-violet-50 dark:hover:bg-slate-800 px-4'
            textClasses='text-indigo-400 dark:text-indigo-400 dark:hover:text-slate-400'
            buttonText='Discard'
            onClick={() => setShowAddInvoiceForm(false)}
          />
          <div className='flex gap-2'>
            <Button
              containerClasses='bg-slate-700 hover:bg-gray-900 dark:hover:bg-slate-700/50 px-4'
              textClasses='text-xs text-slate-400 dark:text-indigo-100'
              buttonText='Save as Draft'
              onClick={() => handleSubmit('draft')}
            />
            <Button
              containerClasses='bg-violet-500 hover:bg-violet-400 px-4'
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
