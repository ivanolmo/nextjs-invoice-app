import { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { nanoid } from 'nanoid';
import { toast } from 'react-toastify';

import InvoiceContext from '../../context/InvoiceContext';
import InvoiceEdit from '../../components/invoice/InvoiceEdit';
import DeleteModal from '../../components/ui/DeleteModal';
import Button from '../../components/ui/Button';
import { formatDate, formatMoney, formatStatus, classNames } from '../../utils';
import { db } from '../../lib/firebaseAdmin';

export default function InvoicePage({ invoiceData }) {
  const [invoice, setInvoice] = useState(invoiceData);

  const {
    setCurrentInvoice,
    showEditInvoiceForm,
    setShowEditInvoiceForm,
    showDeleteModal,
    setShowDeleteModal,
  } = useContext(InvoiceContext);

  const router = useRouter();

  useEffect(() => {
    setCurrentInvoice(invoice);
  }, [invoice, setCurrentInvoice]);

  // TODO add loading state if page is fallback
  if (router.isFallback) {
    return <div className=''>Loading...</div>;
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
  const handleClosePopup = () => setShowDeleteModal(false);

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
    <div className='grid grid-cols-1'>
      <div className='row-start-1 col-start-1 pt-8 md:pt-12 px-6 md:px-10'>
        <div className='cursor-pointer' onClick={() => handleClose()}>
          <Image
            src='/assets/icon-arrow-left.svg'
            alt='left arrow'
            width={6}
            height={8}
          />
          <span className='text-xs dark:text-white hover:text-seven dark:hover:text-six tracking-tight font-bold ml-6'>
            Go Back
          </span>
        </div>
        <div className='flex justify-between items-center bg-white dark:bg-three text-xs tracking-tight mt-8 p-6 md:px-8 md:py-0 rounded-md'>
          <div className='flex justify-between md:justify-start items-center w-full md:w-auto'>
            <div className='md:mr-4'>
              <span className='text-seven dark:text-five'>Status</span>
            </div>
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
          </div>
          <div className='hidden md:flex md:justify-center md:items-center gap-2 py-5'>
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
              onClick={() => setShowDeleteModal(true)}
            />
            <Button
              containerClasses={
                status === 'draft'
                  ? 'hidden'
                  : status === 'paid'
                  ? 'bg-green dark:bg-green/80 px-6 justify-self-end cursor-not-allowed'
                  : 'bg-one hover:bg-two px-[1.75rem]'
              }
              textClasses='text-white'
              buttonText={status === 'paid' ? 'Invoice Paid' : 'Mark as Paid'}
              onClick={status === 'paid' ? null : () => handleStatusUpdate()}
            />
          </div>
        </div>

        <div className='bg-white dark:bg-three mt-4 md:mt-6 p-6 md:p-8 text-xs tracking-tight rounded-md'>
          <div className='md:flex md:justify-between'>
            <div className='flex flex-col gap-1 md:gap-2'>
              <div>
                <span className='text-xs md:text-base font-bold text-seven dark:text-six tracking-tighter'>
                  #
                </span>
                <span className='text-xs md:text-base font-bold dark:text-white tracking-tighter'>
                  {id}
                </span>
              </div>
              <div className='text-seven dark:text-five text-xs'>
                {description || 'N/A'}
              </div>
            </div>
            <div className='text-xs text-seven dark:text-five mt-7 md:mt-0 space-y-1'>
              <p>{senderAddress.street || '-'}</p>
              <p>{senderAddress.city || '-'}</p>
              <p>{senderAddress.postCode || '-'}</p>
              <p>{senderAddress.country || '-'}</p>
            </div>
          </div>
          <div className='md:flex md:gap-24 md:justify-start md:mt-5'>
            <div className='flex gap-10 md:gap-24 mt-7 md:mt-0'>
              <div className='flex flex-col justify-between'>
                <div className='space-y-2'>
                  <span className='text-seven dark:text-five'>
                    Invoice Date
                  </span>
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
            <div className='mt-9 md:mt-0 space-y-3'>
              <span className='text-seven dark:text-five text-xs'>Sent To</span>
              <p className='text-base dark:text-white font-bold'>
                {clientEmail || 'N/A'}
              </p>
            </div>
          </div>
          <div className='bg-eleven dark:bg-four mt-10 md:mt-12 p-6 md:px-8 md:pt-8 md:pb-10 rounded-t-md md:rounded-t-lg'>
            {!items.length ? (
              <div className='text-base font-bold'>No Items</div>
            ) : (
              <div className='flex flex-col gap-6 md:gap-8'>
                <div className='hidden md:grid md:grid-cols-[240px_20px_120px_130px] md:gap-4 text-xs text-seven dark:text-five'>
                  <span>Item Name</span>
                  <span className='justify-self-center'>QTY</span>
                  <span className='justify-self-end'>Price</span>
                  <span className='justify-self-end'>Total</span>
                </div>
                {items.map((item) => (
                  <>
                    <div
                      key={nanoid(6)}
                      className='flex justify-between items-center text-xs md:hidden'
                    >
                      <div className='flex flex-col gap-2'>
                        <span className='font-bold dark:text-white max-w-[120px]'>
                          {item.name || 'N/A'}
                        </span>
                        <span className='text-seven dark:text-six font-bold'>
                          {item.quantity} x {formatMoney(item.price)}
                        </span>
                      </div>
                      <div>
                        <span className='font-bold dark:text-white'>
                          {formatMoney(item.total)}
                        </span>
                      </div>
                    </div>
                    <div className='hidden md:grid md:grid-cols-[240px_20px_120px_130px] md:gap-4 font-bold tracking-tight'>
                      <span className='dark:text-white'>
                        {item.name || 'N/A'}
                      </span>
                      <span className='justify-self-center text-seven dark:text-five'>
                        {item.quantity}
                      </span>
                      <span className='justify-self-end text-seven dark:text-five'>
                        {formatMoney(item.price)}
                      </span>
                      <span className='justify-self-end dark:text-white'>
                        {formatMoney(item.total)}
                      </span>
                    </div>
                  </>
                ))}
              </div>
            )}
          </div>
          <div className='flex justify-between items-center text-white bg-[#373b53] dark:bg-eight p-6 md:px-8 rounded-b-md md:rounded-b-lg'>
            <span className='text-xs tracking-tight'>Amount Due</span>
            <span className='text-xl md:text-2xl font-bold tracking-tighter leading-medium md:leading-[1.33]'>
              {formatMoney(total)}
            </span>
          </div>
        </div>
        <div className='flex justify-center items-center gap-2 bg-white dark:bg-three mt-14 -mx-6 py-5 px-6 md:hidden'>
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
            onClick={() => setShowDeleteModal(true)}
          />
          <Button
            containerClasses={
              status === 'draft'
                ? 'hidden'
                : status === 'paid'
                ? 'bg-green dark:bg-green/80 px-6 justify-self-end cursor-not-allowed'
                : 'bg-one hover:bg-two px-8'
            }
            textClasses='text-white'
            buttonText={status === 'paid' ? 'Invoice Paid' : 'Mark as Paid'}
            onClick={status === 'paid' ? null : () => handleStatusUpdate()}
          />
        </div>

        {showDeleteModal && (
          <DeleteModal
            id={id}
            handleDelete={handleDelete}
            handleClosePopup={handleClosePopup}
          />
        )}
      </div>

      {showEditInvoiceForm && <InvoiceEdit setInvoice={setInvoice} />}
    </div>
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
