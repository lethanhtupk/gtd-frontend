import React from 'react';
import { Link } from 'react-router-dom';
import { numberWithCommas, truncate } from '../../utils/Helpers';
import * as ROUTES from '../../constants/routes';

const ItemCarousel = ({ data }) => {
  return (
    <>
      <div className="item-carousel border border-gray-500 bg-white">
        <div className="image">
          <img src={data.thumbnail_url} alt="product" className="w-full" />
        </div>
        <div className="detail px-8 flex flex-col items-center bg-gray-100">
          <Link to={`${ROUTES.PRODUCTS}/${data.id}`}>
            <p className="title text-blue-500 text-lg hover:text-blue-600 hover:underline h-16">
              {truncate(data.name, 36)}
            </p>
          </Link>

          <p className="text-green-400 text-2xl mt-4">
            {numberWithCommas(data.price)} đ
          </p>
          <p className="text-gray-500 text-sm mb-2">
            List price: {numberWithCommas(data.list_price)}
          </p>
          <button
            type="button"
            onClick={() => window.open(`https://tiki.vn/${data.url_path}`)}
            className="text-lg font-semibold py-2 w-full bg-yellow-300 hover:bg-yellow-400 rounded-lg mb-2"
          >
            Buy Now
          </button>
        </div>
      </div>
    </>
  );
};

export default ItemCarousel;
