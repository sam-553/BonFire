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
      masterList.filter((post) =>
        post.caption.toLowerCase().includes(v.toLowerCase())
      )
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
    if (!confirm('Are you sure you want to delete this post?')) return
    try {
      const res = await axios.delete(`http://localhost:5000/post/delete/${id}`)
      if (res.status === 200) {
        fetchPost()
        toast.success('Post deleted successfully')
      } else {
        toast.error('Failed to delete post')
      }
    } catch (error) {
      toast.error('An error occurred while deleting the post.')
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

  const handleCommentInputChange = (e) => {
    setCommentInput(e.target.value)
  }

  const handleCommentSubmit = async (postId) => {
    if (!commentInput.trim()) return
    try {
      const res = await axios.post(`http://localhost:5000/post/comment/${postId}`, { comment: commentInput })
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

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' }
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', options)
  }

  useEffect(() => {
    fetchPost()
  }, [])

  useEffect(() => {
    if (selCommunity) {
      setPostList(
        masterList.filter((post) =>
          post.communityName.toLowerCase() === selCommunity.toLowerCase()
        )
      )
    }
  }, [selCommunity])

  return (
    <>
      {/* Search bar */}
      <div className="w-full max-w-2xl mx-auto mt-6 px-4">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full flex items-center p-2 shadow-sm">
          <IconSearch className="text-gray-400 ml-2" />
          <input
            type="text"
            onChange={filterPosts}
            placeholder="Search Posts..."
            className="flex-1 bg-transparent outline-none px-3 py-2 text-gray-900 dark:text-white placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Post list */}
      <div className="max-w-2xl mx-auto mt-6 px-4 space-y-6">
        {postList.map((post) => (
          <div
            key={post._id}
            className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow hover:shadow-lg transition-transform transform hover:scale-[1.02]"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-4">
              <div className="flex items-center gap-3">
                <img src="images/user1.jpeg" alt="user" className="h-10 w-10 rounded-full object-cover" />
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{post.postedby || 'Anonymous'}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{formatDate(post.createdAt)}</p>
                </div>
              </div>
              <button onClick={() => deletePost(post._id)} className="text-gray-500 hover:text-red-500 transition">
                <IconBackspace size={20} />
              </button>
            </div>

            {/* Caption */}
            <div className="px-4 pb-4">
              <p className="text-gray-800 dark:text-gray-100 mb-3">{post.caption}</p>
              {post.image && (
                <img
                  src={post.image}
                  alt="post"
                  className="w-full max-h-[400px] object-cover rounded-lg"
                />
              )}

              {/* Actions */}
              <div className="flex justify-between mt-4 text-sm text-gray-600 dark:text-gray-300">
                <button onClick={() => handleLike(post._id)} className="flex items-center gap-1 hover:text-pink-500">
                  <IconHeart size={18} />
                  <span>{post.likes || 0} likes</span>
                </button>
                <button onClick={() => setCommentingPostId(post._id)} className="flex items-center gap-1 hover:text-blue-500">
                  <IconMessage size={18} />
                  <span>{post.comments?.length || 0} comments</span>
                </button>
                <button onClick={() => handleShare(post._id)} className="flex items-center gap-1 hover:text-green-500">
                  <IconShare3 size={18} />
                  <span>{post.shares || 0} shares</span>
                </button>
              </div>

              {/* Comment Input */}
              {commentingPostId === post._id && (
                <div className="flex items-center gap-2 mt-4">
                  <img src="images/user1.jpeg" alt="user" className="h-8 w-8 rounded-full object-cover" />
                  <input
                    type="text"
                    value={commentInput}
                    onChange={handleCommentInputChange}
                    placeholder="Add a comment..."
                    className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md px-3 py-2 outline-none"
                  />
                  <button
                    onClick={() => handleCommentSubmit(post._id)}
                    className="px-3 py-2 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600"
                  >
                    Post
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Feed
