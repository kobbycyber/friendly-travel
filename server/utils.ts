import { createClient } from 'contentful';
import { ArticleEntry, ReviewEntry, TripEntry } from '../types';

export const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN!,
});

export const getRandom = (array: TripEntry[] | ArticleEntry[] | ReviewEntry[], number: number) => {
  const result = new Array(number);
  let len = array.length;
  const taken = new Array(len);

  if (number > len) {
    throw 'getRandom: not enough elements in array to return';
  }

  while (number--) {
    var x = Math.floor(Math.random() * len);
    result[number] = array[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
};

const getFormattedPrice = (price: string) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

export const formatTrip = (entry: any) => {
  const trip: TripEntry = {
    title: entry.title,
    startDate: entry.startDate,
    endDate: entry.endDate,
    body: entry.body,
    price: getFormattedPrice(entry.price),
    imageUrl: entry.image.fields.file.url,
  };
  return trip;
};

export const formatArticle = (entry: any) => {
  const article: ArticleEntry = {
    title: entry.title,
    description: entry.description,
    body: entry.body,
    imageUrl: entry.image.fields.file.url,
  };
  return article;
};
