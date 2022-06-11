import { useEffect, useContext, useRef, useState } from 'react';
import Image from 'next/image';

import InvoiceContext from '../../store/context';
import InvoiceForm from './InvoiceForm';
import Button from '../ui/Button';
import { toast } from 'react-toastify';

export default function InvoiceEdit({ setInvoice }) {
  const { setShowEditInvoiceForm, currentInvoice } = useContext(InvoiceContext);

  const formRef = useRef(null);

  const handleSubmit = () => {
    formRef.current.handleSubmit();
  };

  // handles closing edit form and setting current invoice to updated ...
  // ... invoice after form submit
  // setInvoice updates parent InvoicePage component ([id].jsx page)
  const handleUpdate = (updatedInvoice) => {
    setShowEditInvoiceForm(false);
    setInvoice(updatedInvoice);
  };

  const onSubmit = async () => {
    const res = await toast.promise(
      fetch(`/api/invoice/${currentInvoice.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formRef.current.values }),
      }),
      {
        pending: 'Invoice is being updated...',
        success: 'Invoice has been successfully updated!',
        error: 'There was an error updating this invoice',
      }
    );
    const data = await res.json();

    handleUpdate(data.updatedInvoice);
  };

  useEffect(() => {
    if (currentInvoice) {
      formRef.current.setValues(currentInvoice);
    }
  }, [currentInvoice]);

  return (
    <div className='absolute top-[4.625rem] bg-white pt-8 px-6 inset-0 h-max'>
      <div
        className='cursor-pointer'
        onClick={() => setShowEditInvoiceForm(false)}
      >
        <Image
          src='/assets/icon-arrow-left.svg'
          alt='left arrow'
          width={6}
          height={8}
        />
        <span className='text-xs tracking-tight font-bold ml-6'>Go Back</span>
      </div>

      <h1 className='text-xl font-bold mt-6'>
        Edit <span className='text-six'>#</span>
        {currentInvoice.id}
      </h1>

      <div className='mt-6'>
        <InvoiceForm onSubmit={() => onSubmit()} formRef={formRef} />
      </div>

      <div className='flex justify-end items-center gap-2 bg-white mt-20 -mx-6 py-5 px-6 shadow-[0_-30px_30px_12px_rgba(0,0,0,0.1)]'>
        <Button
          containerClasses='bg-buttonLight hover:bg-five px-6'
          textClasses='text-seven'
          buttonText='Cancel'
          onClick={() => {
            setShowEditInvoiceForm(false);
          }}
        />
        <Button
          containerClasses='bg-one hover:bg-two px-6'
          textClasses='text-white'
          buttonText='Save Changes'
          onClick={() => handleSubmit()}
        />
      </div>
    </div>
  );
}
