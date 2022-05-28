import { useContext } from 'react';

import InvoiceContext from '../../store/context';
import Invoice from '../../components/invoice/Invoice';
import InvoiceEdit from '../../components/invoice/InvoiceEdit';
import { getInvoiceById } from '../../lib/dbAdmin';

export default function InvoicePage({ invoiceData }) {
  const { showEditInvoiceForm } = useContext(InvoiceContext);

  return (
    <div className='relative'>
      <Invoice invoice={invoiceData} />

      {showEditInvoiceForm && <InvoiceEdit />}
    </div>
  );
}

export async function getServerSideProps(context) {
  const id = context.params.id;
  const invoiceData = await getInvoiceById(id);

  if (!invoiceData) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      invoiceData,
    },
  };
}
