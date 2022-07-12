import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { collection, orderBy, query } from 'firebase/firestore';

import { useAuth } from '../context/AuthContext';
import InvoiceContext from '../context/InvoiceContext';
import InvoiceAdd from '../components/invoice/InvoiceAdd';
import InvoiceList from '../components/invoice/InvoiceList';
import { db } from '../lib/firebase';
import { useCollectionData } from '../lib/hooks';

export default function Home() {
  const { showAddInvoiceForm } = useContext(InvoiceContext);

  const router = useRouter();

  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      router.push('/signin');
    }
  }, [user, router]);

  const [data, loading, error] = useCollectionData(
    user
      ? query(
          collection(db, 'users', user.uid, 'invoices'),
          orderBy('paymentDue', 'asc')
        )
      : null
  );

  if (error) throw new Error();

  return !user ? (
    <></>
  ) : (
    <div className='grid w-full grid-cols-1 md:justify-items-center lg:h-screen lg:overflow-y-scroll'>
      <InvoiceList invoices={data} loading={loading} />

      {showAddInvoiceForm && <InvoiceAdd />}
    </div>
  );
}

// export async function getServerSideProps() {
//   const snapshot = await getDocs(
//     query(collection(db, 'invoices'), orderBy('paymentDue', 'asc'))
//   );

//   if (!snapshot.docs) {
//     return {
//       notFound: true,
//     };
//   }

//   const initialData = snapshot.docs.map((doc) => ({
//     id: doc.id,
//     ...doc.data(),
//   }));

//   return {
//     props: { initialData },
//   };
// }
