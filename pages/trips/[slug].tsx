import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { documentToReactComponents, Options } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import { fetchTripBySlug } from '../../utils/fetchFunctions';
import { getReformattedDate } from '../../utils/helpFunctions';

import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import NotFound from '../../components/NotFound/NotFound';

import styles from './TripPage.module.scss';
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
    return <NotFound />;
  }

  if (!trip) {
    return <LoadingSpinner />;
  }

  const options: Options = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => <p>{children}</p>,
    },
  };

  return (
    <article className={styles.tripWrapper}>
      <h1>{trip.title}</h1>
      <h3>{getReformattedDate(trip.startDate, trip.endDate)}</h3>

      <img src={trip.imageUrl} />

      <div className={styles.textBody}>
        {documentToReactComponents(trip.body, options)}
      </div>

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
