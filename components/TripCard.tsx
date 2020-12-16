import Link from 'next/link';

import buttonStyles from '../styles/buttons.module.scss';

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
    <div>
      <img src={imageUrl} />
      <div>
        <h2>{title}</h2>
        <p>{reformatDate(startDate, endDate)}</p>
        <Link href={`/trips/${slug}`}>
          <a className={buttonStyles.primaryButton}>Read more</a>
        </Link>
      </div>
    </div>
  );
}

export default TripCard;
