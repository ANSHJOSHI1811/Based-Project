// Pagination.js
import React from 'react';

const Pagination = ({ totalPages, currentPage, handlePageChange }) => {
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
    <div className="join mt-4">
      {generatePageNumbers().map((page, index) => (
        <button
          key={index}
          className={`join-item btn ${page === currentPage ? 'btn-active' : ''} ${page === '...' ? 'btn-disabled' : ''}`}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
