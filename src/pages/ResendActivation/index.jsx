import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AccountServices from '../../services/AccountService';
import * as ROUTES from '../../constants/routes';
import { FailedAlert, SuccessAlert } from '../../components/Alert';
import { LOCAL_STORAGE } from '../../utils/Constant';

const ResendActivation = (props) => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const accessToken = localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN);
  if (accessToken && accessToken !== 'undefined') {
    props.history.push(ROUTES.HOME);
  }

  return (
    <>
      <div className="mt-24 flex flex-col items-center">
        <div className="uppercase font-semibold text-2xl mb-4">
          Resend activation email
        </div>

        {error ? (
          <FailedAlert message={message} invisible={loading} />
        ) : (
          <SuccessAlert message={message} invisible={loading} />
        )}
        <ResendActivationForm
          setMessage={setMessage}
          setError={setError}
          setLoading={setLoading}
        />
      </div>
      <header>
        <title>Resend activation - GTD </title>
      </header>
    </>
  );
};

export const ResendActivationFormBase = (props) => {
  const { setMessage, setError, setLoading } = props;

  const resendActivation = async (data) => {
    return await AccountServices.resendActivation(data);
  };

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('This field is required'),
    }),
    onSubmit: (values) => {
      resendActivation(values)
        .then((res) => {
          console.log(res);
          setMessage(
            'We have been send you a new activation email, please check you inbox'
          );
          setLoading(false);
          setError();
        })
        .catch((e) => {
          console.log(e);
          setError(true);
          setLoading(false);
          setMessage('Your account has been activated or incorrect email');
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

      <button
        type="submit"
        className="uppercase text-white font-semibold bg-black py-4 rounded-sm mt-2 hover:bg-white hover:text-black hover:border-black hover:border-4"
      >
        Resend
      </button>
      <div className="mt-2">
        Back to login page?{' '}
        <Link to={ROUTES.LOGIN} className="text-blue-500 underline">
          click here
        </Link>
      </div>
    </form>
  );
};

export const ResendActivationForm = withRouter(ResendActivationFormBase);

export default ResendActivation;
