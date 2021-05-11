import React from 'react';
import { Link } from 'react-router-dom';
import defaultAvatar from '../../static/img/default-avatar.png';
import { sideBarData } from '../../utils/Constant';

const SideBar = ({ authUser }) => {
  const addDefaultSrc = (ev) => {
    ev.target.src = defaultAvatar;
  };

  return (
    <div className="w-3/12 bg-gray-600 flex flex-col py-4 text-white">
      <div className="flex flex-col items-center">
        <img
          src={authUser[0].photo_url}
          className="w-20 h-20 rounded-full object-cover"
          alt="avatar"
          onError={addDefaultSrc}
        />
        <p className="mt-2 mb-2">{authUser[0].fullname}</p>
      </div>

      {sideBarData.map((item, index) => {
        return (
          <div
            key={index}
            className="navigation-element py-4 px-4 border-t border-gray-500 border-b items-center hover:bg-gray-700 cursor-pointer"
          >
            <Link to={item.path} className="flex flex-row">
              {item.icon}
              <div className="ml-2">{item.name}</div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default SideBar;
