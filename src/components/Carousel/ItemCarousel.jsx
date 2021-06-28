import React from 'react';
import { Link } from 'react-router-dom';
import { numberWithCommas, truncate } from '../../utils/Helpers';
import * as ROUTES from '../../constants/routes';

const ItemCarousel = ({ data, pageName }) => {
  return (
    <>
      <div className="bg-white border border-gray-500 item-carousel">
        <div className="image">
          <img src={data.thumbnail_url} alt="product" className="w-full" />
        </div>
        <div className="flex flex-col items-center px-8 bg-gray-100 detail">
          <Link
            to={{
              pathname: `${ROUTES.PRODUCTS}/${data.id}`,
              state: { name: pageName },
            }}
          >
            <p className="h-16 text-lg text-blue-500 title hover:text-blue-600 hover:underline">
              {truncate(data.name, 36)}
            </p>
          </Link>

          <p className="mt-4 text-2xl text-green-400">
            {numberWithCommas(data.price)} đ
          </p>
          <p className="mb-2 text-sm text-gray-500">
            List price: {numberWithCommas(data.list_price)}
          </p>
          <button
            type="button"
            onClick={() => window.open(`https://tiki.vn/${data.url_path}`)}
            className="w-full py-2 mb-2 text-lg font-semibold bg-yellow-300 rounded-lg hover:bg-yellow-400"
          >
            Buy Now
          </button>
        </div>
      </div>
    </>
  );
};

export default ItemCarousel;
