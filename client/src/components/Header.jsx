import { Avatar, Button, Dropdown, DropdownHeader, DropdownItem, Navbar, TextInput } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {AiOutlineSearch} from 'react-icons/ai'
import {FaMoon, FaSun} from 'react-icons/fa'
import { useSelector,useDispatch } from 'react-redux'
import { toggleTheme } from '../redux/theme/themeSlice'
import { signOutSuccess } from '../redux/users/userSlice'

const Header = () => {
    const path = useLocation().pathname
    const { currentUser } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    const [searchTerm, setSearchTerm] = useState('')
    const {theme} = useSelector(state => state.theme)

    useEffect(()=> {
        const uRLParams = new URLSearchParams(location.search)
        const searchTermURL = uRLParams.get('searchTerm')
        if (searchTermURL) {
            setSearchTerm(searchTermURL)
        }
    }, [location.search])

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


    const handleSubmit = (e) => {
        e.preventDefault()
        const uRLParams = new URLSearchParams(location.search)
        uRLParams.set('searchTerm',searchTerm)
        const searchQuery = uRLParams.toString()
        console.log(uRLParams)
        console.log(location)
        navigate(`/search?${searchQuery}`)
    }



  return (
    <Navbar className=' border-b-2'>
        <Link to="/" className=' self-center whitespace-nowrap
         text-sm sm:text-xl font-semibold dark:text-white'>
            <span className=' px-2 py-1 bg-gradient-to-r
            from-teal-300 to-lime-200 rounded-lg text-gray-700'>FIRST</span>
            Blog
        </Link>
        <form onSubmit={handleSubmit}>
            <TextInput
                type='text'
                placeholder='Search..'
                rightIcon={AiOutlineSearch}
                className=' hidden lg:inline'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </form>
        <Button className='w-12 lg:hidden focus:ring-0' color="gray" pill>
            <AiOutlineSearch/>
        </Button>
        <div className='flex gap-2 md:order-2'> 
            <Button className='w-12 hidden sm:inline focus:ring-0' color="gray" pill
                onClick={() => dispatch(toggleTheme())}>
                {theme == 'light' ? <FaMoon /> : <FaSun/> }
            </Button>
            { currentUser? (
                <Dropdown
                    arrowIcon={false}
                    inline
                    label= {
                        <Avatar
                            alt='user'
                            img={currentUser.photoURL}
                            rounded/>
                    }>
                        <DropdownHeader>
                            <span className='block text-sm'>{currentUser.username}</span>
                            <span className='block text-sm font-medium truncate'>{currentUser.email} </span>
                        </DropdownHeader>
                        <Link to='/dashboard?tab=profile'>
                            <Dropdown.Item>Profile</Dropdown.Item>
                        </Link>
                        <Dropdown.Divider/>
                        <Dropdown.Item onClick={handleSignOut}>Sign Out</Dropdown.Item>
                </Dropdown>
            ):
            (
            <Link to='/sign-in'>
                <Button className='focus:ring-0' outline gradientDuoTone='tealToLime'>
                    Sign in
                </Button>
            </Link>
            )
            }
            <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
            <Navbar.Link active={path=='/'} as={'div'}>
                <Link to='/'>
                    Home
                </Link>
            </Navbar.Link>
            <Navbar.Link active={path=='/about'} as={'div'}>
                <Link to='/about'>
                    About
                </Link>
            </Navbar.Link>
            <Navbar.Link active={path=='/projects'} as={'div'}>
                <Link to='/projects'>
                    Projects
                </Link>
            </Navbar.Link>
        </Navbar.Collapse>
    </Navbar>
  )
}

export default Header