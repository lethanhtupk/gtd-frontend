import React from 'react';
import withAuthorization from '../../components/Session/withAuthorization';
import defaultAvatar from '../../static/img/default-avatar.png';

const AccountPage = (props) => {
  const addDefaultSrc = (ev) => {
    ev.target.src = defaultAvatar;
  };

  const { authUser } = props;
  console.log(authUser);
  return (
    <>
      <header>
        <title>GTD - Get The Deal | Account</title>
      </header>

      <div className="account-page w-full h-full flex justify-center">
        <div className="flex w-4/5 mt-8">
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

            <div className="navigation-element py-4 px-4 border-t border-gray-500 border-b items-center flex hover:bg-gray-700 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              <div className="ml-2">Account overview</div>
            </div>
            <div className="navigation-element py-4 px-4 border-t border-gray-500 border-b items-center flex hover:bg-gray-700 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                <path
                  fillRule="evenodd"
                  d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="ml-2">Edit profile</p>
            </div>
            <div className="navigation-element py-4 px-4 border-t border-gray-500 border-b items-center flex hover:bg-gray-700 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="ml-2">Change password</p>
            </div>
          </div>
          <div className="w-9/12 bg-white">Detail account information</div>
        </div>
      </div>
    </>
  );
};

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(AccountPage);
