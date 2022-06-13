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
        <li className='flex justify-between mb-4 p-6 bg-white dark:bg-three rounded-lg text-xs border border-transparent hover:border-one'>
          <div className='flex flex-col gap-6'>
            <div className='font-bold dark:text-white'>
              <span className='text-seven'>#</span>
              {id}
            </div>
            <div>
              <div className='text-seven dark:text-five'>
                Due {paymentDue ? formatDate(paymentDue) : 'N/A'}
              </div>
              <div className='text-base font-bold dark:text-white tracking-tight mt-2'>
                {formatMoney(total)}
              </div>
            </div>
          </div>
          <div className='flex flex-col items-end gap-6'>
            <div className='text-seven dark:text-white tracking-tight'>
              {clientName || 'N/A'}
            </div>
            <div
              className={classNames(
                status === 'paid'
                  ? 'text-green bg-green/10 dark:bg-green/5'
                  : status === 'pending'
                  ? 'text-orange bg-orange/10 dark:bg-orange/5'
                  : 'text-darkGray dark:text-five bg-darkGray/10 dark:bg-five/5',
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
