import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react'
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate } from 'react-router-dom';
import { Spinner } from 'flowbite-react';
import { useSelector } from 'react-redux';

const CreatePost = () => {

  const [file, setFile] = useState(null)
  const [imageUploadProgress, setImageUploadProgress] = useState(null)
  const {currentUser} = useSelector(state => state.user)
  const [imageUploadError, setImageUploadError] = useState(null)
  const [formData, setFormData] = useState({username: currentUser.username})
  const [publishError, setPublishError] = useState(null)
  const [publishSuccess, setPublishSuccess] = useState(false)
  const [publishLoading, setPublishLoading] = useState(false)

  const navigate = useNavigate()


  const handleImageUpload = async () => {
    try {
      if (!file) {
        setImageUploadError("Please select an image")
        return
      }
      setImageUploadError(null)
      const storage = getStorage(app)
      const filename = new Date().getTime() + "-" + file.name
      const storageRef = ref(storage, filename)
      const uploadTask = uploadBytesResumable(storageRef, file)
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          setImageUploadProgress(progress.toFixed(0))
        },
        (error) => {
          setImageUploadError("Upload failed")
          setImageUploadProgress(null)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadError(null)
            setImageUploadProgress(null)
            setFormData({...formData, image: downloadURL})
          })
        }
      )
    } catch (err) {
      setImageUploadError("Upload failed")
      setImageUploadProgress(null)
    }
  }
  
  const handlePublish = async (e) => {
    e.preventDefault();
    try {
      setPublishLoading(true)
      setPublishError(null)
      setPublishSuccess(false)
      const res = await fetch("api/post/createpost", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (!res.ok) {
        setPublishError(data.message)
        setPublishLoading(false)
        return
      }
      if (res.ok) {
        setPublishError(null)
        setPublishSuccess(true)
        setPublishLoading(false)
        navigate(`/post/${data.slug}`)
      }
    } catch (err) {
      setPublishError("somthing went wrong")
      setPublishLoading(false)
    }
  }

  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl font-semibold my-7'>Create a post</h1>
      <form className='flex flex-col gap-4' >
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <TextInput type='text' placeholder='Title' required id='title' 
          className='flex-1'
          onChange={(e) => setFormData({...formData, title: e.target.value})}/>
          <Select
            onChange={(e) => setFormData({...formData, category:e.target.value})}>
            <option value={"uncategorized"}>Select a category</option>
            <option value={"food"}>Food</option>
            <option value={"lifestyle"}>LifeStyle</option>
            <option value={"travel"}>Travel</option>
            <option value={"others"}>Others</option>
          </Select>
        </div>
        <div className='flex gap-4 items-center justify-between border-4
        border-teal-500 border-dotted p-3'>
          <FileInput typeof='file' accept='image/* ' onChange={(e) => setFile(e.target.files[0])} />
          <Button gradientDuoTone={"tealToLime"} size={"sm"} outline onClick={handleImageUpload} disabled={imageUploadProgress}>
            {
              imageUploadProgress ?
              (<div className='w-16 h-16'>
                <CircularProgressbar value={imageUploadProgress} />
              </div> )
              : ("Upload image")
            }
          </Button>
        </div>
        {
          imageUploadError && (
            <Alert color={"failure"}>
              {imageUploadError}
            </Alert>
          )
        }
        {
          formData.image && (
            <img src={formData.image} alt="post-image" className='h-22 mb-8 object-cover'/>
          )
        }
        <ReactQuill theme='snow' placeholder='write here...' 
          className='h-72 mb-12' required
          onChange={(value) => setFormData({...formData, content:value})}/>
      </form>
      <Button type='submit' gradientDuoTone={"tealToLime"} className='w-full mt-4'
        onClick={handlePublish}>
         {
                publishLoading ? (
                  <>
                    <Spinner size='sm'/>
                    <span className='pl-3'>Loading...</span>
                  </>
                ) 
                : 'Publish'
              }
      </Button>
      {
        publishError && (
          <Alert color={"failure"} className='mt-3'>
            {publishError}
          </Alert>
        )
      }
      {
        publishSuccess && (
          <Alert color={"success"} className='mt-3'>
            Post published Successfully
          </Alert>
        )
      }
    </div>
  )
}

export default CreatePost