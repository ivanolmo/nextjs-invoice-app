import Invoice from '../../components/invoice/Invoice';
import BackButton from '../../components/ui/BackButton';
import { getInvoiceById, getInvoices } from '../../lib/dbUtils';

export default function InvoicePage({ invoice }) {
  return (
    <main>
      <section className='mt-8'>
        <BackButton />
        <Invoice invoice={invoice} />
      </section>
      {/* TODO edit/delete/mark buttons */}
    </main>
  );
}

export async function getStaticProps(context) {
  const invoiceId = context.params.invoiceId;
  const invoice = await getInvoiceById(invoiceId);

  return {
    props: {
      invoice,
    },
  };
}

export async function getStaticPaths() {
  const invoices = await getInvoices();

  return {
    paths: invoices.map((invoice) => ({ params: { invoiceId: invoice.id } })),
    fallback: false,
  };
}
