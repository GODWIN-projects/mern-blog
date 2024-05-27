import React from 'react'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import About from './pages/About'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import Signin from './pages/Signin'
import SignUp from './pages/SignUp'




export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/about" element={<About />}/>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path="/sign-in" element={<Signin />}/>
        <Route path="/sign-up" element={<SignUp />}/>
        <Route path="/projects" element={<Projects />}/>
      </Routes>
    </BrowserRouter>
  )
}
