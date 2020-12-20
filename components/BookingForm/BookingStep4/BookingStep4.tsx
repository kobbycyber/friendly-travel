import React from 'react';
import Link from 'next/link';
import styles from './BookingStep4.module.scss';
import buttonStyles from '../../../styles/buttons.module.scss';

interface BookingStep4Props {
  email: string;
  imageUrl: string;
}

const BookingStep4 = ({ email, imageUrl }: BookingStep4Props) => {
  return (
    <div className={styles.confirmationWrapper}>
      <h2>Thank you!</h2>
      <p>
        You will recieve a confirmation of your booking to <span>{email}</span> as soon as your
        order has been processed (1-2 business days).
      </p>
      <p>See you at the airport!</p>
      <img src={imageUrl} />

      <Link href="/">
        <a className={buttonStyles.primaryButton}>Back to start</a>
      </Link>
    </div>
  );
};

export default BookingStep4;
