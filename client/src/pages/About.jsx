import React from 'react'

const About = () => {
  return (
    <div>
      <div className='flex flex-col  border shadow-lg border-gray-400 dark:border-gray-800
        rounded-lg m-40 p-6'>
        <div className='flex gap-1 items-center mx-auto
           w-full justify-center font-semibold'>
          <h1> About </h1>
          <span className='ml-2 px-2 py-1 bg-gradient-to-r
            from-teal-300 to-lime-200 rounded-lg text-gray-700'>FIRST</span>
            Blog
        </div>
          <div className='text-md text-gray-500 m-4 p-2'>
            <p>
              First Blog is a blog that I created to test my skills in
              web development. I created this using React Js, Tailwind CSS,
              Node Js, Express Js, Mongo DB and Firebase. I'm open to work
              you can contact me using my e-mail &nbsp;
              <span className=' dark:text-lime-200 text-purple-600'>godwindass14@gmail.com</span>
            </p>
          </div>
      </div>
    </div>
  )
}

export default About