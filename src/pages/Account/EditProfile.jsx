import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const EditProfile = ({ authUser }) => {
  const formik = useFormik({
    initialValues: {
      fullname: authUser[0]?.fullname,
      email: authUser[0]?.email,
    },
    validationSchema: Yup.object({
      fullname: Yup.string().required('This field is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('This field is required'),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className="w-9/12 h-full bg-white flex flex-col text-black px-8 py-16">
      <div className="text-4xl font-black">Edit Profile</div>

      <form onSubmit={formik.handleSubmit} className="flex flex-col w-full">
        <label htmlFor="fullname" className="flex flex-col font-semibold mt-12">
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
            className="py-2 border border-gray-300 px-4 rounded-lg"
            {...formik.getFieldProps('email')}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-600 text-xs normal-case font-normal mt-1">
              {formik.errors.email}
            </div>
          ) : null}
        </label>

        <hr className="text-gray-300 border-gray-300 h-full mt-8" />

        <div className="flex flex-row justify-end">
          {/* <button
            type="button"
            className="uppercase text-gray-500 rounded-full mt-8 w-1/5 font-medium hover:border-black hover:text-black
              px-4 py-2"
          >
            Cancel
          </button> */}

          <button
            type="submit"
            className="uppercase text-gray-500 hover:text-black bg-green-400 rounded-full mt-8 w-1/5 font-medium
              px-4 py-2"
          >
            Edit Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
