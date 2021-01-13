import Mailgun from 'mailgun-js';
import type { NextApiRequest, NextApiResponse } from 'next';
import { SubmitFormInput } from '../../types';
import { validEmail } from '../../utils/helpFunctions';

const mailgun = new Mailgun({
  apiKey: process.env.MAILGUN_API_KEY!,
  domain: process.env.MAILGUN_DOMAIN!,
});

const validFormInput = ({ trip, personalInformation, additionalChoices }: SubmitFormInput) => {
  if (trip && personalInformation && additionalChoices) {
    return (
      trip.title &&
      trip.startDate &&
      trip.endDate &&
      trip.price &&
      personalInformation.name &&
      personalInformation.email &&
      personalInformation.phone &&
      personalInformation.street &&
      personalInformation.postCode &&
      personalInformation.city &&
      additionalChoices.room &&
      additionalChoices.departure &&
      validEmail(personalInformation.email)
    );
  }
  return false;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    if (validFormInput(req.body)) {
      try {
        const template = `
        <article>
          <h1>Trip: ${req.body.trip.title}</h1>
          <h3>Duration: ${req.body.trip.startDate} - ${req.body.trip.endDate}</h3>
          <h3>Price: ${req.body.trip.price}kr</h3>

          <div>
            <h1>Personal information</h1>
            <p><strong>Name: </strong>${req.body.personalInformation.name}</p>
            <p><strong>Email: </strong>${req.body.personalInformation.email}</p>
            <p><strong>Phone: </strong>${req.body.personalInformation.phone}</p>
            <p><strong>Street: </strong>${req.body.personalInformation.street}</p>
            <p><strong>Post code: </strong>${req.body.personalInformation.postCode}</p>
            <p><strong>City: </strong>${req.body.personalInformation.city}</p>
          </div>

          <div>
            <h1>Choices</h1>
            <p><strong>Room: </strong>${req.body.additionalChoices.room}</p>
            <p><strong>Place of departure: </strong>${req.body.additionalChoices.departure}</p>
          </div>
        </article>
        `;

        const data = {
          from: `friendly-travel@${process.env.MAILGUN_DOMAIN}`,
          to: process.env.MAILGUN_APPROVED_EMAIL!,
          subject: `Booking of ${req.body.trip.title} is requested`,
          html: template,
        };

        const response = await mailgun.messages().send(data);

        if (response) {
          return res.status(200).json({ msg: 'Success!' });
        }
      } catch (error) {
        console.error(error);
        return res.status(500).json(error);
      }
    }
  }

  return res.status(400).json({ error: '400: Bad request' });
};
