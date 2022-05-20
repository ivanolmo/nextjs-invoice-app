import { useContext, useEffect, useState } from 'react';
import useSWR from 'swr';

import InvoiceList from '../components/invoice/InvoiceList';
import UtilityHeader from '../components/layout/UtilityHeader';
import Invoice404 from '../components/layout/Invoice404';
import InvoiceForm from '../components/invoice/InvoiceForm';
import InvoiceContext from '../store/context';
import { getAllInvoices } from '../lib/dbAdmin';
import fetcher from '../utils/fetcher';

export default function Home({ invoiceData }) {
  const { showInvoiceForm } = useContext(InvoiceContext);

  const [invoices, setInvoices] = useState(invoiceData);

  const { data, mutate } = useSWR('/api/invoice/', fetcher, {
    revalidateOnMount: true,
  });

  useEffect(() => {
    if (data) {
      const invoiceArr = [];

      for (const key in data) {
        invoiceArr.push(...data[key]);
      }

      setInvoices(invoiceArr);
    }
  }, [data]);

  mutate();

  return (
    <main>
      <UtilityHeader invoiceCount={invoices.length} />
      {!invoices || invoices.length === 0 ? (
        <Invoice404 />
      ) : (
        <InvoiceList invoices={invoices} />
      )}

      {showInvoiceForm && <InvoiceForm />}
    </main>
  );
}

export async function getStaticProps() {
  const invoiceData = await getAllInvoices();

  return {
    props: { invoiceData },
    revalidate: 10,
  };
}
