'use client'
import { IconBackspace, IconHeart, IconMessage, IconShare3 } from '@tabler/icons-react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'


const Managepost = () => {
  const[postList,setpostList]=useState([])


  const fetchpost=async ()=>{
    const res =await axios.get('http://localhost:5000/post/getall')
    setpostList(res.data)
  }

  useEffect(()=>{
    fetchpost();
  },[] ); 

  const deletePost=async(id)=>{
    if (!confirm('Are you sure you want to delete this community?')) return;
   const res = await axios.delete(`http://localhost:5000/post/delete/${id}`)
   if (res.status === 200) {
 fetchpost()
    toast.success('post deleted successfully');
  } else {
    toast.error('Failed to delete post');
  }
  }
  return (
    <>
    <>
 
  <div className="max-w-3xl px-4 pt-6 lg:pt-5 pb-12 sm:px-6 lg:px-8 ">
    {
      postList.map((post)=>{
        return(
          <div className="max-w-2xl bg-gray-800 rounded-lg " key={post._id}>
   
          <div className="flex justify-between items-center mb-6 ml-2 ">
              
              <div className="flex w-full sm:items-center gap-x-5 sm:gap-x-3 mt-3">
      
              
                
              <div className="shrink-0">
                  <img
                    className="size-12 rounded-full"
                    src="images/user1.jpeg"
                  />
                </div>
                <div className="grow">
                  <div className="flex justify-between items-center gap-x-2">
                    <div>
                
                      <div className="hs-tooltip [--trigger:hover] [--placement:bottom] inline-block">
                        <div className="hs-tooltip-toggle sm:mb-1 block text-start cursor-pointer">
                          <span className="font-semibold text-white dark:text-neutral-200">
                            Leyla Ludic
                          </span>
                          
                          <div
                            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 max-w-xs cursor-default bg-gray-900 divide-y divide-gray-700 shadow-lg rounded-xl dark:bg-neutral-950 dark:divide-neutral-700"
                            role="tooltip"
                          >
                          
                            <div className="p-4 sm:p-5">
                              <div className="mb-2 flex w-full sm:items-center gap-x-5 sm:gap-x-3">
                               
                                <div className="grow">
                                  <p className="text-lg font-semibold text-gray-200 dark:text-neutral-200">
                                    Leyla Ludic
                                  </p>
                                </div>
                              </div>
                             
                            </div>
                         
                            
                          </div>
                         
                        </div>
                      </div>
                 
                      <ul className="text-xs text-gray-500 dark:text-neutral-500">
                        <li className="inline-block relative pe-6 last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-2 before:-translate-y-1/2 before:size-1 before:bg-gray-300 before:rounded-full dark:text-neutral-400 dark:before:bg-neutral-600">
                          Jan 18
                        </li>
                        <li className="inline-block relative pe-6 last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-2 before:-translate-y-1/2 before:size-1 before:bg-gray-300 before:rounded-full dark:text-neutral-400 dark:before:bg-neutral-600">
                          8 min read
                        </li>
                      </ul>
                    </div>
                <span className="text-2xl text-white mb-8 mr-4">
                <IconBackspace
                 onClick={() => deletePost(post._id)}
                >

                </IconBackspace>
                </span>
                  </div>
               
                </div>
              </div>
            </div>
           
            <div className="space-y-5 md:space-y-8">
              <div className="space-y-3">
                {/* <h2 className="text-2xl font-bold md:text-3xl text-white">
               tittle
                </h2> */}
                <p className="text-lg text-white dark:text-neutral-200 p-2">
                  {post.caption}
                
                </p>
              </div>
             
              <figure>
                <img
                  className="w-full object-cover rounded-xl"
                  src={post.image}
                  alt="post"
                />
              
              </figure>
              
              <div className='flex justify-between'>
                <a
                  className="m-1 inline-flex items-center gap-1.5 py-1 px-3  text-sm text-white  "
                  href="#"
                >
                  <IconHeart></IconHeart><span>0 like</span>
                </a>
                <a
                  className="m-1 inline-flex items-center gap-1.5 py-1 px-3 text-sm text-white  focus:outline-none  dark:text-neutral-200 dark:focus:bg-neutral-700"
                  href="#"
                >
               <IconMessage></IconMessage><span>0 comments</span>
                </a>
                
                <a
                  className="m-1 inline-flex items-center gap-1.5 py-1 px-3  text-sm text-white "
                  href="#"
                >
                <IconShare3></IconShare3><span>0 share</span>
                </a>
              </div>
            </div>
         
          </div>
        )
      })
    }
  </div>
  
</>

    </>
  )
}

export default Managepost