import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t-4 border-black bg-cream grain-texture">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Left Column - Large Paragraph and Branding (~2/3 width = 8 cols) */}
          <div className="md:col-span-8 space-y-4">
            {/* Technical Paragraph */}
            <div className="barcode-text text-[0.65rem] md:text-[0.7rem] leading-relaxed text-black">
              <p className="mb-3 text-[10px] font-bold">
                AU CIEL REPRESENTS A NEW ERA IN COSMIC APPAREL TECHNOLOGY. 
                EACH GARMENT IS PRECISION-ENGINEERED FOR URBAN EXPLORATION AND 
                INTERSTELLAR READINESS. OUR PHASE-SHIFT COTTON BLEND ADAPTS TO 
                ENVIRONMENTAL CONDITIONS WHILE MAINTAINING STRUCTURAL INTEGRITY 
                ACROSS MULTIPLE ATMOSPHERIC PRESSURES.
              </p>
              <p className="text-[10px] font-bold">
                MANUFACTURED IN ACCORDANCE WITH GALACTIC TEXTILE STANDARDS 
                (GTS-2088) AND CERTIFIED FOR ORBITAL DEPLOYMENT. ALL MATERIALS 
                SOURCED FROM SUSTAINABLE TERRESTRIAL ORIGINS.
              </p>
            </div>

            {/* Copyright Line with Oval Logo and Barcode */}
            <div className="flex items-center justify-between">
              <span className="barcode-text md:text-[0.65rem] font-bold text-black text-[15px]">© 2025 AU CIEL // EST. 2088</span>
              
              <span className="barcode-text md:text-[0.65rem] flex gap-0.5 text-black text-[24px]">
                <span>✦</span>
                <span>✦</span>
                <span>✦</span>
                <span>✦</span>
                <span className="text-[10px]">✦</span>
              </span>

              {/* Oval Logo */}
              <svg width="80" height="40" viewBox="0 0 80 40" className="border-2 border-black">
                <ellipse cx="40" cy="20" rx="35" ry="15" fill="none" stroke="#1a1a1a" strokeWidth="1.5"/>
                <text x="40" y="24" fontSize="8" fill="#1a1a1a" textAnchor="middle" fontFamily="monospace" fontWeight="bold">
                  AU CIEL
                </text>
              </svg>

              {/* Barcode */}
              <div>
                <svg viewBox="0 0 80 30" className="w-24 h-8">
                  {[2, 1, 3, 1, 2, 1, 3, 2, 1, 3, 1, 2, 1, 3, 2, 1, 3, 1, 2, 1, 3, 2, 1, 2].map((width, i) => (
                    <rect 
                      key={i}
                      x={i * 3.2}
                      y="2"
                      width={width * 0.8}
                      height="26"
                      fill="#1a1a1a"
                    />
                  ))}
                </svg>
                <div className="barcode-text text-[0.5rem] text-center">
                  4750262088305
                </div>
              </div>
            </div>
          </div>

          {/* Middle Column - Technical Data (2 cols) */}
          <div className="md:col-span-2 space-y-2">
            <div className="barcode-text text-[0.6rem] md:text-[0.65rem] space-y-1.5 text-black">
              <div className="text-[9px]"><span className="font-black">DATA:</span> COSMIC-APPAREL-SYS</div>
              <div className="text-[9px]"><span className="font-black">MATERIALS:</span> PHASE-COTTON</div>
              <div className="text-[9px]"><span className="font-black">SHOCK:</span> RESISTANT / ORBITAL</div>
              <div className="text-[9px]"><span className="font-black">SERIAL NO.:</span> 475-XG-2088</div>
              <div className="text-[9px]"><span className="font-black">COORD:</span> 48.8566° N, 2.3522° E</div>
              <div className="text-[9px]"><span className="font-black">STATUS:</span> ◆ OPERATIONAL</div>
            </div>
          </div>

          {/* Right Column - QR Code (2 cols) */}
          <div className="md:col-span-2 flex justify-center md:justify-end">
            <div className="w-24 h-24 md:w-28 md:h-28 border-2 border-black p-2 bg-white">
              <svg viewBox="0 0 29 29" className="w-full h-full">
                {/* QR Code Pattern */}
                {[...Array(29)].map((_, y) => 
                  [...Array(29)].map((_, x) => {
                    // Create finder patterns in corners
                    const isFinderTopLeft = (x < 7 && y < 7);
                    const isFinderTopRight = (x > 21 && y < 7);
                    const isFinderBottomLeft = (x < 7 && y > 21);
                    
                    let shouldFill = Math.random() > 0.5;
                    
                    // Finder pattern logic
                    if (isFinderTopLeft || isFinderTopRight || isFinderBottomLeft) {
                      const fx = isFinderTopRight ? x - 22 : (isFinderBottomLeft ? x : x);
                      const fy = isFinderBottomLeft ? y - 22 : y;
                      shouldFill = (fx === 0 || fx === 6 || fy === 0 || fy === 6 || (fx >= 2 && fx <= 4 && fy >= 2 && fy <= 4));
                    }
                    
                    return shouldFill && (
                      <rect 
                        key={`${x}-${y}`}
                        x={x}
                        y={y}
                        width="1"
                        height="1"
                        fill="#1a1a1a"
                      />
                    );
                  })
                )}
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Final Technical Strip */}
      <div className="border-t-2 border-black bg-black text-cream py-2">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2 barcode-text text-[0.55rem]">
            <div className="flex items-center gap-4">
              <span>■ AUCIEL COSMIC APPAREL SYSTEM // EST. 2088</span>
              <span>|</span>
              <span>PARIS, FRANCE // EARTH</span>
            </div>
            <div className="flex items-center gap-4">
              <span>REV. 1.0.0</span>
              <span>|</span>
              <span>BUILD: 20881211</span>
              <span>|</span>
              <span>STATUS: ◆ ONLINE</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}