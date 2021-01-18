import React from 'react';
import Link from 'next/link';
import TripGallery from '../components/TripGallery/TripGallery';
import ReviewGallery from '../components/ReviewGallery/ReviewGallery';

import styles from './HomePage.module.scss';
import buttonStyles from '../styles/buttons.module.scss';

const HomePage = () => {
  return (
    <>
      <article className={styles.heroWrapper}>
        <div className={styles.logoWrapper}>
          <h1>Friendly Travel</h1>
          <img src="/logo.svg" alt="logo" />
        </div>
        <p>Travel solo, not alone</p>
      </article>

      <article className={styles.infoWrapper}>
        <h2>Ready for an Adventure?</h2>
        <p>
          We've got you! A lot of people wants to travel but has no one to accompany them. While
          traveling alone is always thrilling, it has its downsides as well. Enter Friendly Travel,
          where you can join a group of likeminded travelers for great experiences and new friends.
        </p>

        <Link href="/trips/">
          <a className={buttonStyles.primaryButton}>Let's go!</a>
        </Link>
      </article>

      <TripGallery />

      <ReviewGallery />
    </>
  );
};

export default HomePage;
