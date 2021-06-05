import React, { useState, useEffect } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import ProductService from '../../services/ProductService';
import WatchService from '../../services/WatchService';
import { WATCH_STATUS } from '../../utils/Constant';
import { numberWithCommas, displayWatchStatus } from '../../utils/Helpers';
import { CheckIcon, DeleteIcon, PenIcon, XCircleIcon } from '../Icons';
import Rating from '../Rating';
import withAuthorization from '../Session/withAuthorization';
import DeleteConfirmModal from './DeleteConfirmModal';
import EditWatchModal from './EditWatchModal';

const WatchDetail = ({ match }) => {
  const [watchData, setWatchData] = useState({});
  const [productData, setProductData] = useState({});
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  useEffect(() => {
    WatchService.getDetailWatch(match.params.id)
      .then((res) => {
        setWatchData(res);
        ProductService.getProductDetail(res?.product)
          .then((res) => {
            setProductData(res);
            setLoading(false);
          })
          .catch((error) => {
            setError(error);
            setLoading(false);
          });
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      {loading ? (
        <div className="w-full h-full flex flex-row justify-center items-center">
          <ClipLoader size={50} />
        </div>
      ) : (
        <>
          {error ? (
            <div className="flex justify-center items-center text-red-500 text-3xl">
              {error.errors.detail}
            </div>
          ) : (
            <div
              className={`w-full flex flex-row justify-center ${
                openDelete ? 'filter blur-sm grayscale' : null
              }`}
            >
              <div className="mt-12 w-4/5">
                <div className="product-overview grid grid-cols-3">
                  <div className="image">
                    <img src={productData.images[0]?.base_url} alt="product" />
                  </div>
                  <div className="overview col-span-2 bg-white ml-2 px-4 py-4 relative">
                    {openModal ? (
                      <div className="absolute right-8 top-12 min-w-1/3">
                        <EditWatchModal
                          watchData={watchData}
                          setWatchData={setWatchData}
                          openModal={openModal}
                          setOpenModal={setOpenModal}
                        />
                      </div>
                    ) : null}
                    <div className="flex flex-row justify-between">
                      <div className="text-gray-600 text-sm flex">
                        Brand:{' '}
                        <p className="text-blue-500 ml-1 cursor-pointer hover:underline">{` ${productData.brand?.name}`}</p>
                      </div>
                      <div className="text-gray-500 w-1/2 right-0 flex flex-row justify-end">
                        <div
                          className="mr-2 hover:text-black cursor-pointer"
                          onClick={() => setOpenDelete(!openDelete)}
                        >
                          <DeleteIcon />
                        </div>
                        <div
                          className="hover:text-black cursor-pointer"
                          onClick={() => setOpenModal(!openModal)}
                        >
                          <PenIcon />
                        </div>
                      </div>
                    </div>
                    <p className="font-light text-xl">{productData.name}</p>
                    <div className="rating-section mt-4 flex flex-row">
                      <Rating rate={productData.rating_average} />
                    </div>
                    <div className="price-section flex flex-row items-center mt-8">
                      <p className="text-2xl font-bold">
                        {numberWithCommas(productData.price)} đ
                      </p>
                      <div className="discount-section ml-4">
                        <div className="flex-row flex">
                          <p className="line-through text-xs">
                            {numberWithCommas(productData.list_price)} đ
                          </p>
                          <p className="line-through text-xs ml-2">{`${productData.discount_rate}%`}</p>
                        </div>
                      </div>
                    </div>
                    <div className="watch-section mt-4">
                      <div className="flex flex-row">
                        <p>Expected price:&nbsp;</p>
                        <p className="">
                          {numberWithCommas(watchData.expected_price)} đ
                        </p>
                      </div>
                      <div className="flex flex-row mt-2">
                        <p>Lowest price:&nbsp;</p>
                        <p className="">
                          {numberWithCommas(watchData.lowest_price)} đ
                        </p>
                      </div>
                      <div className="flex flex-row mt-2">
                        <p className="flex flex-row">Status:&nbsp;</p>
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
                            watchData.status === 1
                              ? 'text-green-500'
                              : 'text-red-500'
                          }
                        >
                          {` ${displayWatchStatus(watchData.status)}`}
                        </p>
                      </div>
                    </div>
                    <div className="button-section mt-16 flex flex-row items-center">
                      <button
                        type="button"
                        onClick={() =>
                          window.open(`https://tiki.vn/${productData.url_path}`)
                        }
                        className="text-lg font-semibold py-2 px-8 bg-yellow-300 hover:bg-yellow-400 rounded-lg"
                      >
                        View at Tiki
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {openDelete ? (
            <DeleteConfirmModal
              watchData={watchData}
              openDelete={openDelete}
              setOpenDelete={setOpenDelete}
            />
          ) : null}
        </>
      )}
      <header>
        <title>{productData.name}</title>
      </header>
    </>
  );
};

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(WatchDetail);
