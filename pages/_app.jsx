import Head from 'next/head';
import { ThemeProvider } from 'next-themes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@fontsource/spartan/500.css';
import '@fontsource/spartan/700.css';

import { AuthProvider } from '../context/AuthContext';
import { InvoiceProvider } from '../context/InvoiceContext';
import ErrorBoundary from '../components/layout/ErrorBoundary';
import MainHeader from '../components/layout/MainHeader';
import '../styles/globals.scss';

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Invoices powered by Next.js</title>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width'
        />
      </Head>

      <AuthProvider>
        <InvoiceProvider>
          <ThemeProvider attribute='class'>
            <div className='grid lg:grid-cols-[104px_1fr]'>
              <MainHeader />
              <ErrorBoundary>
                <Component {...pageProps} />
              </ErrorBoundary>
              <ToastContainer autoClose={5000} />
            </div>
          </ThemeProvider>
        </InvoiceProvider>
      </AuthProvider>
    </>
  );
}

export default App;
