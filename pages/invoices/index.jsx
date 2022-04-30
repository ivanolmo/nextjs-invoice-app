import InvoiceList from '../../components/invoice/InvoiceList';
import InvoiceHeader from '../../components/layout/InvoiceHeader';
import Invoice404 from '../../components/layout/Invoice404';

export default function Invoices() {
  // simulate invoice count from state
  const invoiceCount = 7;

  return (
    <main>
      <InvoiceHeader />
      {invoiceCount === 0 ? <Invoice404 /> : <InvoiceList />}
    </main>
  );
}
