import Link from 'next/link';
import Head from 'next/head';
import '../styles/globals.scss';
import styles from './App.module.scss';

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Friendly Travel</title>
        <link rel="icon" href="/logo.svg" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&family=Yeseva+One&display=swap"
          rel="stylesheet"
        ></link>
      </Head>

      <header className={styles.header}>
        <nav className={styles.nav}>
          <Link href="/">
            <a className={styles.homeLink}>
              <h3>Friendly Travel</h3>
              <img src={'/logo.svg'} alt="logo" />
            </a>
          </Link>
          <Link href="/trips/">
            <a>Trips</a>
          </Link>
        </nav>
      </header>

      <main>
        <Component {...pageProps} />
      </main>

      <footer className={styles.footer}>
        <Link href="/">
          <a className={styles.homeLink}>
            <h2>Friendly Travel</h2>
            <img src={'/logo.svg'} alt="logo" />
          </a>
        </Link>
        <p>Travel solo, not alone</p>
      </footer>
    </>
  );
};

export default MyApp;
