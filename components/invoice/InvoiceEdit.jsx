import { useEffect, useContext, useRef } from 'react';
import Image from 'next/image';

import InvoiceContext from '../../store/context';
import InvoiceForm from './InvoiceForm';
import Button from '../ui/Button';

export default function InvoiceEdit() {
  const formRef = useRef(null);
  const { setShowEditInvoiceForm, currentInvoice } = useContext(InvoiceContext);

  useEffect(() => {
    if (currentInvoice) {
      formRef.current.setValues(currentInvoice);
    }
  }, [currentInvoice]);

  return (
    <div className='absolute bg-white pt-8 px-6 inset-0'>
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
          onClick={() => {}} //TODO implement update doc in firebase
        />
      </div>
    </div>
  );
}
