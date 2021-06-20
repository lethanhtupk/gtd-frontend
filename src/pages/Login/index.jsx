import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import * as ROUTES from '../../constants/routes';
import AccountServices from '../../services/AccountService';
import { SuccessAlert, FailedAlert } from '../../components/Alert';
import { LOCAL_STORAGE } from '../../utils/Constant';

const LoginPage = (props) => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN);
    if (accessToken && accessToken !== 'undefined') {
      props.history.push(ROUTES.HOME);
    }
  }, []);

  return (
    <>
      <header>
        <title>Login an account - GTD</title>
      </header>
      <div className="flex flex-col items-center mt-24">
        <div className="mb-4 text-2xl font-semibold uppercase">Login</div>

        {loading ? (
          <div className="flex flex-col items-center">
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
      setLoading(true);
      loginAccount(values)
        .then((res) => {
          localStorage.setItem('access', res.access);
          localStorage.setItem('refresh', res.refresh);
          props.history.push(ROUTES.HOME);
          window.location.reload();
        })
        .catch((e) => {
          setError(true);
          if (e.code < 4000 && e.errors.detail) {
            setMessage(e.errors.detail);
          } else {
            setMessage('Something went wrong, please try later');
          }
          setLoading(false);
        });
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col sm:w-2/3 md:w-1/2 lg:w-1/3"
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

      <button
        type="submit"
        className="py-4 mt-2 font-semibold text-white uppercase bg-black rounded-sm hover:bg-white hover:text-black hover:border-black hover:border-4"
      >
        Login
      </button>
      <div className="flex flex-col justify-center mt-2 text-sm uppercase">
        <div className="flex flex-col justify-between w-full md:flex-row">
          <Link to={ROUTES.REGISTER} className="underline hover:text-blue-500">
            Register now
          </Link>
          <Link
            to={ROUTES.FORGET_PASSWORD}
            className="underline hover:text-blue-500"
          >
            Forgot password
          </Link>
        </div>
      </div>
    </form>
  );
};

const LoginForm = withRouter(LoginFormBase);

export default withRouter(LoginPage);

export { LoginForm };
