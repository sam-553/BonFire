import React from 'react'
import Link from 'next/link';
import { IconBellRingingFilled, IconCampfireFilled, IconSearch, IconSun} from '@tabler/icons-react';
import Login from '../login/page';





const Header = () => {
  return (
   <>
   <header className='h-16 shadow-xl bg-gray-950 '>
    <div className="h-full container mx-auto flex items-center px-12 justify-between bg-gray-800 ">
        <div className="">
            <Link href='./'>
            <h2 className='text-4xl text-blue-600 font-bold flex '>
                <IconCampfireFilled stroke={2} className='h-14 w-14 text-orange-500'/> <span className="mt-4">BonFire</span>
                </h2>
            </Link>
        </div>
        <div className="flex border-2 border-blue-500 overflow-hidden max-w-md mx-auto font-[sans-serif] w-full rounded-2xl" >
        <input type="email" placeholder="Search....."
          className="w-full outline-none bg-white text-lg text-gray-400  px-2 py-1" />
        <button type='button' className="flex items-center justify-center bg-blue-600 px-5 text-sm text-white">
          <IconSearch></IconSearch>
        </button>
      </div>
        <div className='flex items-center gap-7'>
            
            <div className="text-3xl cursor-pointer text-white">
             <IconSun></IconSun>
            </div>
            <div className="text-2xl relative text-white">
             <IconBellRingingFilled></IconBellRingingFilled>
                
            </div>
            <div className="">
                <Link href='login' className='px-3 py-1 text-white rounded-full bg-blue-700 hover:bg-blue-800'>
               Log out
                </Link>
            </div>
        </div>

    </div>
    
   </header>
   </>
  )
}

export default Header