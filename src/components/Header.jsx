import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import NavigationNonAuth from './Navigation/NavigationNonAuth';
import NavigationAuth from './Navigation/NavigationAuth';
import * as ROUTES from '../constants/routes';

import { AuthUserContext } from './Session';
import SearchBar from './SearchBar';

const Header = () => {
  return (
    <div className="header h-16 w-screen bg-gray-600 relative top-0 left-0 flex flex-row justify-between px-8">
      {/* logo part */}
      <div className="flex flex-row items-center">
        <Link
          to={ROUTES.HOME}
          className="logo flex flex-col justify-center text-white"
        >
          <div style={{ fontFamily: 'Antonio' }}>
            <div className="brand-name text-3xl font-semibold">IO Saver</div>
            <div className="slogan text-xs font-medium">Save your money</div>
          </div>
        </Link>
        <div className="searchBox ml-8">
          <SearchBar />
        </div>
      </div>

      {/* avatar Dropdown menu */}
      <AuthUserContext.Consumer>
        {(props) => {
          const { authUser } = props;
          return authUser[0] ? (
            <NavigationAuth setAuthUser={authUser[1]} authUser={authUser[0]} />
          ) : (
            <NavigationNonAuth />
          );
        }}
      </AuthUserContext.Consumer>
    </div>
  );
};

export default Header;
