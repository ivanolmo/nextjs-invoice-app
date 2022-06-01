import { useContext, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { nanoid } from 'nanoid';
import { toast } from 'react-toastify';

import InvoiceContext from '../../store/context';
import InvoiceHeader from './InvoiceHeader';
import DeletePopup from '../ui/DeletePopup';
import Button from '../ui/Button';
import { formatDate, formatMoney, classNames } from '../../lib/formatUtils';

export default function Invoice({ invoice }) {
  const {
    id,
    status,
    description,
    clientName,
    clientEmail,
    clientAddress,
    senderAddress,
    createdAt,
    paymentDue,
    items,
    total,
  } = invoice;

  const {
    setCurrentInvoice,
    setShowEditInvoiceForm,
    showDeletePopup,
    setShowDeletePopup,
  } = useContext(InvoiceContext);

  const router = useRouter();

  const handleClose = () => {
    setCurrentInvoice(null);
    router.push('/');
  };

  const handleDelete = async (id) => {
    const res = await toast.promise(
      fetch('/api/invoice/', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      }),
      {
        pending: 'Invoice is being deleted...',
        success: 'Invoice has been successfully deleted',
        error: 'There was an error deleting this invoice',
      },
      handleClose()
    );
  };

  const handleClosePopup = () => setShowDeletePopup(false);

  useEffect(() => {
    setCurrentInvoice(invoice);
  }, [setCurrentInvoice, invoice]);

  return (
    <>
      <div className='pt-8'>
        <div className='ml-6 cursor-pointer' onClick={() => handleClose()}>
          <Image
            src='/assets/icon-arrow-left.svg'
            alt='left arrow'
            width={6}
            height={8}
          />
          <span className='text-xs tracking-tight font-bold ml-6'>Go Back</span>
        </div>
        <InvoiceHeader status={status} />
        <div className='bg-white mt-4 mx-6 p-6 text-sm tracking-tight rounded-md'>
          <div className='space-y-1'>
            <div className='font-bold text-xs'>
              <span className='text-seven'>#</span>
              {id}
            </div>
            <div className='text-seven text-xs'>{description || 'N/A'}</div>
          </div>
          <div className='text-xs text-seven mt-7 space-y-1'>
            <p>{senderAddress.street || '-'}</p>
            <p>{senderAddress.city || '-'}</p>
            <p>{senderAddress.postCode || '-'}</p>
            <p>{senderAddress.country || '-'}</p>
          </div>
          <div className='flex gap-10 mt-7'>
            <div className='flex flex-col justify-between'>
              <div className='space-y-2'>
                <h3 className='text-seven'>Invoice Date</h3>
                <p className='text-base font-bold'>
                  {createdAt ? formatDate(createdAt) : '-'}
                </p>
              </div>
              <div className='space-y-2'>
                <h3 className='text-seven'>Payment Due</h3>
                <p className='text-base font-bold'>
                  {paymentDue ? formatDate(paymentDue) : 'N/A'}
                </p>
              </div>
            </div>
            <div className='space-y-2'>
              <h3 className='text-seven'>Bill To</h3>
              <div className='space-y-2'>
                <p className='text-base font-bold mt-2'>
                  {clientName || 'N/A'}
                </p>
                <div className='text-xs text-seven space-y-1'>
                  <p>{clientAddress.street || '-'}</p>
                  <p>{clientAddress.city || '-'}</p>
                  <p>{clientAddress.postCode || '-'}</p>
                  <p>{clientAddress.country || '-'}</p>
                </div>
              </div>
            </div>
          </div>
          <div className='mt-9 space-y-3'>
            <h3 className='text-seven text-xs'>Sent To</h3>
            <p className='text-base font-bold'>{clientEmail || 'N/A'}</p>
          </div>
          <div className='bg-eleven mt-10 p-6 space-y-6 rounded-t-md'>
            {!items.length ? (
              <div className='text-base font-bold'>No Items</div>
            ) : (
              items.map((item) => (
                <div
                  key={nanoid(6)}
                  className='flex justify-between items-center'
                >
                  <div>
                    <h3 className='font-bold'>{item.name || 'N/A'}</h3>
                    <p className='text-seven font-bold mt-2'>
                      {item.quantity} x {formatMoney(item.price)}
                    </p>
                  </div>
                  <div>
                    <p className='font-bold'>{formatMoney(item.total)}</p>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className='flex justify-between items-center text-white bg-[#373b53] p-6 rounded-b-md'>
            <h3>Grand Total</h3>
            <p className='text-xl font-bold leading-relaxed'>
              {formatMoney(total)}
            </p>
          </div>
        </div>
        <div className='flex justify-center items-center gap-2 bg-white mt-14 py-5 px-6'>
          <Button
            containerClasses={classNames(
              status === 'paid' ? 'invisible' : '',
              'bg-buttonLight hover:bg-five px-6'
            )}
            textClasses='text-seven'
            buttonText='Edit'
            onClick={() => {
              setShowEditInvoiceForm(true);
            }}
          />
          <Button
            containerClasses='bg-nine hover:bg-ten px-6'
            textClasses='text-white'
            buttonText='Delete'
            onClick={() => setShowDeletePopup(true)}
          />
          <Button
            containerClasses={
              status === 'draft'
                ? 'invisible'
                : status === 'paid'
                ? 'bg-green px-6 justify-self-end cursor-not-allowed'
                : 'bg-one hover:bg-two px-[1.75rem]'
            }
            textClasses='text-white'
            buttonText={status === 'paid' ? 'Invoice Paid' : 'Mark as Paid'}
            onClick={status === 'paid' ? () => {} : () => {}} //TODO implement
          />
        </div>
        {showDeletePopup && (
          <DeletePopup
            id={id}
            handleDelete={handleDelete}
            handleClosePopup={handleClosePopup}
          />
        )}
      </div>
    </>
  );
}
