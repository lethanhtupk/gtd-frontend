import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import AccountServices from '../../services/AccountService';
import { FailedAlert, SuccessAlert } from '../../components/Alert';

const ChangePassword = ({ authUser, setActive }) => {
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  return (
    <>
      <header>
        <title>Change password - GTD</title>
      </header>
      <div className="w-9/12 h-full bg-white flex flex-col text-black px-8 py-16">
        <div className="text-4xl font-black mb-4">Change password</div>
        {error ? (
          <FailedAlert message={message} invisible={loading} />
        ) : (
          <SuccessAlert message={message} invisible={loading} />
        )}
        <ChangePasswordForm
          setActive={setActive}
          setError={setError}
          setMessage={setMessage}
          setLoading={setLoading}
        />
      </div>
    </>
  );
};

const ChangePasswordForm = (props) => {
  const { setActive, setError, setMessage, setLoading } = props;
  const validate = (values) => {
    const errors = {};
    if (values.password !== values.re_password) {
      errors.re_password = 'Confirm password must to be matched with password';
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      current_password: '',
      new_password: '',
      re_new_password: '',
    },
    validationSchema: Yup.object({
      current_password: Yup.string().required('This field is required'),
      new_password: Yup.string().required('This field is required'),
      re_new_password: Yup.string().required('This field is required'),
    }),
    validate,
    onSubmit: (values) => {
      AccountServices.changePassword(values)
        .then((res) => {
          if (res.code === 204) {
            setMessage('Update your password success');
            setError(false);
            setLoading(false);
          }
        })
        .catch((error) => {
          setError(true);
          setMessage('Change password failed, please re-check your input');
          setLoading(false);
        });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col w-full">
      <label
        htmlFor="current_password"
        className="flex flex-col font-semibold mt-8"
      >
        Current password
        <input
          id="current_password"
          type="password"
          className="py-2 border border-gray-300 px-4 rounded-lg"
          {...formik.getFieldProps('current_password')}
        />
        {formik.touched.current_password && formik.errors.current_password ? (
          <div className="text-red-600 text-xs normal-case font-normal mt-1">
            {formik.errors.current_password}
          </div>
        ) : null}
      </label>

      <label
        htmlFor="new_password"
        className="flex flex-col font-semibold mt-8"
      >
        New password
        <input
          id="new_password"
          type="password"
          className="py-2 border border-gray-300 px-4 rounded-lg"
          {...formik.getFieldProps('new_password')}
        />
        {formik.touched.new_password && formik.errors.new_password ? (
          <div className="text-red-600 text-xs normal-case font-normal mt-1">
            {formik.errors.new_password}
          </div>
        ) : null}
      </label>

      <label
        htmlFor="re_new_password"
        className="flex flex-col font-semibold mt-8"
      >
        Repeat password
        <input
          id="re_new_password"
          type="password"
          className="py-2 border border-gray-300 px-4 rounded-lg"
          {...formik.getFieldProps('re_new_password')}
        />
        {formik.touched.re_new_password && formik.errors.re_new_password ? (
          <div className="text-red-600 text-xs normal-case font-normal mt-1">
            {formik.errors.re_new_password}
          </div>
        ) : null}
      </label>

      <div className="flex flex-row justify-end">
        <Link to={ROUTES.ACCOUNT_OVERVIEW}>
          <button
            type="button"
            onClick={() => setActive(0)}
            className="uppercase text-gray-500 rounded-full mt-8 w-1/5 font-medium hover:border-black hover:border-2 hover:text-black
              px-4 py-2 focus:outline-none"
          >
            Cancel
          </button>
        </Link>
        <button
          type="submit"
          className="uppercase text-gray-500 hover:text-black bg-green-400 rounded-full mt-8 min:w-1/5 font-medium
              px-4 py-2 focus:outline-none"
        >
          Set new password
        </button>
      </div>
    </form>
  );
};

export { ChangePasswordForm };

export default ChangePassword;
