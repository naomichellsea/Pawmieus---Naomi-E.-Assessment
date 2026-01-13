
import React, { useEffect, useState, useContext } from 'react';
import './Orders.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets } from '../../assetsco/assets'; 
import { StoreContext } from '../../Contextco/StoreContext';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { url, token, currency } = useContext(StoreContext);
  console.log("🔑 Current Admin Token:", token);

  useEffect(() => {
    if (!url) return;
  
    if (!token) {
      console.error('❌ No token found. Cannot fetch orders.');
      toast.error('Admin not logged in');
      return;
    }
  
    const fetchAllOrders = async () => {
      try {
        console.log('📡 fetching orders from:', `${url}/api/orders/list`);
        console.log('🔑 Using token:', token);
  
        const response = await axios.get(`${url}/api/orders/list`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
  
        console.log('orders response:', response.data);
  
        if (response.data?.success) {
          setOrders(Array.isArray(response.data.data) ? response.data.data.reverse() : []);
        } else {
          toast.error(response.data?.message || 'Error fetching orders');
        }
      } catch (error) {
        console.error('🔴 Error fetching orders:', error.response || error);
        toast.error('Failed to fetch orders');
      }
    };
  
    fetchAllOrders();
  }, [url, token]);  

  const statusHandler = async (event, orderId) => {
    const newStatus = event.target.value;

    try {
      const response = await axios.post(
        `${url}/api/orders/status`,
        { orderId, status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` }, 
          withCredentials: true,
        }
      );

      if (response?.data?.success) {
        toast.success('Order status updated');
        fetchAllOrders();
      } else {
        toast.error(response?.data?.message || 'Error updating order status');
      }
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  useEffect(() => {
    if (url && token) fetchAllOrders();
  }, [url, token]);

  const safeAddressString = (addr) => {
    if (!addr) return 'Address not provided';
    return [addr.street, addr.city, addr.state, addr.country, addr.pincode]
      .filter(Boolean)
      .join(', ');
  };

  return (
    <div className="order add">
      <h3>Order Page</h3>

      {orders.length === 0 ? (
        <p>No orders available.</p>
      ) : (
        <div className="order-list">
          {orders.map((order) => (
            <div key={order._id} className="order-item">
              <img src={assets.parcel_icon} alt="parcel" />

              <div className="order-item-main">
                <p className="order-item-food">
                  {order.items?.map(i => `${i.name} x ${i.quantity}`).join(', ')}
                </p>

                <p className="order-item-name">
                  {order.user?.name || 'Unknown'}
                </p>

                <p>{safeAddressString(order.address)}</p>
              </div>

              <p className="order-count">Items: {order.items?.length || 0}</p>
              <p className="order-amount">{currency}{order.amount}</p>

              <select
                onChange={(e) => statusHandler(e, order._id)}
                value={order.status}
              >
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
