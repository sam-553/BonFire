'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { IconBellRingingFilled, IconCampfireFilled, IconSearch, IconSun, IconMoon } from '@tabler/icons-react';

const Header = () => {
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

  return (
    <header className="h-16 shadow-xl bg-gray-950 sticky top-0 z-10">
      <div className="h-full container mx-auto flex flex-col sm:flex-row items-center px-4 sm:px-12 justify-between bg-gray-800">
        
        {/* Logo Section */}
        <div className="flex items-center justify-between w-full sm:w-auto mb-4 sm:mb-0">
          <Link href="./">
            <h2 className="text-4xl text-blue-600 font-bold flex items-center">
              <IconCampfireFilled stroke={2} className="h-14 w-14 text-orange-500" />
              <span className="ml-2 hidden sm:block">BonFire</span> {/* Hide text on small screens */}
            </h2>
          </Link>
        </div>

        {/* Search Bar */}
        
        {/* Right Side - Icons and Logout */}
        <div className="flex items-center gap-4 mt-4 sm:mt-0">
          {/* Sun/Moon Icon for theme toggle */}
          <div
            className="text-3xl cursor-pointer text-white"
            onClick={toggleDarkMode}
          >
            {darkMode ? (
              <IconMoon className="text-yellow-400" />
            ) : (
              <IconSun className="text-white" />
            )}
          </div>

          {/* Notification Icon */}
          <div className="text-2xl relative text-white">
            <IconBellRingingFilled />
          </div>

          {/* Log out button */}
          <div>
            <Link href="/login" className="px-3 py-1 text-white rounded-full bg-blue-700 hover:bg-blue-800">
              Log out
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
