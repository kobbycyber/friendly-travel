import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { fetchTripBySlug } from '../../utils/fetchFunctions';
import { getReformattedDate } from '../../utils/helpFunctions';

import styles from './[slug].module.scss';
import buttonStyles from '../../styles/buttons.module.scss';

import { TripEntry } from '../../types';

const TripPage = () => {
  const [trip, setTrip] = useState<TripEntry | null>(null);
  const [notFound, setNotFound] = useState(false);

  const { slug } = useRouter().query;

  useEffect(() => {
    const getTrips = async () => {
      if (typeof slug === 'string') {
        const trip = await fetchTripBySlug(slug);
        if (trip) {
          setTrip(trip);
        } else {
          setNotFound(true);
        }
      }
    };

    getTrips();
  }, [slug]);

  if (notFound) {
    return '404';
  }

  if (!trip) {
    return 'loading';
  }

  return (
    <article className={styles.tripWrapper}>
      <h1>{trip.title}</h1>
      <h3>{getReformattedDate(trip.startDate, trip.endDate)}</h3>

      <img src={trip.imageUrl} />

      <div
        className={styles.textBody}
        dangerouslySetInnerHTML={{ __html: documentToHtmlString(trip.body) }}
      />

      <p className={styles.price}>Price: {trip.price}kr (excl. flight)</p>

      <div className={styles.buttonWrapper}>
        <Link href="/trips/">
          <a className={buttonStyles.secondaryButton}>Back</a>
        </Link>
        <Link href={`/booking/${slug}/`}>
          <a className={buttonStyles.primaryButton}>Book now</a>
        </Link>
      </div>
    </article>
  );
};

export default TripPage;
