import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PostCard from '../components/PostCard'

const Home = () => {

  const [posts,setPosts] = useState([])


  useEffect(() => {
    const fetchposts = async () => {
      try {
        const res = await fetch('/api/post/getposts')
        console.log(res)
        const data = await res.json()
        if (res.ok) {
          setPosts(data.posts.slice(0,9))
        }
      } catch (err) {
        console.log(err)
      }
    }
    fetchposts()
  },[])


  return (
    <div >
      <div className='flex flex-col px-3 p-28 max-w-6xl mx-auto mt-28'>
        <h1 className='text-3xl lg:text-6xl font-bold'>
          WELCOME TO <span className=' px-2 py-1 bg-gradient-to-r
            from-teal-300 to-lime-200 rounded-lg text-gray-700'>FIRST</span>
            Blog
        </h1>
        <p className='text-xs text-gray-500 sm:text-sm'>
          Created by GODWIN K 
        </p>
        <Link to={'/search'} className='text-xs sm:text-sm text-blue-600
          font-semibold hover:underline mt-6'>
          view all posts
        </Link>
      </div>
      <div className='flex flex-col gap-8 py-7 max-w-6xl mx-auto p-3 mt-36'>
        <div className='flex flex-col gap-6'>
          <h2 className='text-2xl font-semibold text-center'>
            RECENT POSTS
          </h2>
          <div className='flex flex-wrap gap-4 mx-auto justify-center'>
            {
              posts && posts.map((post) => {
                return <PostCard key={post._id} post={post}/>
              })
            }
          </div>
          <Link to={'/search'} className='text-xs sm:text-sm text-blue-600
          font-semibold hover:underline mt-6 text-center'>
          view all posts
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home