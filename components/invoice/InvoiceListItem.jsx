import Image from 'next/image';
import Link from 'next/link';

import {
  classNames,
  formatDate,
  formatMoney,
  formatStatus,
} from '../../utils/utils';

export default function InvoiceListItem({ invoice }) {
  const { id, invoiceId, paymentDue, total, clientName, status } = invoice;

  return (
    <li>
      <Link href={`/invoices/${id}`}>
        <a>
          <div className='grid md:inline-grid grid-cols-[auto_1fr] md:grid-cols-[60px_120px_110px_120px_1fr_8px] auto-rows-auto gap-y-6 md:gap-x-5 mb-4 p-6 md:py-4 lg:pl-8 lg:pr-6 bg-white dark:bg-slate-900 rounded-lg text-xs border border-transparent hover:border-violet-500 w-full'>
            <div className='justify-self-start md:self-center font-bold md:mr-2'>
              <span className='text-indigo-400'>#</span>
              <span className='dark:text-white'>{invoiceId}</span>
            </div>

            <div className='col-start-1 md:col-start-2 row-start-2 md:row-start-1 self-start md:self-center'>
              <span className='text-indigo-400 dark:text-indigo-100'>
                Due {paymentDue ? formatDate(paymentDue) : 'N/A'}
              </span>
            </div>

            <div className='col-start-1 md:col-start-4 row-start-2 md:row-start-1 self-end md:self-center md:justify-self-end mt-5 md:mt-0 md:mr-5'>
              <span className='text-base font-bold tracking-tight dark:text-white'>
                {formatMoney(total)}
              </span>
            </div>

            <div className='col-start-3 row-start-1 justify-self-end md:justify-self-start md:self-center'>
              <span className='text-indigo-400 dark:text-white tracking-tight'>
                {clientName || 'N/A'}
              </span>
            </div>

            <div className='flex justify-end items-center col-start-3 md:col-start-5'>
              <div
                className={classNames(
                  status === 'paid'
                    ? 'text-emerald-400 bg-emerald-400/10 dark:bg-emerald-400/5'
                    : status === 'pending'
                    ? 'text-orange-500 bg-orange-500/10 dark:bg-orange-500/5'
                    : 'text-slate-700 dark:text-indigo-100 bg-slate-700/10 dark:bg-indigo-100/5',
                  'flex justify-center items-center gap-2 py-3 text-xs font-bold rounded-md w-[6.5rem] h-10'
                )}
              >
                <span className='bg-current inline-block w-2 h-2 rounded-full'></span>
                <span>{formatStatus(status)}</span>
              </div>
            </div>

            <div className='hidden md:block col-start-6 self-center w-2 h-3'>
              <Image
                src='/assets/icon-arrow-right.svg'
                alt='right arrow'
                width='7px'
                height='10px'
                layout='responsive'
              />
            </div>
          </div>
        </a>
      </Link>
    </li>
  );
}
