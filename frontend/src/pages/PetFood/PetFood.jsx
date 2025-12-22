import React, { useContext } from 'react';
import './PetFood.css';
import { assets, pet_food_list } from "../../assets/assets";
console.log(pet_food_list);
import { StoreContext } from '../../Context/StoreContext';

const FoodItem = ({ image, name, price, desc, id }) => {
  const { cartItems = {}, addToCart, removeFromCart, currency = "$" } = useContext(StoreContext);
  const itemCount = cartItems[id] || 0;
  

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img className="food-item-image" src={image} alt={name} />
        {itemCount === 0 ? (
          <img
            className="add"
            onClick={() => addToCart(id)}
            src={assets.add_icon_white}
            alt="Add to Cart"
          />
        ) : (
          <div className="food-item-counter">
            <img
              src={assets.remove_icon_red}
              onClick={() => removeFromCart(id)}
              alt="Remove"
            />
            <p>{itemCount}</p>
            <img
              src={assets.add_icon_green}
              onClick={() => addToCart(id)}
              alt="Add More"
            />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="Rating" />
        </div>
        <p className="food-item-desc">{desc}</p>
        <p className="food-item-price">{currency}{price}</p>
      </div>
    </div>
  );
};

const PetFood = () => {
  console.log("Pet food list:", pet_food_list);
  
  return (
    <div className="pet-food-page">
      <h1>🐾 Premium Pet Food</h1>
      <div className="food-list">
        {pet_food_list.map(food => (
          <FoodItem
            key={food.id}
            id={food.id}
            image={food.image}
            name={food.name}
            desc={food.desc}
            price={food.price}
          />
        ))}
      </div>
    </div>
  );
};

export default PetFood;
