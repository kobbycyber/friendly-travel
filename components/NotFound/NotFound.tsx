import React from 'react';
import Link from 'next/link';

import styles from './NotFound.module.scss';
import buttonStyles from '../../styles/buttons.module.scss';

const NotFound = () => {
  return (
    <section className={styles.notFoundWrapper}>
      <div className={styles.textWrapper}>
        <h1>404</h1>
        <p>We can not find what you are looking for...</p>
        <p>
          Please try again. If the problem persists, please get in touch with our friendly
          <a href="mailto:friendly-travel@notreal.com"> support team</a>.
        </p>
      </div>

      <div className={buttonStyles.buttonWrapper}>
        <Link href="/">
          <a className={buttonStyles.secondaryButton}>Back to start</a>
        </Link>
        <Link href="/trips/">
          <a className={buttonStyles.primaryButton}>All trips</a>
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
