import React from 'react';
import Link from 'next/link';
import { getSlug } from '../../utils/helpFunctions';
import styles from './TripGalleryCard.module.scss';

interface TripGalleryCard {
  title: string;
  imageUrl: string;
}

const TripGalleryCard = ({ title, imageUrl }: TripGalleryCard) => {
  return (
    <Link href={`/trips/${getSlug(title)}/`}>
      <a className={styles.cardWrapper}>
        <img src={imageUrl} />
        <div className={styles.titleWrapper}>
          <p>{title}</p>
        </div>
      </a>
    </Link>
  );
};

export default TripGalleryCard;
