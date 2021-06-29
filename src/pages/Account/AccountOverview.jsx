import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

const AccountOverview = ({ authUser, setActive }) => {
  return (
    <>
      <header>
        <title>Account Overview - GTD</title>
      </header>
      <div className="flex flex-col px-8 py-16 text-black bg-white">
        <div className="text-4xl font-black">Tổng quan tài khoản</div>
        <div className="mt-10 mb-12 text-2xl font-bold">Profile</div>
        <div className="flex flex-col">
          <div className="flex flex-col md:flex-row">
            <p className="w-1/2 text-gray-500">Họ tên</p>
            <p className="w-1/2 text-black">{authUser[0]?.fullname}</p>
          </div>
          <hr className="h-full mt-4 text-gray-400 border-gray-400" />
        </div>
        <div className="flex flex-col mt-8">
          <div className="flex flex-col md:flex-row">
            <p className="w-1/2 text-gray-500">Email</p>
            <p className="w-1/2 text-black">{authUser[0]?.email}</p>
          </div>
          <hr className="h-full mt-4 text-gray-400 border-gray-400" />
        </div>

        <Link to={ROUTES.EDIT_PROFILE}>
          <button
            type="button"
            onClick={() => setActive(1)}
            className="px-4 py-2 mt-8 font-medium text-gray-500 uppercase border-2 border-gray-400 rounded-full max-w-7xl hover:border-black hover:text-black focus:outline-none"
          >
            Chỉnh sửa profile
          </button>
        </Link>
      </div>
    </>
  );
};

export default AccountOverview;
