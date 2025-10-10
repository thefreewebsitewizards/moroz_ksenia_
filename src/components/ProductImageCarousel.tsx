import React, { useState } from 'react';

interface Props {
  images: string[];
  className?: string;
  aspectClass?: string; // e.g., 'aspect-square' or 'aspect-[4/3]'
}

const ProductImageCarousel: React.FC<Props> = ({ images, className = '', aspectClass = 'aspect-square' }) => {
  const safeImages = (images && images.length > 0) ? images : ['/images/placeholder.jpg'];
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i - 1 + safeImages.length) % safeImages.length);
  const next = () => setIndex((i) => (i + 1) % safeImages.length);

  return (
    <div className={`relative overflow-hidden ${aspectClass} ${className}`}>
      <img
        src={safeImages[index]}
        alt={`Image ${index + 1}`}
        className="w-full h-full object-cover transition-transform duration-500"
        onError={(e) => { (e.target as HTMLImageElement).src = '/images/placeholder.jpg'; }}
      />

      {/* Gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent"></div>

      {/* Controls */}
      {safeImages.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-neutral-800 rounded-full p-2 shadow-sm"
            aria-label="Previous image"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-neutral-800 rounded-full p-2 shadow-sm"
            aria-label="Next image"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1">
            {safeImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`w-1.5 h-1.5 rounded-full ${i === index ? 'bg-white' : 'bg-white/60'} hover:bg-white`}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductImageCarousel;