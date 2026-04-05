import React from 'react'
import Navbar from './Components/Navbar'
import { Routes ,Route } from 'react-router-dom'
import Login from './Pages/Login'
import Home from './Pages/Home'
import Signup from './Pages/Signup'
import Dashboard from './Pages/Dashboard'
import Project from './Pages/Project'
import Team from './Pages/Team'
import Task from './Pages/Task'
import Setting from './Pages/Setting'

const App = () => {
  return ( 
    <>
    <Navbar/>
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/' element={<Home/>}/>
      <Route path='/Signup' element={<Signup/>}/>
      <Route path='/Dashboard' element={<Dashboard/>}/>
      <Route path='/Project' element={<Project/>}/>
      <Route path='/Team' element={<Team/>}/>
      <Route path='/Task' element={<Task/>}/>
      <Route path='/Setting' element={<Setting/>}/>


      
    </Routes>
    </>
  )
}

export default App
