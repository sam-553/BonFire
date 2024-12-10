'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { IconBellRingingFilled, IconCampfireFilled, IconSearch, IconSun, IconMoon } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

const Header = () => {
  const router=useRouter();
  const [darkMode, setDarkMode] = useState(false);

  // Check the saved mode preference from localStorage (if any)
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedMode);
    if (savedMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem('darkMode', newMode);
      if (newMode) {
        document.body.classList.add('dark');
      } else {
        document.body.classList.remove('dark');
      }
      return newMode;
    });
  };
  const removeToken=()=>{
    localStorage.removeItem('token');
    router.push('/login')
  }

  return (
    <header className="h-16 shadow-xl sticky top-0  transition-all duration-300 ease-in-out ">
      <div className={`h-full container mx-auto flex flex-col sm:flex-row items-center px-4 sm:px-12 justify-between bg-white dark:bg-gray-900`}>

        {/* Logo Section */}
        <div className="flex items-center justify-between w-full sm:w-auto mb-4 sm:mb-0">
          <Link href="./">
            <h2 className="text-4xl font-bold flex items-center space-x-2 text-blue-600 dark:text-orange-500">
              <IconCampfireFilled stroke={2} className="h-14 w-14 text-orange-500 dark:text-orange-300" />
              <span className="ml-2 hidden sm:block">BonFire</span>
            </h2>
          </Link>
        </div>

        {/* Search Bar (Optional, could be added later) */}
       

        {/* Right Side - Icons and Logout */}
        <div className="flex items-center gap-4 mt-4 sm:mt-0">
        <div className="flex justify-between w-[400px]">
        <Link href="./" className="px-4 py-2 font-semibold text-black dark:text-white ">
             Home
            </Link>
        <Link href="/Createpost" className="px-4 py-2 font-semibold text-black dark:text-white ">
              Add Post
            </Link>
        <Link href="/manage-community" className="px-4 py-2 font-semibold text-black dark:text-white ">
             Create community
            </Link>
        </div>
          {/* Sun/Moon Icon for theme toggle */}
          <div
            className="text-3xl cursor-pointer transition-all duration-300 ease-in-out"
            onClick={toggleDarkMode}
          >
            {darkMode ? (
              <IconMoon className="text-yellow-400 hover:text-yellow-500" />
            ) : (
              <IconSun className="text-gray-700 dark:text-white hover:text-yellow-300" />
            )}
          </div>

          
          {/* Log out button */}
          <div>
            <button className="px-4 py-2 text-white rounded-full bg-blue-700 hover:bg-blue-800 dark:bg-blue-500 dark:hover:bg-blue-600 transition-all duration-300 ease-in-out" onClick={removeToken}>
              Log out
              
            </button>
          </div>
          <div>
            <Link href="/signup" className="px-4 py-2 text-white rounded-full bg-blue-700 hover:bg-blue-800 dark:bg-blue-500 dark:hover:bg-blue-600 transition-all duration-300 ease-in-out">
             Sign up
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
