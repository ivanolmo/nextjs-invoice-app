import { useContext } from 'react';

import InvoiceList from '../components/invoice/InvoiceList';
import UtilityHeader from '../components/layout/UtilityHeader';
import Invoice404 from '../components/layout/Invoice404';
import NewInvoice from '../components/invoice/NewInvoice';
import InvoiceContext from '../store/context';
import { getAllInvoices } from '../lib/db';

export default function Home({ invoices }) {
  const { showInvoiceForm } = useContext(InvoiceContext);

  if (!invoices || invoices.length === 0) {
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
  const invoices = await getAllInvoices();

  return {
    props: { invoices },
    revalidate: 43200,
  };
}
