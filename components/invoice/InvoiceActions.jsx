import EditInvoiceBtn from '../ui/EditInvoiceBtn';
import DeleteInvoiceBtn from '../ui/DeleteInvoiceBtn';
import InvoiceStatusBtn from '../ui/InvoiceStatusBtn';

export default function InvoiceActions({ status }) {
  return (
    <footer className='flex justify-between gap-2 bg-white mt-14 px-6 py-5'>
      <EditInvoiceBtn />
      <DeleteInvoiceBtn />
      {status !== 'draft' && <InvoiceStatusBtn status={status} />}
    </footer>
  );
}
