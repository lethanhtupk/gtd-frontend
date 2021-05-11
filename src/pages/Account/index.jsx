import React from 'react';
import { Link } from 'react-router-dom';
import withAuthorization from '../../components/Session/withAuthorization';
import defaultAvatar from '../../static/img/default-avatar.png';
import SideBar from './SideBar';

const AccountPage = (props) => {
  const addDefaultSrc = (ev) => {
    ev.target.src = defaultAvatar;
  };

  const { authUser } = props;
  return (
    <>
      <header>
        <title>Account Overview - GTD</title>
      </header>

      <div className="account-page w-full h-full flex justify-center">
        <div className="flex w-4/5 mt-8">
          <SideBar authUser={authUser} />
          <div className="w-9/12 bg-white flex flex-col text-black px-8 py-16">
            <div className="text-4xl font-black">Account overview</div>
            <div className="mt-10 font-bold text-2xl mb-12">Profile</div>
            <div className="flex flex-col">
              <div className="flex flex-row">
                <p className="w-1/2 text-gray-500">Full name</p>
                <p className="w-1/2 text-black">{authUser[0].fullname}</p>
              </div>
              <hr className="text-gray-400 border border-gray-400 h-full mt-4" />
            </div>
            <div className="flex flex-col mt-8">
              <div className="flex flex-row">
                <p className="w-1/2 text-gray-500">Email</p>
                <p className="w-1/2 text-black">{authUser[0].email}</p>
              </div>
              <hr className="text-gray-400 border border-gray-400 h-full mt-4" />
            </div>

            <button
              type="button"
              className="uppercase text-gray-500 border-2 border-gray-400 rounded-full mt-8 w-1/5 font-medium hover:border-black hover:text-black
               px-4 py-2"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(AccountPage);
