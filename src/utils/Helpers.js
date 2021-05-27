import { WATCH_STATUS } from './Constant';

export const truncate = (str, number) => {
  return str.length > number ? `${str.substring(0, number)}...` : str;
};

export const numberWithCommas = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const displayWatchStatus = (status) => {
  return WATCH_STATUS[status];
};

export const convertToNumber = (price) => {
  return parseInt(price.replace(/,/g, ''), 10);
};
