import React from 'react';
import ProductCard from './ProductCard';

const products = [
  {
    image: 'https://images.unsplash.com/photo-1644483878413-1bdfe8d1180c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXR3ZWFyJTIwamFja2V0JTIwbW9kZWwlMjBoYWxmdG9uZXxlbnwxfHx8fDE3NjU0ODc1OTV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    imageHover: 'https://images.unsplash.com/photo-1488475183300-96646dec4588?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXR3ZWFyJTIwamFja2V0JTIwbW9kZWwlMjBiYWNrfGVufDF8fHx8MTc2NTUxNzQ1NXww&ixlib=rb-4.1.0&q=80&w=1080',
    name: 'COSMIC ARCHIVE JACKET',
    description: 'PHASE-SHIFT COTTON',
    itemCode: '1100',
    serialCode: 'AJ-001-BLK',
    price: '$276.00',
    buttonText: 'VIEW DATA',
    soldOut: false
  },
  {
    image: 'https://images.unsplash.com/photo-1647797819874-f51a8a8fc5c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMGhvb2RpZSUyMGZhc2hpb258ZW58MXx8fHwxNzY1Mzk2NTE0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    imageHover: 'https://images.unsplash.com/photo-1648320397369-85ab3fa368bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMGhvb2RpZSUyMGZhc2hpb24lMjBiYWNrfGVufDF8fHx8MTc2NTUxNzQ1Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    name: 'COSMIC DEPARTMENT',
    description: 'PRECISE-SHIFT COTTON',
    itemCode: '1200',
    serialCode: 'TS-002-BLK',
    price: '$276.00',
    buttonText: 'VIEW DATA',
    soldOut: false
  },
  {
    image: 'https://images.unsplash.com/photo-1761637328025-bccb6ce8af34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMGJvbWJlciUyMGphY2tldHxlbnwxfHx8fDE3NjU0ODc1OTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    imageHover: 'https://images.unsplash.com/photo-1610902209080-8863566e17c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMGJvbWJlciUyMGphY2tldCUyMGJhY2t8ZW58MXx8fHwxNzY1NTE3NDU2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    name: 'COSMIC ACTION JACKET',
    description: 'NYLON-COTTON MIX',
    itemCode: '1100',
    serialCode: 'JK-003-WHT',
    price: '$276.00',
    buttonText: 'ACQUIRE',
    soldOut: false
  },
  {
    image: 'https://images.unsplash.com/photo-1764593008673-af6056758b4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXR3ZWFyJTIwcGF0dGVybiUyMGphY2tldHxlbnwxfHx8fDE3NjU0ODc1OTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    imageHover: 'https://images.unsplash.com/photo-1687275162537-b00d99c3ec46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXR0ZXJuJTIwc3dlYXRlciUyMG1vZGVsJTIwYmFja3xlbnwxfHx8fDE3NjU1MTc0NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    name: 'ASTRAL TIME FLAME CREW',
    description: 'LUNAR KNIT PATTERN',
    itemCode: '1500',
    serialCode: 'SW-004-PTN',
    price: '$111.00',
    buttonText: 'VIEW DATA',
    soldOut: true
  },
  {
    image: 'https://images.unsplash.com/photo-1572689535562-3c54a15292d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXR3ZWFyJTIwY2FyZ28lMjBwYW50cyUyMG1vZGVsfGVufDF8fHx8MTc2NTUxOTQwNnww&ixlib=rb-4.1.0&q=80&w=1080',
    imageHover: 'https://images.unsplash.com/photo-1762915351121-223ba32b453d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJnbyUyMHBhbnRzJTIwYmFjayUyMHZpZXd8ZW58MXx8fHwxNzY1NTE5NDIzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    name: 'ORBITAL CARGO SYSTEM',
    description: 'TACTICAL RIPSTOP',
    itemCode: '2100',
    serialCode: 'CP-005-OLV',
    price: '$198.00',
    buttonText: 'VIEW DATA',
    soldOut: false
  },
  {
    image: 'https://images.unsplash.com/photo-1620122830785-a18b43585b44?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMHR1cnRsZW5lY2slMjBmYXNoaW9ufGVufDF8fHx8MTc2NTUxMjc0MHww&ixlib=rb-4.1.0&q=80&w=1080',
    imageHover: 'https://images.unsplash.com/photo-1523381294911-8d3cead13475?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0dXJ0bGVuZWNrJTIwZmFzaGlvbiUyMGJhY2t8ZW58MXx8fHwxNjU1MTk0MjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    name: 'VOID BASIC TURTLENECK',
    description: 'MERINO WOOL BLEND',
    itemCode: '2200',
    serialCode: 'TN-006-BLK',
    price: '$142.00',
    buttonText: 'ACQUIRE',
    soldOut: false
  },
  {
    image: 'https://images.unsplash.com/photo-1764698192249-641a17d7a4fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdmVyc2l6ZWQlMjBjb2F0JTIwc3RyZWV0d2VhcnxlbnwxfHx8fDE3NjU1MTk0MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    imageHover: 'https://images.unsplash.com/photo-1658889809679-42bf8de82d8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb25nJTIwY29hdCUyMGJhY2t8ZW58MXx8fHwxNzY1NTE5NDI0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    name: 'DIMENSION LONG COAT',
    description: 'OVERSIZED WOOL',
    itemCode: '2300',
    serialCode: 'CT-007-TAN',
    price: '$424.00',
    buttonText: 'VIEW DATA',
    soldOut: false
  },
  {
    image: 'https://images.unsplash.com/photo-1614714053570-6c6b6aa54a6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ25lciUyMGNhcCUyMHN0cmVldHdlYXJ8ZW58MXx8fHwxNzY1NTE5NDIyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    imageHover: 'https://images.unsplash.com/photo-1764796958279-9bd9ebce3fcf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXR3ZWFyJTIwY2FwJTIwc2lkZXxlbnwxfHx8fDE3NjU1MTk0MjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    name: 'SIGNAL CAP ARCHIVE',
    description: 'EMBROIDERED TWILL',
    itemCode: '2400',
    serialCode: 'AC-008-BLK',
    price: '$68.00',
    buttonText: 'ACQUIRE',
    soldOut: false
  }
];

