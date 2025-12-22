import React, { useState, useEffect, useContext } from 'react'; // 1. Added useEffect & useContext
import Home from './pages/Home/Home';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import { Route, Routes, useSearchParams, useNavigate } from 'react-router-dom';
import Cart from './pages/Cart/Cart';
import LoginPopup from './components/LoginPopup/LoginPopup';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import MyOrders from './pages/MyOrders/MyOrders';
import { ToastContainer, toast } from 'react-toastify'; // 2. Added toast import
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify/Verify';
import Appointments from './pages/Appointments/Appointments';
import MyAppointments from './pages/MyAppointments/MyAppointments';
import PetMatch from './pages/PetMatch/PetMatch';
import Trainer from './pages/Trainer/Trainer';
import PetFood from './pages/PetFood/PetFood';
import { StoreContext } from './Context/StoreContext'; // 3. Added StoreContext import

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // 4. Get setToken from Context so we can save the login
  const { setToken } = useContext(StoreContext); 
  
  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      localStorage.setItem("token", token); 
      setToken(token); // Update Global State
      navigate("/"); // Clear URL
      toast.success("Google Login Successful!");
    }
  }, [searchParams, navigate, setToken]); // Added dependencies to suppress warnings

  return (
    <>
      <ToastContainer />
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : null}
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