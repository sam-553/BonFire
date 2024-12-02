import React from 'react';
import { IconBrandDatabricks, IconBrandFacebook, IconBrandInstagram, IconBrandTwitter, IconMapPin, IconNotebook, IconPhotoPlus } from '@tabler/icons-react';
import Link from 'next/link';

const Leftsidebar = () => {
  return (
    <>
      <div className="w-full sm:w-[320px] max-w-md p-4 bg-gray-800 mt-5 ml-4 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 sticky top-24">
        <div className="flow-root">
          <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
            <li className="py-3 sm:py-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img
                    className="w-12 h-12 rounded-full border border-white"
                    src="images/friend.png"
                    alt="User Avatar"
                  />
                </div>
                <div className="flex-1 min-w-0 ms-4">
                  <p className="text-sm font-medium text-white truncate dark:text-white">
                    User Name
                  </p>
                  <p className="text-sm text-gray-400 truncate dark:text-gray-400">
                    Caption
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-blue-600 dark:text-white">
                  <IconPhotoPlus />
                </div>
              </div>
            </li>
          </ul>

          <div className="border-b border-b-gray-600 mt-2"></div>

          <div className="mx-4 mt-4">
            <p className="text-gray-400 flex gap-2"><IconMapPin /> Add Location</p>
            <p className="text-gray-400 flex mt-2 gap-2"><IconBrandDatabricks /> Add Profession</p>
          </div>

          <div className="border-b border-b-gray-600 mt-2"></div>

          <div className="mt-4 mx-4">
            <p className="text-gray-400 text-md text-white font-bold"> 0 Friend</p>
            <p className="text-gray-400 flex mt-2 gap-2 justify-between">
              Who viewed your profile
              <span className="text-white text-sm">0</span>
            </p>
            <p className="text-gray-400 flex mt-2 gap-2 justify-between">
              Joined
              <span className="text-white text-sm"> a minute ago</span>
            </p>
          </div>

          <div className="border-b border-b-gray-600 mt-2"></div>

          <div className="mt-4 mx-4">
            <p className="text-gray-400 text-md text-white font-bold"> Social Profile</p>
            <p className="text-gray-400 flex mt-2 gap-2"><IconBrandInstagram className="text-gray-300" /> Instagram</p>
            <p className="text-gray-400 flex mt-2 gap-2"><IconBrandTwitter className="text-gray-300" /> Twitter</p>
            <p className="text-gray-400 flex mt-2 gap-2"><IconBrandFacebook className="text-gray-300" /> Facebook</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Leftsidebar;
