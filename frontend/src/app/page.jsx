'use client';
import React, { useEffect, useState } from 'react'
import Header from './component/Header'


import Leftsidebar from './Left/page'
import Managepost from './Managepost/page'
import { IconContract, IconGif, IconPhoto, IconVideo, IconVideoFilled } from '@tabler/icons-react'
import Link from 'next/link';
import axios from 'axios';

const ViewCommunities = () => {
  const [communityList, setCommunityList] = useState([]);
  const fetchCommunity = async () => {
    const res = await axios.get('http://localhost:5000/community/getall');
    setCommunityList(res.data);
  };

  useEffect(() => {
    fetchCommunity();
  }, []);
  return <>
    <div className="w-full sm:w-[320px] md:w-[350px] lg:w-[500px] bg-gray-900 bg-opacity-95 border mt-5 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 border-gray-800 sticky top-24 ">
          <div className="flex items-center justify-between">
            <h5 className="text-xl font-bold text-white">Your Communities</h5>
          </div>
          <div className="flow-root mt-5">
            {communityList.length === 0 ? (
              <p className="text-sm text-gray-400">No communities available</p>
            ) : (
              communityList.map((community) => (
                <div key={community._id} className="py-3 sm:py-4">
                  <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                    <li>
                      <div className="flex items-center justify-between">
                        <div className="flex-shrink-0">
                          <img className="h-16 " src={community.image} alt="Community Avatar" />
                        </div>
                        <div className="flex-1 min-w-0 ms-4">
                          <p className="text-sm font-medium text-white truncate">{community.title}</p>
                        </div>
                        <button
                          className="inline-flex items-center text-base font-semibold text-red-500"
                          onClick={() => deleteCommunity(community._id)}
                        >
                          Remove
                        </button>
                      </div>
                    </li>
                  </ul>
                </div>
              ))
            )}
          </div>
        </div>
  </>
}

const Homepage = () => {
  
  return (
    <div className='sticky top-0'>
      <Header></Header>

      <div className='w-full h-full flex justify-between '>


        {/* left */}
        <div className="">
          <Leftsidebar></Leftsidebar>
        </div>
        {/* center */}
        <div className="flex flex-col z-10">
          <div className="lg:w-[480px] md:w-[300px]  mx-auto bg-gray-800 border mt-8 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 border-gray-800 ml-8 sticky top-24 -z-10">
            <div className="flex-1 min-w-0 ">
              <>
                {/* Input */}
                <form>
                  <div className=" flex flex-col sm:flex-row items-center gap-2 border border-gray-800 rounded-lg dark:border-neutral-700 ">

                    <Link
                      className="w-full sm:w-auto whitespace-nowrap py-2 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent  text-white hover:bg-blue-900 focus:outline-none bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:bg-white dark:text-neutral-800 dark:hover:bg-neutral-200"
                      href="Createpost"
                    >
                      Post

                    </Link>
                  </div>

                </form>
                {/* End Input */}
              </>


            </div>
            <p className="mt-5 text-md flex justify-between text-gray-500 dark:text-neutral-500">
              <span className="flex gap-2">
                <IconPhoto></IconPhoto> image
              </span>
              <span className="flex gap-2 ">
                <IconVideoFilled className='text-gray-400'></IconVideoFilled> video
              </span>
              <span className="flex gap-2">
                <IconContract></IconContract> Gif
              </span>
            </p>
          </div>
          <Managepost />
        </div>

        {/* right */}
        <div className="">
          <ViewCommunities />
        </div>
      </div>
    </div>
  )
}

export default Homepage