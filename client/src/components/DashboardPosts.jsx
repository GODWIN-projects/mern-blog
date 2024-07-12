import { Table } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Modal } from 'flowbite-react'
import { AiOutlineExclamationCircle } from 'react-icons/ai'
import { Button } from 'flowbite-react'

const DashboardPosts = () => {

  const currentUser = useSelector(state => state.user.currentUser)
  const [userPosts, setUserPosts] = useState([])
  const [showMore, sestShowMore] = useState(true)
  const [showModel,setShowModel] = useState(false)
  const [postToDelete,setPostToDelete] = useState(null)
 

  useEffect( () => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
        console.log(currentUser._id)
        const data = await res.json()
        if (res.ok) {
          setUserPosts(data.posts.slice(0,9))
          sestShowMore(data.show)
          }
      } catch (err) {
        console.log(err)
      }
    }
    fetchPosts()
  }, [currentUser._id])


  const handleShowMore = async () => {
    const startIndex = userPosts.length
    try {
      const res = await fetch(`/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`)
      const data = await res.json()
      if (res.ok) {
        setUserPosts((prev) => [...prev, ...data.posts.slice(0,9)])
        sestShowMore(data.show)
      }
    } catch (err) {
      console.log(err.message)
    }
  }

  const handleDelete = async () => {
    setShowModel(false)
    try {
      const res = await fetch(`api/post/deletepost/${postToDelete}/${currentUser._id}`,
      {
        method: 'DELETE',
      })
      const data = await res.json()
      if (!res.ok) {
        console.log(data.message)
      } else {
        setUserPosts((prev) => 
          prev.filter((post) => post._id !== postToDelete))
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
        userPosts.length > 0 ? (
          <>
            <Table hoverable className='shadow-md'>
              <Table.Head>
                <Table.HeadCell>Date updated</Table.HeadCell>
                <Table.HeadCell>Post image</Table.HeadCell>
                <Table.HeadCell>Post title</Table.HeadCell>
                <Table.HeadCell>Category</Table.HeadCell>
                <Table.HeadCell>Delete</Table.HeadCell>
                <Table.HeadCell>
                  <span>Edit</span>
                </Table.HeadCell>
              </Table.Head>
              <Table.Body className='divide-y'>
                {
                  userPosts.map((post,key) => {
                    return(
                      <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800' key={key}>
                        <Table.Cell>
                          {new Date(post.updatedAt).toLocaleDateString()}
                        </Table.Cell>
                        <Table.Cell>
                          <Link to={`/post/${post.slug}`}>
                            <div className='inline-block overflow-hidden rounded-md'>
                              <img 
                                src={post.image} 
                                alt={post.title}
                                className='w-20 h-20 object-cover bg-gray-500
                                hover:scale-110 transition-all ease-in'/>
                            </div>
                          </Link>
                        </Table.Cell>
                        <Table.Cell>
                          <Link to={`/post/${post.slug}`} className='hover:underline font-medium
                          text-gray-500 dark:text-white'>
                            {post.title}
                          </Link>
                        </Table.Cell>
                        <Table.Cell>
                          {post.category}
                        </Table.Cell>
                        <Table.Cell>
                          <span className='font-medium text-red-500 hover:underline cursor-pointer'
                          onClick={() => {
                            setShowModel(true)
                            setPostToDelete(post._id)
                          }}>
                            Delete
                          </span>
                        </Table.Cell>
                        <Table.Cell >
                          <Link to={`/updatepost/${post._id}`}>
                            <span className='text-teal-500 hover:underline'>Edit</span>
                          </Link>
                        </Table.Cell>
                      </Table.Row>
                    )
                  })
                }
              </Table.Body>
            </Table>
          </>
        ) : <p>No Users yet!</p>
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
                                                setPostToDelete(null)
                                              }}
            popup size='md'>
                <Modal.Header/>
                <Modal.Body>
                    <div className="text-center">
                        <AiOutlineExclamationCircle 
                        className='h-14 w-14 text-gray-400
                         dark:text-gray-200 mb-4 mx-auto'/>
                        <h3 className='mb-5 text-gray-500 text-lg dark:text-gray-400'>
                            Are you sure you want to this post?
                        </h3>
                        <div className='flex justify-center gap-4'>
                            <Button color={'failure'} onClick={handleDelete}>
                               Yes, Delete
                            </Button>
                            <Button color='gray' onClick={() => {
                                                                setShowModel(false)
                                                                setPostToDelete(null)
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

export default DashboardPosts