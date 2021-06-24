import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import noItemImage from '../../static/img/mascot@2x.png';
import noItemSmall from '../../static/img/noItemSmall.png';

export const NoItem = () => (
  <div className="flex flex-col items-center justify-center w-5/6 py-12 md:bg-white md:4/5">
    <img src={noItemImage} alt="no_items" className="hidden md:block" />
    <img src={noItemSmall} alt="no_items_small" className="block md:hidden" />
    <div className="flex flex-col items-center mt-4">
      <p className="text-sm">You are not watching any products yet.</p>
      <Link
        to={ROUTES.HOME}
        className="px-8 py-1 mt-4 text-gray-700 bg-yellow-400 rounded-sm hover:bg-yellow-500"
      >
        Watching now
      </Link>
    </div>
  </div>
);
