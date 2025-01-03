'use client'
import Link from 'next/link'
import React from 'react'
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { IconCampfireFilled, IconCheck, IconLoader3 } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast'

const signupSchema = Yup.object().shape({
    fname: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Naam nhi hai kya?'),
    lname: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Naam nhi hai kya?'),
    email: Yup.string().email('Email is required').required('please enter email'),
    password: Yup.string().required('password is required')
        .matches(/[a-z]/, 'lowercase is required')
        .matches(/[A-Z]/, 'uppercase is required')
        .matches(/[0-9]/, 'number is required')
        .matches(/\W/, 'specialchar  is required'),
    confirmpassword: Yup.string().required('please enter confirm password')
        .oneOf([Yup.ref('password'), null], 'password must match'),
    profile: Yup.string()
})

const Signup = () => {
    const router = useRouter()

    const signupForm = useFormik({
        initialValues: {
            fname: '',
            lname: '',
            email: '',
            profile: '',
            password: '',
            confirmpassword: ''
        },
        onSubmit: (values, { resetForm, setSubmitting }) => {
            axios.post('http://localhost:5000/user/add', values)
                .then((result) => {
                    toast.success('Account created successfully')
                   router.push("/login")
                }).catch((err) => {
                    toast.error(err?.response?.data?.message || 'something went wrong')
                    setSubmitting(false)
                });
        },
        validationSchema: signupSchema
    })

    return (
        <div className="w-full h-screen bg-gray-100 dark:bg-gray-950">
            <div className="bg-white dark:bg-gray-900 flex flex-col sm:flex-row justify-center items-center h-full w-[1000px] mx-auto shadow-lg rounded-lg">
                {/* Left side with image */}
                <div className="w-full sm:w-1/2 h-full">
                    <img className="w-full h-full object-cover rounded-l-lg" src="images/signup.avif" alt="Signup Image" />
                </div>

                {/* Form */}
                <form className="w-full sm:w-1/2 mx-auto p-6 sm:p-8 mt-6 sm:mt-0 h-full flex flex-col justify-center bg-white dark:bg-gray-800 rounded-tl-none  rounded-lg shadow-xl border-2 border-gray-200 dark:border-gray-700"
                    onSubmit={signupForm.handleSubmit}>
                    <h2 className="text-4xl text-blue-800 dark:text-orange-500 font-bold  flex mb-2">
                        <IconCampfireFilled stroke={2} className="h-14 w-14 text-orange-500 mr-2" />
                        <span className='mt-4'>BonFire</span>
                    </h2>
                    <div className="text-gray-800 dark:text-white py-4  mb-4">
                        <p>Create your account</p>
                    </div>

                    {/* First Name and Last Name */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
                        <div className="flex flex-col">
                            <label className="text-gray-600 dark:text-gray-300">First Name</label>
                            <input
                                className="bg-gray-100 dark:bg-gray-700 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none border-2 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 rounded-md transition-all"
                                type="text"
                                id="fname"
                                onChange={signupForm.handleChange}
                                value={signupForm.values.fname} />
                            {signupForm.errors.fname && signupForm.touched.fname && (
                                <p className="text-xs text-red-600 ">{signupForm.errors.fname}</p>
                            )}
                        </div>

                        <div className="flex flex-col">
                            <label className="text-gray-600 dark:text-gray-300">Last Name</label>
                            <input
                                className="bg-gray-100 dark:bg-gray-700 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none border-2 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 rounded-md transition-all"
                                type="text"
                                id="lname"
                                onChange={signupForm.handleChange}
                                value={signupForm.values.lname} />
                            {signupForm.errors.lname && signupForm.touched.lname && (
                                <p className="text-xs text-red-600 ">{signupForm.errors.lname}</p>
                            )}
                        </div>
                    </div>

                    {/* Email Field */}
                    <div className="flex flex-col py-4 ">
                        <label className="text-gray-600 dark:text-gray-300">Email Address</label>
                        <input
                            className="bg-gray-100 dark:bg-gray-700 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none border-2 border-gray-300 dark:border-gray-600 w-full text-gray-800 dark:text-gray-200 rounded-md transition-all"
                            type="email"
                            id="email"
                            onChange={signupForm.handleChange}
                            value={signupForm.values.email} />
                        {signupForm.errors.email && signupForm.touched.email && (
                            <p className="text-xs text-red-600 ">{signupForm.errors.email}</p>
                        )}
                    </div>

                    {/* Password Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
                        <div className="flex flex-col">
                            <label className="text-gray-600 dark:text-gray-300">Password</label>
                            <input
                                className="bg-gray-100 dark:bg-gray-700 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none border-2 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 rounded-md transition-all"
                                type="password"
                                id="password"
                                onChange={signupForm.handleChange}
                                value={signupForm.values.password} />
                            {signupForm.errors.password && signupForm.touched.password && (
                                <p className="text-xs text-red-600 ">{signupForm.errors.password}</p>
                            )}
                        </div>

                        <div className="flex flex-col">
                            <label className="text-gray-600 dark:text-gray-300">Confirm Password</label>
                            <input
                                className="bg-gray-100 dark:bg-gray-700 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none border-2 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 rounded-md transition-all"
                                type="password"
                                id="confirmpassword"
                                onChange={signupForm.handleChange}
                                value={signupForm.values.confirmpassword} />
                            {signupForm.errors.confirmpassword && signupForm.touched.confirmpassword && (
                                <p className="text-xs text-red-600 ">{signupForm.errors.confirmpassword}</p>
                            )}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={signupForm.isSubmitting}
                        className="flex items-center justify-center gap-3 w-full py-3 px-4 mt-4 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white dark:bg-blue-700 dark:text-gray-300 hover:bg-blue-700 dark:hover:bg-blue-800 transition-all"
                    >
                        {signupForm.isSubmitting ? <IconLoader3 className="animate-spin" /> : <IconCheck />}
                        {signupForm.isSubmitting ? 'Submitting...' : 'Sign Up'}
                    </button>

                    {/* Login Redirect */}
                    <div className="mt-4 flex justify-center">
                        <p className="text-gray-600 dark:text-gray-300">Already have an account?</p>
                        <Link href="login" className="text-blue-600 ml-2 hover:underline dark:text-blue-400">
                            Login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;
