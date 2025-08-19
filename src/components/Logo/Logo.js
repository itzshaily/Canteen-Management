import React from 'react';
import { Link } from 'react-router-dom';
import './Logo.css';

const Logo = ({ onClick, size = 'medium' }) => {
  const sizeClasses = {
    small: 'logo-small',
    medium: 'logo-medium', 
    large: 'logo-large'
  };

  return (
    <Link 
      to="/" 
      className={`logo-container ${sizeClasses[size]}`}
      onClick={onClick}
    >
      <div className="logo-wrapper">
        {/* Animated Food Icon */}
        <div className="logo-icon">
          <div className="plate">
            <div className="food-item food-1"></div>
            <div className="food-item food-2"></div>
            <div className="food-item food-3"></div>
          </div>
          <div className="steam steam-1"></div>
          <div className="steam steam-2"></div>
          <div className="steam steam-3"></div>
        </div>
        
        {/* Brand Name */}
        <div className="brand-text">
          <h1 className="brand-name">
            <span className="brand-main">Tasty</span>
            <span className="brand-sub">Bites</span>
          </h1>
          <p className="brand-tagline">Fresh • Fast • Delicious</p>
        </div>
      </div>
    </Link>
  );
};

export default Logo;
