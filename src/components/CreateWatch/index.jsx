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
        <p className="ml-2">Theo dõi sản phẩm</p>
      </div>
      <div className="flex flex-col bg-white border border-red-700">
        {loading ? (
          <div className="flex flex-col items-center justify-center mt-8">
            <ClipLoader size={30} />
            <div>Xin chờ...</div>
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
      errors.expected_price = 'Trường này là bắt buộc.';
    } else {
      const expectedPrice = convertToNumber(values.expected_price);
      if (isNaN(expectedPrice) || expectedPrice < 0) {
        errors.expected_price = 'Giá mong muốn không hợp lệ.';
      }
    }
    const patternUrl = /(http|https):\/\/tiki\.vn/;
    const patternPid = /p[0-9]+/;
    const pid = patternPid.exec(values.link_to_product);
    if (values.link_to_product === '') {
      errors.link_to_product = 'Trường này là bắt buộc.';
    } else if (!patternUrl.test(values.link_to_product)) {
      errors.link_to_product = 'Đường dẫn không hợp lệ.';
    } else if (!pid) {
      errors.link_to_product = 'Đường dẫn không hợp lệ.';
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      link_to_product: '',
      expected_price: '',
    },
    validationSchema: Yup.object({
      link_to_product: Yup.string().required('Trường này là bắt buộc.'),
      expected_price: Yup.string().required('Trường này là bắt buộc.'),
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
            setMessage('Theo dõi sản phẩm thành công.');
          }
        })
        .catch((error) => {
          setError(true);
          setLoading(false);
          if (error.errors?.expected_price) {
            setMessage('Giá mong muốn phải nhỏ hơn giá hiện tại');
          } else if (error.errors?.product) {
            if (
              error.errors?.product === 'cannot find any product with that ID'
            ) {
              setMessage(
                'Không tìm thấy sản phẩm, hãy thử lại với sản phẩm khác.'
              );
            } else {
              setMessage('Bạn đã theo dõi sản phẩm này rồi.');
            }
          } else {
            setMessage('Có lỗi hệ thống, liên hệ với admin ngay!');
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
        Đường dẫn của sản phẩm
        <input
          id="link_to_product"
          type="text"
          {...formik.getFieldProps('link_to_product')}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
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
        Giá mong muốn
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
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
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
        Theo dõi
      </button>
    </form>
  );
};

export { CreateWatchForm };

export default CreateWatch;
