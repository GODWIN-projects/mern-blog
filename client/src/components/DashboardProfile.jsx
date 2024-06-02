import { Button, TextInput } from 'flowbite-react'
import React from 'react'
import { useSelector } from 'react-redux'

const DashboardProfile = () => {
    
    const {currentUser} = useSelector(state => state.user)

  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
        <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
        <form className='flex flex-col gap-4'>
            <div className='w-32 h-32 self-center shadow-md rounded-full'>
                <img src={currentUser.photoURL} alt="user"
                className='rounded-full w-full h-full border-8 border-gray-300
                object-cover' />
            </div>
            <TextInput type='text' id='username' defaultValue={currentUser.username}/>
            <TextInput type='text' id='email' defaultValue={currentUser.email}/>
            <TextInput type='text' id='password' placeholder='password'/>
            <Button type='submit' gradientDuoTone={'tealToLime'} outline>
                Update
            </Button>
        </form>
        <div className=' text-red-500 flex justify-between mt-5'>
            <span className='cursor-pointer'>Delete Account</span>
            <span className='cursor-pointer'>Sign Out</span>
        </div>
    </div>
  )
}

export default DashboardProfile