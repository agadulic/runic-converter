import React from 'react';

function RunesConverterSVG({ number }, ref) {
  if (number === null || number < 1 || number > 9999) {
    return (
        <svg ref={ref} width="100" height="150" viewBox="-30 -45 60 90" xmlns="http://www.w3.org/2000/svg">
           <style>{svgStyles}</style>
            <line x1="0" y1="-30" x2="0" y2="30" className="stem" />
            <text x="0" y="55" className="label" textAnchor="middle">Enter 1-9999</text>
        </svg>
    );
  }

  const getNumberParts = (num) => {
    const units = num % 10;
    const tens = Math.floor((num % 100) / 10);
    const hundreds = Math.floor((num % 1000) / 100);
    const thousands = Math.floor(num / 1000);
    return { units, tens, hundreds, thousands };
  };

  const { units, tens, hundreds, thousands } = getNumberParts(number);

  const unitId = units > 0 ? `#unit-${units}` : null;
  const tenId = tens > 0 ? `#ten-${tens}` : null;
  const hundredId = hundreds > 0 ? `#hundred-${hundreds}` : null;
  const thousandId = thousands > 0 ? `#thousand-${thousands}` : null;

  return (
    <svg
        ref={ref}
        width="100"
        height="150"
        viewBox="-30 -45 60 90"
        xmlns="http://www.w3.org/2000/svg"
        style={{ margin: '10px 0' }}
        id="rune-svg"
    >
      <style>{svgStyles}</style>
      <defs>
         {/* Basic Stem */}
         <line id="stem-base" x1="0" y1="-30" x2="0" y2="30" className="stem" />

         {/* Units (Top-Right) */}
         <line id="unit-1" x1="0" y1="-30" x2="15" y2="-30" className="symbol" />
         <line id="unit-2" x1="0" y1="-15" x2="15" y2="-15" className="symbol" />
         <line id="unit-3" x1="0" y1="-30" x2="15" y2="-15" className="symbol" />
         <line id="unit-4" x1="0" y1="-15" x2="15" y2="-30" className="symbol" />
         <path id="unit-5" d="M 0 -30 L 15 -30 L 15 -15 L 0 -15 Z" className="symbol" strokeLinejoin="miter"/>
         <line id="unit-6" x1="15" y1="-30" x2="15" y2="-15" className="symbol" />
         <path id="unit-7" d="M 0 -30 L 15 -30 L 15 -15" className="symbol" />
         <path id="unit-8" d="M 0 -15 L 15 -15 L 15 -30" className="symbol" />
         <path id="unit-9" d="M 0 -30 L 15 -30 L 15 -15 L 0 -15 L 0 -30 Z" className="symbol" strokeLinejoin="miter"/>

         {/* Tens (Top-Left) */}
         <line id="ten-1" x1="0" y1="-30" x2="-15" y2="-30" className="symbol" />
         <line id="ten-2" x1="0" y1="-15" x2="-15" y2="-15" className="symbol" />
         <line id="ten-3" x1="0" y1="-30" x2="-15" y2="-15" className="symbol" />
         <line id="ten-4" x1="0" y1="-15" x2="-15" y2="-30" className="symbol" />
         <path id="ten-5" d="M 0 -30 L -15 -30 L -15 -15 L 0 -15 Z" className="symbol" strokeLinejoin="miter"/>
         <line id="ten-6" x1="-15" y1="-30" x2="-15" y2="-15" className="symbol" />
         <path id="ten-7" d="M 0 -30 L -15 -30 L -15 -15" className="symbol" />
         <path id="ten-8" d="M 0 -15 L -15 -15 L -15 -30" className="symbol" />
         <path id="ten-9" d="M 0 -30 L -15 -30 L -15 -15 L 0 -15 L 0 -30 Z" className="symbol" strokeLinejoin="miter"/>

         {/* Hundreds (Bottom-Right) */}
         <line id="hundred-1" x1="0" y1="30" x2="15" y2="30" className="symbol" />
         <line id="hundred-2" x1="0" y1="15" x2="15" y2="15" className="symbol" />
         <line id="hundred-3" x1="0" y1="30" x2="15" y2="15" className="symbol" />
         <line id="hundred-4" x1="0" y1="15" x2="15" y2="30" className="symbol" />
         <path id="hundred-5" d="M 0 30 L 15 30 L 15 15 L 0 15 Z" className="symbol" strokeLinejoin="miter"/>
         <line id="hundred-6" x1="15" y1="30" x2="15" y2="15" className="symbol" />
         <path id="hundred-7" d="M 0 30 L 15 30 L 15 15" className="symbol" />
         <path id="hundred-8" d="M 0 15 L 15 15 L 15 30" className="symbol" />
         <path id="hundred-9" d="M 0 30 L 15 30 L 15 15 L 0 15 L 0 30 Z" className="symbol" strokeLinejoin="miter"/>

         {/* Thousands (Bottom-Left) */}
         <line id="thousand-1" x1="0" y1="30" x2="-15" y2="30" className="symbol" />
         <line id="thousand-2" x1="0" y1="15" x2="-15" y2="15" className="symbol" />
         <line id="thousand-3" x1="0" y1="30" x2="-15" y2="15" className="symbol" />
         <line id="thousand-4" x1="0" y1="15" x2="-15" y2="30" className="symbol" />
         <path id="thousand-5" d="M 0 30 L -15 30 L -15 15 L 0 15 Z" className="symbol" strokeLinejoin="miter"/>
         <line id="thousand-6" x1="-15" y1="30" x2="-15" y2="15" className="symbol" />
         <path id="thousand-7" d="M 0 30 L -15 30 L -15 15" className="symbol" />
         <path id="thousand-8" d="M 0 15 L -15 15 L -15 30" className="symbol" />
         <path id="thousand-9" d="M 0 30 L -15 30 L -15 15 L 0 15 L 0 30 Z" className="symbol" strokeLinejoin="miter"/>
      </defs>

      <use href="#stem-base" data-testid='stem-base'/>

      {unitId && <use href={unitId} data-testid={`unit-${units}`} />}
      {tenId && <use href={tenId} data-testid={`ten-${tens}`} />}
      {hundredId && <use href={hundredId} data-testid={`hundred-${hundreds}`} />}
      {thousandId && <use href={thousandId} data-testid={`thousand-${thousands}`} />}

    </svg>
  );
}

const svgStyles = `
  .symbol {
    stroke: #2c3e50; /* Dark blue-grey color */
    stroke-width: 3;
    stroke-linecap: round;
    stroke-linejoin: round;
    fill: none;
  }
  .stem {
    stroke: #2c3e50;
    stroke-width: 3;
    stroke-linecap: round;
  }
   .label {
      font-family: sans-serif;
      font-size: 10px; /* Adjusted size for viewBox */
      text-anchor: middle;
      fill: #555;
    }
`;

export default React.forwardRef(RunesConverterSVG);