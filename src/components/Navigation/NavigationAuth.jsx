import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import Logout from '../logout';

const NavigationAuth = ({ setAuthUser }) => (
  <div className="avatarDropdown w-48 flex justify-evenly">
    <div className="flex flex-col justify-center h-full">
      <div className="flex flex-row items-center">
        <button
          className="avatar h-10 w-10 rounded-full overflow-hidden border-2 border-gray-500 block"
          type="button"
        >
          <img
            src="https://sohanews.sohacdn.com/2017/dsc09779ws-1513847811991-1513848049799.png"
            alt=""
            className="h-full w-full object-cover"
          />
        </button>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 block ml-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>

        {/* <svg
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
        </svg> */}
        <Logout setAuthUser={setAuthUser} />
      </div>
    </div>

    <div className="bg-white rounded-lg py-2 border-2 border-gray-300 absolute top-14 right-8">
      <Link
        to="/popular"
        className="block px-4 py-2 text-gray-800 hover:bg-indigo-500"
      >
        Sản phẩm phổ biển
      </Link>
      <Link
        to="/most_drop"
        className="block px-4 py-2 text-gray-800 hover:bg-indigo-500"
      >
        Sản phẩm giảm nhiều
      </Link>
      <Link
        to="/watching"
        className="block px-4 py-2 text-gray-800 hover:bg-indigo-500"
      >
        Sản phẩm theo dõi
      </Link>
      <Link
        to={ROUTES.ACCOUNT}
        className="block px-4 py-2 text-gray-800 hover:bg-indigo-500"
      >
        Tài khoản
      </Link>
    </div>
  </div>
);

export default NavigationAuth;
