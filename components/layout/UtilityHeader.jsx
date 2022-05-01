import Link from 'next/link';

import FilterButton from '../ui/FilterButton';
import Button from '../ui/Button';

export default function UtilityHeader({ invoiceCount }) {
  return (
    <header className='flex justify-between items-center mt-8 px-6'>
      <div>
        <h1 className='text-xl md:text-3xl font-bold tracking-tight'>
          Invoices
        </h1>
        <h3 className='text-six text-xs tracking-tight'>
          {invoiceCount ? invoiceCount : 'No'} Invoices
        </h3>
      </div>
      <div className='flex justify-between items-center gap-4'>
        <FilterButton />
        <Link href='/invoices/create'>
          <a>
            <Button buttonText={'New'} buttonIcon={true} />
          </a>
        </Link>
      </div>
    </header>
  );
}
