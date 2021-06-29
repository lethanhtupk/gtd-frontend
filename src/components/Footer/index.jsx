import React from 'react';

const Footer = () => {
  return (
    <div className="w-full pt-20 mt-12 bg-gray-600">
      <div className="w-full">
        <div className="flex flex-col items-center justify-center w-full pb-4 md:w-1/2">
          <div className="w-2/3">
            <p className="text-3xl font-medium text-white uppercase">
              get the deal
            </p>
            <p className="mt-8 text-gray-300">
              Website giúp bạn theo dõi giá sản phẩm mong muốn. Bạn chỉ cần tạo
              sản phẩm cần theo dõi và mức giá mong muốn. Hệ thống sẽ tự động
              cập nhật giá và thông báo tới bạn qua email khi mức giá sản phẩm
              bằng hoặc nhỏ hơn mức giá mong muốn của bạn.
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
