import { useFormik } from 'formik';
import * as Yup from 'yup';
import React, { useEffect, useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import { CloseIcon } from '../Icons';
import { FailedAlert, SuccessAlert } from '../Alert';
import WatchService from '../../services/WatchService';
import { convertToNumber } from '../../utils/Helpers';

const ModalCreate = ({ showModal, setShowModal, productData }) => {
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
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
        }absolute md:top-auto md:left-auto top-14 left-0 w-full md:w-auto border border-gray-500 rounded-lg bg-white text-black`}
      >
        <div className="flex flex-row justify-end px-2 py-2 close-icon">
          <div
            onClick={() => {
              setVisible(false);
            }}
          >
            <CloseIcon />
          </div>
        </div>
        <div className="flex flex-row justify-center w-full">
          {loading ? (
            <div className="flex flex-col items-center justify-center">
              <ClipLoader size={30} />
              <div>Please wait...</div>
            </div>
          ) : (
            <>
              {message !== '' ? (
                <div className="w-4/5">
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

        <CreateWatchForm
          productData={productData}
          setError={setError}
          setMessage={setMessage}
          setLoading={setLoading}
        />
      </div>
    </>
  );
};

export const CreateWatchForm = ({
  setError,
  setMessage,
  setLoading,
  productData,
}) => {
  const validate = (values) => {
    const errors = {};
    if (values.expected_price === '') {
      errors.expected_price = 'This field is required';
    } else {
      const expectedPrice = convertToNumber(values.expected_price);
      if (isNaN(expectedPrice) || expectedPrice < 0) {
        errors.expected_price = 'Invalid expected price';
      }
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      expected_price: '',
    },
    validationSchema: Yup.object({
      expected_price: Yup.string().required('This field is required'),
    }),
    validate,
    onSubmit: (values) => {
      const data = {
        product: productData.id,
        expected_price: convertToNumber(values.expected_price),
      };
      setLoading(true);
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
          if (error.errors?.expected_price) {
            setMessage('The price must smaller than current price');
          } else if (error.errors?.product) {
            setMessage('You already watching this product');
          } else {
            setMessage('Something went wrong, please try later');
          }
        });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col px-4 py-4">
      <div className="form-content">
        <label htmlFor="expected_price" className="flex flex-col">
          Expect price
          <div className="relative flex flex-row items-center">
            <input
              id="expected_price"
              type="text"
              {...formik.getFieldProps('expected_price')}
              onChange={(e) => {
                const { value } = e.target;
                const formattedValue = (
                  Number(value.replace(/\D/g, '')) || ''
                ).toLocaleString();
                if (formattedValue !== '') {
                  formik.setFieldValue('expected_price', formattedValue);
                } else {
                  formik.setFieldValue('expected_price', value);
                }
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
            <div className="absolute text-gray-500 right-2">VND</div>
          </div>
          {formik.touched.expected_price && formik.errors.expected_price ? (
            <div className="mt-1 text-xs font-normal text-red-600 normal-case">
              {formik.errors.expected_price}
            </div>
          ) : null}
        </label>
        <button
          type="submit"
          className="px-4 py-3 mt-8 font-semibold text-white uppercase bg-gray-700 rounded-lg hover:bg-gray-500 hover:border-4 focus:outline-none"
        >
          Start Tracking
        </button>
      </div>
    </form>
  );
};

export default ModalCreate;
