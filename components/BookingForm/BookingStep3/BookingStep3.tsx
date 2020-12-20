import React from 'react';
import styles from './BookingStep3.module.scss';
import buttonStyles from '../../../styles/buttons.module.scss';
import { AdditionalChoices, PersonalInformation, SetStep, TripEntry } from '../../../types';

interface BookingStep3Props {
  trip: TripEntry;
  setStep: SetStep;
  personalInformation: PersonalInformation;
  additionalChoices: AdditionalChoices;
}

const BookingStep3 = ({
  trip,
  setStep,
  personalInformation,
  additionalChoices,
}: BookingStep3Props) => {
  return (
    <article>
      <h3>Your Booking</h3>
      <p className={styles.directions}>Please review and confirm your booking request.</p>

      <div className={styles.divider} />

      <h2>{trip.title}</h2>

      <div className={styles.infoWrapper}>
        <div className={styles.innerInfoWrapper}>
          <h4>Depature date:</h4>
          <p>{trip.startDate}</p>

          <h4>End date:</h4>
          <p>{trip.endDate}</p>

          <h4>Price:</h4>
          <p>{trip.price}kr (excl. flight)</p>

          <h4>Room:</h4>
          <p>{additionalChoices.room}</p>

          <h4>Place of Departure:</h4>
          <p>{additionalChoices.departure}</p>
        </div>

        <div className={styles.innerInfoWrapper}>
          <h4>Name:</h4>
          <p>{personalInformation.name}</p>

          <h4>Email:</h4>
          <p>{personalInformation.email}</p>

          <h4>Phone:</h4>
          <p>{personalInformation.phone}</p>

          <h4>Street:</h4>
          <p>{personalInformation.street}</p>

          <h4>Post code:</h4>
          <p>{personalInformation.postCode}</p>

          <h4>City:</h4>
          <p>{personalInformation.city}</p>
        </div>
      </div>

      <div className={buttonStyles.buttonWrapper}>
        <button className={buttonStyles.secondaryButton} onClick={() => setStep(2)}>
          Back
        </button>

        <button className={buttonStyles.primaryButton} onClick={() => setStep(4)}>
          Confirm
        </button>
      </div>
    </article>
  );
};

export default BookingStep3;
