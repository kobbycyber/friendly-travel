import React, { useState, useEffect } from 'react';
import { fetchAllTrips } from '../../utils/fetchFunctions';
import TripCard from '../../components/TripCard';

const Trips = () => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    async function getTrips() {
      const allTrips = await fetchAllTrips();
      setTrips([...allTrips]);
    }

    getTrips();
  }, []);

  return (
    <>
      <div>
        {trips.length
          ? trips.map(p => (
              <TripCard
                key={p.fields.title}
                title={p.fields.title}
                startDate={p.fields.startDate}
                endDate={p.fields.endDate}
                imageUrl={p.fields.image.fields.file.url}
              />
            ))
          : null}
      </div>
    </>
  );
};

export default Trips;
