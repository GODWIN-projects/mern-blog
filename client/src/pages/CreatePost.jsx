import { Button, FileInput, Select, TextInput } from 'flowbite-react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreatePost = () => {
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl font-semibold my-7'>Create a post</h1>
      <form className='flex flex-col gap-4' >
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <TextInput type='text' placeholder='Title' required id='title' 
          className='flex-1'/>
          <Select>
            <option value={"uncatogorized"}>Select a catogory</option>
            <option value={"food"}>Food</option>
            <option value={"lifestyle"}>LifeStyle</option>
            <option value={"travel"}>Travel</option>
            <option value={"others"}>Others</option>
          </Select>
        </div>
        <div className='flex gap-4 items-center justify-between border-4
        border-teal-500 border-dotted p-3'>
          <FileInput typeof='file' accept='image/* ' />
          <Button gradientDuoTone={"tealToLime"} size={"sm"} outline>upload image</Button>
        </div>
        <ReactQuill theme='snow' placeholder='write here...' 
        className='h-72 mb-12' required/>
      </form>
      <Button type='submit' gradientDuoTone={"tealToLime"} className='w-full mt-4'>
        Publish
      </Button>
    </div>
  )
}

export default CreatePost