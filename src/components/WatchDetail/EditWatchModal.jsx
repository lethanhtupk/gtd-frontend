import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { CloseIcon } from '../Icons';
import WatchService from '../../services/WatchService';
import { displayWatchStatus } from '../../utils/Helpers';
import { FailedAlert, SuccessAlert } from '../Alert';

const EditWatchModal = ({ watchData, openModal, setOpenModal }) => {
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(openModal);

  useEffect(() => {
    setVisible(openModal);
  }, [openModal]);

  useEffect(() => {
    setOpenModal(visible);
  }, [visible]);

  return (
    <>
      <div
        className={`${
          visible ? 'visible ' : 'invisible '
        }absolute border border-gray-500 rounded-lg bg-white text-black`}
      >
        <div className="close-icon flex flex-row justify-end px-2 py-2 cursor-pointer">
          <div
            onClick={() => {
              setVisible(false);
            }}
          >
            <CloseIcon />
          </div>
        </div>

        <div className="w-full flex flex-row justify-center">
          {message !== '' ? (
            <div className="w-4/5">
              {error ? (
                <FailedAlert message={message} invisible={loading} />
              ) : (
                <SuccessAlert message={message} invisible={loading} />
              )}
            </div>
          ) : null}
        </div>

        <EditWatchForm
          watchData={watchData}
          setError={setError}
          setMessage={setMessage}
          setLoading={setLoading}
        />
      </div>
    </>
  );
};

export const EditWatchForm = (props) => {
  const { setError, setMessage, setLoading, watchData } = props;

  const validate = (values) => {
    const errors = {};
    const expectedPrice = values.expected_price;
    if (expectedPrice < 0) {
      errors.expected_price = 'Invalid expected price';
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      status: watchData.status,
      expected_price: watchData.expected_price,
    },
    validationSchema: Yup.object({
      status: Yup.number()
        .oneOf([1, 2], 'Invalid Status')
        .required('This field is required'),
      expected_price: Yup.number().required('This field is required'),
    }),
    onSubmit: (values) => {
      const data = {
        expected_price: values.expected_price,
        status: values.status,
      };
      WatchService.updateWatch(watchData.id, data)
        .then((res) => {
          if (res.code === 200) {
            setError(false);
            setLoading(false);
            setMessage('Update your watch success!');
          }
        })
        .catch((error) => {
          setError(true);
          setLoading(false);
          setMessage(
            'Failed to update watch, please check your input or try later'
          );
        });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col px-4 py-4">
      <div className="form-content">
        <label htmlFor="link_to_product" className="flex flex-col">
          Expect price
          <input
            id="link_to_product"
            type="text"
            {...formik.getFieldProps('expected_price')}
            className="py-2 border border-gray-300 px-4 rounded-lg"
          />
          {formik.touched.expected_price && formik.errors.expected_price ? (
            <div className="text-red-600 text-xs normal-case font-normal mt-1">
              {formik.errors.expected_price}
            </div>
          ) : null}
        </label>
        <label htmlFor="status" className="flex flex-col mt-2">
          Status
          {watchData.status === 1 ? (
            <select
              name="status"
              {...formik.getFieldProps('status')}
              className="py-2 border border-gray-300 px-4 bg-gray-300 rounded-lg"
            >
              <option value="1" label={displayWatchStatus(1)} selected />
              <option value="2" label={displayWatchStatus(2)} />
            </select>
          ) : (
            <select
              name="status"
              {...formik.getFieldProps('status')}
              className="py-2 border border-gray-300 px-4 bg-gray-300 rounded-lg"
            >
              <option value="1" label={displayWatchStatus(1)} />
              <option value="2" label={displayWatchStatus(2)} selected />
            </select>
          )}
          {formik.touched.expected_price && formik.errors.expected_price ? (
            <div className="text-red-600 text-xs normal-case font-normal mt-1">
              {formik.errors.expected_price}
            </div>
          ) : null}
        </label>
        <button
          type="submit"
          className="uppercase text-white font-semibold bg-gray-700 px-4 py-3 rounded-lg hover:bg-gray-500 hover:border-4 mt-8 focus:outline-none"
        >
          Update watch
        </button>
      </div>
    </form>
  );
};

export default EditWatchModal;
