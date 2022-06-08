import Head from 'next/head';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { InvoiceProvider } from '../store/context';
import MainHeader from '../components/layout/MainHeader';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Next.js Invoice App</title>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width'
        />
      </Head>

      <InvoiceProvider>
        <div className='bg-eleven relative min-w-max'>
          <MainHeader />
          <Component {...pageProps} />
        </div>
        <ToastContainer autoClose={3000} />
      </InvoiceProvider>
    </>
  );
}

export default MyApp;
