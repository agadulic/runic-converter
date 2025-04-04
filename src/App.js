import React, { useState, useRef, useCallback } from 'react';
import RunesConverterSVG from './RunesConverterSVG';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [number, setNumber] = useState(null);
  const [error, setError] = useState('');
  const svgRef = useRef(null);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    if (value === '') {
      setError('');
      setNumber(null);
      return;
    }

    const num = parseInt(value, 10);

    if (isNaN(num) || !Number.isInteger(num)) {
      setError('Please enter a valid whole number.');
      setNumber(null);
    } else if (num < 1 || num > 9999) {
      setError('Number must be between 1 and 9999.');
      setNumber(null);
    } else {
      setError('');
      setNumber(num);
    }
  };

  const handleDownload = useCallback(() => {
    if (!svgRef.current || number === null) {
      alert("Please enter a valid number (1-9999) first.");
      return;
    }

    const svgElement = svgRef.current;
    const svgWidthAttr = svgElement.getAttribute('width');
    const svgHeightAttr = svgElement.getAttribute('height');
    const viewBox = svgElement.viewBox.baseVal;

    const baseWidth = svgWidthAttr && !isNaN(parseFloat(svgWidthAttr)) ? parseFloat(svgWidthAttr) : viewBox.width;
    const baseHeight = svgHeightAttr && !isNaN(parseFloat(svgHeightAttr)) ? parseFloat(svgHeightAttr) : viewBox.height;

    if (!baseWidth || !baseHeight) {
      console.error("Could not determine SVG dimensions for canvas.");
      alert("Error determining SVG size. Cannot generate JPG.");
      return;
    }

    const svgXml = new XMLSerializer().serializeToString(svgElement);
    const svgDataUrl = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgXml)));
    const img = new Image();

    img.onload = () => {
      console.log("Image loaded successfully. Dimensions:", img.width, img.height);
      const scale = 3;
      const padding = 30;
      const canvas = document.createElement('canvas');
      const imgWidth = img.width || baseWidth;
      const imgHeight = img.height || baseHeight;
      canvas.width = imgWidth * scale + padding * 2;
      canvas.height = imgHeight * scale + padding * 2;
      const ctx = canvas.getContext('2d');

      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const drawX = padding;
      const drawY = padding;
      const drawWidth = imgWidth * scale;
      const drawHeight = imgHeight * scale;

      console.log(`Canvas: ${canvas.width}x${canvas.height}`);
      console.log(`Drawing image at (${drawX}, ${drawY}) with size ${drawWidth}x${drawHeight}`);

      try {
        ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
        console.log("drawImage completed");

        const jpgDataUrl = canvas.toDataURL('image/jpeg', 0.95);
        const link = document.createElement('a');
        link.href = jpgDataUrl;
        link.download = `rune_${number}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        console.log("Download triggered.");
      } catch (e) {
        console.error("Error during drawImage:", e);
        alert("Error drawing the image onto the canvas. Check console.");
      }
    };

    img.onerror = (e) => {
      console.error("Error loading SVG data URL into Image object:", e);
      console.error("SVG Data URL used (start):", svgDataUrl.substring(0, 200) + "...");
      alert("Could not load the generated SVG as an image. The SVG might be invalid or contain unsupported features. Check console for details.");
    };

    img.src = svgDataUrl;
    console.log("Setting img.src...");
  }, [number]);

  return (
    <div className="App">
      <h1>Rune Numeral Converter</h1>
      <div className="input-area">
        <label htmlFor="numberInput">Enter Number (1-9999): </label>
        <input
          type="number"
          id="numberInput"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="e.g., 1992"
          min="1"
          max="9999"
          step="1"
          aria-describedby="error-message"
        />
        {error && <p id="error-message" className="error">{error}</p>}
      </div>

      <div className="output-area">
        <h2>Numeral:</h2>
        <RunesConverterSVG number={number} ref={svgRef} />
      </div>

      <button onClick={handleDownload} disabled={!number}>
        Download as JPG
      </button>
    </div>
  );
}

export default App;
