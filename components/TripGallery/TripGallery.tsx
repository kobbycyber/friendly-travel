import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getSlug } from '../../utils/helpFunctions';
import styles from './TripGallery.module.scss';
import { fetchRandomTrips } from '../../utils/fetchFunctions';
import { TripEntry } from '../../types';

const TripGallery = () => {
  const [trips, setTrips] = useState<TripEntry[]>([]);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const getTrips = async () => {
      const allTrips = await fetchRandomTrips(5);

      if (allTrips) {
        setTrips([...allTrips]);
      } else {
        setNotFound(true);
      }
    };

    getTrips();
  }, []);

  if (notFound) {
    return <></>;
  }

  return (
    <article className={styles.mainWrapper}>
      <h2>Find Your Next Destination</h2>
      <div className={styles.galleryWrapper}>
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
      </div>
    </article>
  );
};

export default TripGallery;
