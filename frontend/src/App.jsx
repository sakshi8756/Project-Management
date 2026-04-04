import React from 'react'
import Navbar from './Components/Navbar'
import { Routes ,Route } from 'react-router-dom'
import Login from './Pages/Login'
import Home from './Pages/Home'
import Signup from './Pages/Signup'
import Dashboard from './Pages/Dashboard'

const App = () => {
  return ( 
    <>
    <Navbar/>
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/' element={<Home/>}/>
      <Route path='/Signup' element={<Signup/>}/>
      <Route path='/Dashboard' element={<Dashboard/>}/>
      
    </Routes>
    </>
  )
}

export default App
