import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import AsyncSelect from 'react-select/async';
import ClipLoader from 'react-spinners/ClipLoader';
import * as Yup from 'yup';
import { CloseIcon } from '../Icons';
import WatchService from '../../services/WatchService';
import { convertToNumber, displayWatchStatus } from '../../utils/Helpers';
import { FailedAlert, SuccessAlert } from '../Alert';
import SellerService from '../../services/SellerService';

let timeoutId;

const CreateRequestModal = ({ setShowModal }) => {
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <>
      <div
        className={`${
          message !== '' || loading ? 'h-80' : ''
        } absolute w-full text-black bg-white border border-gray-500 rounded-lg inset-y-1/3 md:inset-1/3 md:w-auto`}
      >
        <div className="flex flex-row justify-end px-2 py-2 cursor-pointer close-icon">
          <div
            onClick={() => {
              setShowModal(false);
            }}
          >
            <CloseIcon />
          </div>
        </div>

        <div className="flex flex-row justify-center font-bold text-green-500 uppercase">
          Connect to your shop
        </div>

        <div className="flex flex-row items-center justify-center w-full">
          {loading ? (
            <div className="flex flex-col items-center justify-center">
              <ClipLoader size={30} />
              <div>Please wait...</div>
            </div>
          ) : (
            <>
              {message !== '' ? (
                <div className="flex flex-row justify-center w-full mt-4">
                  {error ? (
                    <FailedAlert message={message} invisible={loading} />
                  ) : (
                    <SuccessAlert message={message} invisible={loading} />
                  )}
                </div>
              ) : null}
            </>
          )}
        </div>

        <CreateRequestForm
          setError={setError}
          setMessage={setMessage}
          setLoading={setLoading}
          setShowModal={setShowModal}
        />
      </div>
    </>
  );
};

export const CreateRequestForm = (props) => {
  const { setError, setMessage, setLoading, setShowModal } = props;
  const debounce = (func, delay) => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func();
      }, delay);
    };
  };

  const [inputValue, setValue] = useState('');
  const [selectedValue, setSelectedValue] = useState(null);

  const handleInputChange = (value) => {
    setValue(value);
  };

  const handleChange = (value) => {
    setSelectedValue(value);
  };

  const loadOptions = (inputValue) => {
    return new Promise((resolve) => {
      debounce(
        () =>
          resolve(SellerService.getSellers(inputValue).then((res) => res.data)),
        500
      )();
    });
  };

  const onSubmit = (event) => {
    setLoading(true);
    SellerService.createRequest({ seller: selectedValue.id })
      .then((res) => {
        setMessage('Your request has been created successfully');
        setLoading(false);
      })
      .catch((error) => {
        setError(true);
        setLoading(false);
        if (error.code === 400 && error.errors.detail) {
          if (
            error.errors.detail ===
            'A user cannot request to connect more than 1 seller'
          ) {
            setMessage('You can only create one request at a time.');
          }
        } else {
          setMessage('Something went wrong, please contact with the admin');
        }
      });

    event.preventDefault();
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col px-4 py-4">
      <div className="form-content">
        <AsyncSelect
          cacheOptions
          defaultOptions
          value={selectedValue}
          placeholder="--Select a shop--"
          getOptionLabel={(e) => e.name}
          getOptionValue={(e) => e.id}
          loadOptions={loadOptions}
          onInputChange={handleInputChange}
          onChange={handleChange}
        />

        <div className="flex flex-row justify-center">
          <button
            type="button"
            onClick={() => setShowModal(false)}
            className="px-4 py-3 mt-8 font-semibold text-white uppercase bg-red-500 rounded-lg hover:bg-red-400 hover:border-4 focus:outline-none"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-3 mt-8 ml-4 font-semibold text-white uppercase bg-gray-700 rounded-lg hover:bg-gray-500 hover:border-4 focus:outline-none"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default CreateRequestModal;
