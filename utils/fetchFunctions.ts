import { createClient } from 'contentful';
import { TripEntry } from '../types';

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

export const fetchTrips = async (limit = 100) => {
  const entries = await client.getEntries({
    content_type: 'trip',
    limit: limit,
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

export const fetchTripBySlug = async (slug: string) => {
  const title = slug.split('-').join(' ');

  const entries = await client.getEntries({
    content_type: 'trip',
    'fields.title[match]': title,
  });

  if (entries.items.length === 1) {
    return formatReturnTripEntry(entries.items[0].fields);
  } else {
    return null;
  }
};

const formatReturnTripEntry = (entry: any) => {
  const trip: TripEntry = {
    title: entry.title,
    startDate: entry.startDate,
    endDate: entry.endDate,
    body: entry.body,
    price: entry.price,
    imageUrl: entry.image.fields.file.url,
  };
  return trip;
};
