import { useContext } from 'react';

import InvoiceContext from '../../store/context';
import Invoice from '../../components/invoice/Invoice';
import InvoiceEdit from '../../components/invoice/InvoiceEdit';
import { db } from '../../lib/firebaseAdmin';

export default function InvoicePage({ invoice }) {
  const { showEditInvoiceForm } = useContext(InvoiceContext);

  return (
    <>
      <Invoice invoice={invoice} />

      {showEditInvoiceForm && <InvoiceEdit />}
    </>
  );
}

export async function getServerSideProps(context) {
  const id = context.params.id;

  const doc = await db.collection('invoices').doc(id).get();

  const invoice = doc.data();

  if (!invoice) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      invoice,
    },
  };
}
