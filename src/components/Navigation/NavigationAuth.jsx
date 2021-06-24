import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import Logout from '../logout';
import defaultAvatar from '../../static/img/default-avatar.png';
import { LOCAL_STORAGE } from '../../utils/Constant';

const NavigationAuth = ({
  authUser,
  setAuthUser,
  openNavigation,
  setOpenNavigation,
}) => {
  const [isShow, setIsShow] = useState(false);

  const addDefaultSrc = (ev) => {
    ev.target.src = defaultAvatar;
  };

  const onLogoutHandler = () => {
    localStorage.removeItem(LOCAL_STORAGE.ACCESS_TOKEN);
    localStorage.removeItem(LOCAL_STORAGE.REFRESH_TOKEN);
    localStorage.removeItem(LOCAL_STORAGE.USER_INFO);
    setAuthUser(null);
  };

  return (
    <div className="flex flex-col items-center pt-5 bg-gray-700 md:pt-0 md:flex-row justify-evenly md:bg-gray-600">
      {openNavigation ? (
        <div className="flex flex-col w-screen py-2 bg-gray-700 border-t border-b border-gray-500 md:hidden top-14 right-8 md:border-b-0 md:border-t-0">
          <Link
            to={ROUTES.POPULAR_PRODUCTS}
            onClick={() => setOpenNavigation(false)}
            className="block px-4 py-2 text-white md:text-gray-800 hover:bg-indigo-500"
          >
            Popular products
          </Link>
          <Link
            to={ROUTES.TOP_DROPS_PRODUCT}
            onClick={() => setOpenNavigation(false)}
            className="block px-4 py-2 text-white md:text-gray-800 hover:bg-indigo-500"
          >
            Top drops
          </Link>
          <Link
            to={ROUTES.WATCHES}
            onClick={() => setOpenNavigation(false)}
            className="block px-4 py-2 text-white md:text-gray-800 hover:bg-indigo-500"
          >
            Your Price Watches
          </Link>
          {authUser.role === 2 && !authUser.seller ? (
            <Link
              to={ROUTES.CHANGE_PASSWORD}
              onClick={() => {
                setOpenNavigation(false);
                setTimeout(() => location.reload(), 1);
              }}
              className="px-4 py-2 text-white font-base md:hidden"
            >
              Connect to a shop
            </Link>
          ) : null}
          {authUser.role === 2 && authUser.seller ? (
            <Link
              to={ROUTES.CHANGE_PASSWORD}
              onClick={() => {
                setOpenNavigation(false);
                setTimeout(() => location.reload(), 1);
              }}
              className="px-4 py-2 text-white font-base md:hidden"
            >
              Your shop
            </Link>
          ) : null}
          <a
            to={ROUTES.ACCOUNT}
            onClick={() => (window.location.href = ROUTES.ACCOUNT)}
            className="hidden block px-4 py-2 text-gray-800 cursor-pointer hover:bg-indigo-500 md:flex"
          >
            Account
          </a>
        </div>
      ) : null}

      <div className="flex flex-col justify-center w-screen h-full py-5 pl-4 md:pl-0 md:py-0 md:w-auto">
        <div className="flex flex-row items-center">
          <button
            className="block w-10 h-10 overflow-hidden border-2 border-gray-500 rounded-full avatar focus:outline-none"
            type="button"
            onMouseEnter={() => setIsShow(true)}
          >
            <img
              src={authUser.photo_url ? authUser.photo_url : defaultAvatar}
              onError={addDefaultSrc}
              alt=""
              className="object-cover w-full h-full"
            />
          </button>

          <div className="ml-4 font-semibold text-gray-200 md:hidden">
            {authUser.fullname}
          </div>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="hidden block w-6 h-6 ml-2 cursor-pointer md:flex"
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

          <div className="hidden md:flex">
            <Logout setAuthUser={setAuthUser} />
          </div>
        </div>
        <Link
          to={ROUTES.ACCOUNT_OVERVIEW}
          onClick={() => {
            setOpenNavigation(false);
            setTimeout(() => location.reload(), 1);
          }}
          className="py-2 mt-5 text-white font-base md:hidden"
        >
          Account overview
        </Link>
        <Link
          to={ROUTES.EDIT_PROFILE}
          onClick={() => {
            setOpenNavigation(false);
            setTimeout(() => location.reload(), 1);
          }}
          className="py-2 text-white font-base md:hidden"
        >
          Edit profile
        </Link>
        <Link
          to={ROUTES.CHANGE_PASSWORD}
          onClick={() => {
            setOpenNavigation(false);
            setTimeout(() => location.reload(), 1);
          }}
          className="py-2 text-white font-base md:hidden"
        >
          Change password
        </Link>
        <div
          className="py-2 text-white font-base md:hidden"
          onClick={() => {
            onLogoutHandler();
            setOpenNavigation(false);
          }}
        >
          Sign out
        </div>
      </div>

      {isShow ? (
        <div
          className="absolute hidden py-2 bg-white border-2 border-gray-300 rounded-lg md:flex md:flex-col top-14 right-8"
          onMouseEnter={() => setIsShow(true)}
          onMouseLeave={() => setIsShow(false)}
        >
          <Link
            to={ROUTES.POPULAR_PRODUCTS}
            className="block px-4 py-2 text-gray-800 hover:bg-indigo-500"
          >
            Popular products
          </Link>
          <Link
            to={ROUTES.TOP_DROPS_PRODUCT}
            className="block px-4 py-2 text-gray-800 hover:bg-indigo-500"
          >
            Top drops
          </Link>
          <Link
            to={ROUTES.WATCHES}
            className="block px-4 py-2 text-gray-800 hover:bg-indigo-500"
          >
            Your Price Watches
          </Link>
          {authUser.role === 2 && !authUser.seller ? (
            <Link
              to={ROUTES.WATCHES}
              className="block px-4 py-2 text-gray-800 hover:bg-indigo-500"
            >
              Connect to a shop
            </Link>
          ) : null}
          {authUser.role === 2 && authUser.seller ? (
            <Link
              to={ROUTES.WATCHES}
              className="block px-4 py-2 text-gray-800 hover:bg-indigo-500"
            >
              Your shop
            </Link>
          ) : null}
          <a
            to={ROUTES.ACCOUNT}
            onClick={() => (window.location.href = ROUTES.ACCOUNT)}
            className="block px-4 py-2 text-gray-800 cursor-pointer hover:bg-indigo-500"
          >
            Account
          </a>
        </div>
      ) : null}
    </div>
  );
};

export default NavigationAuth;
