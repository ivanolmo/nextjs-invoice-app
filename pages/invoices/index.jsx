import { useContext } from 'react';

import { useAuth } from '../../context/AuthContext';
import InvoiceContext from '../../context/InvoiceContext';
import InvoiceAdd from '../../components/invoice/InvoiceAdd';
import InvoiceList from '../../components/invoice/InvoiceList';
import AuthCheck from '../../components/layout/AuthCheck';
import { useCollectionData } from '../../hooks/useCollectionData';

export default function Invoices() {
  const { showAddInvoiceForm } = useContext(InvoiceContext);

  const { user } = useAuth();

  const { data, loading, error } = useCollectionData(user);

  if (error) throw new Error();

  return (
    <AuthCheck>
      <div className='grid w-full grid-cols-1 md:justify-items-center lg:h-screen lg:overflow-y-scroll'>
        <InvoiceList data={data} loading={loading} />

        {showAddInvoiceForm && <InvoiceAdd />}
      </div>
    </AuthCheck>
  );
}