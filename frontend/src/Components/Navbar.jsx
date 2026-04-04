import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex justify-between bg-blue-700 p-5 text-white'>
      <Link to='/'>Project Management</Link>
      <div className='flex gap-5'>
        <Link to='/login'>Sign in</Link>
        <Link to='/Signup'>Sign up</Link>
        
      </div>
    </div>
  )
}

export default Navbar
