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
        <li className='grid md:inline-grid grid-cols-[auto_1fr] md:grid-cols-[60px_120px_110px_120px_1fr_8px] auto-rows-auto gap-y-6 md:gap-x-5 mb-4 p-6 md:py-4 bg-white dark:bg-three rounded-lg text-xs border border-transparent hover:border-one w-full'>
          <div className='justify-self-start md:self-center font-bold md:mr-2'>
            <span className='text-seven'>#</span>
            <span className='dark:text-white'>{id}</span>
          </div>

          <div className='col-start-1 md:col-start-2 row-start-2 md:row-start-1 self-start md:self-center'>
            <span className='text-seven dark:text-five'>
              Due {paymentDue ? formatDate(paymentDue) : 'N/A'}
            </span>
          </div>

          <div className='col-start-1 md:col-start-4 row-start-2 md:row-start-1 self-end md:self-center md:justify-self-end mt-5 md:mt-0 md:mr-5'>
            <span className='text-base font-bold tracking-tight dark:text-white'>
              {formatMoney(total)}
            </span>
          </div>

          <div className='col-start-3 row-start-1 justify-self-end md:justify-self-start md:self-center'>
            <span className='text-seven dark:text-white tracking-tight'>
              {clientName || 'N/A'}
            </span>
          </div>

          <div className='flex justify-end items-center col-start-3 md:col-start-5'>
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

          <div className='hidden md:block col-start-6 self-center'>
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
