import React, { useState, useEffect } from "react";
import { Product } from "@/lib/types";
import { ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react";

interface ProductCardProps {
  product: Product;
  index: number;
  onViewDetails: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index, onViewDetails }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [controlsVisible, setControlsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleImageChange = (e: React.MouseEvent, direction: 'prev' | 'next' | number) => {
    e.stopPropagation();
    if (typeof direction === 'number') {
      setCurrentImageIndex(direction);
    } else {
      setCurrentImageIndex(prev => 
        direction === 'next' 
          ? (prev === product.images.length - 1 ? 0 : prev + 1)
          : (prev === 0 ? product.images.length - 1 : prev - 1)
      );
    }
  };

  return (
    <div 
      className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 animate-slide-up"
      style={{ animationDelay: `${index * 0.1}s` }}
      onMouseEnter={() => !isMobile && setControlsVisible(true)}
      onMouseLeave={() => !isMobile && setControlsVisible(false)}
      onClick={() => onViewDetails(product)}
    >
      {/* Image Section */}
      <div className="relative group">
        <div className="absolute top-2 left-2 z-10">
          <span className="bg-accent text-white text-xs font-medium px-2.5 py-1 rounded-full">
            NEW
          </span>
        </div>

        {/* Image Carousel */}
        <div className="relative aspect-square overflow-hidden">
          <div 
            className="h-full flex transition-transform duration-300 ease-out"
            style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
          >
            {product.images.map((image, idx) => (
              <div key={idx} className="w-full flex-shrink-0">
                <img
                  src={image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Navigation Controls */}
          {(controlsVisible || isMobile) && product.images.length > 1 && (
            <>
              <button
                className={`absolute top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-1.5 shadow-lg z-10 transition-opacity
                  ${isMobile ? 'left-2 scale-125' : 'left-4 scale-100'}`}
                onClick={(e) => handleImageChange(e, 'prev')}
              >
                <ChevronLeft className="h-5 w-5 text-primary" />
              </button>
              <button
                className={`absolute top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-1.5 shadow-lg z-10 transition-opacity
                  ${isMobile ? 'right-2 scale-125' : 'right-4 scale-100'}`}
                onClick={(e) => handleImageChange(e, 'next')}
              >
                <ChevronRight className="h-5 w-5 text-primary" />
              </button>
            </>
          )}

          {/* Image Dots */}
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
            {product.images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => handleImageChange(e, idx)}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  idx === currentImageIndex ? 'bg-accent w-4' : 'bg-gray-300'
                }`}
                aria-label={`View image ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-3.5 space-y-2.5">
        <div className="flex flex-col">
          <h3 className="text-base font-semibold line-clamp-2 leading-tight">
            {product.name}
          </h3>
          <p className="text-accent font-bold text-lg mt-1.5">
            {product.price}
          </p>
        </div>

        <p className="text-sm text-gray-600 line-clamp-2 min-h-[2.5rem]">
          {product.description}
        </p>

        {/* <button
          className="w-full bg-accent hover:bg-accent/90 text-white rounded-lg px-4 py-3
                    flex items-center justify-center gap-2 transition-colors duration-200"
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails(product);
          }}
        >
          <ShoppingBag className="h-3 w-3" />
          <span className="font-medium">View Product</span>
        </button> */}
      </div>
    </div>
  );
};

export default ProductCard;