const generateRandomString = () => {
  const random = () => Math.random().toString(36).substr(2);
  const datetime = () => Date.now().toString();
  return random() + datetime() + random() + datetime();
};

const printFormatPrice = (price) => new Intl.NumberFormat('id-ID').format(price);

export {
  generateRandomString,
  printFormatPrice,
};
