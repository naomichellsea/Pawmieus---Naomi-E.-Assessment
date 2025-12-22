import React from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'

const Navbar = () => {
  return (
    <div className='navbar'>
      {/* Left: Logo */}
      <img className='logo' src={assets.logo} alt="Logo" />
      
      {/* Center: Title */}
      <div className="navbar-title">
        <p>Pawmieus</p>
        <span>Admin Panel</span>
      </div>

      {/* Right: Profile */}
      <img className='profile' src={assets.profile_image} alt="Profile" />
    </div>
  )
}

export default Navbar