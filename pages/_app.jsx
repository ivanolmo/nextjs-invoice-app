import { InvoiceProvider } from '../store/context';
import MainHeader from '../components/layout/MainHeader';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <InvoiceProvider>
      <MainHeader />
      <Component {...pageProps} />
    </InvoiceProvider>
  );
}

export default MyApp;
