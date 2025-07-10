// 'use client';
// import React, { useEffect, useState } from 'react';
// import Header from '../component/Header';
// import Leftsidebar from '../Left/page';
// import Managepost from '../Managepost/page';
// import { IconSearch } from '@tabler/icons-react';
// import Link from 'next/link';
// import axios from 'axios';

// const ViewCommunities = () => {
//   const [communityList, setCommunityList] = useState([]);

//   const fetchCommunity = async () => {
//     const res = await axios.get('https://localhost:5000/community/getall');
//     setCommunityList(res.data);
//   };

//   useEffect(() => {
//     fetchCommunity();
//   }, []);

//   return (
//     <div className="w-full bg-white bg-opacity-90 dark:bg-gray-800 dark:border-gray-700 border mt-5 rounded-lg shadow-sm sm:p-8 sticky top-24 transition-all duration-300">
//       <div className="flex items-center justify-between">
//         <h5 className="text-xl font-bold text-gray-900 dark:text-white">Your Communities</h5>
//       </div>
//       <div className="flow-root mt-5">
//         {communityList.length === 0 ? (
//           <p className="text-sm text-gray-400 dark:text-gray-300">No communities available</p>
//         ) : (
//           communityList.map((community) => (
//             <div key={community._id} className="py-3 sm:py-4 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-300 px-3">
//               <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
//                 <li>
//                   <div className="flex items-center justify-between">
//                     <div className="flex-shrink-0">
//                       <img className="h-16 rounded-md" src={community.image} alt="Community Avatar" />
//                     </div>
//                     <div className="min-w-0 ms-4">
//                       <p className="text-md font-medium text-gray-900 dark:text-white truncate">{community.title}</p>
//                     </div>
//                   </div>
//                 </li>
//               </ul>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// const Homepage = () => {
//   return (
//     <div className="sticky top-0">
//       <Header />

//       <div className="w-full h-full flex justify-between bg-gray-100 dark:bg-gray-950">
//         {/* Left Section */}
//         <div className="">
//           <Leftsidebar />
//         </div>

//         {/* Center Section */}
//         <div className="flex flex-col z-10 flex-1">
//           <div className="lg:w-[550px] md:w-[300px]  mx-auto bg-white dark:bg-gray-800 border mt-8 rounded-lg shadow dark:border-gray-700 border-gray-100 sticky top-24 -z-10">
//             <div className="flex-1 min-w-0">
//               {/* Search and Post Button Form */}
//               <form className="flex flex-col sm:flex-row items-center gap-4 p-4">
//                 {/* Search Input Field */}
//                 <div className="hidden sm:block flex-1 max-w-[400px] bg-gray-200 dark:bg-gray-700 rounded-full p-2 transition-all duration-300 ease-in-out focus-within:ring-2 focus-within:ring-blue-500 dark:focus-within:ring-blue-500">
//                   <div className="flex items-center gap-2">
//                     <IconSearch className="text-gray-400 dark:text-gray-200" />
//                     <input
//                       type="text"
//                       placeholder="Search"
//                       className="w-full bg-transparent text-gray-900 dark:text-white focus:outline-none placeholder:text-gray-500 dark:placeholder:text-gray-300"
//                     />
//                   </div>
//                 </div>

//                 {/* Post Button */}
//                 <Link
//                   href="Createpost"
//                   className="w-full sm:w-auto py-2 px-6 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border-2 border-transparent bg-gradient-to-r from-indigo-600 to-indigo-800 text-white hover:from-indigo-700 hover:to-indigo-900 focus:outline-none active:scale-95 transition-all duration-300 ease-in-out dark:bg-gradient-to-r dark:from-indigo-500 dark:to-indigo-700 dark:hover:from-indigo-600 dark:hover:to-indigo-800"
//                 >
//                   Post
//                 </Link>
//               </form>
//             </div>
//           </div>

//           <Managepost />
//         </div>

//         {/* Right Section */}
//         <div className="">
//           <ViewCommunities />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Homepage;
