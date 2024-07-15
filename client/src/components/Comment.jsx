import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { FaThumbsUp } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { Button, Textarea } from 'flowbite-react'

const Comment = ({comment, onlike, onEdit}) => {

    const [user, setUser] = useState({})
    const [isEditing, setIsEditing] = useState(false)
    const [editContent, setEditContent] = useState(comment.content)
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


    const handleSave = async() => {
        try {
            const res = await fetch(`/api/comment/editcomment/${comment._id}`,
                {
                    method: "PUT",
                    headers: {"Content-type": "application/json"},
                    body: JSON.stringify({content: editContent})
                })
            if (res.ok) {
                setIsEditing(false)
                onEdit(comment, editContent)
            }
        } catch(err) {
            console.log(err.message)
        }
    }


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
            {
                isEditing ? 
                (
                    <>
                        <Textarea
                            className='mb-2 resize-none'
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}/>
                        <div className='flex justify-end gap-2'>
                            <Button type='button' size={'sm'} gradientDuoTone={'tealToLime'}
                                onClick={handleSave}>
                                Save
                            </Button>
                            <Button  type='button' size={'sm'} gradientDuoTone={'tealToLime'} outline
                                onClick={() => setIsEditing(false)}>
                                Cancel
                            </Button>
                        </div>
                    </>
                ) :
                (
                    <>
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
                            {
                                currentUser && currentUser._id == comment.userId && 
                                (
                                    <button onClick={() => setIsEditing(true)}
                                        type='button'
                                        className='text-gray-400 hover:text-green-500 mx-1'>
                                        Edit
                                    </button>
                                )
                            }
                        </div>
                    </>
                )
            }
            
        </div>
    </div>
  )
}

export default Comment