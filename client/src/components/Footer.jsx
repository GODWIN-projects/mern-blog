import { Footer, FooterDivider, FooterTitle } from 'flowbite-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { ImGithub } from "react-icons/im";
import { SiGmail } from "react-icons/si";

const FooterComponent = () => {
  return (
    <Footer container className='border border-t-8 border-green-300'>
        <div>
            <div className='flex gap-5 flex-col md:flex-row justify-around w-screen'>
                <div>
                    <Link to="/" className=' self-center whitespace-nowrap
                    text-lg sm:text-xl font-semibold dark:text-white'>
                    <span className=' px-2 py-1 bg-gradient-to-r
                    from-teal-300 to-lime-200 rounded-lg text-gray-700'>FIRST</span>
                    Blog
                    </Link>
                </div>
                <div>
                    <FooterTitle title='ABOUT'/>
                    <Footer.LinkGroup col>
                        <Footer.Link
                        href='#'
                        target='_blank'
                        rel='noopener noreferrer'>
                            created by GODWIN K
                        </Footer.Link>
                        <Footer.Link
                        href='godwindass14@gmail.com'
                        target='_blank'
                        rel='noopener noreferrer'>
                            godwindass14@gamil.com
                        </Footer.Link>
                    </Footer.LinkGroup>
                </div>
            </div>
            <FooterDivider/>
            <div className='w-full sm:flex sm:items-center sm:justify-between pr-12'>
                <Footer.Copyright by='GODWIN K' year={new Date().getFullYear()}/>
                <div className='flex gap-6 sm:mt-0 md:mt-4 sm:justify-center'>
                    <Footer.Icon href='#' icon={ImGithub}/>
                    <Footer.Icon href='#' icon={SiGmail}/>
                </div>
            </div>
        </div>
    </Footer>
  )
}

export default FooterComponent