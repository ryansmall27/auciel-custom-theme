import React from 'react';

interface HeroSectionProps {
  heroImage: string;
}

export default function HeroSection({ heroImage }: HeroSectionProps) {
  return (
    <section className="relative pb-8 grain-texture overflow-hidden p-[0px]">
      {/* Main Hero Panel - Full Width */}
      <div className="relative bg-cream pb-8 md:pb-12 px-[2px] py-[0px]">
        <div className="relative">
          {/* Giant AU CIEL Text with Halftone Image */}
          <div className="relative aspect-[3/4] md:aspect-[16/9] w-full">
            {/* Custom SVG Border */}
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none z-40"
              preserveAspectRatio="none"
              viewBox="0 0 300.53 408.32"
            >
              <defs>
                <style>
                  {`.cls-1, .cls-2 {
                    stroke: #000;
                    stroke-miterlimit: 10;
                  }
                  .cls-2 {
                    fill: none;
                  }`}
                </style>
              </defs>
              <g>
                <polygon className="cls-2" points=".5 9.72 9.93 .5 110.04 .5 121.4 12.08 289.02 12.08 299.74 22.58 300.03 391.23 282 407.82 9.78 407.82 .5 399.01 .5 9.72" vectorEffect="non-scaling-stroke" strokeWidth="2"/>
                <polygon className="cls-1" points="124.12 8.75 116.73 1.08 136.41 1.08 143.71 8.75 124.12 8.75" vectorEffect="non-scaling-stroke" strokeWidth="2"/>
                <polygon className="cls-1" points="139.92 1.08 146.95 8.75 151.86 8.75 144.37 1.08 139.92 1.08" vectorEffect="non-scaling-stroke" strokeWidth="2"/>
                <polygon className="cls-1" points="147.53 1.08 154.89 8.75 157.34 8.75 150.17 1.08 147.53 1.08" vectorEffect="non-scaling-stroke" strokeWidth="2"/>
              </g>
            </svg>

            {/* Background Striped Pattern */}
            <div 
              className="absolute inset-0 halftone-overlay"
              style={{
                background: `repeating-linear-gradient(
                  0deg,
                  #7ba5c9 0px,
                  #7ba5c9 20px,
                  #f5f1e8 20px,
                  #f5f1e8 40px
                )`
              }}
            ></div>

            {/* Giant AU CIEL Text */}
            <div 
              className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
              style={{
                fontSize: 'clamp(4rem, 12vw, 8rem)',
                fontWeight: 900,
                lineHeight: 0.85,
                letterSpacing: '-0.04em'
              }}
            >
              <div className="text-center" style={{
                color: '#f5f1e8',
                WebkitTextStroke: '2px #1a1a1a',
                textShadow: '4px 4px 0px rgba(0,0,0,0.1)',
                mixBlendMode: 'multiply'
              }}>
                AU<br/>CIEL
              </div>
            </div>

            {/* Halftone Hero Image */}
            <div className="absolute inset-0 z-20 halftone-overlay">
              <img 
                src={heroImage}
                alt="AU CIEL Featured Model"
                className="w-full h-full object-cover"
                style={{
                  mixBlendMode: 'multiply',
                  filter: 'contrast(1.1) grayscale(0.2)'
                }}
              />
            </div>

            {/* Decorative Orbital Lines */}
            <svg 
              className="absolute -right-12 top-1/2 -translate-y-1/2 w-32 h-32 opacity-30 pointer-events-none z-30"
              viewBox="0 0 100 100"
            >
              <circle cx="50" cy="50" r="30" fill="none" stroke="#1a1a1a" strokeWidth="0.5"/>
              <circle cx="50" cy="50" r="40" fill="none" stroke="#1a1a1a" strokeWidth="0.5" strokeDasharray="2,2"/>
              <circle cx="50" cy="50" r="2" fill="#1a1a1a"/>
            </svg>

            {/* SHOP Button - Positioned on the border line */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-50">
              <button 
                className="px-12 md:px-16 py-3 md:py-4 bg-[#d4a147] border-2 border-black rounded-md hover:translate-y-[4px] hover:shadow-none transition-all"
                style={{
                  boxShadow: '0 4px 0 0 #000'
                }}
              >
                <span className="tracking-wider text-[0.9rem] md:text-[1rem]">SHOP</span>
              </button>
            </div>

            {/* Decorative Star - Bottom right at midpoint of angled corner */}
            <div 
              className="absolute z-30 text-black text-2xl md:text-3xl"
              style={{ 
                bottom: '-1.2%',
                right: '3.2%'
              }}
            >
              ✦
            </div>

            {/* Coordinates Text - Bottom Left */}
            <div 
              className="absolute z-30 text-black text-[9px] md:text-sm tracking-wide opacity-70" 
              style={{ 
                fontFamily: 'monospace',
                bottom: 'calc(-1.2% - 8px)',
                left: '3.5%'
              }}
            >
              0-20° 80°83.74°
            </div>
          </div>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-1/4 right-0 w-64 h-64 opacity-5 pointer-events-none">
        <svg viewBox="0 0 200 200">
          <path d="M100,20 Q150,50 150,100 T100,180 Q50,150 50,100 T100,20" 
                fill="none" 
                stroke="#1a1a1a" 
                strokeWidth="1"/>
        </svg>
      </div>
    </section>
  );
}