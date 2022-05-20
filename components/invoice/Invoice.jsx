import { useContext, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { nanoid } from 'nanoid';

import InvoiceContext from '../../store/context';
import InvoiceHeader from './InvoiceHeader';
import InvoiceActions from './InvoiceActions';
import InvoiceForm from './InvoiceForm';
import { formatDate, formatMoney } from '../../lib/formatUtils';

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

  const { setCurrentInvoice, showInvoiceForm } = useContext(InvoiceContext);

  useEffect(() => {
    setCurrentInvoice(invoice);
  }, [setCurrentInvoice, invoice]);

  const router = useRouter();

  return (
    <>
      <div className={showInvoiceForm ? 'invisible' : ''}>
        <div className='ml-6 cursor-pointer' onClick={() => router.push('/')}>
          <Image
            src='/assets/icon-arrow-left.svg'
            alt='left arrow'
            width={6}
            height={8}
          />
          <span className='text-xs tracking-tight font-bold ml-6'>Go Back</span>
        </div>
        <InvoiceHeader status={status} />
        <section className='bg-white mt-4 mx-6 p-6 text-sm tracking-tight rounded-md'>
          <div className='font-bold'>
            <span className='text-seven'>#</span>
            {id}
          </div>
          <div className='text-seven'>{description}</div>
          <div className='text-seven mt-7'>
            <p>{senderAddress.street}</p>
            <p>{senderAddress.city}</p>
            <p>{senderAddress.postCode}</p>
            <p>{senderAddress.country}</p>
          </div>
          <div className='flex gap-10 mt-7'>
            <div className='flex flex-col justify-between'>
              <div>
                <h3 className='text-seven'>Invoice Date</h3>
                <p className='text-base font-bold mt-2'>
                  {createdAt ? formatDate(createdAt) : '-'}
                </p>
              </div>
              <div>
                <h3 className='text-seven'>Payment Due</h3>
                <p className='text-base font-bold mt-2'>
                  {paymentDue ? formatDate(paymentDue) : '-'}
                </p>
              </div>
            </div>
            <div className=''>
              <h3 className='text-seven'>Bill To</h3>
              <div className='mt-2'>
                <p className='text-base font-bold mt-2'>{clientName}</p>
                <p>{clientAddress.street}</p>
                <p>{clientAddress.city}</p>
                <p>{clientAddress.postCode}</p>
                <p>{clientAddress.country}</p>
              </div>
            </div>
          </div>
          <div className='mt-4'>
            <h3 className='text-seven'>Sent To</h3>
            <p className='text-base font-bold'>{clientEmail}</p>
          </div>
          <div className='bg-eleven mt-10 p-6 space-y-6 rounded-t-md'>
            {items.map((item) => (
              <div
                key={nanoid(6)}
                className='flex justify-between items-center'
              >
                <div>
                  <h3 className='font-bold'>{item.name}</h3>
                  <p className='text-seven font-bold mt-2'>
                    {item.quantity} x {formatMoney(item.price)}
                  </p>
                </div>
                <div>
                  <p className='font-bold'>{formatMoney(item.total)}</p>
                </div>
              </div>
            ))}
          </div>
          <div className='flex justify-between items-center text-white bg-[#373b53] p-6 rounded-b-md'>
            <h3>Grand Total</h3>
            <p className='text-xl font-bold leading-relaxed'>
              {formatMoney(total)}
            </p>
          </div>
        </section>
        <InvoiceActions status={status} />
      </div>
      {showInvoiceForm && <InvoiceForm invoice={invoice} />}
    </>
  );
}
