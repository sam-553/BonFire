'use client'
import Link from 'next/link'
import React from 'react'
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { IconCampfireFilled, } from '@tabler/icons-react'

const loginSchema=Yup.object().shape({
 name:Yup.string().required('username is required'),
 password:Yup.string().required('password is required')
})


const login = () => {
    const loginForm=useFormik({
      initialValues:{
        name:'',
        password:''
      },
      onSubmit:(values)=>{
        console.log(values);
        
      },
      validationSchema:loginSchema
      
    })
  return (
  <>

    
   
   <div className="w-full bg-gray-900 h-[100%] ">
   <div className='bg-gray-800 flex flex-col justify-center grid grid-cols-1 sm:grid-cols-2 h-screen  w-[1000px] mx-auto '>
            <form className='max-w-[400px] w-full mx-auto rounded-lg p-8 px-8 mt-10'>
            <h2 className='text-4xl text-blue-600 font-bold flex '>
                <IconCampfireFilled stroke={2} className='h-14 w-14 text-orange-500'/> <span className="mt-4">BonFire</span>
                </h2>
                <div className=' text-white py-2 '>
                    <p className=''> Log in to your account</p>
                    {/* <p className='text-gray-400 text-[15px]'>Welcome back</p> */}
                </div>
                <div className='flex flex-col text-gray-400 py-2 mt-4'>
                    <label>Username</label>
                    <input className='rounded-2xl bg-gray-700 mt-2 p-2 focus:border-blue-500  focus:outline-none
                    border border-2 border-gray-500' type="text" />
                </div>
                <div className='flex flex-col text-gray-400 py-2'>
                    <label>Password</label>
                    <input className='rounded-2xl bg-gray-700 mt-2 p-2 focus:border-blue-500  focus:outline-none
                    border border-2 border-gray-500' type="text" />
                </div>
                <div className='flex justify-between text-gray-400 py-2'>
                    <p className='flex items-center'><input className='mr-2' type="checkbox" /> Remember Me</p>
                    <p className='text-blue-500 text-[15px]'>Forgot Password</p>
                </div>
                <button className='w-full my-5 py-2 bg-blue-600 shadow-lg shadow-blue-600/50 hover:shadow-blue-600/40 text-white font-semibold rounded-lg'>Sign in</button>
                <div className="ms-1 flex">
                                       
                                            <p className='  text-gray-400'>
                                              Don't have an account?
                                            </p>
                                            <Link
                                                className="text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium text-blue-500 ml-2"
                                                href="signup"
                                            >
                                                Create Account
                                            </Link>
                                      
                                    </div>
                
            </form>
            <div className='hidden sm:block w-full h-full'>
            <img className='w-full h-full object-cover' src='images/login2.jpg' alt="" />
        </div>

        </div>
        
   </div>
    
  </>
    


    
   
  )
}

export default login