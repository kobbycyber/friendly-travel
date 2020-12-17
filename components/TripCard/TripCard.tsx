import Link from 'next/link';
import { getReformattedDate, getSlug } from '../../utils/helpFunctions';

import styles from './TripCard.module.scss';

interface TripCardProps {
  title: string;
  startDate: string;
  endDate: string;
  imageUrl: string;
  price: string;
}

const TripCard = ({ title, startDate, endDate, imageUrl, price }: TripCardProps) => {
  const slug = getSlug(title);

  return (
    <Link href={`/trips/${slug}/`}>
      <div className={styles.tripCard}>
        <img src={imageUrl} />
        <div className={styles.textWrapper}>
          <div>
            <h2>{title}</h2>
            <p>{getReformattedDate(startDate, endDate)}</p>
          </div>
          <p className={styles.price}>{price}kr</p>
        </div>
      </div>
    </Link>
  );
};

export default TripCard;
