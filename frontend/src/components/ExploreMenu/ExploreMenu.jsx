import React, { useContext } from 'react';
import './ExploreMenu.css';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom

const ExploreMenu = ({ category, setCategory }) => {
  const services_list = [
    { menu_image: '/images/Fluff.png', description: 'Premium grooming for a clean, healthy, and radiant pet.', link: '/appointments' },  // Update the link here
    { menu_image: 'images/Munch.png', description: 'Nutritious and delicious meals for your pet’s well-being.', link: '/petfood' },  // Update the link here
    { menu_image: 'images/Tail.png', description: 'Expert training videos to nurture a well-behaved companion.', link: '/trainer' },  // Update the link here
    { menu_image: 'images/Sniff.png', description: 'Smart recommendations tailored to your pet’s breed and needs.', link: '/petmatch' }  // Update the link here
  ];

  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Our Excellent Pet Care Services</h1>
      <p className='explore-menu-text'>Choose from our exceptional pet care services, designed to keep your furry friends happy, healthy, and well cared for.</p>
      <div className="explore-menu-list">
        {services_list.map((item, index) => {
          return (
            <div 
              onClick={() => setCategory(prev => prev === item.menu_name ? 'All' : item.menu_name)} 
              key={index} 
              className='explore-menu-list-item'
              style={{ minWidth: '200px', maxWidth: '250px', flexGrow: 1, textAlign: 'center' }}
            >
              <img src={item.menu_image} alt={item.menu_name} style={{ width: '100%', borderRadius: '10px', marginBottom: '10px' }} />
              <h5 style={{ margin: '10px 0', fontSize: '18px', fontWeight: 'bold' }}>{item.menu_name}</h5>
              <p style={{ fontSize: '14px', color: '#747474', minHeight: '40px' }}>{item.description}</p>
              {/* Replace the <a> tag with Link */}
              <Link to={item.link} className='read-more' style={{ textDecoration: 'none', color: 'tomato', fontWeight: 'bold' }}>
                Read More
              </Link>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
