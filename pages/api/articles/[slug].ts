import { client, formatArticle } from '../../../server/utils';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { slug },
  } = req;

  try {
    const title = (slug as string).split('-').join(' ');
    const entries = await client.getEntries({
      content_type: 'article',
      'fields.title[match]': title,
    });

    if (entries.items.length === 1) {
      const article = formatArticle(entries.items[0].fields);
      return res.status(200).json(article);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }

  return res.status(404).json({ error: '400: Bad request' });
};
