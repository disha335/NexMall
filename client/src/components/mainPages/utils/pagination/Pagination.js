import React from 'react';
import './pagination.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  return (
    <div className="pagination">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index} className={currentPage === index + 1 ? 'active' : ''} onClick={() => onPageChange(index + 1)}>
          {index + 1}
        </button>
    ))}
    </div>
  );
};

export default Pagination;
