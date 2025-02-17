import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios'; // 导入 axios
import { toast } from 'react-toastify'; // 导入通知库
import '../../styles/EditProfile.css'; // 导入新的样式文件

const EditProfile = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    avatar: '/images/default-avatar.png' // 使用本地默认头像
  });
  const history = useHistory();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setUser({
        name: userData.name,
        email: userData.email,
        password: '', // 不显示密码
        avatar: userData.profile_image || '/images/default-avatar.png' // 使用用户头像或默认头像
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log('Uploaded image data:', reader.result); // 添加调试信息
        setUser({ ...user, avatar: reader.result }); // 更新头像
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
        const token = localStorage.getItem('token'); // 获取用户的 token
        const response = await axios.put('http://localhost:5001/api/auth/update', {
            name: user.name,
            email: user.email,
            password: user.password,
            profile_image: user.avatar // 发送头像
        }, {
            headers: {
                Authorization: `Bearer ${token}` // 添加 token 到请求头
            }
        });

        console.log('User updated:', response.data);
        localStorage.setItem('user', JSON.stringify({
            id: response.data.user.id,
            name: response.data.user.name,
            email: response.data.user.email,
            profile_image: response.data.user.profile_image // 确保存储头像
        }));
        toast.success('Save Successfully!'); // 显示成功通知
        history.push('/analysis'); // 重定向到分析页面
    } catch (error) {
        console.error('Error updating user:', error);
        toast.error('Save Failed!'); // 显示失败通知
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1 className="welcome-text">Edit Profile</h1>
        <div className="avatar-container-editprofile">
          <img src={user.avatar} alt="User Avatar" className="avatar-editprofile" />
          <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} id="avatar-upload" />
          <label htmlFor="avatar-upload" className="avatar-upload-label-editprofile">Change Photo</label>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={user.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={user.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="New Password"
              value={user.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="submit-btn">Save</button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile; 