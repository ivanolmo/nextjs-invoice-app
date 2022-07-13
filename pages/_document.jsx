import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <meta
          name='description'
          content='A web app for invoices powered by React, Next.js, TailwindCSS, and Firebase, with full CRUD capabilities and responsive design'
        />
        <link href='https://identitytoolkit.googleapis.com' rel='preconnect' />
        <link href='https://invoice-appv2.firebase.app' rel='preconnect' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
