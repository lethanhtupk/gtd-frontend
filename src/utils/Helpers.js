export const truncate = (str, number) => {
  return str.length > number ? `${str.substring(0, number)}...` : str;
};

export const numberWithCommas = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};
