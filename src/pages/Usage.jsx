// Usage.js
import React, { useState, useEffect } from 'react';
import UsageTable from "../components/UserUsageTable"; 
import PaginationComponent from "../components/Pagination";
import RowsPerPageSelector from "../components/RowsSelector";
import SomeDetails from "../components/UserInfo";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; // Import CSS for styling

function Usage() {
  const [instances, setInstances] = useState([]); // Complete data
  const [loading, setLoading] = useState(true); // Track loading state
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [rowsPerPage, setRowsPerPage] = useState(10); // Rows per page

  // Simulate data fetching
  useEffect(() => {
    setLoading(true); // Set loading to true before fetching data
    setTimeout(() => {
      fetch('/aws-instances.json')
        .then((response) => response.json())
        .then((data) => {
          setInstances(data);
          setLoading(false); // Set loading to false after data is fetched
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setLoading(false); // Stop loading on error as well
        });
    }, 2000); // Simulate network delay (2 seconds)
  }, []);

  const totalPages = Math.ceil(instances.length / rowsPerPage);

  const paginatedData = instances.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePageChange = (page) => {
    if (page !== '...') setCurrentPage(page);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  return (
    <>
      <SomeDetails />
      <div className="container mx-auto mt-10 w-5/6">
        {loading ? (
          // Show skeleton while loading
          <>
            <Skeleton height={30} count={5} className="mb-2" />
            <Skeleton height={20} width="20%" className="mb-4" />
          </>
        ) : (
          // Show actual content when loading is complete
          <>
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
          </>
        )}
      </div>
    </>
  );
}

export default Usage;
