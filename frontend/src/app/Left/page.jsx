import React from 'react';
import { IconBrandDatabricks, IconBrandFacebook, IconBrandInstagram, IconBrandTwitter, IconMapPin, IconPhotoPlus } from '@tabler/icons-react';
import Link from 'next/link';

const Leftsidebar = () => {
  return (
    <div className="w-full sm:w-[320px] max-w-md p-4 mt-5 ml-4 rounded-lg shadow sm:p-8 sticky top-24 transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
      <div className="flow-root">
        {/* Profile Section */}
        <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
          <li className="py-3 sm:py-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img
                  className="w-12 h-12 rounded-full border-2 border-white transition-all duration-300 ease-in-out hover:border-blue-500"
                  src="images/friend.png"
                  alt="User Avatar"
                />
              </div>
              <div className="flex-1 min-w-0 ms-4">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">User Name</p>
                <p className="text-sm text-gray-600 dark:text-gray-600 truncate">Caption</p>
              </div>
              <div className="inline-flex items-center text-base font-semibold text-blue-600 dark:text-blue-400 cursor-pointer transition-all duration-300 ease-in-out hover:text-blue-400">
                <IconPhotoPlus
                
                
                />
              </div>
            </div>
          </li>
        </ul>

        {/* Separator */}
        <div className="border-b border-b-gray-600 mt-2"></div>

        {/* User Info */}
        <div className="mx-4 mt-4">
          <p className="text-gray-600 flex gap-2 dark:text-gray-300"><IconMapPin className="text-gray-300 dark:text-gray-600" /> Add Location</p>
          <p className="text-gray-600 flex mt-2 gap-2 dark:text-gray-300"><IconBrandDatabricks className="text-gray-300 dark:text-gray-600" /> Add Profession</p>
        </div>

        {/* Separator */}
        <div className="border-b border-b-gray-600 mt-2"></div>

        {/* Activity Info */}
        <div className="mt-4 mx-4">
          <p className="text-gray-600 text-md text-gray-900 dark:text-white font-bold">0 Friends</p>
          <p className="text-gray-600 flex mt-2 gap-2 justify-between dark:text-gray-300">
            Who viewed your profile
            <span className="text-gray-900 dark:text-white text-sm">0</span>
          </p>
          <p className="text-gray-600 flex mt-2 gap-2 justify-between dark:text-gray-300">
            Joined
            <span className="text-gray-900 dark:text-white text-sm">a minute ago</span>
          </p>
        </div>

        {/* Separator */}
        <div className="border-b border-b-gray-600 mt-2"></div>

        {/* Social Profiles */}
        <div className="mt-4 mx-4">
          <p className="text-gray-600 text-md text-gray-900 dark:text-white font-bold">Social Profile</p>
          <div className="flex flex-col mt-2 gap-2">
            <Link href="https://www.instagram.com" passHref>
              <p className="text-gray-600 flex gap-2 cursor-pointer hover:text-blue-500 transition-all duration-300 ease-in-out dark:text-gray-300 dark:hover:text-blue-400">
                <IconBrandInstagram className="text-gray-300 dark:text-gray-600" /> Instagram
              </p>
            </Link>
            <Link href="https://www.twitter.com" passHref>
              <p className="text-gray-600 flex gap-2 cursor-pointer hover:text-blue-500 transition-all duration-300 ease-in-out dark:text-gray-300 dark:hover:text-blue-400">
                <IconBrandTwitter className="text-gray-300 dark:text-gray-600" /> Twitter
              </p>
            </Link>
            <Link href="https://www.facebook.com" passHref>
              <p className="text-gray-600 flex gap-2 cursor-pointer hover:text-blue-500 transition-all duration-300 ease-in-out dark:text-gray-300 dark:hover:text-blue-400">
                <IconBrandFacebook className="text-gray-300 dark:text-gray-600" /> Facebook
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leftsidebar;
