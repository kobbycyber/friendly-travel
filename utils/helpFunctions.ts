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
