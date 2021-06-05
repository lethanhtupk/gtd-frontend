import React from 'react';

export const FailedAlert = ({ message }) => (
  <div
    className="relative px-4 py-3 leading-normal text-red-700 bg-red-100 rounded-lg flex flex-row"
    role="alert"
  >
    <span className="flex items-center mr-2">
      <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
        <path
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
          clipRule="evenodd"
          fillRule="evenodd"
        />
      </svg>
    </span>
    <div className="flex flex-row justify-center">{message}</div>
  </div>
);

export const SuccessAlert = ({ message, invisible }) => (
  <div
    className={
      invisible
        ? 'px-4 py-3 leading-normal text-green-700 bg-green-100 rounded-lg invisible'
        : 'px-4 py-3 leading-normal text-green-700 bg-green-100 rounded-lg'
    }
    role="alert"
  >
    <p className="text-center">{message}</p>
  </div>
);
