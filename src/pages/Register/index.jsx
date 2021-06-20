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
      <div className="flex flex-col items-center mt-24">
        <div className="mb-4 text-2xl font-semibold uppercase">
          Create An Account
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center">
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
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col mt-2 sm:w-2/3 md:w-1/2 lg:w-1/3"
    >
      <label htmlFor="email" className="flex flex-col font-semibold uppercase">
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

      <label
        htmlFor="fullname"
        className="flex flex-col mt-2 font-semibold uppercase"
      >
        Full name*
        <input
          id="fullname"
          type="text"
          className="px-4 py-2 border border-gray-300"
          {...formik.getFieldProps('fullname')}
        />
        {formik.touched.fullname && formik.errors.fullname ? (
          <div className="mt-1 text-xs font-normal text-red-600 normal-case">
            {formik.errors.fullname}
          </div>
        ) : null}
      </label>

      <label
        htmlFor="password"
        className="flex flex-col mt-2 font-semibold uppercase"
      >
        Password*
        <input
          id="password"
          type="password"
          className="px-4 py-2 border border-gray-300"
          {...formik.getFieldProps('password')}
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="mt-1 text-xs font-normal text-red-600 normal-case">
            {formik.errors.password}
          </div>
        ) : null}
      </label>

      <label
        htmlFor="re_password"
        className="flex flex-col mt-2 font-semibold uppercase"
      >
        Confirm Password*
        <input
          id="re_password"
          type="password"
          className="px-4 py-2 border border-gray-300"
          {...formik.getFieldProps('re_password')}
        />
        {formik.touched.re_password && formik.errors.re_password ? (
          <div className="mt-1 text-xs font-normal text-red-600 normal-case">
            {formik.errors.re_password}
          </div>
        ) : null}
      </label>

      <label htmlFor="is_seller" className="flex items-center mt-2">
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
        className="py-4 mt-2 font-semibold text-white uppercase bg-black rounded-sm hover:bg-white hover:text-black hover:border-black hover:border-4"
      >
        Register
      </button>
      <div className="flex justify-between mt-2 text-sm underline uppercase">
        <Link to="/login" className="hover:text-blue-500">
          Login now
        </Link>
        <Link to={ROUTES.RESEND_ACTIVATION} className=" hover:text-blue-500">
          Resend activation email
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
