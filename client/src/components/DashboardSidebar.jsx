import { Sidebar } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { HiUser } from 'react-icons/hi'
import { PiSignOut } from 'react-icons/pi'
import { Link, useLocation } from 'react-router-dom'

const DashboardSidebar = () => {

    const path = useLocation()
    const [tab,setTab] = useState(null)
    useEffect(() => {
        const urlParams = new URLSearchParams(path.search)
        const URLtab = urlParams.get('tab')
        if (URLtab) {
        setTab(URLtab)
        }
    }, [path.search])

  return (
    <Sidebar className='w-full md:w-56'>
        <Sidebar.Items>
            <Sidebar.ItemGroup>
                <Link to={'/dashboard?tab=profile'}>
                    <Sidebar.Item active={tab == 'profile'} icon={HiUser} label={'user'} labelColor='dark'>
                        Profile
                    </Sidebar.Item>
                </Link>
                <Sidebar.Item icon={PiSignOut} classname='cursor-pointer'> 
                    Sign Out
                </Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}

export default DashboardSidebar