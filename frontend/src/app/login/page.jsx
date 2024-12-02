'use client'
import Link from 'next/link'
import React from 'react'
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { IconCampfireFilled, IconCheck, IconLoader3 } from '@tabler/icons-react'
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const loginSchema = Yup.object().shape({
  name: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
  profile: Yup.string()
});

const Login = () => {
  const router = useRouter();
  const loginForm = useFormik({
    initialValues: {
      name: '',
      profile: '',
      password: ''
    },
    onSubmit: (values, { resetForm, setSubmitting }) => {
      console.log(values);
      axios.post('http://localhost:5000/profile/add', values)
        .then((result) => {
          toast.success('Profile added');
          resetForm();
        }).catch((err) => {
          toast.error(err?.response?.data?.message || 'Something went wrong');
          setSubmitting(false);
        });
    },
    validationSchema: loginSchema
  });

  return (
    <div className="w-full bg-gray-950 h-screen dark:bg-gray-900">
      <div className="flex flex-col-reverse sm:flex-row items-center justify-center h-full w-[1000px] mx-auto bg-gray-900">
        {/* Form Section */}
        <form
          className="max-w-[400px] w-full mx-auto p-4 px-8 sm:p-8 bg-gray-900 dark:bg-gray-800 rounded-lg shadow-lg h-full"
          onSubmit={loginForm.handleSubmit}
        >
          <h2 className="text-4xl text-blue-600 font-bold flex items-center ">
            <IconCampfireFilled stroke={2} className="h-14 w-14 text-orange-500" />
            <span className="ml-2">BonFire</span>
          </h2>
          <div className="text-white py-2 mb-2">
            <p>Log in to your account</p>
          </div>

          {/* Username Field */}
          <div className="flex flex-col text-gray-400 py-2 ">
            <label>Username</label>
            <input
              className="rounded-2xl bg-gray-600 mt-2 p-2 focus:border-blue-500 focus:outline-none border-2 border-gray-500 text-gray-200"
              type="text"
              id="name"
              onChange={loginForm.handleChange}
              value={loginForm.values.name}
            />
            {loginForm.errors.name && loginForm.touched.name && (
              <p className="text-xs text-red-600 mt-2">{loginForm.errors.name}</p>
            )}
          </div>

          {/* Profile Field
          <div className="flex flex-col text-gray-400 py-2 ">
            <label>Profile</label>
            <input
              className="rounded-2xl bg-gray-600 mt-2 p-2 focus:border-blue-500 focus:outline-none border-2 border-gray-500"
              type="text"
              id="profile"
              onChange={loginForm.handleChange}
              value={loginForm.values.profile}
            />
            {loginForm.errors.profile && loginForm.touched.profile && (
              <p className="text-xs text-red-600 mt-2">{loginForm.errors.profile}</p>
            )}
          </div> */}

          {/* Password Field */}
          <div className="flex flex-col text-gray-400 py-2 ">
            <label>Password</label>
            <input
              className="rounded-2xl bg-gray-600 mt-2 p-2 focus:border-blue-500 focus:outline-none border-2 border-gray-500 text-gray-200"
              type="password"
              id="password"
              onChange={loginForm.handleChange}
              value={loginForm.values.password}
            />
            {loginForm.errors.password && loginForm.touched.password && (
              <p className="text-xs text-red-600 mt-2">{loginForm.errors.password}</p>
            )}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex justify-between text-gray-400 py-2 ">
            <p className="flex items-center">
              <input className="mr-2" type="checkbox" />
              Remember Me
            </p>
            <p className="text-blue-500 text-sm">Forgot Password?</p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loginForm.isSubmitting}
            className="flex items-center gap-3 w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 mt-4 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white shadow-blue-600/50 hover:shadow-blue-600/40 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
          >
            {loginForm.isSubmitting ? <IconLoader3 className="animate-spin" /> : <IconCheck />}
            {loginForm.isSubmitting ? 'Submitting...' : 'Sign In'}
          </button>

          {/* Create Account Link */}
          <div className="mt-4 flex justify-center">
            <p className="text-gray-400">Don't have an account?</p>
            <Link
              className="text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium ml-2"
              href="/signup"
            >
              Create Account
            </Link>
          </div>
        </form>

        {/* Image Section */}
        <div className="hidden sm:block w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('images/login2.jpg')" }}></div>
      </div>
    </div>
  );
};

export default Login;
