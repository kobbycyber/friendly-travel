import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { validEmail } from '../../../utils/helpFunctions';
import styles from './BookingStep1.module.scss';
import buttonStyles from '../../../styles/buttons.module.scss';
import { HandleNextBookingStep1 } from '../../../types';

interface BookingStep1Props {
  handleNextBookingStep1: HandleNextBookingStep1;
}

interface FormField {
  value: string;
  touched: boolean;
}

interface InfoForm {
  name: FormField;
  email: FormField;
  phone: FormField;
  street: FormField;
  postCode: FormField;
  city: FormField;
}

const BookingStep1 = ({ handleNextBookingStep1 }: BookingStep1Props) => {
  const [info, setInfo] = useState<InfoForm>({
    name: { value: '', touched: false },
    email: { value: '', touched: false },
    phone: { value: '', touched: false },
    street: { value: '', touched: false },
    postCode: { value: '', touched: false },
    city: { value: '', touched: false },
  });
  const { slug } = useRouter().query;

  const handleSetPersonalInfo = (key: string, value: string) => {
    setInfo(o => ({ ...o, [key]: { value, touched: info[key].touched } }));
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (
      info.name.value &&
      info.email.value &&
      info.phone.value &&
      info.street.value &&
      info.postCode.value &&
      info.city.value &&
      validEmail(info.email.value)
    ) {
      handleNextBookingStep1({
        name: info.name.value,
        email: info.email.value,
        phone: info.phone.value,
        street: info.street.value,
        postCode: info.postCode.value,
        city: info.city.value,
      });
    } else {
      Object.keys(info).forEach(key => {
        setInfo(o => ({ ...o, [key]: { value: info[key].value, touched: true } }));
      });
    }
  };

  return (
    <form>
      <div className={styles.inputWrapper}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          className={styles[info.name.touched && !info.name.value ? 'invalid' : '']}
          onChange={e => handleSetPersonalInfo('name', e.target.value)}
          onBlur={() => setInfo(o => ({ ...o, name: { value: o.name.value, touched: true } }))}
        />
      </div>
      <div className={styles.inputWrapper}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          className={
            styles[
              info.email.touched && (!info.email.value || !validEmail(info.email.value))
                ? 'invalid'
                : ''
            ]
          }
          onChange={e => handleSetPersonalInfo('email', e.target.value)}
          onBlur={() => setInfo(o => ({ ...o, email: { value: o.email.value, touched: true } }))}
        />
      </div>
      <div className={styles.inputWrapper}>
        <label htmlFor="phone">Phone</label>
        <input
          type="number"
          id="phone"
          className={styles[info.phone.touched && !info.phone.value ? 'invalid' : '']}
          onChange={e => handleSetPersonalInfo('phone', e.target.value)}
          onBlur={() => setInfo(o => ({ ...o, phone: { value: o.phone.value, touched: true } }))}
        />
      </div>
      <div className={styles.inputWrapper}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          className={styles[info.street.touched && !info.street.value ? 'invalid' : '']}
          onChange={e => handleSetPersonalInfo('street', e.target.value)}
          onBlur={() => setInfo(o => ({ ...o, street: { value: o.street.value, touched: true } }))}
        />
      </div>
      <div className={styles.inputWrapper}>
        <label htmlFor="postCode">Post code</label>
        <input
          type="text"
          id="postCode"
          className={styles[info.postCode.touched && !info.postCode.value ? 'invalid' : '']}
          onChange={e => handleSetPersonalInfo('postCode', e.target.value)}
          onBlur={() =>
            setInfo(o => ({ ...o, postCode: { value: o.postCode.value, touched: true } }))
          }
        />
      </div>
      <div className={styles.inputWrapper}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          className={styles[info.city.touched && !info.city.value ? 'invalid' : '']}
          onChange={e => handleSetPersonalInfo('city', e.target.value)}
          onBlur={() => setInfo(o => ({ ...o, city: { value: o.city.value, touched: true } }))}
        />
      </div>

      <div className={buttonStyles.buttonWrapper}>
        <Link href={`/trips/${slug}/`}>
          <a className={buttonStyles.secondaryButton}>Back</a>
        </Link>

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

export default BookingStep1;
