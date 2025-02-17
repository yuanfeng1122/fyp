import React, { useState } from 'react';
import '../../styles/analysis.css';

const Analysis = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="analysis-container">
      <h1 className="page-title">Sentiment Analysis</h1>
      
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter Restaurant Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button className="search-btn">
          <i className="fas fa-search"></i>
        </button>
      </div>

      <div className="sentiment-cards">
        <div className="sentiment-card positive">
          <div className="emoji">😊</div>
          <p className="sentiment-text">The food is fantastic</p>
          <span className="sentiment-label">Positive</span>
        </div>

        <div className="sentiment-card neutral">
          <div className="emoji">😐</div>
          <p className="sentiment-text">The food is Normal</p>
          <span className="sentiment-label">Neutral</span>
        </div>

        <div className="sentiment-card negative">
          <div className="emoji">😞</div>
          <p className="sentiment-text">The food is disgusting</p>
          <span className="sentiment-label">Negative</span>
        </div>
      </div>
    </div>
  );
};

export default Analysis; 