import Link from 'next/link';
import { getReformattedDate, getSlug } from '../utils/helpFunctions';

import styles from './TripCard.module.scss';

interface TripCardProps {
  title: string;
  startDate: string;
  endDate: string;
  imageUrl: string;
}

const TripCard = ({ title, startDate, endDate, imageUrl }: TripCardProps) => {
  const slug = getSlug(title);

  return (
    <Link href={`/trips/${slug}/`}>
      <div className={styles.tripCard}>
        <img src={imageUrl} />
        <div className={styles.textWrapper}>
          <h2>{title}</h2>
          <p>{getReformattedDate(startDate, endDate)}</p>
        </div>
      </div>
    </Link>
  );
};

export default TripCard;
