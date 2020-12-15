import React, { useState, useEffect } from 'react';
import { fetchAllTrips } from '../../utils/fetchFunctions';
import Post from '../../components/Post';

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
      <h1>all trips</h1>
      <div>
        {trips.length
          ? trips.map(p => (
              <Post
                alt={p.fields.alt}
                date={p.fields.date}
                key={`${p.fields.titel}${p.fields.title}`}
                image={p.fields.image}
                title={p.fields.titel ? p.fields.titel : p.fields.title}
                url={p.fields.url}
                body={p.fields.body}
              />
            ))
          : null}
      </div>
    </>
  );
};

export default Trips;
