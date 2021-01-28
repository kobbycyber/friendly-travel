import { client, formatTrip } from '../../../server/utils';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { slug },
  } = req;

  try {
    const title = (slug as string).split('-').join(' ');
    const entries = await client.getEntries({
      content_type: 'trip',
      'fields.title[match]': title,
    });

    if (entries.items.length === 1) {
      const trip = formatTrip(entries.items[0].fields);
      return res.status(200).json(trip);
    }
  } catch (error) {
    return res.status(500).json(error);
  }

  return res.status(404).json({ error: '400: Bad request' });
};
