'use client'
import Link from 'next/link'
import React from 'react'
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {  IconCampfireFilled } from '@tabler/icons-react';

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
   <div className='hidden sm:block w-full h-full'>
            <img className='w-full h-full object-cover' src='images/signup.jpg' alt="" />
        </div>
            <form className='max-w-[400px] w-full mx-auto rounded-lg p-3 px-3 mt-10'>
                <h2 className='text-4xl text-blue-600 font-bold flex '>
                <IconCampfireFilled stroke={2} className='h-14 w-14 text-orange-500'/> <span className="mt-4">BonFire</span>
                </h2>
                <div className=' text-white py-2'>
                    <p className=''> Create your account</p>
                    
                </div>
                <div className='flex  text-gray-400 py-1 mt-4'>
                    <div className='flex flex-col mx-1'>
                    <label>First Name</label>
                    <input className=' bg-gray-700  p-2 focus:border-blue-500  focus:outline-none
                    border border-2 border-gray-500 ' type="text" 
                     />
                    </div>
                    
                    <div className="flex flex-col">
                    <label>Last Name</label>
                    <input className=' bg-gray-700  p-2 focus:border-blue-500  focus:outline-none
                    border border-2 border-gray-500' type="text"  />
                    </div>
                </div>
                <div className='flex flex-col text-gray-400 py-2 mt-2 '>
                    <label>Email Address</label>
                    <input className=' bg-gray-700  p-2 focus:border-blue-500  focus:outline-none
                    border border-2 border-gray-500 w-[412px]' type="email"   />
                </div>
                <div className='flex  text-gray-400 py-1 mt-2 '>
                    <div className='flex flex-col mx-1'>
                    <label>Password</label>
                    <input className=' bg-gray-700  p-2 focus:border-blue-500  focus:outline-none
                    border border-2 border-gray-500' type="text"  />
                    </div>
                    
                    <div className="flex flex-col">
                    <label>Confirm Password</label>
                    <input className=' bg-gray-700  p-2 focus:border-blue-500  focus:outline-none
                    border border-2 border-gray-500 ' type="text"   />
                    </div>
                </div>
                
                <button className='w-full my-5 py-2 bg-blue-600 shadow-lg shadow-blue-600/50 hover:shadow-blue-600/40 text-white font-semibold rounded-lg'>Sign up</button>
                <div className="ms-1 flex">
                                       
                                            <p className='  text-gray-400'>
                                              Already has an account?
                                            </p>
                                            <Link
                                                className="text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium text-blue-500 ml-2"
                                                href="login"
                                            >
                                               Login
                                            </Link>
                                      
                                    </div>
                
            </form>
           

        </div>
        
   </div>
    
  </>
    


    
   
  )
}

export default login