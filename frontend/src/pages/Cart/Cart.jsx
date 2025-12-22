// Cart.jsx
import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../Context/StoreContext'
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const {
    cartItems,
    food_list,
    pet_food_list,
    removeFromCart,
    addToCart,
    removeAllFromCart,
    setCartQuantity,
    getTotalCartAmount,
    url,
    currency,
    deliveryCharge
  } = useContext(StoreContext);

  const navigate = useNavigate();

  // helpers (keep lists separate, lookup by id)
  const normalizeId = (v) => (v === undefined || v === null ? "" : String(v));

  const findItemById = (id) => {
    const nid = normalizeId(id);
    const food = food_list.find((p) => normalizeId(p._id) === nid);
    if (food) return { source: "food", item: food };
    const pet = pet_food_list.find((p) => normalizeId(p.id) === nid);
    if (pet) return { source: "pet", item: pet };
    return null;
  };

  const getItemName = (it) => it?.name ?? it?.title ?? "Item";
  const getItemPrice = (it) => Number(it?.price ?? it?.food_price ?? 0);
  const getItemImage = (it) => it?.image ?? "";

  // Build an array from cartItems (so we iterate actual cart keys, not lists)
  const cartRows = Object.entries(cartItems)
    .map(([id, qty]) => {
      const found = findItemById(id);
      if (!found) return null;
      const item = found.item;
      return {
        id,
        qty,
        source: found.source,
        name: getItemName(item),
        price: getItemPrice(item),
        image: getItemImage(item),
      };
    })
    .filter(Boolean);

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p> <p>Title</p> <p>Price</p> <p>Quantity</p> <p>Total</p> <p>Remove</p>
        </div>
        <br />
        <hr />
        {cartRows.length === 0 && <p className="empty-cart">Your cart is empty</p>}
        {cartRows.map((row) => {
          const total = row.price * row.qty;
          return (
            <div key={row.id}>
              <div className="cart-items-title cart-items-item">
              {row.image ? <img src={row.image} alt={row.name} /> : <div className="no-image" />}
                <p>{row.name}</p>
                <p>{currency}{row.price}</p>
                <div className="quantity-controls">
                  <button onClick={() => removeFromCart(row.id)}>-</button>
                  <span>{row.qty}</span>
                  <button onClick={() => addToCart(row.id)}>+</button>
                </div>
                <p>{currency}{total}</p>
                <p className='cart-items-remove-icon' onClick={() => removeAllFromCart(row.id)}>x</p>
              </div>
              <hr />
            </div>
          )
        })}
      </div>

      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details"><p>Subtotal</p><p>{currency}{getTotalCartAmount()}</p></div>
            <hr />
            <div className="cart-total-details"><p>Delivery Fee</p><p>{currency}{getTotalCartAmount() === 0 ? 0 : deliveryCharge}</p></div>
            <hr />
            <div className="cart-total-details"><b>Total</b><b>{currency}{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + deliveryCharge}</b></div>
          </div>
          <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>

        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, Enter it here</p>
            <div className='cart-promocode-input'>
              <input type="text" placeholder='promo code' />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart;
