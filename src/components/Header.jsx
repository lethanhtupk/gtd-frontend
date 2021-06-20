import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import NavigationNonAuth from './Navigation/NavigationNonAuth';
import NavigationAuth from './Navigation/NavigationAuth';
import * as ROUTES from '../constants/routes';
import { AuthUserContext } from './Session';
import SearchBar from './SearchBar';
import { MenuIcon } from './Icons';

const Header = () => {
  return (
    <div className="relative top-0 left-0 flex flex-row items-center justify-between w-screen h-16 px-4 bg-gray-600 md:px-8 header">
      <div className="flex flex-col py-2 md:items-center md:flex-row">
        <Link
          to={ROUTES.HOME}
          className="flex flex-col justify-center text-white logo"
        >
          <div style={{ fontFamily: 'Antonio' }}>
            <div className="text-3xl font-semibold brand-name">IO Saver</div>
            <div className="text-xs font-medium slogan">Save your money</div>
          </div>
        </Link>
        <div className="hidden ml-8 searchBox md:flex">
          <SearchBar />
        </div>
      </div>

      <div className="text-white md:hidden">
        <MenuIcon />
      </div>

      <div className="flex-row items-center hidden h-full md:flex">
        <AuthUserContext.Consumer>
          {(props) => {
            const { authUser } = props;
            return authUser[0] ? (
              <NavigationAuth
                setAuthUser={authUser[1]}
                authUser={authUser[0]}
              />
            ) : (
              <NavigationNonAuth />
            );
          }}
        </AuthUserContext.Consumer>
      </div>
    </div>
  );
};

export default Header;
