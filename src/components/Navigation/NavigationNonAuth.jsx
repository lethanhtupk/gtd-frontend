import React from 'react';
import { Link } from 'react-router-dom';

const NavigationNonAuth = () => (
  <div className="avatarDropdown w-48 flex justify-end">
    <Link to="/register">
      <div className="h-full px-4 content-center flex items-center hover:bg-gray-500">
        <div className="text-white font-semibold text-lg">Sign Up</div>
      </div>
    </Link>
    <Link to="/login">
      <div className="h-full px-4 flex items-center hover:bg-gray-500">
        <div className="text-white font-semibold text-lg">Sign In</div>
      </div>
    </Link>
  </div>
);

export default NavigationNonAuth;
