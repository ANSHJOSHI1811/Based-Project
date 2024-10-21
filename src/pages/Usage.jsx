// Usage.js
import React, { useState, useEffect } from 'react';
import UsageTable from "../components/UserUsageTable"
import PaginationComponent from "../components/Pagination";
import RowsPerPageSelector from "../components/RowsSelector";
import SomeDetails from "../components/UserInfo";

function Usage() {
  const [instances, setInstances] = useState([]); // Complete data
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [rowsPerPage, setRowsPerPage] = useState(10); // Rows per page

  // Fetch the data
  useEffect(() => {
    fetch('/aws-instances.json')
      .then(response => response.json())
      .then(data => setInstances(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // Calculate total pages based on data length and rows per page
  const totalPages = Math.ceil(instances.length / rowsPerPage);

  // Slice data for the current page
  const paginatedData = instances.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Handle page change
  const handlePageChange = (page) => {
    if (page !== '...') setCurrentPage(page);
  };

  // Handle rows per page change
  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1); // Reset to the first page
  };

  return (
    <>
      <SomeDetails />
      <div className="container mx-auto mt-10 w-5/6">
        <RowsPerPageSelector
          rowsPerPage={rowsPerPage}
          handleRowsPerPageChange={handleRowsPerPageChange}
        />
        
        <UsageTable instances={paginatedData} />
        
        <PaginationComponent
          totalPages={totalPages}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        />
      </div>
    </>
  );
}

export default Usage;
