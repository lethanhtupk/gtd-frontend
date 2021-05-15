export const truncate = (str) => {
  return str.length > 36 ? `${str.substring(0, 36)}...` : str;
};

export const numberWithCommas = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};
