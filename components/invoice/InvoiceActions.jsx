import { useContext } from 'react';

import Button from '../ui/Button';
import { classNames } from '../../lib/formatUtils';
import InvoiceContext from '../../store/context';

export default function InvoiceActions({ status }) {
  // TODO display buttons conditionally on invoice
  const { setShowInvoiceForm, currentInvoice } = useContext(InvoiceContext);

  return (
    <footer className='flex justify-center items-center gap-2 bg-white mt-14 px-6 py-5'>
      <Button
        containerClasses={classNames(
          status === 'paid' ? 'invisible' : '',
          'bg-buttonLight hover:bg-five px-6'
        )}
        textClasses='text-seven'
        buttonText='Edit'
        onClick={() => {
          setShowInvoiceForm(true);
        }}
      />
      <Button
        containerClasses={classNames(
          status === 'paid' ? 'invisible' : '',
          'bg-nine hover:bg-ten px-6'
        )}
        textClasses='text-white'
        buttonText='Delete'
        onClick={() => {}} //TODO implement
      />
      {currentInvoice && currentInvoice.status !== 'draft' && (
        <Button
          containerClasses={
            status === 'paid'
              ? 'bg-green px-6 justify-self-end cursor-not-allowed'
              : 'bg-one hover:bg-two px-6'
          }
          textClasses='text-white'
          buttonText={status === 'paid' ? 'Invoice Paid' : 'Mark as Paid'}
          onClick={status === 'paid' ? () => {} : () => {}} //TODO implement
        />
      )}
    </footer>
  );
}
