import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Roboto } from 'next/font/google';
import { Navbar } from '../components';
import Head from 'next/head';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import Router from 'next/router';
import NProgress from 'nprogress';

NProgress.configure({ showSpinner: false, trickleSpeed: 100 });

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300'],
});

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  useEffect(() => {
    const handleStart = () => NProgress.start();
    const handleStop = () => NProgress.done();

    Router.events.on('routeChangeStart', handleStart);
    Router.events.on('routeChangeComplete', handleStop);
    Router.events.on('routeChangeError', handleStop);

    return () => {
      Router.events.off('routeChangeStart', handleStart);
      Router.events.off('routeChangeComplete', handleStop);
      Router.events.off('routeChangeError', handleStop);
    };
  }, []);

  return (
    <main className={roboto.className}>
      <Head>
        <title>ARCFiction</title>
        <meta
          name="description"
          content="ARCFiction is a website that shows trending and popular media data. Search for your favorite movies and tv-shows."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Navbar />
      <Toaster
        toastOptions={{
          duration: 1500,
          style: {
            background: '#18181b',
            color: '#f4f4f5',
            border: '1px solid #3f3f46',
          },
        }}
      />
      <Component {...pageProps} />
    </main>
  );
}

export default MyApp;
