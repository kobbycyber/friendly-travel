import Link from 'next/link';
import { getReformattedDate, getSlug } from '../../utils/helpFunctions';

import styles from './TripCard.module.scss';

interface TripCardProps {
  trip: {
    title: string;
    startDate: string;
    endDate: string;
    imageUrl: string;
    price: string;
  };
}

const TripCard = ({ trip }: TripCardProps) => {
  const slug = getSlug(trip.title);

  return (
    <Link href={`/trips/${slug}/`}>
      <a className={styles.tripCard}>
        <img src={trip.imageUrl} />
        <div className={styles.textWrapper}>
          <div>
            <h2>{trip.title}</h2>
            <p>{getReformattedDate(trip.startDate, trip.endDate)}</p>
          </div>
          <p className={styles.price}>{trip.price}kr</p>
        </div>
      </a>
    </Link>
  );
};

export default TripCard;
