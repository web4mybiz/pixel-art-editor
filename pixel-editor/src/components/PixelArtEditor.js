import React, { useState, useEffect } from 'react';
import Row from './Row';

const colors = [
  '#FFFFFF', '#000000', '#FF0000', '#00FF00', '#0000FF',
  '#FFFF00', '#FF00FF', '#00FFFF', '#C0C0C0', 'transparent'
];

const PIXEL_DATA_URL = '/wp-json/iriz-pixel-api/v1/data';
const id = 1; // Replace with the actual ID you need to pass

const fetchPixelArtData = async (id) => {
  try {
    const response = await fetch(`${PIXEL_DATA_URL}?id=${id}`);
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    const data = await response.json();
    const pixelData = JSON.parse(data.pixels);
    return pixelData || Array(16).fill().map(() => Array(16).fill('#FFFFFF'));
  } catch (error) {
    console.error('Error fetching pixel art data:', error);
    return Array(16).fill().map(() => Array(16).fill('#FFFFFF'));
  }
};

const savePixelArt = async (pixels, setSaved, setSaveText) => {
  try {
    const queryParams = new URLSearchParams({ pixels: JSON.stringify(pixels) });
    const response = await fetch(`${PIXEL_DATA_URL}?${queryParams}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const result = await response.json();
    setSaveText('Saved');
    setSaved(true);
  } catch (error) {
    console.error('Error saving pixel art data:', error);
  }
};

const PixelArtEditor = () => {
  const [pixels, setPixels] = useState([]);
  const [saved, setSaved] = useState(true);
  const [selectedColor, setSelectedColor] = useState('#000000');
  const [loading, setLoading] = useState(true);
  const [saveText, setSaveText] = useState('Save Pixel Art');

  useEffect(() => {
    const loadPixelArt = async () => {
      const savedPixels = await fetchPixelArtData(id);
      setPixels(savedPixels);
      setLoading(false);
    };
  
    loadPixelArt();
  }, [id]); // Add id to the dependency array

  const handlePixelClick = (rowIndex, colIndex) => {
    
    const newPixels = pixels.map((row, rIdx) =>
      row.map((pixel, cIdx) => (rIdx === rowIndex && cIdx === colIndex ? selectedColor : pixel))
    );
    
    setPixels(newPixels);
    setSaveText('Save Pixel Art');
    setSaved(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <span>Select Color: </span>
        {colors.map((color, index) => (
          <button
            key={index}
            onClick={() => setSelectedColor(color)}
            style={{
              backgroundColor: color === 'transparent' ? 'white' : color,
              border: `2px solid ${color === selectedColor ? 'black' : 'white'}`,
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
          <Row key={rowIndex} rowData={row} onPixelClick={(colIndex) => handlePixelClick(rowIndex, colIndex)} />
        ))}
        <button onClick={() => savePixelArt(pixels, setSaved, setSaveText)} disabled={saved}>{saveText}</button>
      </div>
    </div>
  );
};

export default PixelArtEditor;