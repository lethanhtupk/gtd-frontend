import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import NavigationNonAuth from './Navigation/NavigationNonAuth';
import NavigationAuth from './Navigation/NavigationAuth';
import * as ROUTES from '../constants/routes';
import { AuthUserContext } from './Session';
import SearchBar from './SearchBar';
import { MenuIcon } from './Icons';

const Header = () => {
  const [openNavigation, setOpenNavigation] = useState(false);
  return (
    <div className="relative top-0 left-0 flex flex-col justify-between w-screen bg-gray-900 md:bg-gray-600 md:items-center md:flex-row md:h-16 md:px-8 header">
      <div className="flex flex-row items-center justify-between px-4 py-2 md:px-0 md:items-center md:flex-row">
        <Link
          to={ROUTES.HOME}
          onClick={() => setOpenNavigation(false)}
          className="flex flex-col justify-center text-white logo"
        >
          <div style={{ fontFamily: 'Antonio' }}>
            <div className="text-3xl font-semibold brand-name">IO Saver</div>
            <div className="text-xs font-medium slogan">Save your money</div>
          </div>
        </Link>
        <div className="hidden ml-8 searchBox md:flex">
          <SearchBar setOpenNavigation={setOpenNavigation} />
        </div>
        <div
          className="text-white md:hidden"
          onClick={() => setOpenNavigation(!openNavigation)}
        >
          <MenuIcon />
        </div>
      </div>

      <div
        className={`w-screen bg-gray-700 md:hidden ${
          openNavigation ? '' : 'hidden'
        }`}
      >
        <SearchBar setOpenNavigation={setOpenNavigation} />
      </div>

      <div
        className={`md:flex-row md:items-center md:h-full md:flex md:w-auto w-screen bg-gray-600 md:justify-end ${
          openNavigation ? '' : 'hidden'
        }`}
      >
        <AuthUserContext.Consumer>
          {(props) => {
            const { authUser } = props;
            return authUser[0] ? (
              <NavigationAuth
                setAuthUser={authUser[1]}
                authUser={authUser[0]}
                openNavigation={openNavigation}
                setOpenNavigation={setOpenNavigation}
              />
            ) : (
              <NavigationNonAuth setOpenNavigation={setOpenNavigation} />
            );
          }}
        </AuthUserContext.Consumer>
      </div>
    </div>
  );
};

export default Header;
