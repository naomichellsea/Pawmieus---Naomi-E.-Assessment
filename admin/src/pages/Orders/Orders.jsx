
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

  //Fetch all orders
  const fetchAllOrders = async () => {
    try {
      console.log('📡 fetching orders from:', `${url}/api/orders/list`);
      const response = await axios.get(`${url}/api/orders/list`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        withCredentials: true,
      });

      console.log('orders response:', response);
      if (response?.data?.success) {
        setOrders(Array.isArray(response.data.data) ? response.data.data.reverse() : []);
      } else {
        toast.error(response?.data?.message || 'Error fetching orders');
      }
    } catch (error) {
      console.error('🔴 Error fetching orders:', error);
      if (error.response) {
        toast.error(`Failed to fetch orders (${error.response.status})`);
      } else if (error.request) {
        toast.error('Failed to fetch orders: no response from server');
      } else {
        toast.error(`Failed to fetch orders: ${error.message}`);
      }
    }
  };

  //Update order status
  const statusHandler = async (event, orderId) => {
    const newStatus = event.target.value;
    
    const manualToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MjZlYjc5YWVhZjFhYzA1YzA5OTg3ZSIsImlhdCI6MTc2NDE2MjExMn0.gyiSEBkoeTKng1XVnhAEl0INHxzABqYibhSX4d-dIC0"; 

    try {
      console.log(`📡 updating order ${orderId} -> ${newStatus}`);
      const response = await axios.post(
        `${url}/api/orders/status`,
        { orderId, status: newStatus },
        {
          headers: { Authorization: `Bearer ${manualToken}` },
          withCredentials: true,
        }
      );

      console.log('status update response:', response);
      if (response?.data?.success) {
        toast.success('Order status updated');
        await fetchAllOrders();
      } else {
        toast.error(response?.data?.message || 'Error updating order status');
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('Failed to update status');
    }
  };

  useEffect(() => {
    if (!url) {
      console.warn('⚠️ No API url provided in StoreContext.');
      toast.error('Server URL not configured');
      return;
    }
    fetchAllOrders();
  }, [url, token]);

  const safeAddressString = (addr) => {
    if (!addr) return 'Address not provided';
    return [addr.street, addr.city, addr.state, addr.country, addr.zipcode].filter(Boolean).join(', ');
  };

  return (
    <div className="order add">
      <h3>Order Page</h3>

      {orders.length === 0 ? (
        <div className="no-orders">
          <p>No orders available.</p>
        </div>
      ) : (
        <div className="order-list">
          {orders.map((order, index) => {
            const itemsText = Array.isArray(order.items)
              ? order.items.map((item, idx) =>
                  idx === order.items.length - 1
                    ? `${item.name} x ${item.quantity}`
                    : `${item.name} x ${item.quantity}, `
                )
              : [];

            return (
              <div key={order._id ?? index} className="order-item">
                <img src={assets.parcel_icon} alt="parcel" />
                <div className="order-item-main">
                  <p className="order-item-food">{itemsText}</p>
                  <p className="order-item-name">
                    {order.user
                      ? `${order.user.firstName ?? ''} ${order.user.lastName ?? ''}`.trim()
                      : 'Unknown'}
                  </p>
                  <div className="order-item-address">
                    <p>{safeAddressString(order.address)}</p>
                  </div>
                  <p className="order-item-phone">{order.address?.phone ?? 'No phone'}</p>
                </div>

                <p className="order-count">Items: {Array.isArray(order.items) ? order.items.length : 0}</p>
                <p className="order-amount">{currency}{order.amount ?? 0}</p>

                <select
                  onChange={(e) => statusHandler(e, order._id)}
                  value={order.status ?? ''}
                  className="order-status-select"
                >
                  <option value="Food Processing">Packaging</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Orders;
