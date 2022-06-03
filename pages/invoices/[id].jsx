import { useContext, useEffect, useState } from 'react';
import useSWR from 'swr';

import InvoiceContext from '../../store/context';
import Invoice from '../../components/invoice/Invoice';
import InvoiceEdit from '../../components/invoice/InvoiceEdit';
import { db } from '../../lib/firebaseAdmin';
import fetcher from '../../utils/fetcher';

export default function InvoicePage({ invoiceData }) {
  const [invoice, setInvoice] = useState(invoiceData);

  const { showEditInvoiceForm } = useContext(InvoiceContext);

  // refresh invoice on screen if data is updated
  const { data, mutate } = useSWR(`/api/invoice/${invoice.id}`, fetcher, {
    revalidateOnMount: true,
  });

  useEffect(() => {
    if (data) {
      setInvoice(data.invoice);
    }
  }, [data]);

  mutate();

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

  const invoiceData = doc.data();

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
