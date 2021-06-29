import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import * as ROUTES from '../../constants/routes';
import AccountServices from '../../services/AccountService';
import { FailedAlert, SuccessAlert } from '../../components/Alert';

const EditProfile = ({ authUser, setActive }) => {
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <>
      <header>
        <title>Edit profile - GTD</title>
      </header>
      <div className="flex flex-col h-full px-8 py-16 text-black bg-white">
        <div className="mb-4 text-4xl font-black">Edit Profile</div>
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
        <EditProfileForm
          authUser={authUser}
          setActive={setActive}
          setError={setError}
          setMessage={setMessage}
          setLoading={setLoading}
        />
      </div>
    </>
  );
};

const EditProfileForm = (props) => {
  const { authUser, setActive, setError, setMessage, setLoading } = props;
  const formik = useFormik({
    initialValues: {
      fullname: authUser[0]?.fullname,
      email: authUser[0]?.email,
    },
    validationSchema: Yup.object({
      fullname: Yup.string().max(70).required('Trường này là bắt buộc'),
    }),
    onSubmit: (values) => {
      setLoading(true);
      AccountServices.editProfile(authUser[0].id, values)
        .then((res) => {
          setError(false);
          if (res.code === 200) {
            setMessage('Cập nhật profile thành công');
            setLoading(false);
          }
        })
        .catch((error) => {
          setMessage(error.errors.detail);
          setError(true);
          setLoading(false);
        });
    },
  });
  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col w-full">
      <label htmlFor="fullname" className="flex flex-col mt-8 font-semibold">
        Họ tên
        <input
          id="fullname"
          type="text"
          className="px-4 py-2 border border-gray-300 rounded-lg"
          {...formik.getFieldProps('fullname')}
        />
        {formik.touched.fullname && formik.errors.fullname ? (
          <div className="mt-1 text-xs font-normal text-red-600 normal-case">
            {formik.errors.fullname}
          </div>
        ) : null}
      </label>

      <label htmlFor="email" className="flex flex-col mt-8 font-semibold">
        Email
        <input
          id="email"
          type="text"
          className="px-4 py-2 border border-gray-300 rounded-lg bg-yellow-50"
          disabled
          value={formik.values.email}
        />
      </label>

      <hr className="h-full mt-8 text-gray-300 border-gray-300" />

      <div className="flex flex-row justify-end">
        <Link to={ROUTES.ACCOUNT_OVERVIEW}>
          <button
            type="button"
            onClick={() => setActive(0)}
            className="w-1/5 px-4 py-2 mt-8 font-medium text-gray-500 uppercase rounded-full hover:border-black hover:text-black focus:outline-none"
          >
            Thoát
          </button>
        </Link>
        <button
          type="submit"
          className="px-4 py-2 mt-8 font-medium text-gray-500 uppercase bg-green-400 rounded-full hover:text-black min:w-1/5 focus:outline-none"
        >
          Cập nhật
        </button>
      </div>
    </form>
  );
};

export { EditProfileForm };

export default EditProfile;
