import React, { useState, useEffect } from 'react';
import AllegroHeader from "@/components/AllegroHeader";
import AllegroFooter from "@/components/AllegroFooter";
import ProductCard from "@/components/ProductCard";
import ProductModal from "@/components/ProductModal";
import Pagination from "@/components/Pagination";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Product } from "@/lib/types";

const PRODUCTS_PER_PAGE = 8;

const Catalogue: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://pamphlet.onrender.com/products'); // Updated to use relative path
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch products');
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    document.body.style.overflow = "hidden";
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    document.body.style.overflow = "auto";
  };

  // Calculate pagination
  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
  
  const paginatedProducts = products.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <AllegroHeader />
      
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-gray-100 to-white border-b border-gray-100 py-12 mb-8">
        <div className="container mx-auto text-center px-4">
          <h1 className="font-montserrat font-bold text-3xl md:text-4xl text-primary mb-3">
            ALLEGRO COLLECTION
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Discover our latest fashionable pieces designed for the modern lifestyle. 
            Premium quality and timeless design.
          </p>
        </div>
      </div>
      
      <main className="container mx-auto px-4 animate-fade-in flex-grow">
        {/* Products Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center h-96">
            <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
          </div>
        ) : error ? (
          <div className="text-center text-destructive py-10">
            <p>{error}</p>
          </div>
        ) : paginatedProducts.length === 0 ? (
          <div className="text-center py-10">
            <p>No products found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5 mb-12" id="products-grid">
            {paginatedProducts.map((product, index) => (
              <ProductCard 
                key={product.id}
                product={product}
                index={index}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        )}
        
        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </main>
      
      {/* Feature Banner */}
      <div className="bg-gray-50 py-12 mt-8 border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {/* Feature sections can be added here */}
          </div>
        </div>
      </div>
      
      <AllegroFooter />
      <WhatsAppButton />
      
      {selectedProduct && (
        <ProductModal 
          product={selectedProduct}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Catalogue;