import { Sidebar } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { HiUser } from 'react-icons/hi'
import { PiSignOut } from 'react-icons/pi'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { signOutSuccess } from '../redux/users/userSlice'

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

    const dispatch = useDispatch()
    const handleSignOut = async () => {
        try {
            const res = await fetch('api/user/signout', {
                method: "POST"
            })
            const data = await res.json()
            if (!res.ok) {
                console.log(data.message)
            } else {
                dispatch(signOutSuccess())
            }
        } catch (err) {
            console.log(err.message)
        }
    }


  return (
    <Sidebar className='w-full md:w-56'>
        <Sidebar.Items>
            <Sidebar.ItemGroup>
                <Link to={'/dashboard?tab=profile'}>
                    <Sidebar.Item active={tab == 'profile'} icon={HiUser} 
                    label={'user'} labelColor='dark' as='div'>
                        Profile
                    </Sidebar.Item>
                </Link>
                <Sidebar.Item icon={PiSignOut} className='cursor-pointer'
                 onClick = {handleSignOut}> 
                    Sign Out
                </Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}

export default DashboardSidebar