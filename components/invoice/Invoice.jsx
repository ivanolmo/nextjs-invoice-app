import InvoiceHeader from './InvoiceHeader';
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

  return (
    <>
      <InvoiceHeader status={status} />
      <section className='bg-white mt-4 p-6 text-sm tracking-tight rounded-md'>
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
              <p className='text-base font-bold mt-1'>
                {formatDate(createdAt)}
              </p>
            </div>
            <div>
              <h3 className='text-seven'>Payment Due</h3>
              <p className='text-base font-bold mt-1'>
                {formatDate(paymentDue)}
              </p>
            </div>
          </div>
          <div className=''>
            <h3 className='text-seven'>Bill To</h3>
            <div>
              <p className='text-base font-bold'>{clientName}</p>
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
            <div key={item.name} className='flex justify-between items-center'>
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
    </>
  );
}
