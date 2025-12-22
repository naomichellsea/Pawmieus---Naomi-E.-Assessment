import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState('home');
  
  // 1. Get 'token' from context
  const { getTotalCartAmount, token, logoutUser } = useContext(StoreContext); 
  
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <Link to="/"><img className="logo" src={assets.logo} alt="Logo" /></Link>

      <ul className="navbar-menu">
        <li>
          <Link to="/" onClick={() => setMenu('home')} className={menu === 'home' ? 'active' : ''}>HOME</Link>
        </li>
        <li>
          <a href="#explore-menu" onClick={() => setMenu('menu')} className={menu === 'menu' ? 'active' : ''}>SERVICES</a>
        </li>
        <li>
          <a href="#app-download" onClick={() => setMenu('mob-app')} className={menu === 'mob-app' ? 'active' : ''}>APPLICATION</a>
        </li>
        <li>
          <a href="#footer" onClick={() => setMenu('contact')} className={menu === 'contact' ? 'active' : ''}>CONTACT</a>
        </li>
      </ul>

      <div className="navbar-right">

        <Link to="/cart" className="navbar-search-icon">
          <img src={assets.basket_icon} alt="Cart" className="navbar-icon" />
          {getTotalCartAmount() > 0 && <span className="dot"></span>}
        </Link>

        {/* 2. CHANGE: Check '!token' instead of '!user' */}
        {!token ? (
          <button onClick={() => setShowLogin(true)} className="btn-login" aria-label="Sign in">
            <img src={assets.login_icon} alt="" className="signin-icon" />
            <span className="signin-text">Sign In</span>
          </button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="Profile" className="navbar-icon" />
            <ul className="navbar-profile-dropdown">
              <li onClick={() => navigate('/myorders')}>
                <img src={assets.bag_icon} alt="Orders" /> Orders
              </li>
              <li onClick={() => navigate('/myappointments')}>
                <img src={assets.bag_icon} alt="Appointments" /> Appointments
              </li>
              <hr />
              <li onClick={() => { logoutUser(); navigate('/'); }}>
                <img src={assets.logout_icon} alt="Logout" /> Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;