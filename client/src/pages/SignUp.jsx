import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import  { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import OAuth from '../components/OAuth';


const SignUp = () => {

  const [formData,setFormData] = useState({});
  const [errorMessage,setErrorMessage] = useState(null);
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange= (e) =>{
    setFormData({...formData, [e.target.id]: e.target.value.trim()});
  }
  const handleSubmit = async (e) =>{
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password){
      return setErrorMessage("Please fill all the details");
    };
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch('/api/auth/signup',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success == false){
        return setErrorMessage(data.message);
      };
      setLoading(false);
      if (res.ok){
        navigate('/sign-in');
      }
    } catch (err) {
      setErrorMessage(err.message);
    }
  }



  return (
    <div className=' min-h-screen mt-20 '>
      <div className='flex p-3 max-w-3xl mx-auto flex-col
    md:flex-row md:items-center gap-5'>
        {/* {left} */}
        <div className='flex-1 '>
          <Link to="/" className='text-4xl
          font-bold dark:text-white'>
              <span className=' px-2 py-1 bg-gradient-to-r
              from-teal-300 to-lime-200 rounded-lg text-gray-700'>FIRST</span>
              Blog
          </Link>
          <p className=' text-sm mt-5'>
            Start your blog jounery with First blog by signing up with your
            email and creating your first blog
          </p>
        </div>
        {/* {right} */}
        <div >
          <form className=' flex gap-4 flex-col flex-1' onSubmit={handleSubmit}>
            <div>
              <Label value='Username:'/>
              <TextInput
                type='text'
                placeholder='username'
                id='username'
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value='Email:'/>
              <TextInput
                type='email'
                placeholder='E-mail'
                id='email'
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value='Password:'/>
              <TextInput
                type='password'
                placeholder='Password'
                id='password'
                onChange={handleChange}
              />
            </div>
            <Button className=' border-0' type='submit' 
            gradientDuoTone='tealToLime' disabled={loading}>
              {
                loading ? (
                  <>
                    <Spinner size='sm'/>
                    <span className='pl-3'>Loading...</span>
                  </>
                ) 
                : 'Sign Up'
              }
            </Button>
            <OAuth/>
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Have an sccount?</span>
            <Link to='/sign-in' className=' text-blue-500'>
              Sign in
            </Link>
          </div>
          <div>
            {
              errorMessage && (
                <Alert className='mt-5' color='failure'>
                  {errorMessage}
                </Alert>
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp