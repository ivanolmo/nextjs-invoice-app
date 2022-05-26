import Link from 'next/link';
import {
  formatDate,
  formatMoney,
  formatStatus,
  classNames,
} from '../../lib/formatUtils';

export default function InvoiceListItem({ invoice }) {
  const { id, paymentDue, total, clientName, status } = invoice;

  return (
    <Link href={`/invoices/${id}`}>
      <a>
        <li className='flex justify-between mb-4 p-6 bg-white rounded-lg text-sm hover:scale-105 duration-100'>
          <div className='flex flex-col gap-6'>
            <div className='font-bold'>
              <span className='text-seven'>#</span>
              {id}
            </div>
            <div>
              <div className='text-seven'>
                Due {paymentDue ? formatDate(paymentDue) : 'N/A'}
              </div>
              <div className='text-base font-bold tracking-tight'>
                {formatMoney(total)}
              </div>
            </div>
          </div>
          <div className='flex flex-col items-end gap-6'>
            <div className='text-seven tracking-tight'>
              {clientName || 'N/A'}
            </div>
            <div
              className={classNames(
                status === 'paid'
                  ? 'text-green bg-green/10'
                  : status === 'pending'
                  ? 'text-orange bg-orange/10'
                  : 'text-darkGray bg-darkGray/10',
                'flex justify-center items-center gap-2 py-3 text-xs font-bold rounded-md w-[6.5rem]'
              )}
            >
              <p className='bg-current inline-block w-2 h-2 rounded-full'></p>
              <p>{formatStatus(status)}</p>
            </div>
          </div>
        </li>
      </a>
    </Link>
  );
}
