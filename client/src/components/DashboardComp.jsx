import React, { useEffect, useState } from 'react'
import {useSelector } from 'react-redux'
import {HiAnnotation, HiArrowNarrowUp, HiDocumentText, HiOutlineUserGroup} from 'react-icons/hi'
import {Link} from 'react-router-dom'
import {Button, Table, TableBody, TableHead} from 'flowbite-react'

const DashboardComp = () => {


  const [users, setUsers] = useState({})
  const [comments,setComments] = useState({})
  const [posts,setPosts] = useState({})


  const {currentUser} = useSelector(state => state.user)


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/user/getusers?limit=5")
        const data = await res.json()
        if (res.ok) {
          setUsers(data)
        }

      } catch (err) {
        console.log(err.message)
      }
    }
    const fetchPosts = async () => {
      try{
        const res = await fetch("/api/post/getposts?limit=5")
        const data = await res.json()
        if (res.ok) {
          setPosts(data)
        }
      } catch(err) {
        console.log(err.message)
      }
    }
    const fetchComments = async () => {
      try {
        const res = await fetch("/api/comment/getallcomments?limit=5")
        const data = await res.json()
        if (res.ok) {
          setComments(data)
        }
      } catch(err) {
        console.log(err.message)
      }
    }

    if (currentUser.isAdmin) {
      fetchComments()
      fetchPosts()
      fetchUsers()
      console.log(users)
    }
  }, [currentUser])


  return (
    <div>
      {/* top */}
      <div className='w-full'>
        <div className='flex flex-wrap gap-4 justify-center mx-auto p-5 w-full'>
          <div className='flex flex-col gap-6 shadow-lg w-full rounded-md p-3 border
            dark:border-gray-800 border-gray-400 md:w-96'>
            <div className='flex justify-between'>
              <div>
                <h3 className='text-gray-500 text-lg'>
                  TOTAL USERS
                </h3>
                <span className='font-semibold text-3xl'>
                  {users.totalUsers}
                </span>
              </div>
              <HiOutlineUserGroup className=' bg-teal-600 w-12 h-12 p-3 rounded-full text-white'/>
            </div>
            <div className='flex flex-row gap-1 items-center'>
              <HiArrowNarrowUp className='text-green-400'/>
              <span>{users.lastMonthUsers}</span>
              <span className='mx-2 text-sm text-gray-500'>
                Last Month
              </span>
            </div>
          </div>
          <div className='flex flex-col gap-6 shadow-lg w-full rounded-md p-3 border
            dark:border-gray-800 border-gray-400 md:w-96'>
            <div className='flex justify-between'>
              <div>
                <h3 className='text-gray-500 text-lg'>
                  TOTAL POSTS
                </h3>
                <span className='font-semibold text-3xl'>
                  {posts.totalPosts}
                </span>
              </div>
              <HiDocumentText className=' bg-yellow-600 w-12 h-12 p-3 rounded-full text-white'/>
            </div>
            <div className='flex flex-row gap-1 items-center'>
              <HiArrowNarrowUp className='text-green-400'/>
              <span>{posts.lastMonthPosts}</span>
              <span className='mx-2 text-sm text-gray-500'>
                Last Month
              </span>
            </div>
          </div>
          <div className='flex flex-col gap-6 shadow-lg w-full rounded-md p-3 border
            dark:border-gray-800 border-gray-400 md:w-96'>
            <div className='flex justify-between'>
              <div>
                <h3 className='text-gray-500 text-lg'>
                  TOTAL COMMENTS
                </h3>
                <span className='font-semibold text-3xl'>
                  {comments.totalComments}
                </span>
              </div>
              <HiAnnotation className=' bg-purple-600 w-12 h-12 p-3 rounded-full text-white'/>
            </div>
            <div className='flex flex-row gap-1 items-center'>
              <HiArrowNarrowUp className='text-green-400'/>
              <span>{comments.lastMonthComments}</span>
              <span className='mx-2 text-sm text-gray-500'>
                Last Month
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* tables */}
      <div className='flex flex-wrap p-5 mx-auto justify-center mb-3 gap-4'>
        <div className='md:w-[500px] border border-gray-400 dark:border-gray-800
          rounded-lg shadow-lg p-2'>
          <div className='flex items-center justify-between p-1 w-full mx-1'>
            <p className='font-bold text-lg'>
              Recent Users
            </p>
            <Link to={'/dashboard?tab=users'} as='div'>
              <Button outline gradientDuoTone={'tealToLime'} className='focus:ring-0 mx-1'>
                See all
              </Button>
            </Link>
          </div>
          <div className='w-full'>
            <Table>
              <Table.Head>
                <Table.HeadCell>
                  USER IMAGE
                </Table.HeadCell>
                <Table.HeadCell>
                  USERNAME
                </Table.HeadCell>
              </Table.Head>
              <Table.Body>
                {
                  users.users && 
                  users.users.map((user) => {
                    return (<Table.Row>
                      <Table.Cell>
                        <img className='w-12 h-12 rounded-full object-cover
                          bg-slate-600'
                          src={user.photoURL} 
                          alt={user.username} />
                      </Table.Cell>
                      <Table.Cell>
                        {user.username}
                      </Table.Cell>
                    </Table.Row>)
                  })
                }
              </Table.Body>
            </Table>
          </div>
        </div>
        <div className='md:w-[500px] border border-gray-400 dark:border-gray-800
          rounded-lg shadow-lg p-2'>
          <div className='flex items-center justify-between p-2 w-full'>
            <p className='font-bold text-lg'>
              Recent Posts
            </p>
            <Link to={'/dashboard?tab=allposts'} as='div'>
              <Button outline gradientDuoTone={'tealToLime'} className='focus:ring-0 mx-1'>
                See all
              </Button>
            </Link>
          </div>
          <div className='w-full'>
            <Table>
              <Table.Head>
                <Table.HeadCell>
                  POST IMAGE
                </Table.HeadCell>
                <Table.HeadCell>
                  POST TITLE
                </Table.HeadCell>
                <Table.HeadCell>
                  CATEGORY
                </Table.HeadCell>
              </Table.Head>
              <Table.Body>
                {
                  posts.posts && 
                  posts.posts.map((post) => {
                    return (<Table.Row>
                      <Table.Cell>
                        <img className='w-12 h-12 rounded-full object-cover
                          bg-slate-600'
                          src={post.image} 
                          alt={post.title} />
                      </Table.Cell>
                      <Table.Cell>
                        {post.title}
                      </Table.Cell>
                      <Table.Cell>
                        {post.category}
                      </Table.Cell>
                    </Table.Row>)
                  })
                }
              </Table.Body>
            </Table>
          </div>
        </div>
        <div className='md:w-[500px] border border-gray-400 dark:border-gray-800
          rounded-lg shadow-lg p-2'>
          <div className='flex items-center justify-between p-2 w-full'>
            <p className='font-bold text-lg'>
              Recent Comments
            </p>
            <Link to={'/dashboard?tab=comments'} as='div'>
              <Button outline gradientDuoTone={'tealToLime'} className='focus:ring-0 mx-1'>
                See all
              </Button>
            </Link>
          </div>
          <div className='w-full'>
            <Table>
              <Table.Head>
                <Table.HeadCell>
                  COMMENT
                </Table.HeadCell>
                <Table.HeadCell>
                  LIKES
                </Table.HeadCell>
              </Table.Head>
              <Table.Body>
                {
                  comments.Comments && 
                  comments.Comments.map((comment) => {
                    return (<Table.Row>
                      <Table.Cell>
                        {comment.content}
                      </Table.Cell>
                      <Table.Cell>
                        {comment.numberOfLikes}
                      </Table.Cell>
                    </Table.Row>)
                  })
                }
              </Table.Body>
            </Table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardComp