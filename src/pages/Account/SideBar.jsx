import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import defaultAvatar from '../../static/img/default-avatar.png';
import { sideBarData } from '../../utils/Constant';

const SideBar = ({ authUser, active, setActive }) => {
  const addDefaultSrc = (ev) => {
    ev.target.src = defaultAvatar;
  };

  return (
    <div className="flex flex-col py-4 text-white">
      <div className="flex flex-col items-center mb-8">
        <img
          src={authUser[0]?.photo_url ? authUser[0]?.photo_url : defaultAvatar}
          className="object-cover w-20 h-20 rounded-full"
          alt="avatar"
          onError={addDefaultSrc}
        />
      </div>

      {sideBarData.map((item, index) => {
        return (
          <div
            key={index}
            className={active === index ? 'border-l-8 border-green-400' : ''}
            onClick={() => setActive(index)}
          >
            <div className="items-center px-4 py-4 border-t border-b border-gray-500 cursor-pointer hover:bg-gray-700">
              <Link to={item.path} className="flex flex-row">
                <div
                  className={active === index ? 'text-white' : 'text-gray-400'}
                >
                  {item.icon}
                </div>
                <div
                  className={
                    active === index ? 'ml-2 text-white' : 'ml-2 text-gray-400'
                  }
                >
                  {item.name}
                </div>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SideBar;
