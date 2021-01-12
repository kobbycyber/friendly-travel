import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getSlug } from '../../utils/helpFunctions';
import styles from './TripGallery.module.scss';
import { fetchTrips } from '../../utils/fetchFunctions';
import { TripEntry } from '../../types';

const TripGallery = () => {
  const [trips, setTrips] = useState<TripEntry[]>([]);

  useEffect(() => {
    const getTrips = async () => {
      const allTrips = await fetchTrips(5);
      setTrips([...allTrips]);
    };

    getTrips();
  }, []);

  return (
    <article className={styles.mainWrapper}>
      {trips.map(trip => (
        <Link href={`/trips/${getSlug(trip.title)}/`} key={trip.title}>
          <a className={styles.cardWrapper}>
            <img src={trip.imageUrl} />
            <div className={styles.titleWrapper}>
              <p>{trip.title}</p>
            </div>
          </a>
        </Link>
      ))}
    </article>
  );
};

export default TripGallery;
