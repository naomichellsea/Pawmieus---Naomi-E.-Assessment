import React, { useContext } from 'react';
import './FoodDisplay.css';
import FoodItem from '../FoodItem/FoodItem';
import { StoreContext } from '../../Context/StoreContext';

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);

  // Filter items by category first, then map to FoodItem
  const filteredFood = food_list.filter(
    (item) => category === 'All' || item.category === category
  );

  return (
    <div className='food-display' id='food-display'>
      <h2>Pamper Yourself While You Pamper Your Pet</h2>
      <div className='food-display-list'>
        {filteredFood.map((item) => (
          <FoodItem
            key={item._id}
            image={item.image}      // imported image reference
            name={item.name}
            desc={item.description}
            price={item.price}
            id={item._id}
          />
        ))}
      </div>
    </div>
  );
};

export default FoodDisplay;
