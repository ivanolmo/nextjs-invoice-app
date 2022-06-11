import { useEffect, useState } from 'react';

import UtilityHeader from '../layout/UtilityHeader';
import InvoiceListItem from './InvoiceListItem';
import Invoice404 from '../layout/Invoice404';

export default function InvoiceList({ invoices }) {
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    const filtered = invoices.filter((invoice) => {
      if (filters && filters.length > 0) {
        return filters.includes(invoice.status);
      } else {
        return true;
      }
    });

    setFilteredInvoices(filtered);
  }, [filters, invoices]);

  return (
    <>
      <UtilityHeader
        invoiceCount={filteredInvoices.length}
        setFilters={setFilters}
      />
      <ul className='mt-8'>
        {!invoices || invoices.length === 0 ? (
          <Invoice404 />
        ) : (
          filteredInvoices.map((invoice) => (
            <InvoiceListItem key={invoice.id} invoice={invoice} />
          ))
        )}
      </ul>
    </>
  );
}
