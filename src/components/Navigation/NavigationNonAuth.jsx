import React from 'react';
import { Link } from 'react-router-dom';

const NavigationNonAuth = () => (
  <div className="flex justify-end w-48 h-full avatarDropdown">
    <Link to="/register">
      <div className="flex items-center content-center h-full px-4 hover:bg-gray-500">
        <div className="text-lg font-semibold text-white">Sign Up</div>
      </div>
    </Link>
    <Link to="/login">
      <div className="flex items-center h-full px-4 hover:bg-gray-500">
        <div className="text-lg font-semibold text-white">Sign In</div>
      </div>
    </Link>
  </div>
);

export default NavigationNonAuth;
