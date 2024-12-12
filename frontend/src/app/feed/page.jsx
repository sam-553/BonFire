'use client'
import { IconBackspace, IconHeart, IconMessage, IconSearch, IconShare3 } from '@tabler/icons-react'
import axios from 'axios'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const Feed = ({ selCommunity }) => {
  const [postList, setPostList] = useState([])
  const [masterList, setMasterList] = useState([]);
 

  const filterPosts = (e) => {
    const v = e.target.value;
    setPostList(
      masterList.filter((post) => { return post.caption.toLowerCase().includes(v.toLowerCase()) })
    )
  }

  const fetchPost = async () => {
    try {
      const res = await axios.get('http://localhost:5000/post/getall')
      console.log(res.data);
    
      setPostList(res.data)
      setMasterList(res.data);
    } catch (error) {
      toast.error('Failed to fetch posts. Please try again later.')
    }
  }

  useEffect(() => {
    fetchPost();
  }, []);

  useEffect(() => {
    console.log(selCommunity);
    
    if (selCommunity) {
      setPostList(
        masterList.filter((post) => { return post.communityName.toLowerCase() === selCommunity.toLowerCase() })
      )
    }
  }, [selCommunity])

  

 

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  }

  return (
    <>
      <div className="lg:w-[500px] md:w-[300px] mx-2  bg-white dark:bg-gray-800 border mt-8 rounded-lg shadow dark:border-gray-700 border-gray-100 sticky top-24 z-10">
        <div className="flex-1 min-w-0">
          {/* Search and Post Button Form */}
          <form className="flex flex-col sm:flex-row items-center gap-4 p-4">
            {/* Search Input Field */}
            <div className="hidden sm:block flex-1 max-w-100% bg-gray-200 dark:bg-gray-700 rounded-full p-2 transition-all duration-300 ease-in-out focus-within:ring-2 focus-within:ring-blue-500 dark:focus-within:ring-blue-500">
              <div className="flex items-center gap-2">
                <IconSearch className="text-gray-400 dark:text-gray-200" />
                <input
                  type="text"
                  onChange={filterPosts}
                  placeholder="Search Communites"
                  className="w-full bg-transparent text-gray-900 dark:text-white focus:outline-none placeholder:text-gray-500 dark:placeholder:text-gray-300"
                />
              </div>
            </div>

         
            
          </form>
        </div>
      </div>
      <div className="max-w-3xl px-4 pt-6 lg:pt-5 pb-12 sm:px-6 lg:px-8 ">
        {postList.map((post) => (
          <div
            className="max-w-2xl bg-white dark:bg-gray-800 rounded-lg overflow-hidden mb-6 shadow-lg transition-transform transform hover:scale-105"
            key={post._id}
          >
            <div className="flex justify-between items-center mb-4 p-4">
              <div className="flex items-center gap-x-4">
                <img className="h-12 w-12 rounded-full" src="images/user1.jpeg" alt="user" />
                <div>
                  <p className="font-semibold text-black dark:text-white">{post.postedby || 'Anonymous'}</p>
                  <ul className="text-xs text-gray-500 dark:text-neutral-400">
                    <li>{formatDate(post.createdAt)}</li>

                  </ul>
                </div>
              </div>
            
            </div>

            <div className="space-y-4 px-4 pb-4">
              <p className="text-lg text-black dark:text-neutral-200">{post.caption}</p>

              <img className="w-full h-80 object-cover rounded-xl mb-4" src={post.image} alt="post" />

              <div className="flex justify-between text-black dark:text-white text-sm">
                <a
                  className="flex items-center gap-2 cursor-pointer hover:text-pink-500"
                  href="#"
                >
                  <IconHeart   /> <span>likes</span>
                </a>
                <a
                  className="flex items-center gap-2 cursor-pointer hover:text-blue-500"
                  href="#"
                >
                  <IconMessage /> <span>{post.comments || 0} comments</span>
                </a>
                <a
                  className="flex items-center gap-2 cursor-pointer hover:text-green-500"
                  href="#"
                >
                  <IconShare3 /> <span>{post.shares || 0} shares</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Feed
