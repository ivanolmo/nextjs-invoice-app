import InvoiceListItem from './InvoiceListItem';

export default function InvoiceList({ invoices }) {
  return (
    <ul className='mt-8'>
      {invoices.map((invoice) => (
        <InvoiceListItem key={invoice.id} invoice={invoice} />
      ))}
    </ul>
  );
}
