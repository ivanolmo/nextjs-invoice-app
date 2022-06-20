import Head from 'next/head';
import { ThemeProvider } from 'next-themes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { InvoiceProvider } from '../context/InvoiceContext';
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
        <ThemeProvider attribute='class'>
          <div className='flex flex-col lg:flex-row'>
            <MainHeader />
            <Component {...pageProps} />
            <ToastContainer autoClose={3000} />
          </div>
        </ThemeProvider>
      </InvoiceProvider>
    </>
  );
}

export default MyApp;
