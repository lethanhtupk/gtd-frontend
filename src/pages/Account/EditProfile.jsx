import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import AccountServices from '../../services/AccountService';
import { FailedAlert, SuccessAlert } from '../../components/Alert';

const EditProfile = ({ authUser, setActive }) => {
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  return (
    <>
      <header>
        <title>Edit profile - GTD</title>
      </header>
      <div className="w-9/12 h-full bg-white flex flex-col text-black px-8 py-16">
        <div className="text-4xl font-black mb-4">Edit Profile</div>
        {error ? (
          <FailedAlert message={message} invisible={loading} />
        ) : (
          <SuccessAlert message={message} invisible={loading} />
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
      fullname: Yup.string().required('This field is required'),
    }),
    onSubmit: (values) => {
      AccountServices.editProfile(authUser[0].id, values)
        .then((res) => {
          if (res.code === 200) {
            setError(false);
            setMessage('Update your profile success');
            setLoading(false);
            delete res['code'];
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
      <label htmlFor="fullname" className="flex flex-col font-semibold mt-8">
        Full name
        <input
          id="fullname"
          type="text"
          className="py-2 border border-gray-300 px-4 rounded-lg"
          {...formik.getFieldProps('fullname')}
        />
        {formik.touched.fullname && formik.errors.fullname ? (
          <div className="text-red-600 text-xs normal-case font-normal mt-1">
            {formik.errors.fullname}
          </div>
        ) : null}
      </label>

      <label htmlFor="email" className="flex flex-col font-semibold mt-8">
        Email
        <input
          id="email"
          type="text"
          className="py-2 border border-gray-300 px-4 rounded-lg bg-yellow-50"
          disabled
          value={formik.values.email}
        />
      </label>

      <hr className="text-gray-300 border-gray-300 h-full mt-8" />

      <div className="flex flex-row justify-end">
        <Link to={ROUTES.ACCOUNT_OVERVIEW}>
          <button
            type="button"
            onClick={() => setActive(0)}
            className="uppercase text-gray-500 rounded-full mt-8 w-1/5 font-medium hover:border-black hover:text-black focus:outline-none px-4 py-2"
          >
            Cancel
          </button>
        </Link>
        <button
          type="submit"
          className="uppercase text-gray-500 hover:text-black bg-green-400 rounded-full mt-8 min:w-1/5 font-medium
              px-4 py-2 focus:outline-none"
        >
          Edit Profile
        </button>
      </div>
    </form>
  );
};

export { EditProfileForm };

export default EditProfile;
