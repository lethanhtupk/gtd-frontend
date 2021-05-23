import React from 'react';

const Footer = () => {
  return (
    <div className="w-full bg-gray-600 pt-20 mt-12 object-bottom">
      <div className="w-full">
        <div className="w-1/2 flex flex-col justify-center items-center pb-4">
          <div className="w-2/3">
            <p className="uppercase text-white text-3xl font-medium">
              get the deal
            </p>
            <p className="text-gray-300 mt-8">
              This is a personal project and I will try my best to bring it as
              much as helpful feature. Stick with me to tracking your favorite
              product. If you have any feedback, please contact with me.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full bg-gray-800 flex justify-center h-auto text-gray-300 py-4">
        @ 2021 Copyright: GetTheDeal.com
      </div>
    </div>
  );
};

export default Footer;
