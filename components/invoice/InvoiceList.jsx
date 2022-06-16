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
    <div className='row-start-1 col-start-1 p-6 pb-8'>
      <UtilityHeader
        invoiceCount={filteredInvoices.length}
        setFilters={setFilters}
      />
      <ul className='mt-8 md:mt-14'>
        {!filteredInvoices || filteredInvoices.length === 0 ? (
          <Invoice404 />
        ) : (
          filteredInvoices.map((invoice) => (
            <InvoiceListItem key={invoice.id} invoice={invoice} />
          ))
        )}
      </ul>
    </div>
  );
}
