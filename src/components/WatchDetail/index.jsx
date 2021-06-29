import React, { useState, useEffect } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import ProductService from '../../services/ProductService';
import WatchService from '../../services/WatchService';
import { numberWithCommas, displayWatchStatus } from '../../utils/Helpers';
import { CheckIcon, DeleteIcon, PenIcon, XCircleIcon } from '../Icons';
import { NotFound } from '../NotFound';
import Rating from '../Rating';
import withAuthorization from '../Session/withAuthorization';
import DeleteConfirmModal from './DeleteConfirmModal';
import EditWatchModal from './EditWatchModal';

const WatchDetail = ({ match }) => {
  const [watchData, setWatchData] = useState({});
  const [productData, setProductData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [message, setMessage] = useState();

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
        setError(true);
        setLoading(false);
        if (error.code === 403 || error.code === 404) {
          setMessage(<NotFound />);
        } else {
          setMessage(
            <div className="text-sm text-red-500">
              Có lỗi hệ thống, liên hệ admin ngay!
            </div>
          );
        }
      });
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex flex-col items-center justify-center w-full h-full">
          <ClipLoader size={50} />
          <div>Xin chờ...</div>
        </div>
      ) : (
        <>
          {error ? (
            <div className="flex flex-row items-center justify-center w-full h-full ">
              {message}
            </div>
          ) : (
            <div
              className={`w-full flex flex-row justify-center ${
                openDelete ? 'filter blur-sm grayscale' : null
              }`}
            >
              <div className="w-5/6 mt-12 mb-8 md:w-4/5 md:mb-0">
                <div className="grid grid-cols-1 md:grid-cols-3 product-overview">
                  <div className="image">
                    <img src={productData.images[0]?.base_url} alt="product" />
                  </div>
                  <div className="relative w-full col-span-2 px-4 py-4 mt-6 bg-white md:ml-2 overview md:mt-0">
                    {openModal ? (
                      <div className="absolute right-0 w-full md:w-auto md:left-auto md:right-8 top-12 md:min-w-1/3">
                        <EditWatchModal
                          watchData={watchData}
                          setWatchData={setWatchData}
                          openModal={openModal}
                          setOpenModal={setOpenModal}
                        />
                      </div>
                    ) : null}
                    <div className="flex flex-row justify-between">
                      <div className="flex text-sm text-gray-600">
                        Nhãn hiệu:{' '}
                        <p className="ml-1 text-blue-500 cursor-pointer hover:underline">{` ${
                          productData.brand?.name ?? 'Unknown'
                        }`}</p>
                      </div>
                      <div className="right-0 flex flex-row justify-end w-1/2 text-gray-500">
                        <div
                          className="mr-2 cursor-pointer hover:text-black"
                          onClick={() => setOpenDelete(!openDelete)}
                        >
                          <DeleteIcon />
                        </div>
                        <div
                          className="cursor-pointer hover:text-black"
                          onClick={() => setOpenModal(!openModal)}
                        >
                          <PenIcon />
                        </div>
                      </div>
                    </div>
                    <p className="text-xl font-light">{productData.name}</p>
                    <div className="flex flex-row mt-4 rating-section">
                      <Rating rate={productData.rating_average} />
                    </div>
                    <div className="flex flex-row items-center mt-8 price-section">
                      <p className="text-2xl font-bold">
                        {numberWithCommas(productData.price)} đ
                      </p>
                      <div className="ml-4 discount-section">
                        <div className="flex flex-row">
                          <p className="text-xs line-through">
                            {numberWithCommas(productData.list_price)} đ
                          </p>
                          <p className="ml-2 text-xs line-through">{`${productData.discount_rate}%`}</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 watch-section">
                      <div className="flex flex-row">
                        <p>Giá mong muốn:&nbsp;</p>
                        <p className="">
                          {numberWithCommas(watchData.expected_price)} đ
                        </p>
                      </div>
                      <div className="flex flex-row mt-2">
                        <p>Giá thấp nhất:&nbsp;</p>
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
                    <div className="flex flex-row items-center mt-16 button-section">
                      <button
                        type="button"
                        onClick={() =>
                          window.open(`https://tiki.vn/${productData.url_path}`)
                        }
                        className="px-8 py-2 text-lg font-semibold bg-yellow-300 rounded-lg hover:bg-yellow-400"
                      >
                        Xem tại Tiki
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {openDelete ? (
            <div className="flex flex-row justify-center">
              <DeleteConfirmModal
                watchData={watchData}
                openDelete={openDelete}
                setOpenDelete={setOpenDelete}
              />
            </div>
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
