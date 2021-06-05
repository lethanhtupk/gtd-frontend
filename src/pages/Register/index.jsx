import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import * as ROUTES from '../../constants/routes';
import AccountServices from '../../services/AccountService';
import { SuccessAlert, FailedAlert } from '../../components/Alert';

const RegisterPage = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <header>
        <title>Register an account - GTD</title>
      </header>
      <div className="mt-24 flex flex-col items-center">
        <div className="uppercase font-semibold text-2xl mb-4">
          Create An Account
        </div>

        {loading ? (
          <div className="flex flex-col justify-center items-center">
            <ClipLoader size={30} />
            <div>Please wait...</div>
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

        <RegisterForm
          setMessage={setMessage}
          setError={setError}
          setLoading={setLoading}
        />
      </div>
    </>
  );
};

const RegisterFormBase = (props) => {
  const { setMessage, setError, setLoading } = props;
  const validate = (values) => {
    const errors = {};
    if (values.password !== values.re_password) {
      errors.re_password = 'Confirm password must to be matched with password';
    }
    return errors;
  };

  const createAccount = async (data) => {
    return await AccountServices.createAccount(data);
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      fullname: '',
      password: '',
      re_password: '',
      is_seller: false,
    },
    validate,
    validationSchema: Yup.object({
      password: Yup.string().required('This field is required'),
      re_password: Yup.string().required('This field is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('This field is required'),
      fullname: Yup.string()
        .max(30, 'Full name is too long')
        .required('This field is required'),
    }),
    onSubmit: (values, { setFieldError }) => {
      setLoading(true);
      createAccount(values)
        .then((res) => {
          setMessage(
            'Create a new account successful, please activate your account'
          );
          setError(false);
          setLoading(false);
        })
        .catch((e) => {
          setLoading(false);
          if (e.code < 4000 && e.errors.email) {
            setError(true);

            setMessage('User with this email address already exists');
          } else if (e.code < 4000 && e.errors.password) {
            setFieldError('password', e.errors.password[0]);
          } else {
            setError(true);
            setMessage('Something went wrong, please try later');
          }
        });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col w-2/6 mt-2">
      <label htmlFor="email" className="flex flex-col uppercase font-semibold">
        Email*
        <input
          id="email"
          type="text"
          className="py-2 border border-gray-300 px-4"
          {...formik.getFieldProps('email')}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="text-red-600 text-xs normal-case font-normal mt-1">
            {formik.errors.email}
          </div>
        ) : null}
      </label>

      <label
        htmlFor="fullname"
        className="flex flex-col uppercase font-semibold mt-2"
      >
        Full name*
        <input
          id="fullname"
          type="text"
          className="py-2 border border-gray-300 px-4"
          {...formik.getFieldProps('fullname')}
        />
        {formik.touched.fullname && formik.errors.fullname ? (
          <div className="text-red-600 text-xs normal-case font-normal mt-1">
            {formik.errors.fullname}
          </div>
        ) : null}
      </label>

      <label
        htmlFor="password"
        className="flex flex-col uppercase font-semibold mt-2"
      >
        Password*
        <input
          id="password"
          type="password"
          className="py-2 border border-gray-300 px-4"
          {...formik.getFieldProps('password')}
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="text-red-600 text-xs normal-case font-normal mt-1">
            {formik.errors.password}
          </div>
        ) : null}
      </label>

      <label
        htmlFor="re_password"
        className="flex flex-col uppercase font-semibold mt-2"
      >
        Confirm Password*
        <input
          id="re_password"
          type="password"
          className="py-2 border border-gray-300 px-4"
          {...formik.getFieldProps('re_password')}
        />
        {formik.touched.re_password && formik.errors.re_password ? (
          <div className="text-red-600 text-xs normal-case font-normal mt-1">
            {formik.errors.re_password}
          </div>
        ) : null}
      </label>

      <label htmlFor="is_seller" className="mt-2 flex items-center">
        <input
          id="is_seller"
          type="checkbox"
          {...formik.getFieldProps('is_seller')}
        />
        <p className="ml-2">Register as a supplier</p>
        {formik.touched.is_seller && formik.errors.is_seller ? (
          <div>{formik.errors.is_seller}</div>
        ) : null}
      </label>
      <button
        type="submit"
        className="uppercase text-white font-semibold bg-black py-4 rounded-sm mt-2 hover:bg-white hover:text-black hover:border-black hover:border-4"
      >
        Register
      </button>
      <div className="mt-2">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-500 hover:underline">
          Login now
        </Link>
      </div>
    </form>
  );
};

const RegisterForm = withRouter(RegisterFormBase);

const RegisterLink = () => (
  <p>
    Do not have an account? <Link to={ROUTES.REGISTER}>Register</Link>
  </p>
);

export default RegisterPage;

export { RegisterForm, RegisterLink };
