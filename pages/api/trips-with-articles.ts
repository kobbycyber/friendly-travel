import { client, formatTrip, formatArticle, getRandom } from '../../server/utils';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ArticleEntry, TripsWithInterstitchedArticles } from '../../types';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const order = req.query.order;

  try {
    const tripEntries = await client.getEntries({
      content_type: 'trip',
      order,
    });

    if (tripEntries.items) {
      let trips = tripEntries.items.map(item => formatTrip(item.fields));
      let articles: ArticleEntry[] = [];

      const articleEntries = await client.getEntries({ content_type: 'article' });

      if (articleEntries.items) {
        const formattedArticles = articleEntries.items.map(item => formatArticle(item.fields));
        articles = getRandom(formattedArticles, Math.floor(trips.length / 4));
      }

      let result: TripsWithInterstitchedArticles = [];

      if (articles.length) {
        const length = trips.length;

        for (let i = 0; i <= length; i++) {
          if (i % 5 === 4) {
            result.push({ type: 'article', data: articles[0] });
            articles = articles.filter((a, i) => i !== 0);
          } else {
            result.push({ type: 'trip', data: trips[0] });
            trips = trips.filter((t, i) => i !== 0);
          }
        }
      } else {
        result = trips.map(trip => ({ type: 'trip', data: trip }));
      }

      return res.status(200).json(result);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }

  return res.status(404).json({ error: '400: Bad request' });
};
