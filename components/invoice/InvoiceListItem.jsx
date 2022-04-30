import { formatDate, formatMoney, formatStatus } from '../../lib/formatUtils';

export default function InvoiceListItem({ invoice }) {
  const { id, paymentDue, total, clientName, status } = invoice;

  return (
    <section className='flex justify-between p-6 bg-white rounded-lg text-sm'>
      <div className='flex flex-col gap-6'>
        <div className='font-bold'>
          <span className='text-seven'>#</span>
          {id}
        </div>
        <div>
          <div className='text-seven'>Due {formatDate(paymentDue)}</div>
          <div className='text-base font-bold tracking-tight'>
            {formatMoney(total)}
          </div>
        </div>
      </div>
      <div className='flex flex-col items-end gap-6'>
        <div className='text-seven tracking-tight'>{clientName}</div>
        <div
          className={
            status === 'paid'
              ? 'text-green bg-green/10 py-2 px-8 font-bold rounded-sm'
              : status === 'pending'
              ? 'text-orange bg-orange/10 py-2 px-8 font-bold rounded-sm'
              : 'text-darkGray bg-darkGray/10 py-2 px-8 font-bold rounded-sm'
          }
        >
          {formatStatus(status)}
        </div>
      </div>
    </section>
  );
}
