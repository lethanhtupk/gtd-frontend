import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import ProductService from '../../services/ProductService';
import {
  displayWatchStatus,
  numberWithCommas,
  truncate,
} from '../../utils/Helpers';
import * as ROUTES from '../../constants/routes';
import withAuthorization from '../Session/withAuthorization';
import { CheckIcon, XCircleIcon } from '../Icons';

const ItemWatch = ({ watchData }) => {
  const [productData, setProductData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ProductService.getProductDetail(watchData.product)
      .then((res) => {
        setProductData(res);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, [watchData]);

  return (
    <>
      {loading ? (
        <div className="flex flex-row items-center justify-center w-full h-full">
          <ClipLoader size={30} />
        </div>
      ) : (
        <div className="bg-white border border-gray-500 item-carousel">
          <div className="image">
            <img
              src={productData.thumbnail_url}
              alt="product"
              className="w-full"
            />
          </div>
          <div className="flex flex-col items-center px-8 bg-gray-100 detail">
            <Link to={`${ROUTES.WATCHES}/${watchData.id}`}>
              <p className="h-16 text-lg text-blue-500 title hover:text-blue-600 hover:underline">
                {truncate(productData.name, 36)}
              </p>
            </Link>

            <p className="mt-4 text-2xl text-green-400">
              {numberWithCommas(productData.price)} đ
            </p>
            <p className="mb-2 text-sm text-gray-500">
              GIá mong muốn: {numberWithCommas(watchData.expected_price)} đ
            </p>
            <div className="flex flex-row mb-2 text-sm text-gray-500">
              Trạng thái:&nbsp;
              {watchData.status === 1 ? (
                <div className="text-green-500">
                  <CheckIcon />
                </div>
              ) : (
                <div className="text-red-500">
                  <XCircleIcon />
                </div>
              )}
              <p
                className={
                  watchData.status === 1 ? 'text-green-500' : 'text-red-500'
                }
              >
                {` ${displayWatchStatus(watchData.status)}`}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(ItemWatch);
