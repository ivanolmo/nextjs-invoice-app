import { useContext, useEffect, useRef } from 'react';
import Image from 'next/image';
import { toast } from 'react-toastify';

import { useAuth } from '../../context/AuthContext';
import InvoiceContext from '../../context/InvoiceContext';
import InvoiceForm from './InvoiceForm';
import Button from '../ui/Button';

export default function InvoiceEdit({ invoice }) {
  const { user } = useAuth();

  const { setShowEditInvoiceForm } = useContext(InvoiceContext);

  const formRef = useRef(null);

  const handleSubmit = () => {
    formRef.current.handleSubmit();
  };

  const handleClose = () => {
    setShowEditInvoiceForm(false);
  };

  const onSubmit = async () => {
    try {
      await toast.promise(
        fetch(`/api/invoice/${invoice.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            token: user.token,
          },
          body: JSON.stringify({ ...formRef.current.values }),
        }),
        {
          pending: 'Invoice is being updated...',
          success: 'Invoice has been successfully updated!',
          error: 'There was an error updating this invoice',
        }
      );
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (invoice) {
      formRef.current.setValues(invoice);
    }
  }, [invoice]);

  return (
    <>
      <div className='hidden md:block absolute inset-0 md:top-[82px] lg:top-0 lg:left-[104px] bg-gradient'></div>
      <div className='row-start-1 col-start-1 md:w-[616px] bg-white dark:bg-gray-800 p-6 pb-0 md:p-14 md:pb-8 md:rounded-r-2xl z-50 justify-self-start'>
        <div
          className='group flex items-center cursor-pointer w-fit md:hidden'
          onClick={() => setShowEditInvoiceForm(false)}
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
            Edit <span className='text-slate-400 dark:text-slate-500'>#</span>
            {invoice.invoiceId}
          </span>
        </div>

        <div className='mt-6'>
          <InvoiceForm onSubmit={() => onSubmit()} formRef={formRef} />
        </div>

        <div className='flex justify-end items-center gap-2 bg-white dark:bg-slate-900 md:dark:bg-gray-800 mt-20 md:mt-12 -mx-6 md:mx-0 py-5 px-6 md:p-0 shadow-[0_-30px_30px_12px_rgba(0,0,0,0.1)] md:shadow-none'>
          <Button
            containerClasses='group bg-gray-200 hover:bg-indigo-100 dark:bg-slate-800 px-6'
            textClasses='text-indigo-400 dark:text-indigo-100 dark:group-hover:text-indigo-400'
            buttonText='Cancel'
            onClick={() => {
              setShowEditInvoiceForm(false);
            }}
          />
          <Button
            containerClasses='bg-violet-500 hover:bg-violet-400 px-6'
            textClasses='text-white'
            buttonText='Save Changes'
            onClick={() => handleSubmit()}
          />
        </div>
      </div>
    </>
  );
}
