import React from 'react';
import { LOCAL_STORAGE } from '../utils/Constant';

const Logout = ({ setAuthUser }) => {
  const onLogoutHandler = () => {
    localStorage.removeItem(LOCAL_STORAGE.ACCESS_TOKEN);
    localStorage.removeItem(LOCAL_STORAGE.REFRESH_TOKEN);
    localStorage.removeItem(LOCAL_STORAGE.USER_INFO);
    setAuthUser(null);
  };
  return (
    <button
      type="button"
      onClick={onLogoutHandler}
      className="focus:outline-none"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 ml-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="white"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
        />
      </svg>
    </button>
  );
};

export default Logout;
