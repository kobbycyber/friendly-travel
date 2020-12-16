import { createClient } from 'contentful';

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

export const fetchAllTrips = async () => {
  const entries = await client.getEntries({
    content_type: 'trip',
  });

  if (entries.items) {
    return entries.items;
  }
};

export const fetchSortedTrips = async (orderBy: string) => {
  const entries = await client.getEntries({
    content_type: 'trip',
    order: orderBy,
  });

  if (entries.items) {
    return entries.items;
  }
};
