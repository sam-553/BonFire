'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { IconCampfireFilled, IconSun, IconMoon } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

const Header = () => {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedMode);
    document.body.classList.toggle('dark', savedMode);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem('darkMode', newMode);
      document.body.classList.toggle('dark', newMode);
      return newMode;
    });
  };

  const removeToken = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <header className="sticky top-0 z-20 shadow-md bg-white dark:bg-gray-900 transition duration-300">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between px-4 py-3 gap-4">

        {/* Logo Section */}
        <Link href="./" className="flex items-center space-x-2 text-blue-600 dark:text-orange-500 hover:opacity-90 transition">
          <IconCampfireFilled stroke={2} className="h-12 w-12 sm:h-14 sm:w-14 text-orange-500 dark:text-orange-300" />
          <span className="text-3xl sm:text-4xl font-extrabold hidden sm:inline">BonFire</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center gap-3 text-base font-semibold">
          <Link href="./" className="px-3 py-2 rounded-md hover:bg-blue-100 dark:hover:bg-gray-800 text-black dark:text-white transition">
            Home
          </Link>
          <Link href="/Createpost" className="px-3 py-2 rounded-md hover:bg-blue-100 dark:hover:bg-gray-800 text-black dark:text-white transition">
            Add Post
          </Link>
          <Link href="/manage-community" className="px-3 py-2 rounded-md hover:bg-blue-100 dark:hover:bg-gray-800 text-black dark:text-white transition">
            Create Community
          </Link>
        </div>

        {/* Right Actions */}
        <div className="flex items-center flex-wrap justify-center gap-3">
          {/* Theme Toggle */}
          <div
            className="text-2xl cursor-pointer hover:scale-110 transition"
            onClick={toggleDarkMode}
            title="Toggle Dark Mode"
          >
            {darkMode ? (
              <IconMoon className="text-yellow-400 hover:text-yellow-500" />
            ) : (
              <IconSun className="text-gray-700 dark:text-white hover:text-yellow-300" />
            )}
          </div>

          {/* Logout Button */}
          <button
            onClick={removeToken}
            className="px-4 py-2 rounded-full font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition"
          >
            Log out
          </button>

          {/* Sign up Button */}
          <Link
            href="/signup"
            className="px-4 py-2 rounded-full font-medium text-white bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 transition"
          >
            Sign up
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
