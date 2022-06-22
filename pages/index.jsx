import { useContext } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';

import InvoiceContext from '../context/InvoiceContext';
import InvoiceAdd from '../components/invoice/InvoiceAdd';
import InvoiceList from '../components/invoice/InvoiceList';
import { db } from '../lib/firebase';
import { useCollectionDataSSR } from '../lib/hooks';

export default function Home({ invoices }) {
  const { showAddInvoiceForm } = useContext(InvoiceContext);

  const [data, loading, error] = useCollectionDataSSR(
    query(collection(db, 'invoices'), orderBy('paymentDue', 'asc')),
    { startsWith: invoices }
  );

  // TODO add better loading/no invoice UI
  if (loading || error) {
    return <div>Loading</div>;
  }

  if (!data || !invoices) {
    return <div>No Invoices</div>;
  }

  return (
    <div className='grid grid-cols-1 md:justify-items-center w-full lg:h-screen lg:overflow-y-scroll'>
      <InvoiceList invoices={data ?? invoices} />

      {showAddInvoiceForm && <InvoiceAdd />}
    </div>
  );
}

export async function getStaticProps() {
  const snapshot = await getDocs(
    query(collection(db, 'invoices'), orderBy('paymentDue', 'asc'))
  );

  const invoices = snapshot.docs.map((doc) => doc.data());

  return {
    props: { invoices },
  };
}
