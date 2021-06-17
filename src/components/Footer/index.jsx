import React from 'react';

const Footer = () => {
  return (
    <div className="object-bottom w-full pt-20 mt-12 bg-gray-600">
      <div className="w-full">
        <div className="flex flex-col items-center justify-center w-full pb-4 md:w-1/2">
          <div className="w-2/3">
            <p className="text-3xl font-medium text-white uppercase">
              get the deal
            </p>
            <p className="mt-8 text-gray-300">
              This is a personal project and I will try my best to bring it as
              much as helpful feature. Stick with me to tracking your favorite
              product. If you have any feedback, please contact with me.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-center w-full h-auto py-4 text-gray-300 bg-gray-800">
        @ 2021 Copyright: GetTheDeal.com
      </div>
    </div>
  );
};

export default Footer;
