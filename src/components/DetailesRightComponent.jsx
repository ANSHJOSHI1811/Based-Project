import React, { useEffect, useState } from 'react';
import InstanceDetails from './InstanceDetails';
import Pagination from './Pagination';

const MoreinfoTable = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedRows, setSelectedRows] = useState([]);

  // Fetch data
  useEffect(() => {
    fetch('/all-instances.json')
      .then((response) => response.json())
      .then((jsonData) => setData(jsonData))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  // Calculate the index range for the current page
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

  // Total number of pages
  const totalPages = Math.ceil(data.length / rowsPerPage);

  // Handle page change
  const handlePageChange = (page) => {
    if (page !== '...') setCurrentPage(page);
  };

  // Handle change in rows per page
  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  // Handle individual row selection
  const handleRowSelect = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  // Handle "Select All" checkbox
  const handleSelectAll = () => {
    if (currentRows.every((row) => selectedRows.includes(row.id))) {
      setSelectedRows((prev) => prev.filter((id) => !currentRows.some((row) => row.id === id)));
    } else {
      const newSelectedRows = [...selectedRows, ...currentRows.map((row) => row.id)];
      setSelectedRows([...new Set(newSelectedRows)]);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="text-left text-gray-700 mb-4">
        <p>{data.length} offers found</p>
        <p className="text-right text-sm">
          <img
            src="https://cdn-icons-png.flaticon.com/128/17753/17753332.png"
            className="w-5 h-5 inline-block ml-1"
            alt="currency icon"
          />
          Change currency to EUR to see more offers.
        </p>
      </div>

      {/* Dropdown for selecting rows per page */}
      <div className="mb-4">
        <label className="mr-2">Show</label>
        <select
          className="select select-bordered"
          value={rowsPerPage}
          onChange={handleRowsPerPageChange}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
        <span className="ml-2">entries per page</span>
      </div>

      {/* Scrollable Table Container */}
      <div className="overflow-y-auto border border-gray-300 rounded-md" style={{ height: "512px" }}>
        <InstanceDetails
          data={currentRows}
          selectedRows={selectedRows}
          handleRowSelect={handleRowSelect}
          handleSelectAll={handleSelectAll}
        />
      </div>

      {/* Pagination Controls */}
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default MoreinfoTable;
