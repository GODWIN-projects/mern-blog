import { Table } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Modal } from 'flowbite-react'
import { AiOutlineExclamationCircle } from 'react-icons/ai'
import { Button } from 'flowbite-react'
import { FaCheck, FaTimes } from 'react-icons/fa'

const DashboardUsers = () => {

  const currentUser = useSelector(state => state.user.currentUser)
  const [users, setUsers] = useState([])
  const [showMore, sestShowMore] = useState(true)
  const [showModel,setShowModel] = useState(false)
  const [userToDelete,setUserToDelete] = useState(null)
 

  useEffect( () => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/user/getusers`);
        console.log(currentUser._id)
        const data = await res.json()
        if (res.ok) {
          setUsers(data.users.slice(0,9))
          sestShowMore(data.show)
          }
      } catch (err) {
        console.log(err)
      }
    }
    fetchUsers()
  }, [currentUser._id])


  const handleShowMore = async () => {
    const startIndex = users.length
    try {
      const res = await fetch(`/api/user/getusers?&startIndex=${startIndex}`)
      const data = await res.json()
      if (res.ok) {
        setUsers((prev) => [...prev, ...data.posts.slice(0,9)])
        sestShowMore(data.show)
      }
    } catch (err) {
      console.log(err.message)
    }
  }

  const handleDelete = async () => {
    setShowModel(false)
    try {
      const res = await fetch(`api/user/delete/${userToDelete}`,
      {
        method: 'DELETE',
      })
      const data = await res.json()
      if (!res.ok) {
        console.log(data.message)
      } else {
        setUsers((prev) => 
          prev.filter((user) => user._id !== userToDelete))
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
        users.length > 0 ? (
          <>
            <Table hoverable className='shadow-md'>
              <Table.Head>
                <Table.HeadCell>Date Created</Table.HeadCell>
                <Table.HeadCell>User image</Table.HeadCell>
                <Table.HeadCell>Username</Table.HeadCell>
                <Table.HeadCell>E-mail</Table.HeadCell>
                <Table.HeadCell>Admin</Table.HeadCell>
                <Table.HeadCell>Delete</Table.HeadCell>
              </Table.Head>
              <Table.Body className='divide-y'>
                {
                  users.map((user,key) => {
                    return(
                      <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800' key={key}>
                        <Table.Cell>
                          {new Date(user.createdAt).toLocaleDateString()}
                        </Table.Cell>
                        <Table.Cell>
                            <div className='inline-block overflow-hidden rounded-3xl'>
                              <img 
                                src={user.photoURL} 
                                alt={user.title}
                                className='w-10 h-10 object-cover bg-gray-500
                                hover:scale-110 transition-all ease-in'/>
                            </div>
                        </Table.Cell>
                        <Table.Cell className='hover:underline font-medium
                          text-gray-500 dark:text-white'>
                            {user.username}
                        </Table.Cell>
                        <Table.Cell>
                            {user.email}
                        </Table.Cell>
                        <Table.Cell>
                          {user.isAdmin ? <FaCheck className='text-green-500'/> : <FaTimes className='text-red-500'/>}
                        </Table.Cell>
                        <Table.Cell>
                          <span className='font-medium text-red-500 hover:underline cursor-pointer'
                          onClick={() => {
                            setShowModel(true)
                            setUserToDelete(user._id)
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
        ) : <p>You have no posts yet!</p>
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
                                                setUserToDelete(null)
                                              }}
            popup size='md'>
                <Modal.Header/>
                <Modal.Body>
                    <div className="text-center">
                        <AiOutlineExclamationCircle 
                        className='h-14 w-14 text-gray-400
                         dark:text-gray-200 mb-4 mx-auto'/>
                        <h3 className='mb-5 text-gray-500 text-lg dark:text-gray-400'>
                            Are you sure you want to this user?
                        </h3>
                        <div className='flex justify-center gap-4'>
                            <Button color={'failure'} onClick={handleDelete}>
                               Yes, Delete
                            </Button>
                            <Button color='gray' onClick={() => {
                                                                setShowModel(false)
                                                                setUserToDelete(null)
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

export default DashboardUsers