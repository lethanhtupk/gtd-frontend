import React from 'react';
import { Link } from 'react-router-dom';

const NavigationNonAuth = ({ setOpenNavigation }) => (
  <div className="flex flex-col justify-end w-screen h-full pt-5 bg-gray-700 md:w-48 md:flex-row avatarDropdown md:bg-gray-600 md:pt-0">
    <Link to="/register" onClick={() => setOpenNavigation(false)}>
      <div className="flex items-center h-full px-4 py-2 pt-5 border-t border-gray-500 md:py-0 hover:bg-gray-500 md:border-t-0 md:pt-0">
        <div className="font-semibold text-white md:text-lg">Sign Up</div>
      </div>
    </Link>
    <Link to="/login" onClick={() => setOpenNavigation(false)}>
      <div className="flex items-center h-full px-4 pt-2 pb-5 hover:bg-gray-500 md:py-0">
        <div className="font-semibold text-white md:text-lg">Sign In</div>
      </div>
    </Link>
  </div>
);

export default NavigationNonAuth;
