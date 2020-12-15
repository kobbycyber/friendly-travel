import '../styles/globals.scss';
import Link from 'next/link';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Friendly Travel</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <nav>
          <Link href="/">
            <a>Home</a>
          </Link>
          <Link href="/trips/">
            <a>Trips</a>
          </Link>
        </nav>
      </header>

      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
