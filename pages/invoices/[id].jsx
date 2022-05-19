import Invoice from '../../components/invoice/Invoice';
import { getInvoiceById } from '../../lib/dbAdmin';

export default function InvoicePage({ invoice }) {
  return (
    <main>
      <section className='mt-8'>
        <Invoice invoice={invoice} />
      </section>
      {/* TODO edit/delete/mark buttons */}
    </main>
  );
}

export async function getServerSideProps(context) {
  const id = context.params.id;
  const invoice = await getInvoiceById(id);

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
