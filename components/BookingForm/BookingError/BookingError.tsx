import React from 'react';
import styles from './BookingError.module.scss';
import buttonStyles from '../../../styles/buttons.module.scss';
import { SetStep } from '../../../types';

interface BookingErrorProps {
  setStep: SetStep;
}

const BookingError = ({ setStep }: BookingErrorProps) => {
  return (
    <article className={styles.errorWrapper}>
      <h2>Something went wrong...</h2>
      <p>
        The issue might be temporary. Please go back and try again. If the problem persists, please
        get in touch with our friendly <a href="mailto:friendly-travel@notreal.com">support team</a>
        .
      </p>

      <button className={buttonStyles.primaryButton} onClick={() => setStep(1)}>
        Try again
      </button>
    </article>
  );
};

export default BookingError;
