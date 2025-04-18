import React from "react";

const LoadingAnimation: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      <div className="opening-animation flex flex-col items-center px-6 text-center">
        <div className="relative">
          <div className="text-primary text-4xl md:text-5xl font-montserrat font-bold mb-1">
            ALLEGRO
          </div>
          <div className="text-accent text-base md:text-lg font-normal">
            Fashion Collection
          </div>
          
          {/* Loading indicator */}
          <div className="mt-6 relative w-32 mx-auto">
            <div className="h-0.5 bg-gray-200 w-full"></div>
            <div className="h-0.5 bg-accent absolute top-0 left-0 w-1/3 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingAnimation;
