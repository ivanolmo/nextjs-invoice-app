import { useContext, useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';

import InvoiceContext from '../context/InvoiceContext';
import InvoiceAdd from '../components/invoice/InvoiceAdd';
import InvoiceList from '../components/invoice/InvoiceList';
import { db } from '../lib/firebase';

export default function Home({ allInvoicesData }) {
  const [invoices, setInvoices] = useState(allInvoicesData);

  const { showAddInvoiceForm } = useContext(InvoiceContext);

  const [data, loading] = useCollection(
    query(collection(db, 'invoices'), orderBy('paymentDue', 'asc'))
  );

  useEffect(() => {
    if (data) {
      const invoiceArr = [];

      data.forEach((doc) => invoiceArr.push(doc.data()));

      setInvoices(invoiceArr);
    }
  }, [data]);

  return (
    <div className='grid grid-cols-1 md:justify-items-center w-full lg:h-screen lg:overflow-y-scroll'>
      <InvoiceList invoices={invoices} loading={loading} />

      {showAddInvoiceForm && <InvoiceAdd />}
    </div>
  );
}

export async function getStaticProps() {
  const snapshot = await getDocs(
    query(collection(db, 'invoices'), orderBy('paymentDue', 'asc'))
  );

  const allInvoicesData = [];
  snapshot.forEach((doc) => allInvoicesData.push(doc.data()));

  return {
    props: { allInvoicesData },
    revalidate: 30,
  };
}
