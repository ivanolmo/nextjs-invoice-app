import Invoice from '../../components/invoice/Invoice';
import { getInvoiceById, getAllInvoices } from '../../lib/db';

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

export async function getStaticProps(context) {
  const id = context.params.id;
  const invoice = await getInvoiceById(id);

  return {
    props: {
      invoice,
    },
  };
}

export async function getStaticPaths() {
  const invoices = await getAllInvoices();

  return {
    paths: invoices.map((invoice) => ({
      params: { id: invoice.id },
    })),
    fallback: false,
  };
}
