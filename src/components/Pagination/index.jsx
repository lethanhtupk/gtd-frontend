import React from 'react';
import {
  ChervonDoubleLeftIcon,
  ChervonDoubleRightIcon,
  ChervonLeftIcon,
  ChervonRightIcon,
} from '../Icons';

const Pagination = ({ currentPage, setCurrentPage, totalPage }) => {
  const pageNumbers = [];

  const firstPage = currentPage - 3 > 0 ? currentPage - 3 : 1;
  let lastPage;
  if (firstPage === 1) {
    lastPage = firstPage + 5 > totalPage ? totalPage : firstPage + 5;
    pageNumbers.push(1);
    pageNumbers.push(lastPage);
  } else {
    lastPage = currentPage + 3 > totalPage ? totalPage : currentPage + 3;
  }

  console.log(firstPage, lastPage);

  for (let i = firstPage + 1; i < lastPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination flex flex-row bg-white text-gray-600">
      <div
        onClick={() => setCurrentPage(1)}
        className="flex flex-row items-center justify-center px-4 py-2 border border-gray-300 cursor-pointer"
      >
        <ChervonDoubleLeftIcon />
      </div>
      <div
        onClick={() => setCurrentPage(currentPage - 1)}
        className={`flex flex-row items-center justify-center px-4 py-2 border border-gray-300 cursor-pointer ${
          currentPage === 1 ? ' pointer-events-none opacity-30' : null
        }`}
      >
        <ChervonLeftIcon />
      </div>
      {pageNumbers.map((number, index) => (
        <div
          onClick={() => setCurrentPage(number)}
          key={index}
          className={`px-4 py-2 border border-gray-300 cursor-pointer ${
            number === currentPage ? ' bg-blue-500 text-white' : null
          }`}
        >
          {number}
        </div>
      ))}
      <div
        onClick={() => setCurrentPage(currentPage + 1)}
        className={`flex flex-row items-center justify-center px-4 py-2 border border-gray-300 cursor-pointer ${
          currentPage === totalPage ? ' pointer-events-none opacity-30' : null
        }`}
      >
        <ChervonRightIcon />
      </div>
      <div
        onClick={() => setCurrentPage(totalPage)}
        className="flex flex-row items-center justify-center px-4 py-2 border border-gray-300 cursor-pointer"
      >
        <ChervonDoubleRightIcon />
      </div>
    </div>
  );
};

export default Pagination;
