import { Table } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Modal } from 'flowbite-react'
import { AiOutlineExclamationCircle } from 'react-icons/ai'
import { Button } from 'flowbite-react'

const DashboardComments = () => {

  const currentUser = useSelector(state => state.user.currentUser)
  const [comments, setComments] = useState([])
  const [showMore, sestShowMore] = useState(true)
  const [showModel,setShowModel] = useState(false)
  const [commentToDelete,setCommentToDelete] = useState(null)
 

  useEffect( () => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comment/getAllComments`);
        const data = await res.json()
        if (res.ok) {
          setComments(data.Comments.slice(0,9))
          sestShowMore(data.show)
          }
      } catch (err) {
        console.log(err)
      }
    }
    fetchComments()
  }, [currentUser._id])


  const handleShowMore = async () => {
    const startIndex = comments.length
    try {
      const res = await fetch(`/api/comment/getAllComments?&startIndex=${startIndex}`)
      const data = await res.json()
      if (res.ok) {
        setComments((prev) => [...prev, ...data.Comments.slice(0,9)])
        sestShowMore(data.show)
      }
    } catch (err) {
      console.log(err.message)
    }
  }

  const handleDelete = async () => {
    setShowModel(false)
    try {
      const res = await fetch(`api/comment/delete/${commentToDelete}`,
      {
        method: 'DELETE',
      })
      const data = await res.json()
      if (!res.ok) {
        console.log(data.message)
      } else {
        setComments((prev) => 
          prev.filter((comment) => comment._id !== commentToDelete))
      }

    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar
    scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700
     dark:scrollbar-thumb-slate-500'>
      {
        comments.length > 0 ? (
          <>
            <Table hoverable className='shadow-md'>
              <Table.Head>
                <Table.HeadCell>Date Updated</Table.HeadCell>
                <Table.HeadCell>Comment content</Table.HeadCell>
                <Table.HeadCell>Number of likes</Table.HeadCell>
                <Table.HeadCell>Post-Id</Table.HeadCell>
                <Table.HeadCell>UserId</Table.HeadCell>
                <Table.HeadCell>Delete</Table.HeadCell>
              </Table.Head>
              <Table.Body className='divide-y'>
                {
                  comments.map((comment) => {
                    return(
                      <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800' key={comment._id}>
                        <Table.Cell>
                          {new Date(comment.updatedAt).toLocaleDateString()}
                        </Table.Cell>
                        <Table.Cell>
                            {comment.content}
                        </Table.Cell>
                        <Table.Cell className='hover:underline font-medium
                          text-gray-500 dark:text-white'>
                            {comment.numberOfLikes}
                        </Table.Cell>
                        <Table.Cell>
                            {comment.postId}
                        </Table.Cell>
                        <Table.Cell>
                          {comment.userId}
                        </Table.Cell>
                        <Table.Cell>
                          <span className='font-medium text-red-500 hover:underline cursor-pointer'
                          onClick={() => {
                            setShowModel(true)
                            setCommentToDelete(comment._id)
                          }}>
                            Delete
                          </span>
                        </Table.Cell>
                      </Table.Row>
                    )
                  })
                }
              </Table.Body>
            </Table>
          </>
        ) : <p>You have no comments yet!</p>
      }
      { 
        showMore &&
        <button className=' self-center w-full text-blue-500 py-7' onClick={handleShowMore}>
          show more
        </button>
      }
      {
        showModel &&
        <Modal show={showModel} onClose={() => {
                                                setShowModel(false)
                                                setCommentToDelete(null)
                                              }}
            popup size='md'>
                <Modal.Header/>
                <Modal.Body>
                    <div className="text-center">
                        <AiOutlineExclamationCircle 
                        className='h-14 w-14 text-gray-400
                         dark:text-gray-200 mb-4 mx-auto'/>
                        <h3 className='mb-5 text-gray-500 text-lg dark:text-gray-400'>
                            Are you sure you want to this comment?
                        </h3>
                        <div className='flex justify-center gap-4'>
                            <Button color={'failure'} onClick={handleDelete}>
                               Yes, Delete
                            </Button>
                            <Button color='gray' onClick={() => {
                                                                setShowModel(false)
                                                                setCommentToDelete(null)
                                                                }}>
                                No, Cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
        </Modal>
      }
    </div>
  )
}

export default DashboardComments