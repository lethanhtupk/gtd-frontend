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
      <div className="mt-24 flex flex-col items-center">
        <div className="uppercase font-semibold text-2xl mb-4">Login</div>

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
      <div className="mt-2 flex flex-col">
        <p>
          Do not have an account yet?{' '}
          <Link to={ROUTES.REGISTER} className="text-blue-500 hover:underline">
            Register now
          </Link>
        </p>
        <p>
          Already have an account but not activate yet?{' '}
          <Link
            to={ROUTES.RESEND_ACTIVATION}
            className="text-blue-500 hover:underline"
          >
            Resend activation email
          </Link>
        </p>
      </div>
    </form>
  );
};

const LoginForm = withRouter(LoginFormBase);

export default withRouter(LoginPage);

export { LoginForm };
