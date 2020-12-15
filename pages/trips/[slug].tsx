import React from 'react';
import { useRouter } from 'next/router';

const Trip = () => {
  const router = useRouter();
  const { slug } = router.query;

  //use slug to query based on title

  return (
    <>
      <h1>trip</h1>
      <p>Trip: {slug}</p>
    </>
  );
};

export default Trip;