export default function ProductGrid() {
  return (
    <section className="py-[0px] px-[16px] grain-texture relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-8 bg-cream p-4 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-[14px] md:text-[18px]" style={{ letterSpacing: '0.0125em' }}>NEW ARRIVALS</h2>
              <span className="text-gray-600 text-[14px] md:text-[18px]">//</span>
              <div className="tech-label text-[rgb(0,0,0)] text-[14px] md:text-[18px]" style={{ letterSpacing: '0.0125em' }}>DATA STREAM 01</div>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-gray-600">///</span>
              <div className="tech-label text-[15px]">+</div>
              
              {/* Progress indicator */}
              <div className="hidden md:flex items-center gap-1">
                <div className="w-20 h-1.5 border border-black bg-white relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-3/4 bg-black"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Corner brackets */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-black -mt-[2px] -ml-[2px]"></div>
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-black -mt-[2px] -mr-[2px]"></div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <ProductCard key={index} {...product} isAlternate={index % 2 === 1} />
          ))}
        </div>

        {/* Decorative Wave Pattern */}
        <div className="mt-12 pt-8 relative overflow-hidden" style={{ height: '120px' }}>
          <svg 
            className="absolute inset-0 w-full h-full opacity-20"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            {/* Wave pattern */}
            <path 
              d="M0,60 Q150,20 300,60 T600,60 T900,60 T1200,60"
              fill="none"
              stroke="#1a1a1a"
              strokeWidth="1"
            />
            <path 
              d="M0,80 Q150,40 300,80 T600,80 T900,80 T1200,80"
              fill="none"
              stroke="#1a1a1a"
              strokeWidth="1"
            />
            {/* Orbit circles */}
            <circle cx="300" cy="60" r="3" fill="#1a1a1a"/>
            <circle cx="600" cy="60" r="3" fill="#1a1a1a"/>
            <circle cx="900" cy="60" r="3" fill="#1a1a1a"/>
            {/* Stars */}
            <text x="100" y="40" fontSize="16" fill="#1a1a1a">✦</text>
            <text x="450" y="30" fontSize="12" fill="#1a1a1a">✦</text>
            <text x="750" y="45" fontSize="14" fill="#1a1a1a">✦</text>
            <text x="1050" y="35" fontSize="12" fill="#1a1a1a">✦</text>
          </svg>

          {/* Coordinate marker */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2 tech-label text-[0.6rem] text-gray-600">
            ⊕ LAT: +48.856 / LONG: +2.352
          </div>
        </div>
      </div>
    </section>
  );
}