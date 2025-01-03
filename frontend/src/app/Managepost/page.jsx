
'use client'
import { IconBackspace, IconHeart, IconMessage, IconSearch, IconShare3 } from '@tabler/icons-react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const Feed = ({ selCommunity }) => {
  const [postList, setPostList] = useState([])
  const [masterList, setMasterList] = useState([])

  const [commentInput, setCommentInput] = useState('')
  const [commentingPostId, setCommentingPostId] = useState(null)
  

  const filterPosts = (e) => {
    const v = e.target.value
    setPostList(
      masterList.filter((post) => post.caption.toLowerCase().includes(v.toLowerCase()))
    )
  }


  const fetchPost = async () => {
    try {
      const res = await axios.get('http://localhost:5000/post/getall')
      setPostList(res.data)
      setMasterList(res.data)
    } catch (error) {
      toast.error('Failed to fetch posts. Please try again later.')
    }
  }
    const deletePost = async (id) => {
          if (!confirm('Are you sure you want to delete this post?')) return;
          try {
            const res = await axios.delete(`http://localhost:5000/post/delete/${id}`)
            if (res.status === 200) {
              fetchPost()
              toast.success('Post deleted successfully');
            } else {
              toast.error('Failed to delete post');
            }
          } catch (error) {
            toast.error('An error occurred while deleting the post.');
          }
        }
  
  

  const handleLike = async (postId) => {
    try {
      const res = await axios.post(`http://localhost:5000/post/like/${postId}`)
      if (res.status === 200) {
        setPostList(prevPosts =>
          prevPosts.map(post =>
            post._id === postId ? { ...post, likes: (post.likes || 0) + 1 } : post
          )
        )
      }
    } catch (error) {
      toast.error('Failed to like the post.')
    }
  }


  const handleShare = async (postId) => {
    try {
      const postToShare = postList.find(post => post._id === postId)
      if (!postToShare) throw new Error('Post not found')

      if (navigator.share) {
        await navigator.share({
          title: postToShare.caption,
          text: postToShare.content,
          url: `${window.location.origin}/post/${postId}`,
        })

        const res = await axios.post(`http://localhost:5000/post/share/${postId}`)
        setPostList(prevPosts =>
          prevPosts.map(post =>
            post._id === postId ? { ...post, shares: res.data.shares } : post
          )
        )
        toast.success('Post shared successfully!')
      } else {
        toast.error('Sharing is not supported on this browser.')
      }
    } catch (error) {
      toast.error('Failed to share the post.')
    }
  }
  useEffect(() => {
    fetchPost()
  }, [])


  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' }
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', options)
  }


  const handleCommentInputChange = (e) => {
    setCommentInput(e.target.value)
  }


  const handleCommentSubmit = async (postId) => {
    if (!commentInput.trim()) return

    try {
      const res = await axios.post(`http://localhost:5000/post/comment/${postId}`)

      if (res.status === 200) {
        setPostList(prevPosts =>
          prevPosts.map(post =>
            post._id === postId ? { ...post, comments: [...post.comments, res.data.comment] } : post
          )
        )
        setCommentInput('')
        setCommentingPostId(null)
        toast.success('Comment added!')
      }
    } catch (error) {
      toast.error('Failed to add comment.')
    }
  }
  

  useEffect(() => {
    if (selCommunity) {
      setPostList(
        masterList.filter((post) => post.communityName.toLowerCase() === selCommunity.toLowerCase())
      )
    }
  }, [selCommunity])
  

  return (
    < >

      <div className="lg:w-[700px] md:w-[300px]  bg-white dark:bg-gray-800 border mt-8 rounded-lg shadow dark:border-gray-700 border-gray-100 sticky top-10 z-10 mx-auto">
        <div className="flex-1 min-w-0">
          <form className="flex flex-col sm:flex-row items-center gap-4 p-4">
            <div className="hidden sm:block flex-1 max-w-100% bg-gray-200 dark:bg-gray-700 rounded-full p-2 transition-all duration-300 ease-in-out focus-within:ring-2 focus-within:ring-blue-500 dark:focus-within:ring-blue-500">
              <div className="flex items-center gap-2">
                <IconSearch className="text-gray-400 dark:text-gray-200" />
                <input
                  type="text"
                  onChange={filterPosts}
                  placeholder="Search Communities"
                  className="w-full bg-transparent text-gray-900 dark:text-white focus:outline-none placeholder:text-gray-500 dark:placeholder:text-gray-300"
                />
              </div>
            </div>
          </form>
        </div>
      </div>


      <div className="max-w-3xl  pt-6 lg:pt-5 pb-12 sm:px-6 lg:px-16 mx-auto ">
        {postList.map((post) => (
          <div
            key={post._id}
            className="max-w-2xl bg-white dark:bg-gray-800 rounded-lg overflow-hidden mb-6 shadow-lg transition-transform transform hover:scale-105"
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
              <span
                className="text-2xl text-black dark:text-white cursor-pointer hover:text-red-500"
                onClick={() =>deletePost(post._id)}
              >
                <IconBackspace />
              </span>
            </div>


            <div className="space-y-4 px-4 pb-4">
              <p className="text-lg text-black dark:text-neutral-200">{post.caption}</p>

              <img className="w-full h-80 object-cover rounded-xl mb-4" src={post.image} alt="post" />


              <div className="flex justify-between text-black dark:text-white text-sm">
                <a
                  className="flex items-center gap-2 cursor-pointer hover:text-pink-500"
                  onClick={() => handleLike(post._id)}
                >
                  <IconHeart />
                  <span>{post.likes || 0} likes</span>
                </a>

                <a
                  className="flex items-center gap-2 cursor-pointer hover:text-blue-500"
                  onClick={() => setCommentingPostId(post._id)} on click
                >
                  <IconMessage />
                  <span>{post.comments?.length || 0} comments</span>
                </a>

                <a
                  className="flex items-center gap-2 cursor-pointer hover:text-green-500"
                  onClick={() => handleShare(post._id)}
                >
                  <IconShare3 />
                  <span>{post.shares || 0} shares</span>
                </a>
              </div>


              {commentingPostId === post._id && (
                <div className="mt-4 flex gap-2 items-center">
                  <img className="h-8 w-8 rounded-full" src="images/user1.jpeg" alt="user" />
                  <input
                    type="text"
                    value={commentInput}
                    onChange={handleCommentInputChange}
                    placeholder="Add a comment..."
                    className="w-full bg-gray-100 dark:bg-gray-700 rounded-md p-2 text-gray-800 dark:text-white"
                  />
                  <button
                    onClick={() => handleCommentSubmit(post._id)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                  >
                    Post
                  </button>
                </div>
              )}

              {/* Display Comments */}

             

              





            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Feed

