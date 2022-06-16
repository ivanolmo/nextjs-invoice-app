import { useContext, useEffect, useState } from 'react';
import useSWR from 'swr';

import InvoiceContext from '../context/InvoiceContext';
import InvoiceAdd from '../components/invoice/InvoiceAdd';
import InvoiceList from '../components/invoice/InvoiceList';
import { db } from '../lib/firebaseAdmin';
import { fetcher } from '../utils/utils';

export default function Home({ allInvoicesData }) {
  const [invoices, setInvoices] = useState(allInvoicesData);

  const { showAddInvoiceForm } = useContext(InvoiceContext);

  // update invoices list if data is updated
  const { data, mutate } = useSWR('/api/invoices/', fetcher);

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
    <div className='grid grid-cols-1'>
      <InvoiceList invoices={invoices} />

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

  // check for invoices with no date and move them to end of array
  // because firebase treats null as first as far as ordering
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
