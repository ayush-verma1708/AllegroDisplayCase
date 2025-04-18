import React from "react";
// import logo from "../public/logo.png"

const AllegroHeader: React.FC = () => {
  return (
    <header className="bg-white text-primary py-4 px-6 sticky top-0 z-40 shadow-sm border-b border-gray-100">
      <div className="container mx-auto">
        <div className="flex justify-center items-center">
        <img 
  src={"https://res.cloudinary.com/docmkserp/image/upload/v1744951140/Allegro_Logo_Design_cu62pw.png"} 
  alt="Allegro - Style Always in Trends" 
  className="h-16 md:h-20 w-auto"
  style={{
    objectFit: 'contain',
    maxWidth: '100%'
  }}
/>

        </div>
      </div>
    </header>
  );
};

export default AllegroHeader;
