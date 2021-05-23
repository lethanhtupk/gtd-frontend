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
        <div className="w-full h-full flex flex-row justify-center items-center">
          <ClipLoader size={30} />
        </div>
      ) : (
        <div className="item-carousel border border-gray-500 bg-white">
          <div className="image">
            <img
              src={productData.thumbnail_url}
              alt="product"
              className="w-full"
            />
          </div>
          <div className="detail px-8 flex flex-col items-center bg-gray-100">
            <Link to={`${ROUTES.WATCHES}/${watchData.id}`}>
              <p className="title text-blue-500 text-lg hover:text-blue-600 hover:underline h-16">
                {truncate(productData.name, 36)}
              </p>
            </Link>

            <p className="text-green-400 text-2xl mt-4">
              {numberWithCommas(productData.price)} đ
            </p>
            <p className="text-gray-500 text-sm mb-2">
              Expected price: {numberWithCommas(watchData.expected_price)}
            </p>
            <p className="text-gray-500 text-sm mb-2 flex flex-row">
              Status:&nbsp;
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
            </p>
          </div>
        </div>
      )}
    </>
  );
};

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(ItemWatch);
