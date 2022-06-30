import Head from 'next/head';
import { ThemeProvider } from 'next-themes';
import { ToastContainer } from 'react-toastify';
import '@fontsource/spartan/500.css';
import '@fontsource/spartan/700.css';
import 'react-toastify/dist/ReactToastify.css';

import { InvoiceProvider } from '../context/InvoiceContext';
import MainHeader from '../components/layout/MainHeader';
import ErrorBoundary from './ErrorBoundary';
import '../styles/globals.scss';

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Next.js Invoice App</title>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width'
        />
        <meta
          name='description'
          content='A web app for invoices powered by React, Next.js, TailwindCSS, and Firebase, with full CRUD capabilities and responsive design'
        />
      </Head>

      <InvoiceProvider>
        <ThemeProvider attribute='class'>
          <div className='flex flex-col lg:flex-row'>
            <MainHeader />
            <ErrorBoundary>
              <Component {...pageProps} />
            </ErrorBoundary>
            <ToastContainer autoClose={3000} />
          </div>
        </ThemeProvider>
      </InvoiceProvider>
    </>
  );
}

export default App;
