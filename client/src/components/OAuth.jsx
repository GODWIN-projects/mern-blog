import { Button } from 'flowbite-react'
import React from 'react'
import { AiFillGoogleCircle } from 'react-icons/ai'
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth'
import { app } from '../firebase'
import { useDispatch } from 'react-redux'
import { SigninStart, SigninFailure, SigninSuccess } from '../redux/users/userSlice'
import { Navigate, useNavigate } from 'react-router-dom'

const OAuth = () => {

    const auth = getAuth(app)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleGoogleClick = async () =>{
        dispatch(SigninStart())
        const provider = new GoogleAuthProvider()
        provider.setCustomParameters({
            prompt: 'select_account'
        })
        try {
            const result = await signInWithPopup(auth,provider)
            const res = await fetch('api/auth/google', {
                method: 'POST',
                headers : {'Content-Type': 'Application/json'},
                body : JSON.stringify(
                    {
                        name : result.user.displayName,
                        email : result.user.email,
                        photoURL : result.user.photoURL
                    }
                )
            })

            const data = await res.json()
            if (res.ok){
                dispatch(SigninSuccess(data))
                navigate('/')
            }
        } catch (err) {
            dispatch(SigninFailure(err.message))
        }
    }


  return (
    <Button type='button' gradientDuoTone='greenToBlue' outline 
    onClick={handleGoogleClick}>
        <AiFillGoogleCircle className='w-6 h-6 mr-2'/>
        Continue with Google
    </Button>
  )
}

export default OAuth