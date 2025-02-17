import React from 'react';
import '../styles/aboutUs.css'; // 创建样式文件

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <div className="about-us-top">
      <h1 className="about-title">About Us</h1>
      <p className="about-description1">
        Revolutionizing dining decisions through advanced AI-driven sentiment analysis.
      </p>
      <p className="about-description2">
        We believe in empowering diners with intelligent insights.
        Our platform uses advanced AI to analyze restaurant reviews, providing nuanced, data-driven recommendations that go beyond traditional rating systems
      </p>
      </div>
      <div className="features">
        <div className="feature">
          <img src="/image/star.png" alt="Sentiment Analysis" />
          <h2>Sentiment Analysis</h2>
          <p>Deep learning algorithms that understand the nuanced sentiment behind restaurant reviews.</p>
        </div>
        <div className="feature">
          <img src="/image/clock.png" alt="Review History" />
          <h2>Review History</h2>
          <p>Track and compare restaurant sentiment over time to spot trending establishments.</p>
        </div>
        <div className="feature">
          <img src="/image/people.png" alt="Community Insight" />
          <h2>Community Insight</h2>
          <p>Leverage collective wisdom with aggregated, anonymized review sentiments.</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs; 