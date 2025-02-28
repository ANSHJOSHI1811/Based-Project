import React, { useEffect, useState } from 'react';
import { FaLocationDot } from "react-icons/fa6";
import awsLogo from "../assets/aws.png"; // Import AWS logo
import azureLogo from "../assets/azure.png"; // Import Azure logo

const SavingDetailsTable = ({ openModal }) => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData(currentPage, entriesPerPage);
  }, [currentPage, entriesPerPage]);

  const fetchData = async (page, limit) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:8080/savingplans?page=${page}&limit=${limit}`);
      if (!response.ok) throw new Error("Failed to fetch data");
      const result = await response.json();
      setData(result.data || []);
      setTotalPages(result.totalPages || 1);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEntriesChange = (event) => {
    setEntriesPerPage(parseInt(event.target.value));
    setCurrentPage(1);
  };


  const handlePageClick = (page) => {
    setCurrentPage(page);
  };
  const getProviderLogo = (providerId) => {
    if (providerId === 1) return awsLogo;
    if (providerId === 2) return azureLogo;
    return null;
  };
  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center p-4 text-red-600">{error}</div>;
  if (!data.length) return <div className="text-center p-4">No instances found</div>;

  const getPageNumbers = () => {
    let pages = [];
    if (totalPages <= 6) {
      pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      if (currentPage <= 3) {
        pages = [1, 2, 3, 4, 5, totalPages];
      } else if (currentPage >= totalPages - 2) {
        pages = [1, totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
      } else {
        pages = [1, currentPage - 1, currentPage, currentPage + 1, totalPages];
      }
    }
    return pages;
  };

  return (
    <div className="overflow-y-auto border border-gray-300 rounded-md shadow-md" style={{ height: "560px" }}>
      <div className="flex justify-between items-center p-3 bg-gray-100 border-b">
        <div></div>
        <label className="text-sm">Show
          <select
            value={entriesPerPage}
            onChange={handleEntriesChange}
            className="ml-2 p-1 border rounded"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select> entries
        </label>
      </div>
      <table className="min-w-full bg-white">
        <thead className="sticky top-0 bg-gray-100 shadow-sm">
          <tr className="text-left border-b border-gray-300 text-sm font-semibold">
            <th className="p-3">DiscountedInstanceType</th>
            <th className="p-3">LeaseContractLength</th>
            <th className="p-3">Unit</th>
   
            <th className="p-3">DiscountedRate</th>
            <th className="p-3">Location</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              className="border-b border-gray-200 hover:bg-gray-100 cursor-pointer transition"
              onClick={() => openModal(row, row.ID)}
            >
               <td className="p-3 flex items-center gap-2">
                {getProviderLogo(row.ProviderID) && (
                  <img
                    src={getProviderLogo(row.ProviderID)}
                    alt="Provider Logo"
                    className="w-8 h-8"
                  />
                )} {row.DiscountedInstanceType}
              </td>
              <td className="p-3">{row.LeaseContractLength}</td>
              <td className="p-3">{row.Unit}</td>
              <td className="p-3">{row.DiscountedRate}</td>
              <td className="p-3 flex items-center gap-2 relative group">
                <FaLocationDot className="text-blue-500" />
                <span className="absolute left-8 top-0 bg-black text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {row.RegionCode}
                </span>
                {row.Location}
              </td>
           
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center items-center p-3 bg-gray-100 border-t gap-2">
        <button
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
        >
          Previous
        </button>
        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            onClick={() => handlePageClick(page)}
            className={`px-3 py-1 rounded ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SavingDetailsTable;
