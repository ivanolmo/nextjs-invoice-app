import { classNames } from '../../lib/formatUtils';

export default function InvoiceStatusBtn({ status }) {
  return (
    <button
      className={classNames(
        status === 'paid'
          ? 'bg-green hover:bg-[#29ab7f]'
          : 'bg-one hover:bg-two',
        'rounded-full w-full'
      )}
      disabled={status === 'paid'}
    >
      <p className='text-white text-xs font-bold my-3 mx-4 leading-tight'>
        {status === 'paid' ? 'Invoice Paid' : 'Mark as Paid'}
      </p>
    </button>
  );
}
