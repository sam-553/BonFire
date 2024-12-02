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
            console.log(values);
            axios.post('http://localhost:5000/user/add', values)
                .then((result) => {
                    toast.success('connected')
                    resetForm()

                }).catch((err) => {
                    console.log(err);
                    toast.error(err?.response?.data?.message || 'something went wrong')
                    setSubmitting(false)
                });
        },
        validationSchema: signupSchema
    })

    return (
        <div className="w-full bg-gray-950 h-screen">
            <div className="bg-gray-900 flex flex-col sm:flex-row justify-center items-center h-full w-[1000px] mx-auto">
                {/* Left side with image */}
                <div className="w-full sm:w-1/2 h-full">
                    <img className="w-full h-full object-cover" src="images/signup.jpg" alt="Signup Image" />
                </div>

                {/* Form */}
                <form className="w-full sm:w-1/2 mx-auto p-6 sm:p-8 mt-6 sm:mt-0 h-full flex flex-col justify-center bg-gray-900 dark:bg-gray-800 rounded-lg shadow-lg"
                    onSubmit={signupForm.handleSubmit}>
                    <h2 className="text-4xl text-blue-800 font-bold  flex mb-2">
                        <IconCampfireFilled stroke={2} className="h-14 w-14 text-orange-500 mr-2" />
                        <span className='mt-4'>BonFire</span>
                    </h2>
                    <div className="text-white py-4  mb-4">
                        <p>Create your account</p>
                    </div>

                    {/* First Name and Last Name */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
                        <div className="flex flex-col">
                            <label className="text-gray-400">First Name</label>
                            <input
                                className="bg-gray-700 p-2 focus:border-blue-500 focus:outline-none border-2 border-gray-500 text-gray-200"
                                type="text"
                                id="fname"
                                onChange={signupForm.handleChange}
                                value={signupForm.values.fname} />
                            {signupForm.errors.fname && signupForm.touched.fname && (
                                <p className="text-xs text-red-600 ">{signupForm.errors.fname}</p>
                            )}
                        </div>

                        <div className="flex flex-col">
                            <label className="text-gray-400">Last Name</label>
                            <input
                                className="bg-gray-700 p-2 focus:border-blue-500 focus:outline-none border-2 border-gray-500 text-gray-200"
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
                        <label className="text-gray-400">Email Address</label>
                        <input
                            className="bg-gray-700 p-2 focus:border-blue-500 focus:outline-none border-2 border-gray-500 w-full text-gray-200"
                            type="email"
                            id="email"
                            onChange={signupForm.handleChange}
                            value={signupForm.values.email} />
                        {signupForm.errors.email && signupForm.touched.email && (
                            <p className="text-xs text-red-600 ">{signupForm.errors.email}</p>
                        )}
                    </div>

                    {/* Profile Picture */}
                    {/* <div className="flex flex-col py-4 ">
                        <label className="text-gray-400">Add Profile</label>
                        <input
                            className="bg-gray-700 p-2 focus:border-blue-500 focus:outline-none border-2 border-gray-500 w-full"
                            type="file"
                            id="profile"
                            onChange={signupForm.handleChange}
                            value={signupForm.values.profile} />
                        {signupForm.errors.profile && signupForm.touched.profile && (
                            <p className="text-xs text-red-600 ">{signupForm.errors.profile}</p>
                        )}
                    </div> */}

                    {/* Password Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
                        <div className="flex flex-col">
                            <label className="text-gray-400">Password</label>
                            <input
                                className="bg-gray-700 p-2 focus:border-blue-500 focus:outline-none border-2 border-gray-500 text-gray-200"
                                type="password"
                                id="password"
                                onChange={signupForm.handleChange}
                                value={signupForm.values.password} />
                            {signupForm.errors.password && signupForm.touched.password && (
                                <p className="text-xs text-red-600 ">{signupForm.errors.password}</p>
                            )}
                        </div>

                        <div className="flex flex-col">
                            <label className="text-gray-400">Confirm Password</label>
                            <input
                                className="bg-gray-700 p-2 focus:border-blue-500 focus:outline-none border-2 border-gray-500 text-gray-200"
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
                        className="flex items-center justify-center gap-3 w-full py-3 px-4 mt-4 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white 
                        shadow-blue-600/50 hover:shadow-blue-600/40 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
                        {signupForm.isSubmitting ? <IconLoader3 className="animate-spin" /> : <IconCheck />}
                        {signupForm.isSubmitting ? 'Submitting...' : 'Sign Up'}
                    </button>

                    {/* Login Redirect */}
                    <div className="mt-4 flex justify-center">
                        <p className="text-gray-400">Already have an account?</p>
                        <Link href="login" className="text-blue-600 ml-2 hover:underline">
                            Login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;
