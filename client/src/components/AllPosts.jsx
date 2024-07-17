import React from 'react'
import { useSelector } from 'react-redux'
import DashboardPosts from './DashboardPosts'

const AllPosts = () => {

    const {currentUser} = useSelector(state => state.user) 
    const users = "all"

  return (
    <>
        {
            currentUser.isAdmin && <DashboardPosts user={users}/>
        }
    </>
  )
}

export default AllPosts