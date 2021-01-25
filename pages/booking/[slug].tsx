import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getReformattedDate } from '../../utils/helpFunctions';

import BookingForm from '../../components/BookingForm/BookingForm';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import NotFound from '../../components/NotFound/NotFound';

import styles from './BookingPage.module.scss';

import { TripEntry } from '../../types';

const BookingPage = () => {
  const [trip, setTrip] = useState<TripEntry>();
  const [notFound, setNotFound] = useState(false);

  const { slug } = useRouter().query;

  useEffect(() => {
    const getTrips = async () => {
      if (typeof slug === 'string') {
        const result = await (await fetch(`/api/trips/${slug}/`)).json();

        if (result) {
          setTrip(result);
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

  return (
    <article className={styles.bookingWrapper}>
      <h1>{trip.title}</h1>
      <h3>{getReformattedDate(trip.startDate, trip.endDate)}</h3>
      <h2 className={styles.price}>{trip.price}kr (excl. flight)</h2>

      <BookingForm trip={trip} />
    </article>
  );
};

export default BookingPage;
