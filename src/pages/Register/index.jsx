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
        <div className="mb-4 text-2xl font-semibold uppercase">Đăng ký</div>

        {loading ? (
          <div className="flex flex-col items-center justify-center">
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
      errors.re_password = 'Mật khẩu xác nhận phải trùng với mật khẩu';
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
      password: Yup.string().required('Trường này là bắt buộc'),
      re_password: Yup.string().required('Trường này là bắt buộc'),
      email: Yup.string()
        .email('Email không hợp lệ')
        .required('Trường này là bắt buộc'),
      fullname: Yup.string()
        .max(30, 'Họ tên quá dài')
        .required('Trường này là bắt buộc'),
    }),
    onSubmit: (values, { setFieldError }) => {
      setLoading(true);
      createAccount(values)
        .then((res) => {
          setMessage('Tạo tài khoản thành công, vui lòng kích hoạt tài khoản');
          setError(false);
          setLoading(false);
        })
        .catch((e) => {
          setLoading(false);
          if (e.code < 4000 && e.errors.email) {
            setError(true);

            setMessage('Email đã được sử dụng');
          } else if (e.code < 4000 && e.errors.password) {
            setFieldError('password', e.errors.password[0]);
          } else {
            setError(true);
            setMessage('Có lỗi xảy ra, liên hệ với admin ngay!');
          }
        });
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col w-4/5 mt-2 sm:w-2/3 md:w-1/2 lg:w-1/3"
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
        Họ tên*
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
        Mật khẩu*
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
        Xác nhận mật khẩu*
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
        <p className="ml-2">Đăng ký với tư cách nhà cung ứng</p>
        {formik.touched.is_seller && formik.errors.is_seller ? (
          <div>{formik.errors.is_seller}</div>
        ) : null}
      </label>
      <button
        type="submit"
        className="py-4 mt-2 font-semibold text-white uppercase bg-black rounded-sm hover:bg-white hover:text-black hover:border-black hover:border-4"
      >
        Đăng ký
      </button>
      <div className="flex flex-col justify-between mt-2 text-sm underline uppercase md:flex-row">
        <Link to="/login" className="hover:text-blue-500">
          Đăng nhập
        </Link>
        <Link to={ROUTES.RESEND_ACTIVATION} className=" hover:text-blue-500">
          Gửi lại email kích hoạt
        </Link>
      </div>
    </form>
  );
};

const RegisterForm = withRouter(RegisterFormBase);

const RegisterLink = () => (
  <p>
    Bạn chưa có tài khoản? <Link to={ROUTES.REGISTER}>Đăng ký</Link>
  </p>
);

export default RegisterPage;

export { RegisterForm, RegisterLink };
