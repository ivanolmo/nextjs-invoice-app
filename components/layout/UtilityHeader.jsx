import FilterButton from '../ui/FilterButton';
import NewInvoiceBtn from '../ui/NewInvoiceBtn';

export default function UtilityHeader({
  invoiceCount,
  showInvoiceForm,
  setShowInvoiceForm,
}) {
  return (
    <header
      className={`flex justify-between items-center mt-8 px-6 ${
        showInvoiceForm ? 'opacity-0' : 'opacity-100'
      }`}
    >
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
        <NewInvoiceBtn
          buttonText={'New'}
          buttonIcon={true}
          setShowInvoiceForm={setShowInvoiceForm}
        />
      </div>
    </header>
  );
}
