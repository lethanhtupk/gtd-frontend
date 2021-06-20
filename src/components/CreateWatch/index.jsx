import React, { useState } from 'react';
import { useFormik } from 'formik';
import ClipLoader from 'react-spinners/ClipLoader';
import * as Yup from 'yup';
import { MailIcon } from '../Icons';
import { FailedAlert, SuccessAlert } from '../Alert';
import WatchService from '../../services/WatchService';
import { convertToNumber, numberWithCommas } from '../../utils/Helpers';

const CreateWatch = () => {
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <div className="w-4/5">
      <div className="flex flex-row items-center px-2 py-2 text-lg font-bold text-white bg-red-700">
        <MailIcon />
        <p className="ml-2">Create Tiki Price Watches</p>
      </div>
      <div className="flex flex-col bg-white border border-red-700">
        {loading ? (
          <div className="flex flex-col items-center justify-center mt-8">
            <ClipLoader size={30} />
            <div>Please wait...</div>
          </div>
        ) : (
          <div className="flex justify-center mt-4">
            {error ? (
              <FailedAlert
                message={message}
                invisible={loading || message === ''}
              />
            ) : (
              <SuccessAlert
                message={message}
                invisible={loading || message === ''}
              />
            )}
          </div>
        )}
        <CreateWatchForm
          setError={setError}
          setMessage={setMessage}
          setLoading={setLoading}
        />
      </div>
    </div>
  );
};

const CreateWatchForm = ({ setError, setMessage, setLoading }) => {
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
    const patternUrl = /(http|https):\/\/tiki\.vn/;
    const patternPid = /p[0-9]+/;
    const pid = patternPid.exec(values.link_to_product);
    if (values.link_to_product === '') {
      errors.link_to_product = 'This field is required';
    } else if (!patternUrl.test(values.link_to_product)) {
      errors.link_to_product = 'Invalid URL or URL not from Tiki';
    } else if (!pid) {
      errors.link_to_product = "Invalid product's URL";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      link_to_product: '',
      expected_price: '',
    },
    validationSchema: Yup.object({
      link_to_product: Yup.string().required('This field is required'),
      expected_price: Yup.string().required('This field is required'),
    }),
    validate,
    onSubmit: (values) => {
      const patternPid = /-p[0-9]+/;
      const pid = patternPid.exec(values.link_to_product)[0];
      const data = {
        product: pid.slice(2),
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
            if (
              error.errors?.product === 'cannot find any product with that ID'
            ) {
              setMessage('We cannot find the product, please try another one!');
            } else {
              setMessage('You already watching this product');
            }
          } else {
            setMessage('Something went wrong, please try later');
          }
        });
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col justify-between px-4 py-4 lg:items-center lg:flex-row"
    >
      <label
        htmlFor="link_to_product"
        className="flex flex-col h-20 lg:w-3/5 lg:px-2"
      >
        Link to product
        <input
          id="link_to_product"
          type="text"
          {...formik.getFieldProps('link_to_product')}
          className="px-4 py-2 border border-gray-300 rounded-lg"
        />
        {formik.touched.link_to_product && formik.errors.link_to_product ? (
          <div className="mt-1 ml-1 text-xs font-normal text-red-600 normal-case">
            {formik.errors.link_to_product}
          </div>
        ) : null}
      </label>
      <label
        htmlFor="link_to_product"
        className="flex flex-col h-20 mt-4 lg:px-2 lg:mt-0"
      >
        Expect price
        <div className="relative flex flex-row items-center">
          <input
            id="link_to_product"
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
          <div className="mt-1 ml-1 text-xs font-normal text-red-600 normal-case">
            {formik.errors.expected_price}
          </div>
        ) : null}
      </label>
      <button
        type="submit"
        className="px-4 py-3 mt-4 font-medium text-white uppercase bg-gray-700 rounded-lg h-42 lg:mt-0 hover:bg-gray-500 hover:border-4 focus:outline-none"
      >
        Start Tracking
      </button>
    </form>
  );
};

export { CreateWatchForm };

export default CreateWatch;
