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
        <li className='flex justify-between my-4 p-6 bg-white rounded-lg text-sm'>
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
          <div className='flex flex-col items-end gap-6 w-[6.5rem]'>
            <div className='text-seven tracking-tight'>{clientName}</div>
            <div
              className={classNames(
                status === 'paid'
                  ? 'text-green bg-green/10'
                  : status === 'pending'
                  ? 'text-orange bg-orange/10'
                  : 'text-darkGray bg-darkGray/10',
                'p-2.5 font-bold rounded-md w-full text-center'
              )}
            >
              <span className='bg-current inline-block mr-2 w-2 h-2 rounded-full'></span>
              {formatStatus(status)}
            </div>
          </div>
        </li>
      </a>
    </Link>
  );
}
