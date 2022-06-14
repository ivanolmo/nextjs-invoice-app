import Link from 'next/link';
import Image from 'next/image';
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
        <li className='grid grid-cols-[auto_1fr] auto-rows-auto gap-y-6 mb-4 p-6 md:py-4 bg-white dark:bg-three rounded-lg text-xs border border-transparent hover:border-one'>
          <div className='justify-self-start font-bold'>
            <span className='text-seven'>#</span>
            <span className='dark:text-white'>{id}</span>
          </div>
          <div className='col-start-1 row-start-2 self-start'>
            <span className='text-seven dark:text-five'>
              Due {paymentDue ? formatDate(paymentDue) : 'N/A'}
            </span>
          </div>

          <div className='col-start-1 row-start-2 self-end mt-5'>
            <span className='text-base font-bold tracking-tight dark:text-white'>
              {formatMoney(total)}
            </span>
          </div>
          <div className='row-start-1 col-start-3 justify-self-end'>
            <span className='text-seven dark:text-white tracking-tight'>
              {clientName || 'N/A'}
            </span>
          </div>

          <div className='flex items-center col-start-3'>
            <div
              className={classNames(
                status === 'paid'
                  ? 'text-green bg-green/10 dark:bg-green/5'
                  : status === 'pending'
                  ? 'text-orange bg-orange/10 dark:bg-orange/5'
                  : 'text-darkGray dark:text-five bg-darkGray/10 dark:bg-five/5',
                'flex justify-center items-center gap-2 py-3 text-xs font-bold rounded-md w-[6.5rem] h-10'
              )}
            >
              <span className='bg-current inline-block w-2 h-2 rounded-full'></span>
              <span>{formatStatus(status)}</span>
            </div>
          </div>

          <div className='hidden md:block'>
            <Image
              src='/assets/icon-arrow-right.svg'
              alt='right arrow'
              width={6}
              height={10}
            />
          </div>
        </li>
      </a>
    </Link>
  );
}
