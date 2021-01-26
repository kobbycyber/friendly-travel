import React, { useState } from 'react';
import { server } from '../../config/index';

import TripCard from '../../components/TripCard/TripCard';
import ArticleCard from '../../components/ArticleCard/ArticleCard';
import NotFound from '../../components/NotFound/NotFound';

import styles from './TripsPage.module.scss';
import { TripsWithInterstitchedArticles } from '../../types';

interface TripsPageProps {
  initialEntries: TripsWithInterstitchedArticles;
}

const TripsPage = ({ initialEntries }: TripsPageProps) => {
  const [entries, setEntries] = useState<TripsWithInterstitchedArticles>(initialEntries);

  const handleSort = async (value: string) => {
    const sortingValue =
      value === 'date'
        ? 'fields.startDate'
        : value === 'lowestPrice'
        ? 'fields.price'
        : value === 'highestPrice'
        ? '-fields.price'
        : '-sys.createdAt';

    const sortedTrips = await (
      await fetch(`/api/trips-with-articles/?order=${sortingValue}`)
    ).json();

    if (sortedTrips) {
      setEntries([...sortedTrips]);
    }
  };

  if (!entries.length) {
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

export async function getServerSideProps() {
  const res = await fetch(`${server}/api/trips-with-articles/`);
  const initialEntries = await res.json();
  const props: TripsPageProps = { initialEntries };
  return { props };
}
