import { useFormik } from 'formik';
import * as Yup from 'yup';
import React, { useEffect, useState } from 'react';
import { CloseIcon } from '../Icons';
import { FailedAlert, SuccessAlert } from '../Alert';
import WatchService from '../../services/WatchService';
import { seed } from '../../utils/Seed';

const ModalCreate = ({ showModal, setShowModal }) => {
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(showModal);

  useEffect(() => {
    setVisible(showModal);
  }, [showModal]);

  useEffect(() => {
    setShowModal(visible);
  }, [visible]);

  return (
    <>
      <div
        className={`${
          visible ? 'visible ' : 'invisible '
        }absolute border border-gray-500 rounded-lg bg-white text-black`}
      >
        <div className="close-icon flex flex-row justify-end px-4 py-2">
          <div
            onClick={() => {
              setVisible(false);
            }}
          >
            <CloseIcon />
          </div>
        </div>
        {message !== '' ? (
          <div className="flex">
            {error ? (
              <FailedAlert message={message} invisible={loading} />
            ) : (
              <SuccessAlert message={message} invisible={loading} />
            )}
          </div>
        ) : null}

        <CreateWatchForm
          setError={setError}
          setMessage={setMessage}
          setLoading={setLoading}
        />
      </div>
    </>
  );
};

export const CreateWatchForm = ({ setError, setMessage, setLoading }) => {
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
      expected_price: 0,
    },
    validationSchema: Yup.object({
      expected_price: Yup.number().required('This field is required'),
    }),
    validate,
    onSubmit: (values) => {
      const data = {
        product: seed.id,
        expected_price: values.expected_price,
      };
      WatchService.createWatch(data)
        .then((res) => {
          if (res.code === 201) {
            setError(false);
            setLoading(false);
            setMessage('Create new watch success!');
          }
        })
        .catch((error) => {
          setError(true);
          setLoading(false);
          setMessage(
            'Failed to create watch, please check your input or try later'
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
        <button
          type="submit"
          className="uppercase text-white font-semibold bg-gray-700 px-4 py-3 rounded-lg hover:bg-gray-500 hover:border-4 mt-8"
        >
          Start Tracking
        </button>
      </div>
    </form>
  );
};

export default ModalCreate;
