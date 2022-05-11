import { useContext } from 'react';

import InvoiceListItem from './InvoiceListItem';
import InvoiceContext from '../../store/context';

export default function InvoiceList({ invoices }) {
  const { showInvoiceForm } = useContext(InvoiceContext);

  return (
    <ul className={`mx-6 ${showInvoiceForm ? 'opacity-0' : 'opacity-100'}`}>
      {invoices.map((invoice) => (
        <InvoiceListItem key={invoice.id} invoice={invoice} />
      ))}
    </ul>
  );
}
