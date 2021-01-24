import React, { useState, useEffect } from 'react';
import { fetchTripsWithInterstitchedArticles } from '../../utils/fetchFunctions';

import TripCard from '../../components/TripCard/TripCard';
import NotFound from '../../components/NotFound/NotFound';

import styles from './TripsPage.module.scss';
import { TripsWithInterstitchedArticles } from '../../types';
import ArticleCard from '../../components/ArticleCard/ArticleCard';

const TripsPage = () => {
  const [entries, setEntries] = useState<TripsWithInterstitchedArticles>([]);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const getEntries = async () => {
      const newEntries = await fetchTripsWithInterstitchedArticles();
      if (newEntries.length) {
        setEntries(newEntries);
      } else {
        setNotFound(true);
      }
    };

    getEntries();
  }, []);

  const handleSort = async (value: string) => {
    const sortingValue =
      value === 'date'
        ? 'fields.startDate'
        : value === 'lowestPrice'
        ? 'fields.price'
        : value === 'highestPrice'
        ? '-fields.price'
        : '-sys.createdAt';
    const sortedTrips = await fetchTripsWithInterstitchedArticles(sortingValue);
    if (sortedTrips) {
      setEntries([...sortedTrips]);
    }
  };

  if (notFound) {
    return <NotFound />;
  }

  return (
    <>
      <article className={styles.sortingWrapper}>
        <label htmlFor="sort">Sort by</label>
        <select name="sort" id="sort" onChange={e => handleSort(e.target.value)}>
          <option value="new">Newest</option>
          <option value="date">Date</option>
          <option value="lowestPrice">Lowest Price</option>
          <option value="highestPrice">Highest Price</option>
        </select>
      </article>

      <div className={styles.tripCardWrapper}>
        {entries.length
          ? entries.map(entry =>
              entry.type === 'trip' ? (
                <TripCard key={entry.data.title} trip={entry.data} />
              ) : (
                <ArticleCard key={entry.data.title} article={entry.data} />
              )
            )
          : null}
      </div>
    </>
  );
};

export default TripsPage;
