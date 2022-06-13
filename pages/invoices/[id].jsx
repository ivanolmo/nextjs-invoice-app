import { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { nanoid } from 'nanoid';
import { toast } from 'react-toastify';

import InvoiceContext from '../../store/context';
import InvoiceEdit from '../../components/invoice/InvoiceEdit';
import DeletePopup from '../../components/ui/DeletePopup';
import Button from '../../components/ui/Button';
import {
  formatDate,
  formatMoney,
  formatStatus,
  classNames,
} from '../../lib/formatUtils';
import { db } from '../../lib/firebaseAdmin';

export default function InvoicePage({ invoiceData }) {
  const [invoice, setInvoice] = useState(invoiceData);

  const {
    setCurrentInvoice,
    showEditInvoiceForm,
    setShowEditInvoiceForm,
    showDeletePopup,
    setShowDeletePopup,
  } = useContext(InvoiceContext);

  const router = useRouter();

  useEffect(() => {
    setCurrentInvoice(invoice);
  }, [invoice, setCurrentInvoice]);

  // TODO add a temp loading state if page is fallback
  if (router.isFallback) {
    return <div className=''>Loading</div>;
  }

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

  // handles invoice delete
  const handleDelete = async (id) => {
    const res = await toast.promise(
      fetch(`/api/invoice/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      {
        pending: 'Invoice is being deleted...',
        success: 'Invoice has been successfully deleted',
        error: 'There was an error deleting this invoice',
      }
    );
    handleClose();
  };

  // closes delete modal, passed as prop to modal cancel button
  const handleClosePopup = () => setShowDeletePopup(false);

  // clears current invoice from state and navigates to / after delete
  // also does same functions on click of 'Go Back' button
  const handleClose = () => {
    setCurrentInvoice(null);
    router.push('/');
  };

  // handles invoice status update pending -> paid
  const handleStatusUpdate = async () => {
    const res = await toast.promise(
      fetch(`/api/invoice/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      {
        pending: 'Invoice status is being updated...',
        success: 'Invoice status has been successfully updated',
        error: 'There was an error updating the status',
      }
    );
    setInvoice((prevInvoice) => ({
      ...prevInvoice,
      status: 'paid',
    }));
  };

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
          <span className='text-xs hover:text-seven dark:text-white tracking-tight font-bold ml-6'>
            Go Back
          </span>
        </div>
        <header className='flex justify-between items-center bg-white dark:bg-three text-xs tracking-tight mt-8 mx-6 p-6 rounded-md'>
          <span className='text-seven dark:text-five '>Status</span>
          <div
            className={classNames(
              status === 'paid'
                ? 'text-green bg-green/10 dark:bg-green/5'
                : status === 'pending'
                ? 'text-orange bg-orange/10 dark:bg-orange/5'
                : 'text-darkGray dark:text-five bg-darkGray/10 dark:bg-five/5',
              'p-3 font-bold rounded-md w-[6.5rem] text-center'
            )}
          >
            <span className='bg-current inline-block mr-2 w-2 h-2 rounded-full'></span>
            {formatStatus(status)}
          </div>
        </header>
        <div className='bg-white dark:bg-three mt-4 mx-6 p-6 text-sm tracking-tight rounded-md'>
          <div className='space-y-1'>
            <div className='font-bold text-xs dark:text-white'>
              <span className='text-seven'>#</span>
              {id}
            </div>
            <div className='text-seven dark:text-five text-xs'>
              {description || 'N/A'}
            </div>
          </div>
          <div className='text-xs text-seven dark:text-five mt-7 space-y-1'>
            <p>{senderAddress.street || '-'}</p>
            <p>{senderAddress.city || '-'}</p>
            <p>{senderAddress.postCode || '-'}</p>
            <p>{senderAddress.country || '-'}</p>
          </div>
          <div className='flex gap-10 mt-7'>
            <div className='flex flex-col justify-between'>
              <div className='space-y-2'>
                <span className='text-seven dark:text-five'>Invoice Date</span>
                <p className='text-base font-bold dark:text-white'>
                  {createdAt ? formatDate(createdAt) : '-'}
                </p>
              </div>
              <div className='space-y-2'>
                <h3 className='text-seven dark:text-five'>Payment Due</h3>
                <p className='text-base dark:text-white font-bold'>
                  {paymentDue ? formatDate(paymentDue) : 'N/A'}
                </p>
              </div>
            </div>
            <div className='space-y-2'>
              <h3 className='text-seven dark:text-five'>Bill To</h3>
              <div className='space-y-2'>
                <p className='text-base dark:text-white font-bold mt-2'>
                  {clientName || 'N/A'}
                </p>
                <div className='text-xs text-seven dark:text-five space-y-1'>
                  <p>{clientAddress.street || '-'}</p>
                  <p>{clientAddress.city || '-'}</p>
                  <p>{clientAddress.postCode || '-'}</p>
                  <p>{clientAddress.country || '-'}</p>
                </div>
              </div>
            </div>
          </div>
          <div className='mt-9 space-y-3'>
            <span className='text-seven dark:text-five text-xs'>Sent To</span>
            <p className='text-base dark:text-white font-bold'>
              {clientEmail || 'N/A'}
            </p>
          </div>
          <div className='bg-eleven dark:bg-four mt-10 p-6 space-y-6 rounded-t-md'>
            {!items.length ? (
              <div className='text-base font-bold'>No Items</div>
            ) : (
              items.map((item) => (
                <div
                  key={nanoid(6)}
                  className='flex justify-between items-center text-xs'
                >
                  <div>
                    <h3 className='font-bold dark:text-white'>
                      {item.name || 'N/A'}
                    </h3>
                    <p className='text-seven dark:text-six font-bold mt-2'>
                      {item.quantity} x {formatMoney(item.price)}
                    </p>
                  </div>
                  <div>
                    <p className='font-bold dark:text-white'>
                      {formatMoney(item.total)}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className='flex justify-between items-center text-xs text-white bg-[#373b53] dark:bg-eight p-6 rounded-b-md'>
            <span>Grand Total</span>
            <p className='text-xl font-bold leading-relaxed'>
              {formatMoney(total)}
            </p>
          </div>
        </div>
        <div className='flex justify-center items-center gap-2 bg-white dark:bg-three mt-14 py-5 px-6'>
          <Button
            containerClasses={classNames(
              status === 'paid' ? 'invisible' : '',
              'bg-buttonLight hover:bg-five dark:bg-four dark:hover:bg-twelve px-6'
            )}
            textClasses='text-seven dark:text-five'
            buttonText='Edit'
            onClick={() => setShowEditInvoiceForm(true)}
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
                ? 'bg-green dark:bg-green/80 px-6 justify-self-end cursor-not-allowed'
                : 'bg-one hover:bg-two px-[1.75rem]'
            }
            textClasses='text-white'
            buttonText={status === 'paid' ? 'Invoice Paid' : 'Mark as Paid'}
            onClick={status === 'paid' ? null : () => handleStatusUpdate()}
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

      {showEditInvoiceForm && <InvoiceEdit setInvoice={setInvoice} />}
    </>
  );
}

export async function getStaticProps(context) {
  const id = context.params.id;

  const doc = await db.collection('invoices').doc(id).get();

  const invoiceData = doc.data();

  if (!invoiceData) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      invoiceData,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const snapshot = await db.collection('invoices').get();
  const invoices = [];
  snapshot.forEach((doc) => invoices.push(doc.data()));

  return {
    paths: invoices.map((invoice) => ({ params: { id: invoice.id } })),
    fallback: true,
  };
}
