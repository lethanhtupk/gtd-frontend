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
        <title>GTD - Get The Deal | Account</title>
      </header>

      <div className="account-page w-full h-full flex justify-center">
        <div className="flex w-4/5 mt-8">
          <SideBar authUser={authUser} />
          <div className="w-9/12 bg-white">Detail account information</div>
        </div>
      </div>
    </>
  );
};

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(AccountPage);
