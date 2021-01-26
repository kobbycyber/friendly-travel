export const server =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:3000'
    : 'https://friendly-travel.herokuapp.com/';
