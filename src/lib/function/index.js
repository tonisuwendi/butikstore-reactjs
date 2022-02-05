const generateRandomString = () => {
  const random = () => Math.random().toString(36).substr(2);
  const datetime = () => Date.now().toString();
  return random() + datetime() + random() + datetime();
};

const printFormatPrice = (price) => new Intl.NumberFormat('id-ID').format(price);

const dateFormat = (date) => {
  const monthName = [
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
  const newDate = new Date(date);
  const getDate = newDate.getDate();
  let getMonth = newDate.getMonth();
  getMonth = monthName[getMonth];
  const getYear = newDate.getFullYear();
  return `${getMonth} ${getDate < 10 ? `0${getDate}` : getDate}, ${getYear}`;
};

export {
  generateRandomString,
  printFormatPrice,
  dateFormat,
};
