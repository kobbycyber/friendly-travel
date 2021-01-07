import React, { useState } from 'react';

import BookingStep1 from './BookingStep1/BookingStep1';
import BookingStep2 from './BookingStep2/BookingStep2';
import BookingStep3 from './BookingStep3/BookingStep3';
import BookingStep4 from './BookingStep4/BookingStep4';
import BookingError from './BookingError/BookingError';

import styles from './BookingForm.module.scss';
import {
  AdditionalChoices,
  HandleNextBookingStep1,
  PersonalInformation,
  TripEntry,
} from '../../types';

interface BookingFormProps {
  trip: TripEntry;
}

const BookingForm = ({ trip }: BookingFormProps) => {
  const [step, setStep] = useState(1);
  const [personalInformation, setPersonalInformation] = useState<PersonalInformation>();
  const [additionalChoices, setAdditionalChoices] = useState<AdditionalChoices>();

  const renderStep = () => {
    if (step === 1) {
      const handleNextBookingStep1: HandleNextBookingStep1 = personalInformation => {
        setStep(2);
        setPersonalInformation(personalInformation);
      };

      return <BookingStep1 handleNextBookingStep1={handleNextBookingStep1} />;
    }

    if (step === 2) {
      return <BookingStep2 setStep={setStep} setAdditionalChoices={setAdditionalChoices} />;
    }

    if (step === 3) {
      return (
        <BookingStep3
          setStep={setStep}
          trip={trip}
          personalInformation={personalInformation}
          additionalChoices={additionalChoices}
        />
      );
    }
  };

  if (step === 4 || !step) {
    return (
      <article className={styles.bookingFormWrapper}>
        {step === 4 && <BookingStep4 email={personalInformation.email} imageUrl={trip.imageUrl} />}
        {step === 0 && <BookingError setStep={setStep} />}
      </article>
    );
  }

  return (
    <article className={styles.bookingFormWrapper}>
      <div className={styles.progressWrapper}>
        <p>Step {step}/3</p>
        <div className={styles.progressBar}>
          <div className={`${styles.progress} ${styles[`step${step}`]}`} />
        </div>
      </div>

      {renderStep()}
    </article>
  );
};

export default BookingForm;
