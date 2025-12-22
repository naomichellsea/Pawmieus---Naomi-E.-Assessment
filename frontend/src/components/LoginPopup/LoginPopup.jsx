import React, { useContext, useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../Context/StoreContext';
import { toast } from 'react-toastify';

const LoginPopup = ({ setShowLogin }) => {
  const { loginUser } = useContext(StoreContext);

  const [currState, setCurrState] = useState('Sign Up');
  const [data, setData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onLogin = async (e) => {
    e.preventDefault();
    if (currState === 'Sign Up' && !data.name.trim()) {
      toast.error('Please enter your name');
      return;
    }
    if (!data.email.trim()) {
      toast.error('Please enter your email');
      return;
    }
    if (!data.password.trim()) {
      toast.error('Please enter your password');
      return;
    }

    setLoading(true);
    try {
      const response = await loginUser(currState, data);
      if (response.success) {
        toast.success(`${currState} successful`);
        setShowLogin(false);
        setData({ name: '', email: '', password: '' });
      } else {
        toast.error(response.message || `${currState} failed`);
      }
    } catch (err) {
      console.error('Error:', err);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // --- NEW: Google Login Handler ---
  const onGoogleLogin = () => {
    // Redirect to the backend route defined in your Passport setup
    // Ensure this URL matches your Backend Port (e.g., localhost:3000 or 4000)
    window.location.href = 'http://localhost:3000/auth/google'; 
  };

  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className='login-popup-container'>
        <div className='login-popup-title'>
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt='Close'
          />
        </div>

        <div className='login-popup-inputs'>
          {currState === 'Sign Up' && (
            <input
              name='name'
              type='text'
              placeholder='Your Name'
              value={data.name}
              onChange={onChangeHandler}
              required
            />
          )}
          <input
            name='email'
            type='email'
            placeholder='Your Email'
            value={data.email}
            onChange={onChangeHandler}
            required
          />
          <input
            name='password'
            type='password'
            placeholder='Password'
            value={data.password}
            onChange={onChangeHandler}
            required
          />
        </div>

        <button type='submit' disabled={loading}>
          {loading
            ? 'Please wait...'
            : currState === 'Login'
            ? 'Login'
            : 'Create Account'}
        </button>

        {/* --- NEW: OR Separator --- */}
        <div className="login-popup-separator">
            <span>OR</span>
        </div>

        {/* --- NEW: Google Button --- */}
        <button type="button" onClick={onGoogleLogin} className="google-btn">
            {/* Standard Google SVG Icon */}
            <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
        </button>

        <div className='login-popup-condition'>
          <input type='checkbox' required />
          <p>
            By continuing, I agree to the <b>terms of use</b> &{' '}
            <b>privacy policy</b>.
          </p>
        </div>

        {currState === 'Login' ? (
          <p>
            Create a new account?{' '}
            <span onClick={() => setCurrState('Sign Up')}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?{' '}
            <span onClick={() => setCurrState('Login')}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;