import React from 'react';

export default function Header() {
  return (
    <header className="bg-cream relative grain-texture md:py-8 px-[0px] py-[10px]">
      <div className="px-0.5">
        {/* Rectangular Border Container */}
        <div className="border-2 border-black p-[0px]">
          {/* Top Row */}
          <div className="border-b-2 border-black px-2 md:px-4 py-2 md:py-3 flex items-center justify-between gap-2 h-[32px] md:h-[40px]">
            {/* Left: Brand Name */}
            <div className="flex items-center gap-1 md:gap-2">
              <span className="tech-label tracking-[0.00625em] text-[11px] md:text-[1rem] font-normal">AUCIEL</span>
              <span className="text-gray-600 text-[0.6rem] md:text-[1rem]">//</span>
              <span className="tech-label tracking-[0.00625em] font-black text-[11px] md:text-[1rem] font-bold not-italic">COSMIC APPAREL SYSTEM</span>
            </div>

            {/* Center: Four Pointed Stars */}
            <div className="flex items-center gap-1 md:gap-3">
              <span className="text-black text-[16px] md:text-2xl">✦ ✦ ✦</span>
            </div>

            {/* Right: Coordinates */}
            <div className="tech-label tracking-[0.00625em] text-[7px] md:text-[1rem]">
              40.7128° N, 74.0060° W
            </div>
          </div>

          {/* Bottom Row - Always 3 Columns */}
          <div className="grid grid-cols-5 h-[32px] md:h-[40px] overflow-hidden">
            {/* Left Column: Technical Data */}
            <div className="col-span-2 px-2 flex items-center relative after:absolute after:right-0 after:top-0 after:bottom-0 after:w-[2px] after:bg-black">
              <div className="barcode-text leading-tight space-y-0">
                <div className="text-[4px] md:text-[7px]"><span className="font-black">TECHNICAL ERATE:</span> <span className="font-black">DORAM</span> <span className="ml-2 md:ml-8 font-black">OKKE</span> <span className="font-black">40 0035 055</span></div>
                <div className="text-[4px] md:text-[7px]"><span className="font-black">OROURGRBRASS, DASS-CALIX / ASS OSSIX</span></div>
                <div className="text-[4px] md:text-[7px]"><span className="font-black">DATA OORECT EST 2087</span> <span className="mx-1 md:mx-2">//</span> 40.7128° N, 74.0060° W</div>
              </div>
            </div>

            {/* Middle Column: Specification */}
            <div className="col-span-1 px-2 md:px-4 flex items-center relative after:absolute after:right-0 after:top-0 after:bottom-0 after:w-[2px] after:bg-black">
              <div className="barcode-text leading-tight space-y-0">
                <div className="text-[4px] md:text-[7px]"><span className="font-black">SPECIFICATION: URBAN EXPLORER</span></div>
                <div className="text-[4px] md:text-[7px]"><span className="font-black">MATERIAL: PHASE-SHIFT</span></div>
                <div className="text-[4px] md:text-[7px]"><span className="font-black">SERIAL NO:</span> 475-XG</div>
              </div>
            </div>

            {/* Right Column: Buttons */}
            <div className="col-span-2 px-1 md:px-4 flex items-center justify-end md:justify-between gap-1 md:gap-2">
              <button 
                className="w-14 md:w-32 md:px-4 md:py-2 border-2 border-black bg-cream hover:bg-black hover:text-cream transition-colors p-[0px] text-[10px] rounded-[4px]"
                aria-label="Search"
              >
                <span className="tech-label md:text-[0.7rem] tracking-wider text-[8px]">SEARCH</span>
              </button>
              <button 
                className="w-14 md:w-32 md:px-4 md:py-2 border-2 border-black bg-[#d4a147] hover:bg-[#c99640] transition-colors text-[10px] p-[0px] rounded-[4px]"
                aria-label="Cart"
              >
                <span className="tech-label text-[0.5rem] md:text-[0.7rem] tracking-wider">CART</span>
              </button>
              <button 
                className="md:w-32 md:px-4 md:py-2 border-2 border-black bg-[#d4a147] hover:bg-[#c99640] transition-colors p-[0px] px-[12px] py-[0px] text-[10px] rounded-[4px]"
                aria-label="Menu"
              >
                <span className="tech-label text-[0.5rem] md:text-[0.7rem] tracking-wider">MENU</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}