import InvoiceList from '../components/invoice/InvoiceList';
import InvoiceHeader from '../components/layout/InvoiceHeader';
import Invoice404 from '../components/layout/Invoice404';

export default function Home() {
  return (
    <main>
      <InvoiceHeader />
      {/* TODO make this conditional */}
      {/* <Invoice404 /> */}
      <InvoiceList />
    </main>
  );
}
