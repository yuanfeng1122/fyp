import React, { useState } from 'react';
import '../../styles/auth.css';
import { GoogleLogin } from 'react-google-login';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
    
    try {
        const response = await axios.post('http://localhost:5001/api/auth/login', {
            email: formData.email,
            password: formData.password
        });

        console.log('Login response:', response.data);
        
        // 只存储必要的信息
        localStorage.setItem('user', JSON.stringify({
            id: response.data.user.id,
            name: response.data.user.name,
            email: response.data.user.email,
            // 不存储 profile_image
        }));
        localStorage.setItem('token', response.data.token); // 存储 token
        toast.success('Login Successful!'); // 显示成功通知
        
        // 修改重定向路径
        history.push('/analysis'); // 重定向到分析页面
    } catch (error) {
        console.error('Login error:', error);
        toast.error('Login Failed!'); // 显示失败通知
    }
  };

  const handleGoogleSuccess = (response) => {
    // 处理Google登录成功
  };

  const handleGoogleFailure = (error) => {
    console.log("Google Sign In Error:", error);
  };

  const goToSignUp = () => {
    history.push('/signup');
  };

  console.log('Login component rendered');

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1 className="welcome-text">Welcome 👋</h1>
        <p className="to-text">To</p>
        <h2 className="brand-text">Review<span className="brand-highlight">Bites</span></h2>
        
        <form onSubmit={handleSubmit}>
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
          <button type="submit" className="submit-btn">Log In</button>
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
          <span className="auth-text">Haven't sign up? </span>
          <span onClick={goToSignUp} className="auth-link">Sign Up</span>
        </div>
      </div>
    </div>
  );
};

export default Login; 