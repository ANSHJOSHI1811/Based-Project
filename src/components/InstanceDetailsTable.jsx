import React, { useEffect, useState } from 'react';
import { FaLocationDot } from "react-icons/fa6";

const InstanceDetailsTable = ({ openModal }) => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const fetchData = async (page) => {
    try {
      const response = await fetch(`http://localhost:8080/skus?page=${page}`);
      const result = await response.json();
      if (result.data) {
        setData(result.data);
        setTotalPages(result.totalPages);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (!data || data.length === 0) {
    return <div>No instances found</div>;
  }

  return (
    <div className="overflow-y-auto border border-gray-300 rounded-md" style={{ height: "512px" }}>
      <table className="min-w-full bg-white">
        <thead className="sticky top-0 bg-white">
          <tr className="text-left border-b border-gray-300">
            <th className="p-3">SKU Code</th>
            <th className="p-3">Product Family</th>
            <th className="p-3">VCPU</th>
            <th className="p-3">RAM</th>
            <th className="p-3">Instance Type</th>
            <th className="p-3">Storage</th>
            <th className="p-3">Operating System</th>
            <th className="p-3">Network</th>
            <th className="p-3">Instance SKU</th>
            <th className="p-3">Location</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              className="border-b border-gray-300 hover:bg-gray-100 cursor-pointer"
              onClick={() => openModal(row)}
            >
              <td className="p-3">{row.SKUCode}</td>
              <td className="p-3">{row.ProductFamily}</td>
              <td className="p-3">{row.VCPU}</td>
              <td className="p-3">{row.Memory}</td>
              <td className="p-3">{row.InstanceType}</td>
              <td className="p-3">{row.Storage}</td>
              <td className="p-3">{row.OperatingSystem}</td>
              <td className="p-3">{row.Network}</td>
              <td className="p-3">{row.InstanceSKU}</td>
              <td className="p-3 relative group">
                <FaLocationDot />
                <span className="absolute left-8 top-0 w-max bg-black text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {row.RegionID}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between p-3">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default InstanceDetailsTable;
