import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import '../../styles/layout.css';

const MainLayout = ({ children }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [userData, setUserData] = useState({
    profile_image: '/images/default-avatar.png' // 使用本地默认头像
  });
  const history = useHistory();
  
  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem('user'));
    if (storedUserData) {
      setUserData(storedUserData);
    }
  }, []);

  const handleLogout = () => {
    // 清除localStorage中的用户信息和token
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    history.push('/login');
  };

  return (
    <div className="main-layout">
      <nav className="navbar">
        <div className="nav-left">
          <Link to="/" className="logo">
            Review<span className="highlight">Bites</span>
          </Link>
          <div className="nav-links">
            <Link to="/analysis" className="nav-link">Analysis</Link>
            <Link to="/history" className="nav-link">History</Link>
            <Link to="/community" className="nav-link">Community</Link>
            <Link to="/about" className="nav-link">About Us</Link>
          </div>
        </div>
        
        <div className="nav-right">
          <div className="notification-icon">
            <i className="fas fa-bell"></i>
          </div>
          {userData && (
            <div 
              className="user-profile"
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <img src={userData.profile_image} alt="user" className="avatar" />
              <div className="user-info">
                <span className="user-name">{userData.name}</span>
                <span className="user-email">{userData.email}</span>
              </div>
              
              {showDropdown && (
                <div className="profile-dropdown">
                  <div className="dropdown-item" onClick={() => history.push('/profile/edit')}>
                    <i className="fas fa-user-edit"></i>
                    Edit Profile
                  </div>
                  <div className="dropdown-item delete" onClick={() => history.push('/profile/delete')}>
                    <i className="fas fa-trash"></i>
                    Delete Account
                  </div>
                  <div className="dropdown-item" onClick={handleLogout}>
                    <i className="fas fa-sign-out-alt"></i>
                    Logout
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
      
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default MainLayout; 