import React, { useState } from 'react';
import '../../styles/auth.css';
import { GoogleLogin } from 'react-google-login';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const history = useHistory();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 打印表单数据
    console.log('Form data:', formData);
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Password and Confirm Password do not match');
      return;
    }
    
    try {
      console.log('Sending request to:', 'http://localhost:5001/api/auth/signup');
      const response = await axios.post('http://localhost:5001/api/auth/signup', formData);
      console.log('Signup response:', response.data);
      toast.success('Sign Up Success！');
      setTimeout(() => {
        history.push('/login');
      }, 2000);
    } catch (err) {
      console.error('Full error object:', err);
      console.error('Error response:', err.response);
      console.error('Error message:', err.message);
      const errorMessage = err.response?.data?.error || 'Sign Up Failed';
      toast.error(errorMessage);
    }
  };

  const handleGoogleSuccess = (response) => {
    // 处理Google登录成功
  };

  const handleGoogleFailure = (error) => {
    console.log("Google Sign In Error:", error);
  };

  const goToLogin = () => {
    history.push('/login');
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1 className="welcome-text">Welcome 👋</h1>
        <p className="to-text">To</p>
        <h2 className="brand-text">Review<span className="brand-highlight">Bites</span></h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="submit-btn">Sign Up</button>
        </form>

        <div className="divider">
          <span>Or continue with</span>
        </div>

        <div className="google-login">
          <GoogleLogin
            clientId="your-google-client-id"
            render={renderProps => (
              <button 
                onClick={renderProps.onClick} 
                disabled={renderProps.disabled}
                className="google-btn"
              >
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
                     alt="google icon" 
                     className="google-icon" 
                />
                Continue with Google
              </button>
            )}
            onSuccess={handleGoogleSuccess}
            onFailure={handleGoogleFailure}
            cookiePolicy={'single_host_origin'}
          />
        </div>

        <div className="auth-footer">
          <span className="auth-text">Already have an account? </span>
          <span onClick={goToLogin} className="auth-link">Login</span>
        </div>
      </div>
    </div>
  );
};

export default SignUp; 