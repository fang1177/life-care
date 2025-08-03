import React from 'react';

const LifeCareLogo = ({ size = 'medium', className = '' }) => {
  const sizeStyles = {
    small: {
      fontSize: '16px',
      padding: '8px 12px',
      borderRadius: '6px'
    },
    medium: {
      fontSize: '20px',
      padding: '12px 16px',
      borderRadius: '8px'
    },
    large: {
      fontSize: '24px',
      padding: '16px 20px',
      borderRadius: '10px'
    }
  };

  const currentSize = sizeStyles[size];

  return (
    <div 
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      className={className}
    >
      <div
        style={{
          background: 'linear-gradient(135deg, #4CAF50, #45a049)',
          color: 'white',
          fontWeight: 'bold',
          fontFamily: 'Arial, sans-serif',
          textAlign: 'center',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
          transition: 'all 0.3s ease',
          cursor: 'pointer',
          ...currentSize
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'scale(1.05)';
          e.target.style.boxShadow = '0 6px 12px rgba(0,0,0,0.3)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'scale(1)';
          e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
        }}
      >
        <div style={{ fontSize: '0.8em', marginBottom: '2px' }}>LIFE</div>
        <div style={{ fontSize: '1.2em' }}>CARE</div>
      </div>
    </div>
  );
};

export default LifeCareLogo;