import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';
import { toast } from 'react-toastify';
import './Verify.css';

const Verify = () => {
  const { url } = useContext(StoreContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const navigate = useNavigate();

  const verifyPayment = async () => {
    try {
      const response = await axios.post(url + "/api/order/verify", { success, orderId });
      
      if (response.data.success) {
        toast.success("Payment Verified! Redirecting to your orders...");
        navigate("/myorders");
      } else {
        toast.error("Payment failed or canceled. Please try again.");
        navigate("/");
      }
    } catch (error) {
      toast.error("Error verifying payment. Please try again later.");
      navigate("/");
    }
  };

  useEffect(() => {
    verifyPayment();
  }, [success, orderId]);

  return (
    <div className='verify'>
      <div className="spinner"></div>
    </div>
  );
}

export default Verify;
