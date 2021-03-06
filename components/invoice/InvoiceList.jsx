import { useEffect, useState } from 'react';

import InvoiceListItem from './InvoiceListItem';
import Invoice404 from '../layout/Invoice404';
import UtilityHeader from '../layout/UtilityHeader';
import LoadingSpinner from '../ui/LoadingSpinner';

export default function InvoiceList({ data, loading }) {
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    if (!data) return;
    const filtered = data?.filter((invoice) => {
      if (filters && filters.length > 0) {
        return filters.includes(invoice.status);
      } else {
        return true;
      }
    });

    setFilteredInvoices(filtered);
  }, [data, filters]);

  return (
    <div className='row-start-1 col-start-1 p-6 pb-8 md:px-0 md:py-14 lg:py-20 md:w-[672px] lg:w-[730px]'>
      <UtilityHeader
        invoiceCount={filteredInvoices && filteredInvoices.length}
        setFilters={setFilters}
        loading={loading}
      />
      <div className='mt-8 md:mt-14 lg:mt-16'>
        {loading ? (
          <div className='flex items-center justify-center mt-60'>
            <LoadingSpinner />
          </div>
        ) : !filteredInvoices || filteredInvoices.length === 0 ? (
          <Invoice404 />
        ) : (
          <ul>
            {filteredInvoices.map((invoice) => (
              <InvoiceListItem key={invoice.id} invoice={invoice} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
