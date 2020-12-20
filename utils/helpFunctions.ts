export const getReformattedDate = (start: string, end: string) => {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const a = start.split('-');
  const b = end.split('-');

  if (a[1] === b[1]) {
    return `${Number(a[2])} - ${Number(b[2])} ${monthNames[Number(a[1])]}`;
  } else {
    return `${Number(a[2])} ${monthNames[Number(a[1])]} - ${Number(b[2])} ${
      monthNames[Number(b[1])]
    }`;
  }
};

export const getSlug = (title: string) => {
  return title.toLowerCase().split(' ').join('-');
};

export const validEmail = (email: string) => {
  const validEmailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return validEmailRegex.test(String(email).toLowerCase());
};
