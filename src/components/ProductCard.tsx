import React from 'react';

interface ProductCardProps {
  image: string;
  imageHover?: string;
  name: string;
  description: string;
  itemCode: string;
  serialCode: string;
  price: string;
  buttonText: string;
  soldOut?: boolean;
  isAlternate?: boolean;
}

export default function ProductCard({
  image,
  imageHover,
  name,
  description,
  itemCode,
  serialCode,
  price,
  buttonText,
  soldOut = false,
  isAlternate = false
}: ProductCardProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const animationFrameRef = React.useRef<number>();
  const [isHovered, setIsHovered] = React.useState(false);
  const [currentImageSrc, setCurrentImageSrc] = React.useState(image);
  const [img1] = React.useState(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = image;
    return img;
  });
  const [img2] = React.useState(() => {
    if (!imageHover) return null;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageHover;
    return img;
  });

  // Set canvas size based on container
  React.useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      
      // Redraw after resize
      const img = currentImageSrc === image ? img1 : img2;
      if (img && img.complete) {
        drawPixelated(img, 1);
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [currentImageSrc, image, img1, img2]);

  // Draw image with pixelation effect
  const drawPixelated = React.useCallback((img: HTMLImageElement, blockSize: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Disable image smoothing for sharp pixels
    ctx.imageSmoothingEnabled = false;

    // Calculate scaled dimensions (blockSize 1 = full quality, blockSize 0.12 = very pixelated)
    const scaledW = Math.max(1, Math.floor(canvasWidth * blockSize));
    const scaledH = Math.max(1, Math.floor(canvasHeight * blockSize));

    // Draw image small first
    ctx.drawImage(img, 0, 0, scaledW, scaledH);

    // Scale it back up to create pixelated effect
    ctx.drawImage(canvas, 0, 0, scaledW, scaledH, 0, 0, canvasWidth, canvasHeight);
  }, []);

  // Animate pixelation transition
  const animatePixelation = React.useCallback((
    fromImg: HTMLImageElement,
    toImg: HTMLImageElement,
    duration: number = 500
  ) => {
    const startTime = performance.now();
    
    // Define discrete pixelation steps - less extreme to keep images visible
    const pixelSteps = [1, 0.8, 0.6, 0.4, 0.25, 0.15, 0.12, 0.15, 0.25, 0.4, 0.6, 0.8, 1];
    const stepDuration = duration / (pixelSteps.length - 1);
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Calculate which step we're on
      const stepIndex = Math.min(
        Math.floor(progress * (pixelSteps.length - 1)),
        pixelSteps.length - 1
      );
      const blockSize = pixelSteps[stepIndex];
      
      // Switch images at the midpoint (most pixelated)
      const midPoint = Math.floor(pixelSteps.length / 2);
      const currentImg = stepIndex < midPoint ? fromImg : toImg;
      
      drawPixelated(currentImg, blockSize);
      
      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };
    
    animationFrameRef.current = requestAnimationFrame(animate);
  }, [drawPixelated]);

  // Initial draw
  React.useEffect(() => {
    const img = currentImageSrc === image ? img1 : img2;
    if (!img) return;

    const onLoad = () => {
      drawPixelated(img, 1); // Draw at full quality initially
    };

    if (img.complete) {
      onLoad();
    } else {
      img.addEventListener('load', onLoad);
      return () => img.removeEventListener('load', onLoad);
    }
  }, [currentImageSrc, image, img1, img2, drawPixelated]);

  // Handle hover
  const handleMouseEnter = () => {
    setIsHovered(true);
    
    // Cancel any ongoing animation
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    // If there's a hover image, animate to it, otherwise just glitch the current image
    const targetImg = (imageHover && img2) ? img2 : img1;
    
    // Ensure both images are loaded before animating
    const startAnimation = () => {
      animatePixelation(img1, targetImg);
    };
    
    if (img1.complete && targetImg.complete) {
      startAnimation();
    } else {
      // Wait for images to load
      let img1Ready = img1.complete;
      let targetReady = targetImg.complete;
      
      const checkReady = () => {
        if (img1Ready && targetReady) {
          startAnimation();
        }
      };
      
      if (!img1.complete) {
        img1.addEventListener('load', () => {
          img1Ready = true;
          checkReady();
        }, { once: true });
      }
      
      if (!targetImg.complete) {
        targetImg.addEventListener('load', () => {
          targetReady = true;
          checkReady();
        }, { once: true });
      }
    }
    
    if (imageHover) {
      setCurrentImageSrc(imageHover);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    
    // Cancel any ongoing animation
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    // If there's a hover image, animate back to original, otherwise just glitch the current image
    const sourceImg = (imageHover && img2) ? img2 : img1;
    
    // Ensure both images are loaded before animating
    const startAnimation = () => {
      animatePixelation(sourceImg, img1);
    };
    
    if (sourceImg.complete && img1.complete) {
      startAnimation();
    } else {
      // Wait for images to load
      let sourceReady = sourceImg.complete;
      let img1Ready = img1.complete;
      
      const checkReady = () => {
        if (sourceReady && img1Ready) {
          startAnimation();
        }
      };
      
      if (!sourceImg.complete) {
        sourceImg.addEventListener('load', () => {
          sourceReady = true;
          checkReady();
        }, { once: true });
      }
      
      if (!img1.complete) {
        img1.addEventListener('load', () => {
          img1Ready = true;
          checkReady();
        }, { once: true });
      }
    }
    
    setCurrentImageSrc(image);
  };

  // Cleanup
  React.useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div className="relative bg-cream p-4 grain-texture">
      {/* Custom SVG Border */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
        preserveAspectRatio="none"
        viewBox="0 0 526.16 745.87"
      >
        <defs>
          <style>
            {`.product-border-circle, .product-border-line {
              stroke: #221f20;
              stroke-linecap: round;
            }
            .product-border-circle, .product-border-line, .product-border-main {
              stroke-miterlimit: 10;
            }
            .product-border-circle, .product-border-main {
              fill: none;
            }
            .product-border-line {
              fill: #e6e7e8;
            }
            .product-border-main {
              stroke: #000;
            }`}
          </style>
        </defs>
        <g>
          <polygon className="product-border-main" points=".5 16.58 17.17 .5 507.2 .5 524.47 16.58 525.66 726.91 509.58 745.37 18.96 745.37 .5 728.7 .5 16.58" vectorEffect="non-scaling-stroke" strokeWidth="2"/>
          <g>
            <circle className="product-border-circle" cx="22.11" cy="19.32" r="8.19" vectorEffect="non-scaling-stroke" strokeWidth="1"/>
            <line className="product-border-line" x1="28.16" y1="13.82" x2="15.82" y2="24.56" vectorEffect="non-scaling-stroke" strokeWidth="1"/>
          </g>
          <g>
            <circle className="product-border-circle" cx="505.11" cy="19.32" r="8.19" vectorEffect="non-scaling-stroke" strokeWidth="1"/>
            <line className="product-border-line" x1="511.17" y1="13.82" x2="498.83" y2="24.56" vectorEffect="non-scaling-stroke" strokeWidth="1"/>
          </g>
        </g>
      </svg>

      {/* Product Image with Halftone */}
      <div 
        ref={containerRef}
        className="relative aspect-square mb-4 overflow-hidden halftone-overlay bg-white z-20" 
        style={{
          clipPath: 'polygon(8% 0%, 92% 0%, 100% 8%, 100% 93%, 93% 100%, 7% 100%, 0% 93%, 0% 7%)'
        }}
      >
        {/* Product Image Border SVG */}
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none z-30"
          preserveAspectRatio="none"
          viewBox="0 0 490.79 510.39"
        >
          <defs>
            <style>
              {`.product-image-border {
                fill: none;
                stroke: #221f20;
                stroke-linecap: round;
                stroke-miterlimit: 10;
              }`}
            </style>
          </defs>
          <polygon className="product-image-border" points=".5 37.16 36.52 .5 452.37 .5 490.29 37.16 490.29 474.49 455.53 509.89 35.26 509.89 .5 476.39 .5 37.16" vectorEffect="non-scaling-stroke" strokeWidth="2"/>
        </svg>
        
        <canvas 
          ref={canvasRef}
          className="w-full h-full object-cover"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
        {soldOut && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/10 pointer-events-none">
            <div 
              className="px-6 py-3 rotate-12"
              style={{ 
                backgroundColor: '#F2F1E8',
                border: '2px solid #912525',
                color: '#912525',
                boxShadow: '4px 4px 0px rgba(0,0,0,0.3)' 
              }}
            >
              <span className="tracking-wider font-bold">NO ACCESS</span>
            </div>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="flex flex-col">
        {/* Product Name/Details and Price - side by side */}
        <div className="flex items-start justify-between mb-1 h-[70px]">
          {/* Product Name and Details - stacked layout */}
          <div className="space-y-0 barcode-text text-[0.65rem] max-w-[60%]" style={{ letterSpacing: '-0.05em' }}>
            <div className="uppercase text-[11px] font-bold">{name}</div>
            <div className="text-[10px]">SPEC: {itemCode}</div>
            <div className="text-[10px]">MATERIAL: {description.replace(/cotton/gi, '').replace(/pattern/gi, '').replace(/blend/gi, '').replace(/embroidered/gi, '').replace(/tactical/gi, '').trim()}</div>
            <div className="text-[10px]">SERIAL NO: {serialCode.substring(0, 6)}</div>
          </div>

          {/* Price on the right */}
          <div className="relative px-[12px] py-[15px] flex-shrink-0 w-[30%] flex items-center justify-center">
            {/* Price Border SVG */}
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none"
              preserveAspectRatio="none"
              viewBox="0 0 146.38 88.16"
            >
              <defs>
                <style>
                  {`.price-border {
                    fill: none;
                    stroke: #221f20;
                    stroke-linecap: round;
                    stroke-miterlimit: 10;
                  }`}
                </style>
              </defs>
              <polygon className="price-border" points=".5 79.97 .5 10.39 9.65 .5 135.84 .5 145.88 10.02 145.88 79.97 135.84 87.66 8.92 87.66 .5 79.97" vectorEffect="non-scaling-stroke" strokeWidth="2"/>
            </svg>
            <div className="text-[14px] tracking-tight font-bold relative z-10 text-center">{price}</div>
          </div>
        </div>

        {/* Barcode and Button - side by side, aligned at bottom */}
        <div className="flex items-start justify-between mt-0">
          {/* Barcode on the left */}
          <div className="flex flex-col">
            <svg viewBox="0 0 120 30" className="w-24 h-8">
              {[...Array(40)].map((_, i) => (
                <rect 
                  key={i}
                  x={i * 3}
                  y="0"
                  width={Math.random() > 0.5 ? 2 : 1}
                  height="30"
                  fill="#1a1a1a"
                />
              ))}
            </svg>
            <div className="barcode-text text-center mt-0.5 text-[0.65rem]">| {serialCode.replace(/-/g, '')} |</div>
          </div>

          {/* Button on the right */}
          <button 
            className={`relative px-6 py-2 transition-all hover:translate-y-[-2px] flex-shrink-0 ${
              soldOut 
                ? 'cursor-not-allowed' 
                : 'hover:opacity-80'
            }`}
            style={{
              color: isAlternate ? '#F4EFE7' : (soldOut ? '#4b5563' : '#000000')
            }}
            disabled={soldOut}
          >
            {/* Button Border SVG */}
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none"
              preserveAspectRatio="none"
              viewBox="0 0 242.33 66.55"
            >
              <defs>
                <style>
                  {`.button-border {
                    stroke: #221f20;
                    stroke-linecap: round;
                    stroke-miterlimit: 10;
                  }`}
                </style>
              </defs>
              <polygon 
                className="button-border" 
                style={{ fill: isAlternate ? '#373651' : 'none' }}
                points=".5 66.05 .5 .5 241.83 .5 241.83 48.11 226.09 66.05 .5 66.05" 
                vectorEffect="non-scaling-stroke" 
                strokeWidth="2"
              />
            </svg>
            <span className="relative z-10 text-[0.75rem] font-bold">{buttonText}</span>
          </button>
        </div>
      </div>
    </div>
  );
}