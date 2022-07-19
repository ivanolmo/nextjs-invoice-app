import { useContext } from 'react';
import { collection, orderBy, query } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import { useAuth } from '../../context/AuthContext';
import InvoiceContext from '../../context/InvoiceContext';
import InvoiceAdd from '../../components/invoice/InvoiceAdd';
import InvoiceList from '../../components/invoice/InvoiceList';
import AuthCheck from '../../components/layout/AuthCheck';
import { db } from '../../lib/firebase';

export default function Invoices() {
  const { showAddInvoiceForm } = useContext(InvoiceContext);

  const { user } = useAuth();

  const [data, loading, error] = useCollectionData(
    user
      ? query(
          collection(db, `/users/${user.uid}/invoices`),
          orderBy('paymentDue', 'asc')
        )
      : null
  );

  if (error) throw new Error('asdf');

  return (
    <AuthCheck>
      <div className='grid w-full grid-cols-1 md:justify-items-center lg:h-screen lg:overflow-y-scroll'>
        <InvoiceList data={data} loading={loading} />

        {showAddInvoiceForm && <InvoiceAdd />}
      </div>
    </AuthCheck>
  );
}
