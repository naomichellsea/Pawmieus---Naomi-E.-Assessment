import React, { useContext, useEffect, useState } from 'react';
import './MyOrders.css';
import axios from 'axios';
import { StoreContext } from '../../Context/StoreContext';
import { assets } from '../../assets/assets';

const MyOrders = () => {
  const [data, setData] = useState([]);
  const { url, token, currency } = useContext(StoreContext);

  // Fetch Orders
  const fetchOrders = async () => {
    try {
      if (!token) return;

      const response = await axios.get(
        `${url}/api/orders/userorders`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setData(response.data.data);
      } else {
        console.error("Error fetching orders:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [token]);

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {data.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          data.map((order, index) => (
            <div key={index} className="my-orders-order">
              <img src={assets.parcel_icon} alt="Parcel" />
              
              {/* Column 1: Items */}
              <p>
                <strong>Order Items</strong>
                {order.items.map((item, idx) =>
                  idx === order.items.length - 1
                    ? `${item.name} x ${item.quantity}`
                    : `${item.name} x ${item.quantity}, `
                )}
              </p>

              {/* Column 2: Amount */}
              <p>
                <strong>Total Amount</strong>
                {currency}{order.amount}.00
              </p>

              {/* Column 3: Quantity */}
              <p>
                <strong>Quantity</strong>
                {order.items.length} Items
              </p>

              {/* Column 4: Status */}
              <p>
                <strong>Status</strong>
                <span>&#x25cf;</span> <b>{order.status}</b>
              </p>

              {/* Column 5: Button */}
              <button onClick={fetchOrders}>Track Order</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyOrders;