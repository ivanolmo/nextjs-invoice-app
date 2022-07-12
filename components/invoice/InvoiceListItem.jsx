import Image from 'next/image';
import Link from 'next/link';

import {
  classNames,
  formatCapitalize,
  formatDate,
  formatMoney,
} from '../../utils';

export default function InvoiceListItem({ invoice }) {
  const { clientName, id, invoiceId, paymentDue, status, total } = invoice;

  return (
    <li>
      <Link href={`/invoices/${id}`}>
        <a>
          <div className='grid md:inline-grid grid-cols-[auto_1fr] md:grid-cols-[60px_120px_110px_120px_1fr_8px] auto-rows-auto gap-y-6 md:gap-x-5 mb-4 p-6 md:py-4 lg:pl-8 lg:pr-6 bg-white dark:bg-slate-900 rounded-lg text-xs border border-transparent hover:border-violet-500 w-full'>
            <div className='font-bold justify-self-start md:self-center md:mr-2'>
              <span className='text-indigo-400'>#</span>
              <span className='dark:text-white'>{invoiceId}</span>
            </div>

            <div className='self-start col-start-1 row-start-2 md:col-start-2 md:row-start-1 md:self-center'>
              <span className='text-indigo-400 dark:text-indigo-100'>
                Due {paymentDue ? formatDate(paymentDue) : 'N/A'}
              </span>
            </div>

            <div className='self-end col-start-1 row-start-2 mt-5 md:col-start-4 md:row-start-1 md:self-center md:justify-self-end md:mt-0 md:mr-5'>
              <span className='text-base font-bold tracking-tight dark:text-white'>
                {formatMoney(total)}
              </span>
            </div>

            <div className='col-start-3 row-start-1 justify-self-end md:justify-self-start md:self-center'>
              <span className='tracking-tight text-indigo-400 dark:text-white'>
                {clientName || 'N/A'}
              </span>
            </div>

            <div className='flex items-center justify-end col-start-3 md:col-start-5'>
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
                <span className='inline-block w-2 h-2 bg-current rounded-full'></span>
                <span>{formatCapitalize(status)}</span>
              </div>
            </div>

            <div className='self-center hidden w-2 h-3 col-start-6 md:block'>
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
