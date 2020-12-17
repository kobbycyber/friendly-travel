import React, { useState, useEffect } from 'react';
import { fetchTrips, fetchSortedTrips } from '../../utils/fetchFunctions';
import TripCard from '../../components/TripCard';
import styles from './index.module.scss';

const Trips = () => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    async function getTrips() {
      const allTrips = await fetchTrips();
      setTrips([...allTrips]);
    }

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
          ? trips.map(p => (
              <TripCard
                key={p.fields.title}
                title={p.fields.title}
                startDate={p.fields.startDate}
                endDate={p.fields.endDate}
                imageUrl={p.fields.image.fields.file.url}
                price={p.fields.price}
              />
            ))
          : null}
      </div>
    </>
  );
};

export default Trips;
