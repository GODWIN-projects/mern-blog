import { Alert, Button, TextInput, Spinner, Modal } from 'flowbite-react'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { updateStart,updateFailure,updateSuccess,deleteUserFailure,deleteUserStart,deleteUserSuccess,signOutSuccess } from '../redux/users/userSlice'
import { AiOutlineExclamationCircle } from "react-icons/ai"


const DashboardProfile = () => {
    
    const {currentUser, loading, error} = useSelector(state => state.user)

    const [imageFile,setimageFile] = useState(null)
    const [imageURL,setImageURL] = useState(null)
    const [imageUploadProgress, setImageUploadProgress] = useState(null)
    const [imageUploadError,setImageUploadError] =useState(null)
    const  [formData,setFormData] = useState({})
    const [imageUploading,setImageUploading] = useState(false)
    const [updateUserSuccess,setUpdateUserSuccess] = useState(null)
    const [showModelDel,setShowModelDel] = useState(false)
    const filePicker = useRef()
    const dispatch = useDispatch()

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setimageFile(file)
            setImageURL(URL.createObjectURL(file))
            
        }
    }
    useEffect(() => {
        if (imageFile) {
            uploadImage()
        }
    }, [imageFile] )

    const uploadImage = async () => {
        setImageUploadError(null)
        setImageUploading(true)
        const storage = getStorage(app)
        const filename = new Date().getTime() + imageFile.name
        const storageRef = ref(storage,filename)
        const uploadTask = uploadBytesResumable(storageRef,imageFile)
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = (snapshot.bytesTransferred/snapshot.totalBytes) * 100
                setImageUploadProgress(progress.toFixed(0))
            },
            (error) => {
                setImageUploadError("Please select an image file less than 2MB")
                setImageUploadProgress(null)
                setImageURL(null)
                setimageFile(null)
                setImageUploading(false)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>{
                    setImageURL(downloadURL)
                    setFormData({...formData, photoURL:downloadURL})
                    setImageUploading(false)
                })
            }
        )
    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.id]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (Object.keys(formData).length == 0) {
            return
        }
        if (imageUploading) {
            return
        }
        try {
            dispatch(updateStart())
            setUpdateUserSuccess(null)
            const res = await fetch(`api/user/update/${currentUser._id}`,{
                method: 'PUT',
                headers: {'Content-Type' : 'Application/json'},
                body: JSON.stringify(formData),
            })
            const data = await res.json()
            if (!res.ok) {
                dispatch(updateFailure(data.message))
            } else {
                dispatch(updateSuccess(data))
                setUpdateUserSuccess('Your profile updated successfully')
            }

        } catch (err) {
            dispatch(updateFailure(err.message))
        }
    }

    const handleDelete = async () => {
        setShowModelDel(false)
        try {
            dispatch(deleteUserStart())
            const res = await fetch(`/api/user/delete/${currentUser._id}` , {
                method : 'DELETE',
            })
            const data = res.json()
            if (!res.ok) {
                dispatch(deleteUserFailure(data.message))
            } else {
                dispatch(deleteUserSuccess(data))
            }
        } catch (err) {
            dispatch(deleteUserFailure(err.message))
        }
    }

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
    <div className='max-w-lg mx-auto p-3 w-full'>
        <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <input type="file" accept='image/.*' className='hidden'
             onChange={handleImageChange} ref={filePicker}/>
            <div className='w-32 h-32 self-center shadow-md rounded-full relative'>
                <img src={imageURL || currentUser.photoURL}
                 alt="user"
                className={`rounded-full w-full h-full border-8 border-gray-300
                object-cover cursor-pointer ${imageUploadProgress && imageUploadProgress < 100 && 'opacity-60'}`} 
                onClick={ () => filePicker.current.click()}/>
                {imageUploadProgress && (
                    <CircularProgressbar value={imageUploadProgress} strokeWidth={5}
                    className=' absolute top-0 left-0 w-full h-full'
                    styles={{
                        path: {
                            stroke: `rgba(62,152,199,${imageUploadProgress/100})`
                        }
                    }}/>
                )}
            </div>
            {
                imageUploadError && <Alert color={'failure'}>
                    {imageUploadError}
                </Alert>
            }
            <TextInput type='text' id='username' 
            defaultValue={currentUser.username} onChange={handleChange}/>
            <TextInput type='text' id='email' 
            defaultValue={currentUser.email} onChange={handleChange}/>
            <TextInput type='password' id='password' 
            placeholder='password' onChange={handleChange}/>
            <Button type='submit' gradientDuoTone={'tealToLime'} outline disabled={loading}>
            {
                loading ? (
                  <>
                    <Spinner size='sm'/>
                    <span className='pl-3'>Loading...</span>
                  </>
                ) 
                : 'Update'
              }
            </Button>
        </form>
        <div className=' text-red-500 flex justify-between mt-5'>
            <span className='cursor-pointer' onClick={() => setShowModelDel(true)}>
                Delete Account
            </span>
            <span className='cursor-pointer' onClick={handleSignOut}>
                Sign Out
            </span>
        </div>
        {
            updateUserSuccess && (
                <Alert color={'success'} className='mt-5'>
                    {updateUserSuccess}
                </Alert>
            )
        }
        {
            error && (
                <Alert color={'failure'} className='mt-5'>
                    {error}
                </Alert>
            )
        }
        <Modal show={showModelDel} onClose={() => setShowModelDel(false)}
            popup size='md'>
                <Modal.Header/>
                <Modal.Body>
                    <div className="text-center">
                        <AiOutlineExclamationCircle 
                        className='h-14 w-14 text-gray-400
                         dark:text-gray-200 mb-4 mx-auto'/>
                        <h3 className='mb-5 text-gray-500 text-lg dark:text-gray-400'>
                            Are you sure you want to delete your account?
                        </h3>
                        <div className='flex justify-center gap-4'>
                            <Button color={'failure'} onClick={handleDelete}>
                               Yes, Delete
                            </Button>
                            <Button color='gray' onClick={() => setShowModelDel(false)}>
                                No, Cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
        </Modal>
        
    </div>

  )
}

export default DashboardProfile