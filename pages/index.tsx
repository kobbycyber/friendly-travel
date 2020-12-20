import React, { useState, useEffect } from 'react';
import TripGalleryCard from '../components/TripGalleryCard/TripGalleryCard';
import { fetchTrips } from '../utils/fetchFunctions';

import styles from './index.module.scss';

const HomePage = () => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const getTrips = async () => {
      const allTrips = await fetchTrips(5);
      setTrips([...allTrips]);
    };

    getTrips();
  }, []);

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
      </article>

      <article className={styles.tripCardWrapper}>
        {trips.map(t => (
          <TripGalleryCard
            key={t.fields.title}
            title={t.fields.title}
            imageUrl={t.fields.image.fields.file.url}
          />
        ))}
      </article>
    </>
  );
};

export default HomePage;
