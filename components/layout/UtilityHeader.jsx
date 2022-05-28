import FilterButton from '../ui/FilterButton';
import NewInvoiceBtn from '../ui/NewInvoiceBtn';

export default function UtilityHeader({ invoiceCount }) {
  return (
    <div className='flex justify-between items-center'>
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
        {/* TODO Refactor to Button comp */}
        <NewInvoiceBtn buttonText={'New'} buttonIcon={true} />
      </div>
    </div>
  );
}
