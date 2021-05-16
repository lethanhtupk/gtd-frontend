import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { MailIcon } from '../Icons';
import { FailedAlert, SuccessAlert } from '../Alert';
import WatchService from '../../services/WatchService';

const CreateWatch = () => {
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  return (
    <div className="w-4/5">
      <div className="py-2 bg-red-700 text-white px-2 font-bold text-lg flex flex-row items-center">
        <MailIcon />
        <p className="ml-2">Create Tiki Price Watches</p>
      </div>
      <div className="border border-red-700 bg-white flex flex-col">
        <div className="flex justify-center mt-4">
          {error ? (
            <FailedAlert message={message} invisible={loading} />
          ) : (
            <SuccessAlert message={message} invisible={loading} />
          )}
        </div>
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
    const expectedPrice = values.expected_price;
    if (expectedPrice < 0) {
      errors.expected_price = 'Invalid expected price';
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      link_to_product: '',
      expected_price: 0,
    },
    validationSchema: Yup.object({
      link_to_product: Yup.string().required('This field is required'),
      expected_price: Yup.number().required('This field is required'),
    }),
    validate,
    onSubmit: (values) => {
      const patternUrl = /(http|https):\/\/tiki\.vn/;
      const patternPid = /p[0-9]+/;
      if (!patternUrl.test(values.link_to_product)) {
        setError(true);
        setLoading(false);
        setMessage('Your input is invalid URL or not from Tiki');
      }
      const pid = patternPid.exec(values.link_to_product)[0];
      const data = {
        product: pid.slice(1),
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
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-row justify-between px-4 py-4 items-end"
    >
      <label htmlFor="link_to_product" className="flex flex-col w-3/5">
        Link to product
        <input
          id="link_to_product"
          type="text"
          {...formik.getFieldProps('link_to_product')}
          className="py-2 border border-gray-300 px-4 rounded-lg"
        />
        {formik.touched.link_to_product && formik.errors.link_to_product ? (
          <div className="text-red-600 text-xs normal-case font-normal mt-1">
            {formik.errors.link_to_product}
          </div>
        ) : null}
      </label>
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
        className="uppercase text-white font-semibold bg-gray-700 px-4 py-3 rounded-lg hover:bg-gray-500 hover:border-4 focus:outline-none"
      >
        Start Tracking
      </button>
    </form>
  );
};

export { CreateWatchForm };

export default CreateWatch;
