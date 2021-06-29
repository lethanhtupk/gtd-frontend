import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ClipLoader from 'react-spinners/ClipLoader';
import AccountServices from '../../services/AccountService';
import * as ROUTES from '../../constants/routes';
import { FailedAlert, SuccessAlert } from '../../components/Alert';
import { LOCAL_STORAGE } from '../../utils/Constant';

const ResetPasswordConfirm = (props) => {
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
          Đặt lại mật khẩu
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

        <ResetPasswordConfirmForm
          setMessage={setMessage}
          setError={setError}
          setLoading={setLoading}
          params={props.match.params}
        />
      </div>
      <header>
        <title>Set your new password - GTD </title>
      </header>
    </>
  );
};

export const ResetPasswordConfirmFormBase = (props) => {
  const { setMessage, setError, setLoading } = props;
  const validate = (values) => {
    const errors = {};
    if (values.new_password !== values.re_new_password) {
      errors.re_new_password =
        'Confirm password must to be matched with password';
    }
    return errors;
  };

  const resetPasswordConfirm = async (data) => {
    return await AccountServices.resetPasswordConfirm(data);
  };

  const formik = useFormik({
    initialValues: {
      new_password: '',
      re_new_password: '',
    },
    validate,
    validationSchema: Yup.object({
      new_password: Yup.string().required('This field is required'),
      re_new_password: Yup.string().required('This field is required'),
    }),
    onSubmit: (values, { setFieldError }) => {
      values = { ...values, ...props.params };
      setLoading(true);
      resetPasswordConfirm(values)
        .then((res) => {
          setMessage('Your password has been reset successfully');
          setLoading(false);
          setError();
        })
        .catch((e) => {
          setLoading(false);
          if (e.code < 4000 && e.errors.new_password) {
            setFieldError('new_password', e.errors.new_password[0]);
          } else {
            setError(true);
            setMessage('Something went wrong, please try later');
          }
        });
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col w-4/5 mt-2 sm:w-2/3 md:w-1/2 lg:w-1/3"
    >
      <label
        htmlFor="new_password"
        className="flex flex-col font-medium uppercase"
      >
        New password*
        <input
          id="new_password"
          type="password"
          className="px-4 py-2 border border-gray-300"
          {...formik.getFieldProps('new_password')}
        />
        {formik.touched.new_password && formik.errors.new_password ? (
          <div className="mt-1 text-xs font-normal text-red-600 normal-case">
            {formik.errors.new_password}
          </div>
        ) : null}
      </label>

      <label
        htmlFor="re_new_password"
        className="flex flex-col mt-4 font-medium uppercase"
      >
        Confirm new password*
        <input
          id="re_new_password"
          type="password"
          className="px-4 py-2 border border-gray-300"
          {...formik.getFieldProps('re_new_password')}
        />
        {formik.touched.re_new_password && formik.errors.re_new_password ? (
          <div className="mt-1 text-xs font-normal text-red-600 normal-case">
            {formik.errors.re_new_password}
          </div>
        ) : null}
      </label>

      <button
        type="submit"
        className="py-4 mt-2 font-medium text-white uppercase bg-black rounded-sm hover:bg-white hover:text-black hover:border-black hover:border-4"
      >
        Submit
      </button>
      <Link
        to={ROUTES.LOGIN}
        className="mt-2 text-sm underline uppercase hover:text-blue-500"
      >
        Cancel
      </Link>
    </form>
  );
};

export const ResetPasswordConfirmForm = withRouter(
  ResetPasswordConfirmFormBase
);

export default ResetPasswordConfirm;
