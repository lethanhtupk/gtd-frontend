import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ClipLoader from 'react-spinners/ClipLoader';
import AccountServices from '../../services/AccountService';
import * as ROUTES from '../../constants/routes';
import { FailedAlert, SuccessAlert } from '../../components/Alert';
import { LOCAL_STORAGE } from '../../utils/Constant';

const ForgetPassword = (props) => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const accessToken = localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN);
  if (accessToken && accessToken !== 'undefined') {
    props.history.push(ROUTES.HOME);
  }

  return (
    <>
      <div className="flex flex-col items-center mt-24">
        <div className="mb-4 text-2xl font-medium uppercase">
          Reset your password
        </div>

        {loading ? (
          <div className="flex flex-col items-center">
            <ClipLoader size={30} />
            <div>Xin chờ...</div>
          </div>
        ) : (
          <>
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
          </>
        )}

        <ResetPasswordForm
          setMessage={setMessage}
          setError={setError}
          setLoading={setLoading}
        />
      </div>
      <header>
        <title>Reset password - GTD </title>
      </header>
    </>
  );
};

export const ResetPasswordFormBase = (props) => {
  const { setMessage, setError, setLoading } = props;

  const resetPassword = async (data) => {
    return await AccountServices.resetPassword(data);
  };

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Email không hợp lệ')
        .required('Trường này là bắt buộc'),
    }),
    onSubmit: (values) => {
      setLoading(true);
      resetPassword(values)
        .then((res) => {
          setMessage(
            'Chúng tôi đã gửi cho bạn một email để cài lại mật khẩu, vui lòng kiểm tra hòm thư.'
          );
          setLoading(false);
          setError();
        })
        .catch((e) => {
          setError(true);
          setLoading(false);
          setMessage('Không tìm thấy email của bạn trong hệ thống.');
        });
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col w-4/5 sm:w-2/3 md:w-1/2 lg:w-1/3"
    >
      <label htmlFor="email" className="flex flex-col font-medium uppercase">
        Email*
        <input
          id="email"
          type="text"
          className="px-4 py-2 border border-gray-300"
          {...formik.getFieldProps('email')}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="mt-1 text-xs font-normal text-red-600 normal-case">
            {formik.errors.email}
          </div>
        ) : null}
      </label>

      <button
        type="submit"
        className="py-4 mt-2 font-medium text-white uppercase bg-black rounded-sm hover:bg-white hover:text-black hover:border-black hover:border-4"
      >
        Gửi
      </button>
      <Link
        to={ROUTES.LOGIN}
        className="mt-2 text-sm underline uppercase hover:text-blue-500"
      >
        Thoát
      </Link>
    </form>
  );
};

export const ResetPasswordForm = withRouter(ResetPasswordFormBase);

export default ForgetPassword;
