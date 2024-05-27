import React, { useState, useEffect } from 'react';
import Row from './Row';

const colors = [
  '#FFFFFF', '#000000', '#FF0000', '#00FF00', '#0000FF',
  '#FFFF00', '#FF00FF', '#00FFFF', '#C0C0C0', 'transparent'
];

const PIXEL_DATA_URL = '/wp-json/iriz-pixel-api/v1/data';

const fetchPixelArtData = async (id) => {
    return JSON.parse(localStorage.getItem('pixelArt'));
};

const savePixelArt = async (pixels) => {
    localStorage.setItem('pixelArt', JSON.stringify(pixels));
};

const PixelArtEditor = () => {
   const [pixels, setPixels] = useState([]);
  
    useEffect(() => {
    const loadPixelArt = async () => {
        const savedPixels = await fetchPixelArtData();
        console.log(savedPixels);
        setPixels(savedPixels);
    };

    loadPixelArt();
    }); // Add id to the dependency array

  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <span>Select Color: </span>
        {colors.map((color, index) => (
          <button
            key={index}
            style={{
              backgroundColor: color === 'transparent' ? 'white' : color,
              border: `2px solid white`,
              width: 20,
              height: 20,
              marginRight: 5
            }}
          >
            {color === 'transparent' && 'T'}
          </button>
        ))}
      </div>
      <div>
        {pixels.map((row, rowIndex) => (
          <Row key={rowIndex} rowData={row} />
        ))}
        <button onClick={() => savePixelArt(pixels)} >Save</button>
      </div>
    </div>
  );
};

export default PixelArtEditor;
