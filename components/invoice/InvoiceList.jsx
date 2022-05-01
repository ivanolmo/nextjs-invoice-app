import InvoiceListItem from './InvoiceListItem';

export default function InvoiceList({ invoices }) {
  return (
    <ul className='mx-6'>
      {invoices.map((invoice) => (
        <InvoiceListItem key={invoice.id} invoice={invoice} />
      ))}
    </ul>
  );
}
