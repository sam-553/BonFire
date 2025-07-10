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
  email: Yup.string().email('Email is required').required('please enter email'),
  password: Yup.string().required('Password is required'),

});

const Login = () => {
  const router = useRouter();
  const loginForm = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: (values, { resetForm, setSubmitting }) => {
      console.log(values);
      axios.post('http://localhost:5000/user/authenticate', values)
        .then((result) => {
          toast.success('login successfully')
          resetForm()
          localStorage.setItem('token', result.data.token);

          router.push("/")
        }).catch((err) => {
          toast.error('invalid email or password')
          setSubmitting(false)
        });
    },
    validationSchema: loginSchema
  });

  return (
    <div className="w-full h-screen bg-gray-300 dark:bg-gray-950">
      <div className="flex flex-col-reverse sm:flex-row items-center justify-center h-full w-full sm:w-[1000px] mx-auto">
        {/* Form Section */}
        <form
          className="max-w-[400px] w-full mx-auto p-8 sm:p-10 bg-white dark:bg-gray-800 rounded-tl-lg rounded-bl-lg shadow-lg h-full transition-all"
          onSubmit={loginForm.handleSubmit}
        >
          <h2 className="text-4xl text-blue-600 dark:text-orange-500 font-bold flex items-center">
            <IconCampfireFilled stroke={2} className="h-14 w-14 text-orange-500" />
            <span className="ml-2">BonFire</span>
          </h2>
          <div className="text-gray-600 dark:text-gray-200 py-2 mb-2">
            <p>Log in to your account</p>
          </div>

          {/* Username Field */}
          <div className="flex flex-col py-2">
            <label className="text-gray-700 dark:text-gray-300">Email Address</label>
            <input
              className="rounded-2xl bg-gray-100 dark:bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:outline-none border-2 border-gray-500 text-gray-800 dark:text-gray-200 dark:border-gray-600 transition-all"
              type="text"
              id="email"
              onChange={loginForm.handleChange}
              value={loginForm.values.email}
            />
            {loginForm.errors.email && loginForm.touched.email && (
              <p className="text-xs text-red-600 mt-2">{loginForm.errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="flex flex-col py-2">
            <label className="text-gray-700 dark:text-gray-300">Password</label>
            <input
              className="rounded-2xl bg-gray-100 dark:bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:outline-none border-2 border-gray-500 text-gray-800 dark:text-gray-200 dark:border-gray-600 transition-all"
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
          <div className="flex justify-between text-gray-600 dark:text-gray-300 py-2">
            <p className="flex items-center">
              <input className="mr-2" type="checkbox" />
              Remember Me
            </p>
            <p className="text-blue-500 dark:text-blue-400 text-sm">Forgot Password?</p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loginForm.isSubmitting}
            className="flex items-center gap-3 w-full py-3 px-4 inline-flex justify-center  gap-x-2 mt-4 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white shadow-blue-600/50 hover:shadow-blue-600/40 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none transition-all"
          >
            sign in
          </button>

          {/* Create Account Link */}
          <div className="mt-4 flex justify-center">
            <p className="text-gray-600 dark:text-gray-300">Don&apos;t have an account?</p>
            <Link
              className="text-blue-600 dark:text-blue-400 decoration-2 hover:underline focus:outline-none focus:underline font-medium ml-2"
              href="/signup"
            >
              Create Account
            </Link>
          </div>
        </form>

        {/* Image Section */}
        <div className="hidden sm:block w-full h-full bg-cover bg-center rounded-tr-lg rounded-br-lg transition-all" style={{ backgroundImage: "url('images/login2.avif')" }}></div>
      </div>
    </div>
  );
};

export default Login;
