// PaginationComponent.js
import React from 'react';

const PaginationComponent = ({ totalPages, currentPage, handlePageChange }) => {
  const generatePageNumbers = () => {
    const pageNumbers = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
    } else if (currentPage <= 3) {
      pageNumbers.push(1, 2, 3, '...', totalPages);
    } else if (currentPage >= totalPages - 2) {
      pageNumbers.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
    } else {
      pageNumbers.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
    }
    return pageNumbers;
  };

  return (
    <div className="join mt-4 flex justify-center">
      {generatePageNumbers().map((page, index) => (
        <button
          key={index}
          className={`join-item btn border border-gray-300 rounded-lg px-4 py-2 mx-1 transition duration-200 ease-in-out ${
            page === currentPage ? 'btn-active bg-blue-500 text-white' : 'bg-white text-gray-700'
          } ${page === '...' ? 'btn-disabled text-gray-400' : ''}`}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default PaginationComponent;
