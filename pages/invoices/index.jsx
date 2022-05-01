import { useEffect, useState } from 'react';

import InvoiceList from '../../components/invoice/InvoiceList';
import UtilityHeader from '../../components/layout/UtilityHeader';
import Invoice404 from '../../components/layout/Invoice404';

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
  const res = await fetch(
    'https://invoice-app-e8de3-default-rtdb.firebaseio.com/invoices.json'
  );
  const invoices = await res.json();

  return {
    props: { invoices },
    revalidate: 43200,
  };
}
