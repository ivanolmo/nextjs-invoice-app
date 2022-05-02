import { useEffect, useState } from 'react';

import InvoiceList from '../../components/invoice/InvoiceList';
import UtilityHeader from '../../components/layout/UtilityHeader';
import Invoice404 from '../../components/layout/Invoice404';
import { getInvoices } from '../../lib/dbUtils';

export default function Invoices({ invoices }) {
  const [invoiceData, setInvoiceData] = useState([]);

  useEffect(() => {
    setInvoiceData(invoices);
  }, [invoices]);

  if (!invoiceData || invoiceData.length === 0) {
    return <Invoice404 />;
  }

  return (
    <main>
      <UtilityHeader invoiceCount={invoiceData.length} />
      <InvoiceList invoices={invoices} />
    </main>
  );
}

export async function getStaticProps() {
  const invoices = await getInvoices();

  return {
    props: { invoices },
    revalidate: 43200,
  };
}
