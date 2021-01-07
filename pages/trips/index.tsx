import React, { useState, useEffect } from 'react';
import { fetchTrips, fetchSortedTrips } from '../../utils/fetchFunctions';
import TripCard from '../../components/TripCard/TripCard';
import styles from './index.module.scss';
import { TripEntry } from '../../types';

const TripsPage = () => {
  const [trips, setTrips] = useState<TripEntry[]>([]);

  useEffect(() => {
    const getTrips = async () => {
      const allTrips = await fetchTrips();
      setTrips([...allTrips]);
    };

    getTrips();
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

    const sortedTrips = await fetchSortedTrips(sortingValue);
    setTrips([...sortedTrips]);
  };

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
        {trips.length
          ? trips.map(trip => (
              <TripCard
                key={trip.title}
                title={trip.title}
                startDate={trip.startDate}
                endDate={trip.endDate}
                imageUrl={trip.imageUrl}
                price={trip.price}
              />
            ))
          : null}
      </div>
    </>
  );
};

export default TripsPage;
