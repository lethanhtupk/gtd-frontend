import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import { FailedAlert } from '../../components/Alert';
import CreateRequestModal from '../../components/CreateRequest/CreateRequestModal';
import * as ROUTES from '../../constants/routes';
import { NoItem } from '../../components/NoItem';
import { withAuthorization } from '../../components/Session';
import SellerService from '../../services/SellerService';
import {
  CheckIcon,
  DeleteIcon,
  LoadingIcon,
  ShoppingIcon,
  XCircleIcon,
} from '../../components/Icons';
import DeleteConfirmModal from './DeleteConfirmModal';

const ManageRequest = () => {
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [requests, setRequests] = useState([]);
  const [seller, setSeller] = useState();
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    SellerService.getRequests()
      .then((res) => {
        const sellerId = res.data[0].seller;
        SellerService.getSellerById(sellerId)
          .then((res) => {
            setLoading(false);
            setSeller(res);
          })
          .catch((error) => {
            setLoading(false);
            setMessage('Something went wrong, please contact with the admin');
          });
        setRequests(res.data);
      })
      .catch((error) => {
        setMessage('Something went wrong, please contact with the admin');
        setLoading(false);
      });
  }, [showModal]);

  return (
    <>
      {loading ? (
        <div className="flex flex-col items-center justify-center w-full h-full">
          <ClipLoader size={50} />
          <div>Please wait...</div>
        </div>
      ) : (
        <>
          {error ? (
            <div className="flex flex-row items-center justify-center">
              <div className="flex flex-col items-center">
                <FailedAlert message={message} />
                <div className="flex mt-4 text-xl">
                  <p>Back to&nbsp;</p>
                  <Link
                    to={ROUTES.HOME}
                    className="text-blue-500 hover:underline"
                  >
                    home page
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div
                className={`${
                  showModal || showConfirmModal
                    ? 'filter blur-sm grayscale'
                    : ''
                } flex flex-row items-center justify-center py-32 rounded-2xl`}
              >
                {requests.length > 0 ? (
                  <div className="relative w-5/6 px-4 py-4 bg-white md:w-4/5">
                    <div className="flex flex-row items-center">
                      <img
                        src={seller?.logo}
                        alt="shop_logo"
                        className="object-cover w-12"
                      />
                      <div className="ml-4 font-semibold">{seller?.name}</div>
                    </div>
                    <div className="mt-2">
                      <div className="flex justify-center w-1/2 px-2 py-2 text-blue-600 border border-blue-600 rounded-lg md:w-1/6">
                        <ShoppingIcon />
                        <button
                          type="button"
                          onClick={() => window.open(seller?.link)}
                          className="text-sm font-semibold focus:outline-none"
                        >
                          Go To Shop
                        </button>
                      </div>
                      <div className="flex flex-row mt-4">
                        <div className="absolute top-2 right-4">
                          <div
                            className={`${
                              requests[0].status === 1
                                ? 'text-green-500'
                                : requests[0].status === 2
                                ? 'text-green-500'
                                : 'text-red-500'
                            } text-sm font-semibold flex flex-row`}
                          >
                            {requests[0].status === 1 ? (
                              <LoadingIcon />
                            ) : requests[0].status === 2 ? (
                              <CheckIcon />
                            ) : (
                              <XCircleIcon />
                            )}

                            <p>
                              {requests[0].status === 1
                                ? 'Pending'
                                : requests[0].status === 2
                                ? 'Approve'
                                : 'Reject'}
                            </p>
                          </div>
                        </div>
                        <div
                          onClick={() => setShowConfirmModal(true)}
                          className="flex flex-row items-center justify-center w-1/2 px-4 py-2 text-sm font-semibold text-red-600 border border-red-600 rounded-lg md:w-1/6"
                        >
                          <DeleteIcon />
                          <div>Delete</div>
                        </div>
                      </div>
                      <div className="mt-4 text-sm text-red-500">
                        *Note: You can only request for a shop at a time. Please
                        delete your previous request and re-create in case you
                        would like to change.
                      </div>
                    </div>
                  </div>
                ) : (
                  <NoItem isRequest setShowModal={setShowModal} />
                )}
              </div>

              {showModal ? (
                <CreateRequestModal
                  setShowModal={setShowModal}
                  setRequests={setRequests}
                />
              ) : null}
              {showConfirmModal ? (
                <DeleteConfirmModal
                  setShowConfirmModal={setShowConfirmModal}
                  request={requests[0]}
                  setRequests={setRequests}
                />
              ) : null}
            </>
          )}
        </>
      )}
      <header>
        <title>Manage Requests - GTD</title>
      </header>
    </>
  );
};

const condition = (authUser) => !!authUser && authUser['role'] === 2;

export default withAuthorization(condition)(ManageRequest);
