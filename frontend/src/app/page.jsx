'use client';
import React, { useEffect, useState } from 'react';
import Header from './component/Header';
import Leftsidebar from './Left/page';

import { IconSearch } from '@tabler/icons-react';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Feed from './feed/page';

const ViewCommunities = ({ selCommunity, setSelCommunity }) => {
  const [communityList, setCommunityList] = useState([]);
  const token = localStorage.getItem('token');
  const router = useRouter();

  useEffect(() => {
    console.log(token);

    if (!token) {
      toast.error('Login to continue');
      router.push('/login');
    }
  }, [])



  const fetchCommunity = async () => {
    const res = await axios.get('http://localhost:5000/community/getall');
    setCommunityList(res.data);
    console.log(res.data);

  };

  useEffect(() => {
    fetchCommunity();
  }, []);



  return (
    <div className="w-full  bg-white bg-opacity-90 dark:bg-gray-800 dark:border-gray-700 border mt-5 rounded-lg shadow-sm sm:p-8 sticky top-24 transition-all duration-300">
      <div className="flex items-center justify-between">
        <h5 className="text-xl font-bold text-gray-900 dark:text-white">Your Communities</h5>
      </div>
      <div className="flow-root mt-5">
        {communityList.length === 0 ? (
          <p className="text-sm text-gray-400 dark:text-gray-300">No communities available</p>
        ) : (
          communityList.map((community) => (
            <div key={community._id} onClick={() => {
              setSelCommunity(community.title);
              console.log(selCommunity);

            }} className={`py-3 sm:py-4 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-300  ${selCommunity === community.title && 'bg-yellow-500'}`}>
              <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                <li>
                  <div className="flex items-center justify-between">
                    <div className="flex-shrink-0">
                      <img className="h-16 rounded-md" src={community.image} alt="Community Avatar" />
                    </div>
                    <div className="min-w-0 ms-4">
                      <p className="text-md font-medium text-gray-900 dark:text-white truncate">{community.title}</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const Homepage = () => {

  const [selCommunity, setSelCommunity] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  const fetchUserData = async () => {
    const token = localStorage.getItem('token');

    const res = await axios.get('http://localhost:5000/user/getuser', {
      headers: { 'x-auth-token': token }
    });

    console.log(res.data);
    setCurrentUser(res.data);

  }

  useEffect(() => {
    fetchUserData();
  }, [])


  return (
    <div className="sticky top-0 ">
      <Header />

      <div className="w-full px-10 gap-5 h-full flex bg-gray-100 dark:bg-gray-950">
        {/* Left Section */}
        <div className="">
          {
            currentUser !== null &&
            <Leftsidebar avatar={currentUser?.avatar} fname={currentUser?.fname} lname={currentUser?.lname} url={currentUser?.url} loadUser={fetchUserData} id={currentUser._id} />
          }
        </div>

        {/* Center Section */}
        <div className="flex flex-col  flex-1">


          <Feed selCommunity={selCommunity} />
        </div>

        {/* Right Section */}
        <div className="">
          <ViewCommunities setSelCommunity={setSelCommunity} selCommunity={selCommunity} />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
