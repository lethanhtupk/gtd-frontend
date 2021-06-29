import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import NotFoundImage from '../../static/img/super.png';

export const NotFound = () => (
  <div className="flex flex-col items-center justify-center w-5/6 py-48 md:w-4/5">
    <header>
      <title>404 Not Found - GTD</title>
    </header>
    <div className="flex flex-row w-auto">
      <img
        src={NotFoundImage}
        alt="not_found_image"
        className="object-cover h-40 md:h-auto"
      />
      <div className="flex flex-col justify-end">
        <p className="text-4xl font-extrabold md:text-6xl">404 Not Found</p>
      </div>
    </div>
    <div className="mt-4 text-sm">
      Trang bạn yêu cầu truy cập không có hoặc bạn không có quyền để truy cập
      trang này.
    </div>
    <Link
      className="px-8 py-1 mt-8 text-gray-800 capitalize bg-yellow-400 rounded-sm hover:bg-yellow-500"
      to={ROUTES.HOME}
    >
      Quay về trang chủ
    </Link>
  </div>
);
