// RowsPerPageSelector.js
import React from 'react';
const RowsPerPageSelector = ({ rowsPerPage, handleRowsPerPageChange }) => {
  return (
    <div className="col-span-2 mb-4 mr-8 text-right">
      <span className="ml-2 mr-4">Entries per page</span>
      <select
        className="select select-bordered bg-white rounded-md border-solid border-2 ml-2 mr-4 px-2 py-2"
        value={rowsPerPage}
        onChange={handleRowsPerPageChange}
      >
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
      </select>
    </div>
  );
};

export default RowsPerPageSelector;
