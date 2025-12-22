import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../Context/StoreContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const PlaceOrder = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const {
    getTotalCartAmount,
    token,
    food_list,
    cartItems,
    url,
    setCartItems,
    currency,
    deliveryCharge,
  } = useContext(StoreContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!token || getTotalCartAmount() === 0) {
      toast.error("To place an order, sign in first");
      navigate("/cart");
    }
  }, [token]);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    if (!token) {
      toast.error("To place an order, sign in first");
      navigate("/cart");
      return;
    }

    const orderItems = food_list
      .filter((item) => cartItems[item._id] > 0)
      .map((item) => ({
        productId: item._id,
        name: item.name,
        quantity: cartItems[item._id],
        price: item.price,
      }));

    const totalAmount = getTotalCartAmount() + deliveryCharge;
    if (totalAmount <= 0) {
      toast.error("Invalid order amount");
      return;
    }

    const orderData = {
      address: { ...data },
      items: orderItems,
      amount: totalAmount,
      paymentMethod: "COD",
    };

    try {
      const response = await axios.post(url + "/api/orders/place", orderData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setCartItems({});
        navigate("/myorders");
      } else {
        toast.error("Something went wrong while placing order");
      }
    } catch (error) {
      console.error("Order Error:", error);
      toast.error("Failed to place order");
    }
  };

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-field">
          <input
            type="text"
            name="firstName"
            onChange={onChangeHandler}
            value={data.firstName}
            placeholder="First name"
            required
          />
          <input
            type="text"
            name="lastName"
            onChange={onChangeHandler}
            value={data.lastName}
            placeholder="Last name"
            required
          />
        </div>
        <input
          type="email"
          name="email"
          onChange={onChangeHandler}
          value={data.email}
          placeholder="Email address"
          required
        />
        <input
          type="text"
          name="street"
          onChange={onChangeHandler}
          value={data.street}
          placeholder="Street"
          required
        />
        <div className="multi-field">
          <input
            type="text"
            name="city"
            onChange={onChangeHandler}
            value={data.city}
            placeholder="City"
            required
          />
          <input
            type="text"
            name="state"
            onChange={onChangeHandler}
            value={data.state}
            placeholder="State"
            required
          />
        </div>
        <div className="multi-field">
          <input
            type="text"
            name="zipcode"
            onChange={onChangeHandler}
            value={data.zipcode}
            placeholder="Zip code"
            required
          />
          <input
            type="text"
            name="country"
            onChange={onChangeHandler}
            value={data.country}
            placeholder="Country"
            required
          />
        </div>
        <input
          type="text"
          name="phone"
          onChange={onChangeHandler}
          value={data.phone}
          placeholder="Phone"
          required
        />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>{currency}{getTotalCartAmount()}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>{currency}{deliveryCharge}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <b>Total</b>
            <b>{currency}{getTotalCartAmount() + deliveryCharge}</b>
          </div>
        </div>
        <button type="submit" className="place-order-submit">
          Place Order (Cash on Delivery)
        </button>
      </div>
    </form>
  );
};

export default PlaceOrder;
