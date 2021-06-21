import React from 'react';

export const FailedAlert = ({ message }) => (
  <div
    className="relative flex flex-row w-5/6 px-4 py-3 mb-6 leading-normal text-red-700 bg-red-200 rounded-lg md:w-auto"
    role="alert"
  >
    <span className="flex items-center">
      <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
        <path
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
          clipRule="evenodd"
          fillRule="evenodd"
        />
      </svg>
    </span>
    <div className="flex flex-row justify-center">
      <p className="text-center">{message}</p>
    </div>
  </div>
);

export const SuccessAlert = ({ message, invisible }) => (
  <div
    className={
      invisible
        ? 'px-4 py-3 leading-normal text-green-700 bg-green-200 rounded-lg invisible'
        : 'flex px-4 py-3 leading-normal text-green-700 bg-green-200 rounded-lg mb-6 w-5/6 md:w-auto'
    }
    role="alert"
  >
    <span className="flex items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 13l4 4L19 7"
        />
      </svg>
    </span>
    <div className="flex flex-row justify-center">
      <p className="text-center">{message}</p>
    </div>
  </div>
);
