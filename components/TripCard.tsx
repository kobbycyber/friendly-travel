import Link from 'next/link';

import styles from './TripCard.module.scss';

interface TripCardProps {
  title: string;
  startDate: string;
  endDate: string;
  imageUrl: string;
}

function TripCard({ title, startDate, endDate, imageUrl }: TripCardProps) {
  const reformatDate = (start: string, end: string) => {
    return '3 - 5 maj';
  };

  const getSlug = (title: string) => {
    return 'san-fransisco';
  };
  const slug = getSlug(title);

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
}

export default TripCard;
