import React from 'react';
import { server } from '../../config/index';
import { getReformattedDate } from '../../utils/helpFunctions';

import BookingForm from '../../components/BookingForm/BookingForm';
import NotFound from '../../components/NotFound/NotFound';

import styles from './BookingPage.module.scss';

import { TripEntry } from '../../types';

interface BookingPageProps {
  trip: TripEntry;
}

const BookingPage = ({ trip }: BookingPageProps) => {
  if (!trip.title) {
    return <NotFound />;
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

export async function getServerSideProps(context: any) {
  const slug = context.query.slug;
  const res = await fetch(`${server}/api/trips/${slug}/`);
  const trip = await res.json();
  const props: BookingPageProps = { trip };
  return { props };
}

export default BookingPage;
