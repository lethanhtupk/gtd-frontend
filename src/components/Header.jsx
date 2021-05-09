import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import NavigationNonAuth from './Navigation/NavigationNonAuth';
import NavigationAuth from './Navigation/NavigationAuth';

import { AuthUserContext } from './Session';

const Header = () => {
  return (
    <div className="header h-16 w-screen bg-gray-600 relative top-0 left-0 flex flex-row justify-between px-4">
      {/* logo part */}
      <Link to="/" className="logo flex flex-col justify-center text-white">
        <div style={{ fontFamily: 'Antonio' }}>
          <div className="brand-name text-3xl font-semibold">IO Saver</div>
          <div className="slogan text-xs font-medium">Save your money</div>
        </div>
      </Link>

      <div className="searchBox">{/* searchBox goes here */}</div>
      {/* avatar Dropdown menu */}
      <AuthUserContext.Consumer>
        {(props) => {
          const { authUser } = props;
          return authUser[0] ? (
            <NavigationAuth setAuthUser={authUser[1]} />
          ) : (
            <NavigationNonAuth />
          );
        }}
      </AuthUserContext.Consumer>
    </div>
  );
};

export default Header;
