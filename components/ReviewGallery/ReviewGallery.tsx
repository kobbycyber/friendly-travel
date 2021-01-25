import React, { useEffect, useState } from 'react';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

import styles from './ReviewGallery.module.scss';
import { ReviewEntry } from '../../types';

const ReviewGallery = () => {
  const [reviews, setReviews] = useState<ReviewEntry[]>();
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const getReviews = async () => {
      const result = await (await fetch('/api/reviews/?limit=3')).json();

      if (result) {
        setReviews([...result]);
      } else {
        setNotFound(true);
      }
    };

    getReviews();
  }, []);

  if (notFound) {
    return <></>;
  }

  if (!reviews) {
    return <LoadingSpinner />;
  }

  return (
    <article className={styles.mainWrapper}>
      {reviews.map(review => (
        <div key={review.quote} className={styles.reviewWrapper}>
          <img src={review.imageUrl} />
          <div className={styles.textWrapper}>
            <p>
              {review.userName}, {review.userAge}
            </p>
            <p>"{review.quote}"</p>
          </div>
        </div>
      ))}
    </article>
  );
};

export default ReviewGallery;
