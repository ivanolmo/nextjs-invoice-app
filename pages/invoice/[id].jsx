import { useContext, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import { useAuth } from '../../context/AuthContext';
import InvoiceContext from '../../context/InvoiceContext';
import InvoiceEdit from '../../components/invoice/InvoiceEdit';
import AuthCheck from '../../components/layout/AuthCheck';
import Button from '../../components/ui/Button';
import DeleteModal from '../../components/ui/DeleteModal';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { useDocumentData } from '../../hooks/useDocumentData';
import {
  classNames,
  formatCapitalize,
  formatDate,
  formatMoney,
} from '../../utils';

export default function InvoicePage() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { showEditInvoiceForm, setShowEditInvoiceForm } =
    useContext(InvoiceContext);

  const router = useRouter();

  const { user } = useAuth();

  const { data, loading, error } = useDocumentData(user, router.query.id);

  if (error) throw new Error();

  // closes delete modal, passed as prop to modal cancel button
  const handleCloseDeleteModal = () => setShowDeleteModal(false);

  // navigates to home after delete or click of 'Go Back' button
  const handleClose = () => {
    router.push('/invoices');
  };

  // handles invoice delete
  const handleDelete = () => {
    fetch(`/api/invoice/${data.invoice?.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        token: user.token,
      },
    })
      .then((response) => {
        if (!response.ok) {
          return Promise.reject('There was an error deleting this invoice');
        }

        toast.success(
          `Invoice #${data.invoice?.invoiceId} has been successfully deleted`
        );

        handleCloseDeleteModal();
        handleClose();
      })
      .catch((error) => toast.error(error));
  };

  // handles invoice status update pending -> paid
  const handleStatusUpdate = () => {
    fetch(`/api/invoice/${data.invoice?.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        token: user.token,
      },
    })
      .then((response) => {
        if (!response.ok) {
          return Promise.reject(
            'There was an error updating the status of this invoice'
          );
        }

        toast.success(
          `Invoice #${data.invoice?.invoiceId} status has been successfully updated`
        );
      })
      .catch((error) => toast.error(error));
  };

  return (
    <AuthCheck>
      <div className='grid w-full overflow-y-auto md:justify-items-center lg:h-screen'>
        <div className='row-start-1 col-start-1 pt-8 md:pt-12 lg:pt-16 px-6 md:px-0 md:w-[688px] lg:w-[730px]'>
          <div
            className='flex items-center cursor-pointer group w-fit'
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
            <span className='ml-6 text-xs font-bold tracking-tight dark:text-white group-hover:text-indigo-400 dark:group-hover:text-slate-400'>
              Go Back
            </span>
          </div>
          {loading ? (
            <div className='flex items-center justify-center h-screen'>
              <LoadingSpinner />
            </div>
          ) : (
            <>
              <div className='flex items-center justify-between w-full p-6 mt-8 text-xs tracking-tight bg-white rounded-md dark:bg-slate-900 md:px-8 md:py-0 md:rounded-lg'>
                <div className='flex items-center justify-between w-full md:justify-start md:w-auto'>
                  <div className='md:mr-4'>
                    <span className='text-indigo-400 dark:text-indigo-100'>
                      Status
                    </span>
                  </div>
                  <div
                    className={classNames(
                      data.invoice?.status === 'paid'
                        ? 'text-emerald-400 bg-emerald-400/10 dark:bg-emerald-400/5'
                        : data.invoice?.status === 'pending'
                        ? 'text-orange-500 bg-orange-500/10 dark:bg-orange-500/5'
                        : 'text-slate-700 dark:text-indigo-100 bg-slate-700/10 dark:bg-indigo-100/5',
                      'p-3 font-bold rounded-md w-[6.5rem] text-center'
                    )}
                  >
                    <span className='inline-block w-2 h-2 mr-2 bg-current rounded-full'></span>
                    {formatCapitalize(data.invoice?.status) || '-'}
                  </div>
                </div>
                <div className='hidden gap-2 py-5 md:flex md:justify-center md:items-center'>
                  <Button
                    containerClasses={classNames(
                      data.invoice?.status === 'paid' ? 'invisible' : '',
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
                      data.invoice?.status === 'draft'
                        ? 'hidden'
                        : data.invoice?.status === 'paid'
                        ? 'bg-emerald-400 dark:bg-emerald-400/80 px-6 justify-self-end cursor-not-allowed'
                        : 'bg-violet-500 hover:bg-violet-400 px-[1.75rem]'
                    }
                    textClasses='text-white'
                    buttonText={
                      data.invoice?.status === 'paid'
                        ? 'Invoice Paid'
                        : 'Mark as Paid'
                    }
                    onClick={
                      data.invoice?.status === 'paid'
                        ? null
                        : () => handleStatusUpdate()
                    }
                  />
                </div>
              </div>

              <div className='p-6 mt-4 text-xs tracking-tight bg-white rounded-md dark:bg-slate-900 md:mt-6 md:p-8 lg:p-12 md:rounded-lg'>
                <div className='md:flex md:justify-between'>
                  <div className='flex flex-col gap-1 md:gap-2'>
                    <div>
                      <span className='text-xs font-bold tracking-tighter text-indigo-400 md:text-base dark:text-slate-400'>
                        #
                      </span>
                      <span className='text-xs font-bold tracking-tighter md:text-base dark:text-white'>
                        {data.invoice?.invoiceId}
                      </span>
                    </div>
                    <div className='text-xs text-indigo-400 dark:text-indigo-100'>
                      {data.invoice?.description || 'N/A'}
                    </div>
                  </div>
                  <div className='space-y-1 text-xs text-indigo-400 dark:text-indigo-100 mt-7 md:mt-0'>
                    <p>{data.invoice?.senderAddress.street || '-'}</p>
                    <p>{data.invoice?.senderAddress.city || '-'}</p>
                    <p>{data.invoice?.senderAddress.postCode || '-'}</p>
                    <p>{data.invoice?.senderAddress.country || '-'}</p>
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
                          {data.invoice?.createdAt
                            ? formatDate(data.invoice?.createdAt)
                            : '-'}
                        </p>
                      </div>
                      <div className='space-y-2'>
                        <h3 className='text-indigo-400 dark:text-indigo-100'>
                          Payment Due
                        </h3>
                        <p className='text-base font-bold dark:text-white'>
                          {data.invoice?.paymentDue
                            ? formatDate(data.invoice?.paymentDue)
                            : 'N/A'}
                        </p>
                      </div>
                    </div>
                    <div className='space-y-2'>
                      <h3 className='text-indigo-400 dark:text-indigo-100'>
                        Bill To
                      </h3>
                      <div className='space-y-2'>
                        <p className='mt-2 text-base font-bold dark:text-white'>
                          {data.invoice?.clientName || 'N/A'}
                        </p>
                        <div className='space-y-1 text-xs text-indigo-400 dark:text-indigo-100'>
                          <p>{data.invoice?.clientAddress.street || '-'}</p>
                          <p>{data.invoice?.clientAddress.city || '-'}</p>
                          <p>{data.invoice?.clientAddress.postCode || '-'}</p>
                          <p>{data.invoice?.clientAddress.country || '-'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='space-y-3 mt-9 md:mt-0'>
                    <span className='text-xs text-indigo-400 dark:text-indigo-100'>
                      Sent To
                    </span>
                    <p className='text-base font-bold dark:text-white'>
                      {data.invoice?.clientEmail || 'N/A'}
                    </p>
                  </div>
                </div>

                <div className='p-6 mt-10 bg-violet-50 dark:bg-slate-800 md:mt-12 md:px-8 md:pt-8 md:pb-10 rounded-t-md md:rounded-t-lg'>
                  {!data.invoice?.items.length ? (
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
                        {data.invoice?.items.map((item) => (
                          <li key={item.id}>
                            <div className='flex items-center justify-between text-xs md:hidden'>
                              <div className='flex flex-col gap-2'>
                                <span className='font-bold dark:text-white max-w-[120px]'>
                                  {item.name || 'N/A'}
                                </span>
                                <span className='font-bold text-indigo-400 dark:text-slate-400'>
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
                              <span className='text-indigo-400 justify-self-center dark:text-indigo-100'>
                                {item.quantity}
                              </span>
                              <span className='text-indigo-400 justify-self-end dark:text-indigo-100'>
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
                <div className='flex items-center justify-between p-6 text-white bg-slate-700 dark:bg-gray-900 md:px-8 rounded-b-md md:rounded-b-lg'>
                  <span className='text-xs tracking-tight'>Amount Due</span>
                  <span className='text-xl md:text-2xl font-bold tracking-tighter leading-medium md:leading-[1.33]'>
                    {formatMoney(data.invoice?.total)}
                  </span>
                </div>
              </div>
            </>
          )}
          {loading ? null : (
            <div className='flex items-center justify-center gap-2 px-6 py-5 -mx-6 bg-white dark:bg-slate-900 mt-14 md:hidden'>
              <Button
                containerClasses={classNames(
                  data.invoice?.status === 'paid' ? 'invisible' : '',
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
                  data.invoice?.status === 'draft'
                    ? 'hidden'
                    : data.invoice?.status === 'paid'
                    ? 'bg-emerald-400 dark:bg-emerald-400/80 px-6 justify-self-end cursor-not-allowed'
                    : 'bg-violet-500 hover:bg-violet-400 px-8'
                }
                textClasses='text-white'
                buttonText={
                  data.invoice?.status === 'paid'
                    ? 'Invoice Paid'
                    : 'Mark as Paid'
                }
                onClick={
                  data.invoice?.status === 'paid'
                    ? null
                    : () => handleStatusUpdate()
                }
              />
            </div>
          )}
          {showDeleteModal && (
            <DeleteModal
              id={data.invoice?.id}
              invoiceId={data.invoice?.invoiceId}
              handleDelete={handleDelete}
              handleCloseDeleteModal={handleCloseDeleteModal}
            />
          )}
        </div>

        {showEditInvoiceForm && <InvoiceEdit invoice={data} />}
      </div>
    </AuthCheck>
  );
}
