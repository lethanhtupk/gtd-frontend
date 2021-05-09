import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import * as ROUTES from '../../constants/routes';
import AccountServices from '../../services/AccountService';
import { SuccessAlert, FailedAlert } from '../../components/Alert';
import { LOCAL_STORAGE } from '../../utils/Constant';

const LoginPage = (props) => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const accessToken = localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN);
    if (accessToken && accessToken !== 'undefined') {
      props.history.push(ROUTES.HOME);
    }
  });

  return (
    <>
      <header>
        <title>Login an account - GTD</title>
      </header>
      <div className="mt-24 flex flex-col items-center">
        <div className="uppercase font-semibold text-2xl mb-4">Login</div>

        {error ? (
          <FailedAlert message={message} invisible={loading} />
        ) : (
          <SuccessAlert message={message} invisible={loading} />
        )}
        <LoginForm
          setMessage={setMessage}
          setError={setError}
          setLoading={setLoading}
        />
      </div>
    </>
  );
};

const LoginFormBase = (props) => {
  const { setMessage, setError, setLoading } = props;

  const loginAccount = async (data) => {
    return await AccountServices.login(data);
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      password: Yup.string().required('This field is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('This field is required'),
    }),
    onSubmit: (values) => {
      loginAccount(values)
        .then((res) => {
          localStorage.setItem('access', res.access);
          localStorage.setItem('refresh', res.refresh);
          props.history.push(ROUTES.HOME);
          window.location.reload();
        })
        .catch((e) => {
          setError(true);
          setLoading(false);
          if (e.code < 4000 && e.errors.detail) {
            setMessage(e.errors.detail);
          } else {
            setMessage('Something went wrong, please try later');
          }
        });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col w-2/6">
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

      <button
        type="submit"
        className="uppercase text-white font-semibold bg-black py-4 rounded-sm mt-2 hover:bg-white hover:text-black hover:border-black hover:border-4"
      >
        Login
      </button>
      <div className="mt-2">
        Do not have an account yet?{' '}
        <Link to="/register" className="text-blue-500 underline">
          register now
        </Link>
      </div>
    </form>
  );
};

const LoginForm = withRouter(LoginFormBase);

export default withRouter(LoginPage);

export { LoginForm };
