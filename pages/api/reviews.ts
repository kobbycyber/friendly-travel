import { client, getRandom } from '../../server/utils';

import type { NextApiRequest, NextApiResponse } from 'next';
import { ReviewEntry } from '../../types';

const formatReview = (entry: any) => {
  const review: ReviewEntry = {
    userName: entry.userName,
    userAge: entry.userAge,
    quote: entry.quote,
    imageUrl: entry.image.fields.file.url,
  };
  return review;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {  
  const limit = Number(req.query.limit) || 3;

  try {
    const entries = await client.getEntries({ content_type: 'review' });

    if (entries.items) {
      const formattedEntries = entries.items.map(item => formatReview(item.fields));
      const reviews = getRandom(formattedEntries, limit);
      return res.status(200).json(reviews);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }

  return res.status(404).json({ error: '400: Bad request' });
};
