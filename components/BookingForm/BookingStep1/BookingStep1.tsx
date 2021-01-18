import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { validEmail } from '../../../utils/helpFunctions';
import styles from './BookingStep1.module.scss';
import buttonStyles from '../../../styles/buttons.module.scss';
import { PersonalInformation, SetPersonalInformation, SetStep } from '../../../types';

interface BookingStep1Props {
  setStep: SetStep;
  setPersonalInformation: SetPersonalInformation;
  personalInformation?: PersonalInformation;
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

type InfoFormKey = 'name' | 'email' | 'phone' | 'street' | 'postCode' | 'city';

const BookingStep1 = ({
  setStep,
  setPersonalInformation,
  personalInformation,
}: BookingStep1Props) => {
  const [info, setInfo] = useState<InfoForm>(
    personalInformation
      ? {
          name: { value: personalInformation.name, touched: false },
          email: { value: personalInformation.email, touched: false },
          phone: { value: personalInformation.phone, touched: false },
          street: { value: personalInformation.street, touched: false },
          postCode: { value: personalInformation.postCode, touched: false },
          city: { value: personalInformation.city, touched: false },
        }
      : {
          name: { value: '', touched: false },
          email: { value: '', touched: false },
          phone: { value: '', touched: false },
          street: { value: '', touched: false },
          postCode: { value: '', touched: false },
          city: { value: '', touched: false },
        }
  );
  const { slug } = useRouter().query;

  const handleSetInfoValue = (key: InfoFormKey, value: string) => {
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
      setStep(2);
      setPersonalInformation({
        name: info.name.value,
        email: info.email.value,
        phone: info.phone.value,
        street: info.street.value,
        postCode: info.postCode.value,
        city: info.city.value,
      });
    } else {
      Object.keys(info).forEach(key => {
        setInfo(o => ({
          ...o,
          [key]: {
            value: info[key as InfoFormKey].value,
            touched: true,
          },
        }));
      });
    }
  };

  const errorSymbol = (inputName: InfoFormKey) => {
    if (inputName === 'email') {
      if (!validEmail(info.email.value) && info.email.touched) {
        return <img className={styles.warningImg} src="/error.svg" alt="warning-symbol" />;
      }
    }

    if (!info[inputName].value && info[inputName].touched) {
      return <img className={styles.warningImg} src="/error.svg" alt="warning-symbol" />;
    }
  };

  return (
    <form>
      <div className={styles.inputWrapper}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={info.name.value}
          className={styles[info.name.touched && !info.name.value ? 'invalid' : '']}
          onChange={e => handleSetInfoValue('name', e.target.value)}
          onBlur={() => setInfo(o => ({ ...o, name: { value: o.name.value, touched: true } }))}
        />
        {errorSymbol('name')}
      </div>

      <div className={styles.inputWrapper}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={info.email.value}
          className={
            styles[
              info.email.touched && (!info.email.value || !validEmail(info.email.value))
                ? 'invalid'
                : ''
            ]
          }
          onChange={e => handleSetInfoValue('email', e.target.value)}
          onBlur={() => setInfo(o => ({ ...o, email: { value: o.email.value, touched: true } }))}
        />
        {errorSymbol('email')}
      </div>

      <div className={styles.inputWrapper}>
        <label htmlFor="phone">Phone</label>
        <input
          type="number"
          id="phone"
          value={info.phone.value}
          className={styles[info.phone.touched && !info.phone.value ? 'invalid' : '']}
          onChange={e => handleSetInfoValue('phone', e.target.value)}
          onBlur={() => setInfo(o => ({ ...o, phone: { value: o.phone.value, touched: true } }))}
        />
        {errorSymbol('phone')}
      </div>

      <div className={styles.inputWrapper}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          value={info.street.value}
          className={styles[info.street.touched && !info.street.value ? 'invalid' : '']}
          onChange={e => handleSetInfoValue('street', e.target.value)}
          onBlur={() => setInfo(o => ({ ...o, street: { value: o.street.value, touched: true } }))}
        />
        {errorSymbol('street')}
      </div>

      <div className={styles.inputWrapper}>
        <label htmlFor="postCode">Post code</label>
        <input
          type="text"
          id="postCode"
          value={info.postCode.value}
          className={styles[info.postCode.touched && !info.postCode.value ? 'invalid' : '']}
          onChange={e => handleSetInfoValue('postCode', e.target.value)}
          onBlur={() =>
            setInfo(o => ({ ...o, postCode: { value: o.postCode.value, touched: true } }))
          }
        />
        {errorSymbol('postCode')}
      </div>

      <div className={styles.inputWrapper}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          value={info.city.value}
          className={styles[info.city.touched && !info.city.value ? 'invalid' : '']}
          onChange={e => handleSetInfoValue('city', e.target.value)}
          onBlur={() => setInfo(o => ({ ...o, city: { value: o.city.value, touched: true } }))}
        />
        {errorSymbol('city')}
      </div>

      <div className={buttonStyles.buttonWrapper}>
        <Link href={`/trips/${slug}/`}>
          <a className={buttonStyles.secondaryButton}>Back</a>
        </Link>

        <button type="button" className={buttonStyles.primaryButton} onClick={e => handleClick(e)}>
          Next
        </button>
      </div>
    </form>
  );
};

export default BookingStep1;
