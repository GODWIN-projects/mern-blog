import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import DashboardSidebar from "../components/DashboardSidebar"
import DashboardProfile from "../components/DashboardProfile"
import DashboardPosts from "../components/DashboardPosts"
import { useSelector } from "react-redux"
import DashboardUsers from "../components/DashboardUsers"
import DashboardComments from "../components/DashboardComments"

const Dashboard = () => {

  const path = useLocation()
  const [tab,setTab] = useState(null)
  const currentUser = useSelector(state => state.user.currentUser)

  useEffect(() => {
    const urlParams = new URLSearchParams(path.search)
    const URLtab = urlParams.get('tab')
    if (URLtab) {
      setTab(URLtab)
    }
  }, [path.search])

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        {/* {left-sidebar} */}
        <DashboardSidebar/>
      </div>
        {/* right */}
        {
          tab == 'profile' && <DashboardProfile/>
        } 
        {
          tab == 'posts' && <DashboardPosts/>
        }
        {
          currentUser.isAdmin && tab == 'users' && <DashboardUsers/>
        }
        {
          currentUser.isAdmin && tab == 'comments' && <DashboardComments/>
        }
    </div>
  )
}

export default Dashboard