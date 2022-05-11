import { useEffect, useState, useContext } from 'react';

import InvoiceList from '../components/invoice/InvoiceList';
import UtilityHeader from '../components/layout/UtilityHeader';
import Invoice404 from '../components/layout/Invoice404';
import NewInvoice from '../components/invoice/NewInvoice';
import InvoiceContext from '../store/context';
import { getInvoices } from '../lib/dbUtils';

export default function Home({ invoices }) {
  const [invoiceData, setInvoiceData] = useState([]);
  const { showInvoiceForm } = useContext(InvoiceContext);

  useEffect(() => {
    setInvoiceData(invoices);
  }, [invoices]);

  if (!invoiceData || invoiceData.length === 0) {
    return <Invoice404 />;
  }

  return (
    <main>
      <UtilityHeader invoiceCount={invoices.length} />
      <InvoiceList invoices={invoices} />

      {showInvoiceForm && <NewInvoice />}
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
