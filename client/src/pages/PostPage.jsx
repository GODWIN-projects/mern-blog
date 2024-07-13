import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {Button, Spinner} from 'flowbite-react'
import CommentSection from '../components/CommentSection'

const PostPage = () => {

    const { postSlug } = useParams()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [post,setPost] = useState(null)

    useEffect(() => {
        const fetchPost = async() => {
            try{
                setError(false)
                setLoading(true)
                const res = await fetch(`/api/post/getposts?slug=${postSlug}`)
                const data = await res.json()
                if (!res.ok) {
                    setLoading(false)
                    setError(data.message)
                    return
                } else {
                    setPost(data.posts[0])
                    setLoading(false)
                    setError(null)
                }
            } catch (err) {
                setError(err.message)
                setLoading(false)
            }
        }
        fetchPost()
    }, [postSlug])



  if (loading) return (
    <div className='flex justify-center items-center
     min-h-screen'>
        <Spinner size={'xl'}/>
    </div>
  )  
  return (
    <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
        <h1 className='text-3xl mt-10 p-3 self-center font-serif max-w-3xl mx-auto
        lg:text-4xl'>
            { post.title}
        </h1>
        <Link to={`/search?categoru=${post.category}`} className='self-center mt-5'>
            <Button pill color={"gray"} size={"xs"}>
                {post.category}
            </Button>
        </Link>
        <img className='mt-10 p-3 max-h-[600px] w-full object-cover mx-auto max-w-3xl'
            src={post.image} 
            alt={post.title} />
        <span className='p-3 border-b border-slate-500 text-xs w-full mx-auto max-w-3xl'>
            {new Date(post.createdAt).toLocaleDateString()}
        </span>
        <div dangerouslySetInnerHTML={{__html: post.content}}
            className='mt-10 p-3 bg-teal-50 dark:bg-slate-800 post-content mx-auto max-w-3xl w-full'>

        </div>
        <CommentSection postId={post._id}/>
    </main>
  )
}

export default PostPage