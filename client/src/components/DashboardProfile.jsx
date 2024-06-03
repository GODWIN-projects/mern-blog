import { Alert, Button, TextInput } from 'flowbite-react'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const DashboardProfile = () => {
    
    const {currentUser} = useSelector(state => state.user)

    const [imageFile,setimageFile] = useState(null)
    const [imageURL,setImageURL] = useState(null)
    const [imageUploadProgress, setImageUploadProgress] = useState(null)
    const [imageUploadError,setImageUploadError] =useState(null)
    const filePicker = useRef()

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
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>{
                    setImageURL(downloadURL)
                })
            }
        )
    }

  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
        <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
        <form className='flex flex-col gap-4'>
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