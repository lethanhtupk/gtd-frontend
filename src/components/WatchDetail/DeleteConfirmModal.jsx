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
  const [error, setError] = useState();

  useEffect(() => {
    setVisible(openDelete);
  }, [openDelete]);

  useEffect(() => {
    setOpenDelete(visible);
  }, [visible]);

  const onDeleteHandler = () => {
    setLoading(true);
    WatchService.deleteWatch(watchData.id)
      .then((res) => {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
        props.history.push(ROUTES.WATCHES);
      })
      .catch((error) => {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
        setError(error);
      });
  };

  return (
    <div className="w-96 h-auto border border-gray-500 bg-white absolute inset-1/3 rounded-lg">
      <div className="close-icon flex flex-row justify-end px-2 py-2 cursor-pointer">
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
            <div className="text-red-500 w-full flex flex-row justify-center">
              <ConfirmDeleteIcon />
            </div>
            {error ? (
              <>
                <div className="title text-red-500 text-2xl mt-5">
                  Delete watch failed
                </div>
                <div className="text-red-400 text-center">
                  {error.errors.detail}
                </div>
              </>
            ) : (
              <>
                <div className="title text-gray-600 text-2xl mt-5">
                  Are you sure?
                </div>
                <div className="text-gray-500 text-center">
                  Do you really want to delete these records? This process
                  cannot be undone.
                </div>
                <div className="button mt-4">
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
                    className="px-8 py-2 text-white bg-red-500 rounded-sm ml-2 hover:bg-red-600 focus:outline-none"
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
