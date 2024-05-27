import React from 'react';

const Pixel = ({ color, onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        width: 20,
        height: 20,
        backgroundColor: color === 'transparent' ? 'rgba(0,0,0,0)' : color,
        border: '1px solid #000'
      }}
    />
  );
};

export default Pixel;
