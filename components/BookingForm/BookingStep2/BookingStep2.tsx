import React, { useState } from 'react';
import styles from './BookingStep2.module.scss';
import buttonStyles from '../../../styles/buttons.module.scss';
import { SetAdditionalChoices, SetStep } from '../../../types';

interface BookingStep2Props {
  setStep: SetStep;
  setAdditionalChoices: SetAdditionalChoices;
}

const BookingStep2 = ({ setStep, setAdditionalChoices }: BookingStep2Props) => {
  const [selectedRoom, setSelectedRoom] = useState<string>();
  const [selectedDeparture, setSelectedDeparture] = useState<string>();
  const [error, setError] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (selectedRoom && selectedDeparture) {
      setAdditionalChoices({ room: selectedRoom, departure: selectedDeparture });
      setStep(3);
    } else {
      setError(true);
    }
  };

  return (
    <form>
      <div className={styles.radioWrapper}>
        <div className={styles.headerWrapper}>
          <h4>Room</h4>
          {error && !selectedRoom && <img src="/error.svg" />}
        </div>

        <div className={styles.radioInputWrapper}>
          <input
            type="radio"
            id="singleRoom"
            value="Single room"
            checked={selectedRoom === 'Single room'}
            onChange={e => setSelectedRoom(e.target.value)}
          />
          <label htmlFor="singleRoom">Single room</label>
        </div>

        <div className={styles.radioInputWrapper}>
          <input
            type="radio"
            id="doubleRoom"
            value="Part in double room"
            checked={selectedRoom === 'Part in double room'}
            onChange={e => setSelectedRoom(e.target.value)}
          />
          <label htmlFor="doubleRoom">Part in double room</label>
        </div>
      </div>

      <div className={styles.radioWrapper}>
        <div className={styles.headerWrapper}>
          <h4>Place of Departure</h4>
          {error && !selectedDeparture && <img src="/error.svg" />}
        </div>

        <div className={styles.radioInputWrapper}>
          <input
            type="radio"
            id="stockholm"
            value="Stockholm"
            checked={selectedDeparture === 'Stockholm'}
            onChange={e => setSelectedDeparture(e.target.value)}
          />
          <label htmlFor="stockholm">Stockholm</label>
        </div>

        <div className={styles.radioInputWrapper}>
          <input
            type="radio"
            id="gothenburg"
            value="Gothenburg"
            checked={selectedDeparture === 'Gothenburg'}
            onChange={e => setSelectedDeparture(e.target.value)}
          />
          <label htmlFor="gothenburg">Gothenburg</label>
        </div>

        <div className={styles.radioInputWrapper}>
          <input
            type="radio"
            id="malmo"
            value="Malmö"
            checked={selectedDeparture === 'Malmö'}
            onChange={e => setSelectedDeparture(e.target.value)}
          />
          <label htmlFor="malmo">Malmö</label>
        </div>

        <div className={styles.radioInputWrapper}>
          <input
            type="radio"
            id="lulea"
            value="Luleå"
            checked={selectedDeparture === 'Luleå'}
            onChange={e => setSelectedDeparture(e.target.value)}
          />
          <label htmlFor="lulea">Luleå</label>
        </div>
      </div>

      <div className={buttonStyles.buttonWrapper}>
        <button className={buttonStyles.secondaryButton} onClick={() => setStep(1)}>
          Back
        </button>

        <input
          type="submit"
          value="Next"
          className={buttonStyles.primaryButton}
          onClick={e => handleClick(e)}
        />
      </div>
    </form>
  );
};

export default BookingStep2;
