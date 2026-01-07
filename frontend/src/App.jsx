import React, { useState, useEffect, useContext } from 'react'; 
import axios from 'axios';
import Home from './pages/Home/Home';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import { Route, Routes, useSearchParams, useNavigate } from 'react-router-dom';
import Cart from './pages/Cart/Cart';
import LoginPopup from './components/LoginPopup/LoginPopup';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import MyOrders from './pages/MyOrders/MyOrders';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify/Verify';
import Appointments from './pages/Appointments/Appointments';
import MyAppointments from './pages/MyAppointments/MyAppointments';
import PetMatch from './pages/PetMatch/PetMatch';
import Trainer from './pages/Trainer/Trainer';
import PetFood from './pages/PetFood/PetFood';
import { StoreContext } from './Context/StoreContext'; 

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { token, setToken, setUser } = useContext(StoreContext);

  useEffect(() => {
    const tokenFromURL = searchParams.get("token");
    if (tokenFromURL) {
      localStorage.setItem("token", tokenFromURL);
      setToken(tokenFromURL);
  
      axios.get("http://localhost:3000/api/user/me", {
        headers: { Authorization: `Bearer ${tokenFromURL}` }
      })
      .then(res => {
        if (res.data.success) {
          setUser(res.data.user);
          localStorage.setItem("user", JSON.stringify(res.data.user));
          toast.success("Google Login Successful!");
        } else {
          localStorage.removeItem("token");
          toast.error("Failed to fetch user data");
        }
      })
      .catch(err => {
        console.error(err);
        localStorage.removeItem("token");
        toast.error("Login error!");
      })
      .finally(() => {
        navigate("/"); // Clear token from URL
      });
    }
  }, [searchParams, navigate, setToken, setUser]);
  
  return (
    <>
      <ToastContainer />
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/myorders" element={<MyOrders />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/myappointments" element={<MyAppointments />} />
          <Route path="/petmatch" element={<PetMatch />} />
          <Route path="/trainer" element={<Trainer />} />
          <Route path="/petfood" element={<PetFood />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
