import Link from 'next/link';
import { reformatDate } from '../utils/helpFunctions';

import styles from './TripCard.module.scss';

interface TripCardProps {
  title: string;
  startDate: string;
  endDate: string;
  imageUrl: string;
}

  const getSlug = (title: string) => {
    return 'san-fransisco';
  };
  const slug = getSlug(title);
const TripCard = ({ title, startDate, endDate, imageUrl }: TripCardProps) => {

  return (
    <Link href={`/trips/${slug}/`}>
      <div className={styles.tripCard}>
        <img src={imageUrl} />
        <div className={styles.textWrapper}>
          <h2>{title}</h2>
          <p>{reformatDate(startDate, endDate)}</p>
        </div>
      </div>
    </Link>
  );
};

export default TripCard;
