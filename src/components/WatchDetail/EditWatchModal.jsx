import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import ClipLoader from 'react-spinners/ClipLoader';
import * as Yup from 'yup';
import { CloseIcon } from '../Icons';
import WatchService from '../../services/WatchService';
import {
  convertToNumber,
  displayWatchStatus,
  numberWithCommas,
} from '../../utils/Helpers';
import { FailedAlert, SuccessAlert } from '../Alert';

const EditWatchModal = ({
  watchData,
  setWatchData,
  openModal,
  setOpenModal,
}) => {
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
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
        <div className="flex flex-row justify-end px-2 py-2 cursor-pointer close-icon">
          <div
            onClick={() => {
              setVisible(false);
            }}
          >
            <CloseIcon />
          </div>
        </div>

        <div className="flex flex-row items-center justify-center w-full">
          {loading ? (
            <div className="flex flex-col items-center justify-center">
              <ClipLoader size={30} />
              <div>Xin chờ...</div>
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

        <EditWatchForm
          watchData={watchData}
          setWatchData={setWatchData}
          setError={setError}
          setMessage={setMessage}
          setLoading={setLoading}
        />
      </div>
    </>
  );
};

export const EditWatchForm = (props) => {
  const { setError, setMessage, setLoading, watchData, setWatchData } = props;

  const validate = (values) => {
    const errors = {};
    if (values.expected_price === '') {
      errors.expected_price = 'Trường này là bắt buộc';
    } else {
      const expectedPrice = convertToNumber(values.expected_price);
      if (isNaN(expectedPrice) || expectedPrice < 0) {
        errors.expected_price = 'Giá mong muốn không hợp lệ.';
      }
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      status: watchData.status,
      expected_price: numberWithCommas(watchData.expected_price),
    },
    validate,
    validationSchema: Yup.object({
      status: Yup.number()
        .oneOf([1, 2], 'Trạng thái không hợp lệ')
        .required('Trường này là bắt buộc'),
      expected_price: Yup.string().required('Trường này là bắt buộc'),
    }),
    onSubmit: (values) => {
      const data = {
        expected_price: convertToNumber(values.expected_price),
        status: values.status,
      };
      setLoading(true);
      WatchService.updateWatch(watchData.id, data)
        .then((res) => {
          if (res.code === 200) {
            setError(false);
            setLoading(false);
            setMessage('Cập nhật thành công!');
          }
          delete res.code;
          setWatchData(res);
        })
        .catch((error) => {
          setError(true);
          setLoading(false);
          if (error.errors?.expected_price) {
            setMessage('Giá mong muốn phải nhỏ hơn mức giá hiện tại.');
          } else {
            setMessage('Cập nhật thất bại, vui lòng thử lại');
          }
        });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col px-4 py-4">
      <div className="form-content">
        <label htmlFor="link_to_product" className="flex flex-col">
          Giá mong muốn
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
            />
            <div className="absolute text-gray-500 right-2">VND</div>
          </div>
          {formik.touched.expected_price && formik.errors.expected_price ? (
            <div className="mt-1 text-xs font-normal text-red-600 normal-case">
              {formik.errors.expected_price}
            </div>
          ) : null}
        </label>
        <label htmlFor="status" className="flex flex-col mt-2">
          Trạng thái
          {watchData.status === 1 ? (
            <select
              name="status"
              {...formik.getFieldProps('status')}
              className="px-4 py-2 bg-gray-300 border border-gray-300 rounded-lg focus:outline-none"
            >
              <option value="1" label={displayWatchStatus(1)} defaultValue />
              <option value="2" label={displayWatchStatus(2)} />
            </select>
          ) : (
            <select
              name="status"
              {...formik.getFieldProps('status')}
              className="px-4 py-2 bg-gray-300 border border-gray-300 rounded-lg focus:outline-none"
            >
              <option value="1" label={displayWatchStatus(1)} />
              <option value="2" label={displayWatchStatus(2)} defaultValue />
            </select>
          )}
          {formik.touched.status && formik.errors.status ? (
            <div className="mt-1 text-xs font-normal text-red-600 normal-case">
              {formik.errors.status}
            </div>
          ) : null}
        </label>
        <button
          type="submit"
          className="px-4 py-3 mt-8 font-semibold text-white uppercase bg-gray-700 rounded-lg hover:bg-gray-500 hover:border-4 focus:outline-none"
        >
          Cập nhật
        </button>
      </div>
    </form>
  );
};

export default EditWatchModal;
