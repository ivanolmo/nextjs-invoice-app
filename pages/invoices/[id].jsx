import { useContext } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { nanoid } from 'nanoid';
import { toast } from 'react-toastify';

import InvoiceContext from '../../context/InvoiceContext';
import InvoiceEdit from '../../components/invoice/InvoiceEdit';
import Button from '../../components/ui/Button';
import DeleteModal from '../../components/ui/DeleteModal';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { db } from '../../lib/firebase';
import { useDocumentDataSSR } from '../../lib/hooks';
import {
  classNames,
  formatDate,
  formatMoney,
  formatStatus,
} from '../../utils/utils';

export default function InvoicePage({ invoice }) {
  const router = useRouter();

  const {
    showEditInvoiceForm,
    setShowEditInvoiceForm,
    showDeleteModal,
    setShowDeleteModal,
  } = useContext(InvoiceContext);

  // use custom hook to keep invoice data updated
  const [data, loading, error] = useDocumentDataSSR(
    doc(db, 'invoices', invoice.id),
    {
      startsWith: invoice,
    }
  );

  if (error) throw new Error();

  // closes delete modal, passed as prop to modal cancel button
  const handleClosePopup = () => setShowDeleteModal(false);

  // navigates to home after delete or click of 'Go Back' button
  const handleClose = () => {
    router.push('/');
  };

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
      },
      handleClose()
    );
  };

  // handles invoice status update pending -> paid
  const handleStatusUpdate = async () => {
    const res = await toast.promise(
      fetch(`/api/invoice/${data?.id}`, {
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
  };

  return (
    <div className='grid grid-cols-1 md:justify-items-center lg:h-screen lg:overflow-y-auto w-full'>
      <div className='row-start-1 col-start-1 pt-8 md:pt-12 lg:pt-16 px-6 md:px-0 md:w-[688px] lg:w-[730px]'>
        <div
          className='group flex items-center w-fit cursor-pointer'
          onClick={() => handleClose()}
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
        {loading || router.isFallback ? (
          <div className='flex justify-center items-center mt-60'>
            <LoadingSpinner />
          </div>
        ) : (
          <>
            <div className='flex justify-between items-center bg-white dark:bg-slate-900 text-xs tracking-tight mt-8 p-6 md:px-8 md:py-0 rounded-md md:rounded-lg w-full'>
              <div className='flex justify-between md:justify-start items-center w-full md:w-auto'>
                <div className='md:mr-4'>
                  <span className='text-indigo-400 dark:text-indigo-100'>
                    Status
                  </span>
                </div>
                <div
                  className={classNames(
                    data?.status === 'paid'
                      ? 'text-emerald-400 bg-emerald-400/10 dark:bg-emerald-400/5'
                      : data?.status === 'pending'
                      ? 'text-orange-500 bg-orange-500/10 dark:bg-orange-500/5'
                      : 'text-slate-700 dark:text-indigo-100 bg-slate-700/10 dark:bg-indigo-100/5',
                    'p-3 font-bold rounded-md w-[6.5rem] text-center'
                  )}
                >
                  <span className='bg-current inline-block mr-2 w-2 h-2 rounded-full'></span>
                  {formatStatus(data?.status)}
                </div>
              </div>
              <div className='hidden md:flex md:justify-center md:items-center gap-2 py-5'>
                <Button
                  containerClasses={classNames(
                    data?.status === 'paid' ? 'invisible' : '',
                    'bg-gray-200 hover:bg-indigo-100 dark:bg-slate-800 dark:hover:bg-gray-800 px-6'
                  )}
                  textClasses='text-indigo-400 dark:text-indigo-100'
                  buttonText='Edit'
                  onClick={() => setShowEditInvoiceForm(true)}
                />
                <Button
                  containerClasses='bg-red-500 hover:bg-red-300 px-6'
                  textClasses='text-white'
                  buttonText='Delete'
                  onClick={() => setShowDeleteModal(true)}
                />
                <Button
                  containerClasses={
                    data?.status === 'draft'
                      ? 'hidden'
                      : data?.status === 'paid'
                      ? 'bg-emerald-400 dark:bg-emerald-400/80 px-6 justify-self-end cursor-not-allowed'
                      : 'bg-violet-500 hover:bg-violet-400 px-[1.75rem]'
                  }
                  textClasses='text-white'
                  buttonText={
                    data?.status === 'paid' ? 'Invoice Paid' : 'Mark as Paid'
                  }
                  onClick={
                    data?.status === 'paid' ? null : () => handleStatusUpdate()
                  }
                />
              </div>
            </div>

            <div className='bg-white dark:bg-slate-900 mt-4 md:mt-6 p-6 md:p-8 lg:p-12 text-xs tracking-tight rounded-md md:rounded-lg'>
              <div className='md:flex md:justify-between'>
                <div className='flex flex-col gap-1 md:gap-2'>
                  <div>
                    <span className='text-xs md:text-base font-bold text-indigo-400 dark:text-slate-400 tracking-tighter'>
                      #
                    </span>
                    <span className='text-xs md:text-base font-bold dark:text-white tracking-tighter'>
                      {data?.id}
                    </span>
                  </div>
                  <div className='text-indigo-400 dark:text-indigo-100 text-xs'>
                    {data?.description || 'N/A'}
                  </div>
                </div>
                <div className='text-xs text-indigo-400 dark:text-indigo-100 mt-7 md:mt-0 space-y-1'>
                  <p>{data?.senderAddress.street || '-'}</p>
                  <p>{data?.senderAddress.city || '-'}</p>
                  <p>{data?.senderAddress.postCode || '-'}</p>
                  <p>{data?.senderAddress.country || '-'}</p>
                </div>
              </div>
              <div className='md:flex md:gap-24 md:justify-start md:mt-5'>
                <div className='flex gap-10 md:gap-24 mt-7 md:mt-0'>
                  <div className='flex flex-col justify-between'>
                    <div className='space-y-2'>
                      <span className='text-indigo-400 dark:text-indigo-100'>
                        Invoice Date
                      </span>
                      <p className='text-base font-bold dark:text-white'>
                        {data?.createdAt ? formatDate(data?.createdAt) : '-'}
                      </p>
                    </div>
                    <div className='space-y-2'>
                      <h3 className='text-indigo-400 dark:text-indigo-100'>
                        Payment Due
                      </h3>
                      <p className='text-base dark:text-white font-bold'>
                        {data?.paymentDue
                          ? formatDate(data?.paymentDue)
                          : 'N/A'}
                      </p>
                    </div>
                  </div>
                  <div className='space-y-2'>
                    <h3 className='text-indigo-400 dark:text-indigo-100'>
                      Bill To
                    </h3>
                    <div className='space-y-2'>
                      <p className='text-base dark:text-white font-bold mt-2'>
                        {data?.clientName || 'N/A'}
                      </p>
                      <div className='text-xs text-indigo-400 dark:text-indigo-100 space-y-1'>
                        <p>{data?.clientAddress.street || '-'}</p>
                        <p>{data?.clientAddress.city || '-'}</p>
                        <p>{data?.clientAddress.postCode || '-'}</p>
                        <p>{data?.clientAddress.country || '-'}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='mt-9 md:mt-0 space-y-3'>
                  <span className='text-indigo-400 dark:text-indigo-100 text-xs'>
                    Sent To
                  </span>
                  <p className='text-base dark:text-white font-bold'>
                    {data?.clientEmail || 'N/A'}
                  </p>
                </div>
              </div>

              <div className='bg-violet-50 dark:bg-slate-800 mt-10 md:mt-12 p-6 md:px-8 md:pt-8 md:pb-10 rounded-t-md md:rounded-t-lg'>
                {!data?.items.length ? (
                  <div className='text-base font-bold'>No Items</div>
                ) : (
                  <div className='flex flex-col md:gap-8'>
                    <div className='hidden md:grid md:grid-cols-[240px_20px_120px_130px] md:gap-4 text-xs text-indigo-400 dark:text-indigo-100'>
                      <span>Item Name</span>
                      <span className='justify-self-center'>QTY</span>
                      <span className='justify-self-end'>Price</span>
                      <span className='justify-self-end'>Total</span>
                    </div>
                    <ul className='space-y-6 md:space-y-8'>
                      {data?.items.map((item) => (
                        <li key={nanoid(6)}>
                          <div className='flex justify-between items-center text-xs md:hidden'>
                            <div className='flex flex-col gap-2'>
                              <span className='font-bold dark:text-white max-w-[120px]'>
                                {item.name || 'N/A'}
                              </span>
                              <span className='text-indigo-400 dark:text-slate-400 font-bold'>
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
                            <span className='justify-self-center text-indigo-400 dark:text-indigo-100'>
                              {item.quantity}
                            </span>
                            <span className='justify-self-end text-indigo-400 dark:text-indigo-100'>
                              {formatMoney(item.price)}
                            </span>
                            <span className='justify-self-end dark:text-white'>
                              {formatMoney(item.total)}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className='flex justify-between items-center text-white bg-slate-700 dark:bg-gray-900 p-6 md:px-8 rounded-b-md md:rounded-b-lg'>
                <span className='text-xs tracking-tight'>Amount Due</span>
                <span className='text-xl md:text-2xl font-bold tracking-tighter leading-medium md:leading-[1.33]'>
                  {formatMoney(data?.total)}
                </span>
              </div>
            </div>
          </>
        )}
        {loading ? null : (
          <div className='flex justify-center items-center gap-2 bg-white dark:bg-slate-900 mt-14 -mx-6 py-5 px-6 md:hidden'>
            <Button
              containerClasses={classNames(
                data?.status === 'paid' ? 'invisible' : '',
                'bg-gray-200 hover:bg-indigo-100 dark:bg-slate-800 dark:hover:bg-gray-800 px-6'
              )}
              textClasses='text-indigo-400 dark:text-indigo-100'
              buttonText='Edit'
              onClick={() => setShowEditInvoiceForm(true)}
            />
            <Button
              containerClasses='bg-red-500 hover:bg-red-300 px-6'
              textClasses='text-white'
              buttonText='Delete'
              onClick={() => setShowDeleteModal(true)}
            />
            <Button
              containerClasses={
                data?.status === 'draft'
                  ? 'hidden'
                  : data?.status === 'paid'
                  ? 'bg-emerald-400 dark:bg-emerald-400/80 px-6 justify-self-end cursor-not-allowed'
                  : 'bg-violet-500 hover:bg-violet-400 px-8'
              }
              textClasses='text-white'
              buttonText={
                data?.status === 'paid' ? 'Invoice Paid' : 'Mark as Paid'
              }
              onClick={
                data?.status === 'paid' ? null : () => handleStatusUpdate()
              }
            />
          </div>
        )}
        {showDeleteModal && (
          <DeleteModal
            id={data?.id}
            handleDelete={handleDelete}
            handleClosePopup={handleClosePopup}
          />
        )}
      </div>

      {showEditInvoiceForm && <InvoiceEdit invoice={data ?? invoice} />}
    </div>
  );
}

export async function getStaticProps(context) {
  const id = context.params.id;

  const snapshot = await getDoc(doc(db, 'invoices', id));

  const invoice = snapshot.data();

  if (!invoice) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      invoice,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const snapshot = await getDocs(collection(db, 'invoices'));

  const paths = snapshot.docs.map((doc) => ({ params: { id: doc.id } }));

  return {
    paths,
    fallback: 'blocking',
  };
}
