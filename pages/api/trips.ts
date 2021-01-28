import { client, formatTrip, getRandom } from '../../server/utils';

import type { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const limit = Number(req.query.limit) || 5;

  try {
    const entries = await client.getEntries({ content_type: 'trip' });

    if (entries.items) {
      const formattedEntries = entries.items.map(item => formatTrip(item.fields));
      const trips = getRandom(formattedEntries, limit);
      return res.status(200).json(trips);
    }
  } catch (error) {
    return res.status(500).json(error);
  }

  return res.status(404).json({ error: '400: Bad request' });
};
