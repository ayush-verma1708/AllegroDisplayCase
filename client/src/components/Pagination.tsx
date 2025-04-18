import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  // Only show a limited range of page buttons
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5; // Increased for a better experience
    
    if (totalPages <= maxPagesToShow) {
      // If we have less pages than our max, show all
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Calculate the range to show
      let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
      let endPage = startPage + maxPagesToShow - 1;
      
      // Adjust if we're at the end
      if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
    }
    
    return pageNumbers;
  };

  return (
    <div className="flex justify-center items-center space-x-1 my-12">
      <button
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`w-9 h-9 ${
          currentPage === 1 
            ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
            : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 hover:border-gray-300"
        } rounded-md flex items-center justify-center transition-colors`}
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      
      {getPageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-9 h-9 ${
            currentPage === page
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-gray-300"
          } rounded-md flex items-center justify-center transition-colors text-sm font-medium`}
          aria-label={`Page ${page}`}
          aria-current={currentPage === page ? "page" : undefined}
        >
          {page}
        </button>
      ))}
      
      <button
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`w-9 h-9 ${
          currentPage === totalPages 
            ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
            : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 hover:border-gray-300"
        } rounded-md flex items-center justify-center transition-colors`}
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
};

export default Pagination;
