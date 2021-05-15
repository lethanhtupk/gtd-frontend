import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import Logout from '../logout';
import defaultAvatar from '../../static/img/default-avatar.png';

const NavigationAuth = ({ authUser, setAuthUser }) => {
  const [isShow, setIsShow] = useState(false);

  const addDefaultSrc = (ev) => {
    ev.target.src = defaultAvatar;
  };

  return (
    <div className="avatarDropdown flex justify-evenly items-center">
      <div className="flex flex-col justify-center h-full">
        <div className="flex flex-row items-center">
          <button
            className="avatar h-10 w-10 rounded-full overflow-hidden border-2 border-gray-500 block focus:outline-none"
            type="button"
            onMouseEnter={() => setIsShow(true)}
          >
            <img
              src={authUser.photo_url ? authUser.photo_url : defaultAvatar}
              onError={addDefaultSrc}
              alt=""
              className="h-full w-full object-cover"
            />
          </button>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 block ml-2 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
            onMouseEnter={() => setIsShow(true)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>

          <Logout setAuthUser={setAuthUser} />
        </div>
      </div>

      {isShow ? (
        <div
          className="bg-white rounded-lg py-2 border-2 border-gray-300 absolute top-14 right-8"
          onMouseEnter={() => setIsShow(true)}
          onMouseLeave={() => setIsShow(false)}
        >
          <Link
            to="/popular"
            className="block px-4 py-2 text-gray-800 hover:bg-indigo-500"
          >
            Popular product
          </Link>
          <Link
            to="/most_drop"
            className="block px-4 py-2 text-gray-800 hover:bg-indigo-500"
          >
            Top drops
          </Link>
          <Link
            to="/watching"
            className="block px-4 py-2 text-gray-800 hover:bg-indigo-500"
          >
            Your Price Watches
          </Link>
          <a
            to={ROUTES.ACCOUNT}
            onClick={() => (window.location.href = ROUTES.ACCOUNT)}
            className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 cursor-pointer"
          >
            Account
          </a>
        </div>
      ) : null}
    </div>
  );
};

export default NavigationAuth;
