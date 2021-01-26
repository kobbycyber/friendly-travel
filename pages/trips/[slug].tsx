import React from 'react';
import Link from 'next/link';
import { documentToReactComponents, Options } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import { server } from '../../config/index';
import { getReformattedDate } from '../../utils/helpFunctions';

import NotFound from '../../components/NotFound/NotFound';

import styles from './TripPage.module.scss';
import buttonStyles from '../../styles/buttons.module.scss';

import { TripEntry } from '../../types';

interface TripPageProps {
  trip: TripEntry;
  slug: string;
}

const TripPage = ({ trip, slug }: TripPageProps) => {
  if (!trip.title) {
    return <NotFound />;
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

      <div className={styles.textBody}>{documentToReactComponents(trip.body, options)}</div>

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

export async function getServerSideProps(context: any) {
  const slug = context.query.slug;
  const res = await fetch(`${server}/api/trips/${slug}/`);
  const trip = await res.json();
  const props: TripPageProps = { trip, slug };
  return { props };
}

export default TripPage;
