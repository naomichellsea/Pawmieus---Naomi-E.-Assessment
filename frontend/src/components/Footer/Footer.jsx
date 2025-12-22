import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
            <img src={assets.logo} alt="" />
            <p>"Reach out to us — because every paw deserves the best care !"</p>
            <div className="footer-social-icons">
                <a 
                    href="https://www.itag-egy.com/landing/index/626a3840a92145808095ec3bfb940675" 
                    target="_blank" 
                    rel="noopener noreferrer"
                >
                    <img src={assets.facebook_icon} alt="Pawmieus on Facebook" />
                </a>
                <a 
                    href="https://www.itag-egy.com/landing/index/626a3840a92145808095ec3bfb940675" 
                    target="_blank" 
                    rel="noopener noreferrer"
                >
                    <img src={assets.twitter_icon} alt="Pawmieus on Twitter" />
                </a>
                <a 
                    href="https://www.itag-egy.com/landing/index/626a3840a92145808095ec3bfb940675" 
                    target="_blank" 
                    rel="noopener noreferrer"
                >
                    <img src={assets.linkedin_icon} alt="Pawmieus on LinkedIn" />
                </a>
            </div>
        </div>
        <div className="footer-content-center">
            <h2>PAWMIEUS</h2>
            <ul>
                <li>Home</li>
                <li>Location</li>
                <li>About us</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>+971 0123456789</li>
                <li>Bath Spa University RAK</li>
                <li>chellsea.espiritu@gmail.com</li>
            </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">© Pawmieus.com. All Rights Reserved.</p>
    </div>
  )
}

export default Footer
