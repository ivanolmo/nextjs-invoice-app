import { useContext, useEffect, useState } from 'react';
import useSWR from 'swr';

import InvoiceContext from '../store/context';
import UtilityHeader from '../components/layout/UtilityHeader';
import InvoiceList from '../components/invoice/InvoiceList';
import InvoiceAdd from '../components/invoice/InvoiceAdd';
import Invoice404 from '../components/layout/Invoice404';
import { db } from '../lib/firebaseAdmin';
import fetcher from '../utils/fetcher';

export default function Home({ allInvoicesData }) {
  const [invoices, setInvoices] = useState(allInvoicesData);

  const { showAddInvoiceForm } = useContext(InvoiceContext);

  const { data, mutate } = useSWR('/api/invoices/', fetcher, {
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
    <div className='py-8 px-6'>
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
  const snapshot = await db
    .collection('invoices')
    .orderBy('paymentDue', 'asc')
    .get();

  const invoices = [];
  const undatedInvoices = [];

  // check for invoices with no date and move them to end
  // firebase treats null as first as far as ordering
  snapshot.forEach((doc) => {
    if (!doc.data().paymentDue) {
      undatedInvoices.push({
        id: doc.id,
        ...doc.data(),
      });
    } else {
      invoices.push({
        id: doc.id,
        ...doc.data(),
      });
    }
  });

  const allInvoicesData = invoices.concat(undatedInvoices);

  return {
    props: { allInvoicesData },
    revalidate: 30,
  };
}
