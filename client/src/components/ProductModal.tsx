import React, { useState, useEffect } from "react";
import { Product } from "@/lib/types";
import { X, ChevronLeft, ChevronRight, Check, ShoppingBag, MessageSquare } from "lucide-react";

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  const phoneNumber = "9650534838";
  const productName = product ? encodeURIComponent(product.name) : "";
  const whatsappLink = `https://wa.me/${phoneNumber}?text=Hi,%20I'm%20interested%20in%20${productName}`;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!product) return null;

  const goToNextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const goToPrevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const setImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-md w-full max-h-[95vh] overflow-auto shadow-xl animate-fade-in mx-2 md:mx-auto md:max-w-4xl">
        {/* Mobile Header */}
        <div className="sticky top-0 z-10 bg-white flex items-center justify-between p-3 border-b border-gray-100">
          <h2 className="font-medium text-base line-clamp-1 pr-8">{product.name}</h2>
          <button 
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-full transition-colors"
            onClick={onClose}
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className={`${isMobile ? 'flex flex-col' : 'grid grid-cols-2 gap-6'} p-4`}>
          {/* Image Carousel - Simplified for mobile */}
          <div className="carousel-container aspect-square relative mb-4 md:mb-0">
            <div 
              className="carousel-track h-full" 
              style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
            >
              {product.images.map((image, idx) => (
                <div key={idx} className="carousel-item">
                  <img 
                    src={image} 
                    alt={`${product.name} - view ${idx + 1}`} 
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
              ))}
            </div>
            
            {/* Navigation Controls */}
            <button 
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white shadow-sm rounded-full p-2 hover:bg-gray-100 transition-all"
              onClick={goToPrevImage}
              aria-label="Previous image"
            >
              <ChevronLeft className="text-primary h-5 w-5" />
            </button>
            <button 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white shadow-sm rounded-full p-2 hover:bg-gray-100 transition-all"
              onClick={goToNextImage}
              aria-label="Next image"
            >
              <ChevronRight className="text-primary h-5 w-5" />
            </button>
            
            {/* Image Indicators - Bottom Dots */}
            <div className="absolute bottom-3 left-0 right-0 flex justify-center space-x-1.5">
              {product.images.map((_, idx) => (
                <button 
                  key={idx}
                  onClick={() => setImage(idx)}
                  aria-label={`View image ${idx + 1}`}
                  className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                    idx === currentImageIndex 
                      ? "bg-accent w-4" 
                      : "bg-gray-300"
                  }`}
                ></button>
              ))}
            </div>
            
            {/* Thumbnails - Only on Desktop */}
            {!isMobile && (
              <div className="mt-3 flex justify-start gap-2 overflow-x-auto pb-1 hide-scrollbar">
                {product.images.map((image, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setImage(idx)}
                    className={`w-14 h-14 rounded-md overflow-hidden flex-shrink-0 border-2 transition-all ${
                      idx === currentImageIndex 
                        ? "border-accent" 
                        : "border-transparent hover:border-gray-300"
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`Thumbnail ${idx + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Product Details */}
          <div className="flex flex-col">
            {/* Only show on desktop as it's already in the header for mobile */}
            {!isMobile && (
              <>
                <span className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">
                  {product.category}
                </span>
                <h2 className="font-semibold text-xl mb-2">{product.name}</h2>
              </>
            )}
            
            {/* Price - Larger on mobile */}
            <p className="text-accent font-semibold text-xl md:text-lg mb-3">{product.price}</p>
            
            {/* Description - Simplified */}
            <p className="text-gray-600 text-sm mb-4">{product.description}</p>
            
            {/* Size Selection - More touch-friendly */}
            <div className="mb-5">
              <h4 className="font-medium text-sm uppercase tracking-wider mb-2">Size</h4>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button 
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[3rem] h-10 ${
                      selectedSize === size 
                        ? "bg-accent text-white border-accent" 
                        : "bg-white text-gray-700 border-gray-300 hover:border-accent hover:text-accent"
                    } border rounded-md flex items-center justify-center transition-colors text-sm font-medium`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Product Details - Collapsible on mobile */}
            <div className="mb-5">
              <h4 className="font-medium text-sm uppercase tracking-wider mb-2">Details</h4>
              <ul className="space-y-1.5 text-gray-600 text-sm">
                {product.details.slice(0, isMobile ? 2 : product.details.length).map((detail, idx) => (
                  <li key={idx} className="flex items-start">
                    <Check className="h-4 w-4 text-accent mr-1.5 flex-shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </li>
                ))}
                {isMobile && product.details.length > 2 && (
                  <li className="text-accent text-sm font-medium pt-1">+ {product.details.length - 2} more details</li>
                )}
              </ul>
            </div>
            
            {/* Action Buttons - Full width on mobile */}
            <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-3 mt-auto sticky bottom-0 bg-white py-3 -mx-4 px-4 border-t border-gray-100`}>
              <a 
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white py-3 px-4 rounded-md hover:bg-green-600 transition-colors flex items-center justify-center gap-2 font-medium text-sm"
              >
                <MessageSquare className="h-4 w-4" />
                <span>WhatsApp Inquiry</span>
              </a>
              
              {/* <button className="bg-accent text-white py-3 px-4 rounded-md hover:bg-accent/90 transition-colors flex items-center justify-center gap-2 font-medium text-sm">
                <ShoppingBag className="h-4 w-4" />
                <span>Add to Cart</span>
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
