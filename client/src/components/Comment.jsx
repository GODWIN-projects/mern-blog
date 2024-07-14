import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { FaThumbsUp } from 'react-icons/fa'
import { useSelector } from 'react-redux'

const Comment = ({comment, onlike}) => {

    const [user, setUser] = useState({})
    const {currentUser} = useSelector(state => state.user)

    useEffect(() => {
        const getuser = async () => {
            const res = await fetch(`/api/user/${comment.userId}`)
            const data = await res.json()
            if (!res.ok) {
                console.log(data.message)
                return
            } 
            setUser(data)
            console.log(currentUser._id)
        }
        getuser()
    }, [comment])

  return (
    <div className='flex p-4 border-b dark:border-gray-600 text-sm'>
        <div className='flex-shrink-0 mr-3'>
            <img className='object-cover w-10 h-10 rounded-full bg-gray-200'
                src={user.photoURL}
                alt={user.username} />
        </div>
        <div className='flex-1'>
            <div className='flex items-center mb-1'>
                <span className='font-bold mr-1 text-xs truncate'>
                    {user ? `@${user.username}` : "anonynous user" }
                </span>
                <span className='text-gray-500 text-xs'>
                    {moment(comment.createdAt).fromNow()}
                </span>
            </div>
            <p className='text-gray-500 pb-2'> 
                {comment.content}
            </p>
            <div className='flex items-center text-xs gap-1'>
                <button type='button' onClick={() => onlike(comment._id)}
                    className={`text-gray-400 hover:text-blue-500 
                    ${currentUser && comment.likes.includes(currentUser._id) && '!text-blue-500'}`}>
                    <FaThumbsUp className='text-sm'/>
                </button>
                <p className='text-gray-500'>
                    {
                        comment.numberOfLikes > 0 && 
                        comment.numberOfLikes 
                    }
                </p>
            </div>
        </div>
    </div>
  )
}

export default Comment