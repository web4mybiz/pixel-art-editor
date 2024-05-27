import React from 'react';
import Pixel from './Pixel';

const Row = ({ rowData, onPixelClick }) => {
  return (
    <div style={{ display: 'flex' }}>
      {rowData.map((color, index) => (
        <Pixel key={index} color={color} onClick={() => onPixelClick(index)}  />
      ))}
    </div>
  );
};

export default Row;