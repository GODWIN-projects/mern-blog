import React from 'react'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import About from './pages/About'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import Signin from './pages/Signin'
import SignUp from './pages/SignUp'
import Header from './components/Header'
import CreatePost from './pages/CreatePost'
import FooterComponent from './components/Footer'
import PrivateRoute from './components/PrivateRoute'




export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/about" element={<About />}/>
        <Route element={<PrivateRoute/>}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/createpost' element={<CreatePost/>}/>
        </Route>
        <Route path="/sign-in" element={<Signin />}/>
        <Route path="/sign-up" element={<SignUp />}/>
        <Route path="/projects" element={<Projects />}/>
      </Routes>
      <FooterComponent/>
    </BrowserRouter>
  )
}
