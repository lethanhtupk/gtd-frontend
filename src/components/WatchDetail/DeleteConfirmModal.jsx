import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import * as ROUTES from '../../constants/routes';
import WatchService from '../../services/WatchService';
import { CloseIcon, ConfirmDeleteIcon } from '../Icons';

const DeleteConfirmModal = (props) => {
  const { openDelete, setOpenDelete, watchData } = props;
  const [visible, setVisible] = useState(openDelete);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');

  console.log(watchData);

  useEffect(() => {
    setVisible(openDelete);
  }, [openDelete]);

  useEffect(() => {
    setOpenDelete(visible);
  }, [visible]);

  const onDeleteHandler = () => {
    setLoading(true);
    WatchService.updateWatch(watchData.id, {
      expected_price: watchData.expected_price,
      status: 3,
    })
      .then((res) => {
        console.log(res);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
        props.history.push(ROUTES.WATCHES);
      })
      .catch((error) => {
        console.log(error);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
        setError(true);
        if (error.code === 500) {
          setMessage(
            'There is an error in the system, please contact with the admin'
          );
        } else {
          setMessage(error.errors.detail);
        }
      });
  };

  return (
    <div className="absolute flex flex-col w-5/6 bg-white border border-gray-500 rounded-lg h-72 md:h-auto inset-y-1/3 md:w-96 md:inset-1/3">
      <div className="flex flex-row justify-end px-2 py-2 cursor-pointer close-icon">
        <div onClick={() => setVisible(false)}>
          <CloseIcon />
        </div>
      </div>
      <div className="flex flex-col items-center px-8">
        {loading ? (
          <>
            <ClipLoader size={50} />
            <div>Please wait...</div>
          </>
        ) : (
          <>
            <div className="flex flex-row justify-center w-full text-red-500">
              <ConfirmDeleteIcon />
            </div>
            {error ? (
              <>
                <div className="mt-5 text-2xl text-red-500 title">
                  Delete watch failed
                </div>
                <div className="text-sm text-center text-red-400">
                  {message}
                </div>
                <div className="mt-4 button">
                  <button
                    type="button"
                    className="px-8 py-2 text-white bg-gray-500 rounded-sm hover:bg-gray-600 focus:outline-none"
                    onClick={() => setVisible(false)}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="text-2xl text-gray-600 title">
                  Are you sure?
                </div>
                <div className="text-center text-gray-500">
                  Do you really want to delete these records? This process
                  cannot be undone.
                </div>
                <div className="mt-4 button">
                  <button
                    type="button"
                    className="px-8 py-2 text-white bg-gray-500 rounded-sm hover:bg-gray-600 focus:outline-none"
                    onClick={() => setVisible(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => onDeleteHandler()}
                    className="px-8 py-2 ml-2 text-white bg-red-500 rounded-sm hover:bg-red-600 focus:outline-none"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default withRouter(DeleteConfirmModal);
