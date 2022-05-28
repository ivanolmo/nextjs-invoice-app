import { useContext, useEffect, useState } from 'react';
import useSWR from 'swr';

import InvoiceContext from '../store/context';
import UtilityHeader from '../components/layout/UtilityHeader';
import InvoiceList from '../components/invoice/InvoiceList';
import InvoiceAdd from '../components/invoice/InvoiceAdd';
import Invoice404 from '../components/layout/Invoice404';
import { getAllInvoices } from '../lib/dbAdmin';
import fetcher from '../utils/fetcher';

export default function Home({ allInvoicesData }) {
  const { showAddInvoiceForm } = useContext(InvoiceContext);

  const [invoices, setInvoices] = useState(allInvoicesData);

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
    <div className='py-8 px-6 relative'>
      <UtilityHeader invoiceCount={invoices.length} />

      {!invoices || invoices.length === 0 ? (
        <Invoice404 />
      ) : (
        <InvoiceList invoices={invoices} />
      )}

      {showAddInvoiceForm && <InvoiceAdd />}
    </div>
  );
}

export async function getStaticProps() {
  const allInvoicesData = await getAllInvoices();

  return {
    props: { allInvoicesData },
    revalidate: 30,
  };
}
