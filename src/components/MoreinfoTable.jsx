import React, { useEffect, useState } from 'react';
import { RiArrowUpDownLine } from "react-icons/ri";
const MoreinfoTable = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10); // Default to 10 entries per page

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

  // Generate an array of page numbers to display
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

  // Handle page change
  const handlePageChange = (page) => {
    if (page !== '...') setCurrentPage(page);
  };

  // Handle change in rows per page
  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to first page when changing entries per page
  };

  return (
    <>
      <div className="container mx-auto ">
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
        <div className="overflow-y-auto border border-gray-300 rounded-md" style={{ height : "512px"}}>
          <table className="min-w-full bg-white">
            <thead className="sticky top-0 bg-white">
              <tr className="text-center border-b border-gray-300">
                <th className="p-3">Name</th>
                <th className="p-3">CPU<RiArrowUpDownLine/></th>
                <th className="p-3">RAM<RiArrowUpDownLine/></th>
                <th className="p-3">Disk <RiArrowUpDownLine/></th>
                <th className="p-3">Bandwidth <RiArrowUpDownLine/></th>
                <th className="p-3">Network Speed<RiArrowUpDownLine/></th>
                <th className="p-3">Location<RiArrowUpDownLine/>   </th>
                <th className="p-3">Price</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.map((row, index) => (
                <tr key={index} className="border-b border-gray-300 hover:bg-gray-100">
                  <td className="p-3">
                    <input type="checkbox" />
                  </td>
                  <td className="p-3 flex items-center">
                    <img
                      src="https://download.logo.wine/logo/Amazon_Web_Services/Amazon_Web_Services-Logo.wine.png"
                      alt="aws logo"
                      className="w-6 h-6 mr-2"
                    />
                    {row.name}
                  </td>
                  <td className="p-3">{row.cpu}</td>
                  <td className="p-3">{row.ram}</td>
                  <td className="p-3">{row.disk}</td>
                  <td className="p-3">{row.bandwidth}</td>
                  <td className="p-3">{row.networkSpeed}</td>
                  <td className="p-3">{row.location}</td>
                  <td className="p-3">{row.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
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
      </div>
    </>
  );
};

export default MoreinfoTable;
