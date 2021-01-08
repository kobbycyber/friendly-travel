import React from 'react';
import styles from './LoadingSpinner.module.scss';

const LoadingSpinner = () => {
  return (
    <article className={styles.loadingWrapper}>
      <img src="/loading-spinner.svg" alt="loading" />
    </article>
  );
};

export default LoadingSpinner;
