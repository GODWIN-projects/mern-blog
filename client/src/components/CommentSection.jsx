import { Alert, Button, Textarea } from 'flowbite-react'
import { useEffect, useState } from 'react'
import {useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import SingleComment from './Comment.jsx'

const CommentSection = ({postId}) => {


    const {currentUser }= useSelector(state => state.user)
    const [comment, setComment] = useState("")
    const [commentErr,setCommentErr] = useState(null)
    const [postComments,setPostComments] = useState([])
    const navigate = useNavigate()


    useEffect(() => {
        const getComments = async (req, res, next) => {
            try{
                const res = await fetch(`/api/comment/getcomments/${postId}`)
                const data = await res.json()
                if (!res.ok) {
                    console.log(data.message)
                    return
                }
                setPostComments(data)
            } catch (err) {
                console.log(err)
            }
        }
        getComments()
    }, [postId])


    const handleSubmit = async (e) => {
        e.preventDefault()
        if (comment.length > 200) {
            return
        }
        try{
            setCommentErr(null)
            const res = await fetch("/api/comment/create", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify( {content: comment,
                                        postId,
                                    userId: currentUser._id})
            })
            const data = await res.json()
            if (res.ok) {
                setComment("")
                setCommentErr(null)
                setPostComments([data, ...postComments])
            } else {
                setCommentErr(data.message)
            }
        } catch (err) {
            setCommentErr(err.message)
        }
    }

    const handleLike = async (commentId) => {
        try{
            if (!currentUser) {
                navigate('/sign-in')
                return
            }
            const res = await fetch(`/api/comment/likecomment/${commentId}`, {
                method: "PUT",
            })
            
            if (res.ok) {
                const data = await res.json()
                setPostComments(postComments.map((comm) => {
                    return comm._id == commentId ? {
                        ...comm,
                        likes: data.likes,
                        numberOfLikes: data.numberOfLikes
                    } : comm
                })) 
                
            } else {
                console.log(data.message)
                return
            }
        } catch (err) {
            console.log(err.message)
        }
    }


    const handleEdit = async (comment, edited) => {
        setPostComments(postComments.map((comm) => {
            return  comm._id == comment._id ? {...comm, content: edited} : comm
        }))
    }


  return (
    <div className='mx-auto max-w-2xl w-full p-3'>
        {
            currentUser ? (
                <div className='flex items-center gap-1 my-5 text-gray-500 text-sm'>
                    <p>Signed in as</p>
                    <img className='h-5 w-5 object-cover rounded-3xl'
                        src={currentUser.photoURL} 
                        alt={currentUser.username} />
                    <Link to={'/dashboard?tab=profile'} className='text-xs text-teal-500
                        hover:underline'>
                        @{currentUser.username}
                    </Link>
                </div>
            ) : 
            (
                <div className='text-sm text-teal-600 my-5 flex gap-1'>
                    You must be signed in to add a comment.
                    <Link to={'/sign-in'} className='text-blue-500 hover:underline' >
                        Sign in
                    </Link>
                </div>
            )
        }
        {
            currentUser && (
                <form className='border border-teal-400 rounded-md p-3'
                    onSubmit={handleSubmit}>
                    <Textarea
                        placeholder='Add a comment...'
                        rows={3}
                        maxLength={200}
                        onChange={(e) => setComment(e.target.value)}
                        value={comment}/>
                    <div className='flex justify-between items-center mt-3 p-3'>
                        <p className='text-gray-500 text-sm'>
                            {200 - comment.length} characters remaining
                        </p>
                        <Button outline gradientDuoTone={"tealToLime"} type='submit'>
                            Submit
                        </Button>
                    </div>
                    {
                        commentErr && 
                        <Alert color={"failure"} className='mt-5'>
                            {commentErr}
                        </Alert>
                    }
                </form>
            )
        }
        {
            postComments.length == 0 ?
            (
                <p className='text-sm my-5'>
                    No comments yet. Be the firt one to comment
                </p>
            ) :
            (
                <>
                    <div className='flex gap-1 items-center my-5 text-sm'>
                        <p>Comments</p>
                        <span className=' border px-2 border-gray-400 rounded-sm py-[2px]'>
                            {postComments.length}
                        </span>
                    </div>
                    {
                        postComments.length > 0  && postComments.map((comment) => {
                            
                            return (
                                <SingleComment
                                    key={comment._id}
                                    comment={comment}
                                    onlike={handleLike}
                                    onEdit={handleEdit}/>
                            )
                        }) 
                    }
                </>
            )
        }
    </div>
  )
}

export default CommentSection