import React, { useEffect, useState } from 'react';
import { FaLocationDot } from "react-icons/fa6";

const InstanceDetailsTable = ({ openModal }) => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const fetchData = async (page) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:8080/skus?page=${page}`);
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

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center p-4 text-red-600">{error}</div>;
  if (!data.length) return <div className="text-center p-4">No instances found</div>;

  return (
    <div className="overflow-y-auto border border-gray-300 rounded-md shadow-md" style={{ height: "512px" }}>
      <table className="min-w-full bg-white">
        <thead className="sticky top-0 bg-gray-100 shadow-sm">
          <tr className="text-left border-b border-gray-300 text-sm font-semibold">
            <th className="p-3">SKU</th>
            <th className="p-3">Instance Type</th>
            <th className="p-3">VCPU</th>
            <th className="p-3">RAM</th>
            <th className="p-3">Storage</th>
            <th className="p-3">OS</th>
            <th className="p-3">Network</th>
            <th className="p-3">Location</th>
            <th className="p-3">Price Per Unit</th> {/* New Column */}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              className="border-b border-gray-200 hover:bg-gray-100 cursor-pointer transition"
              onClick={() => openModal(row, row.ID)}
            >
              <td className="p-3">{row.SKUCode}</td>
              <td className="p-3">{row.InstanceType}</td>
              <td className="p-3">{row.VCPU}</td>
              <td className="p-3">{row.Memory}</td>
              <td className="p-3">{row.Storage}</td>
              <td className="p-3">{row.OperatingSystem}</td>
              <td className="p-3">{row.Network}</td>
              <td className="p-3 flex items-center gap-2 relative group">
                <FaLocationDot className="text-blue-500" />
                <span className="absolute left-8 top-0 bg-black text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {row.RegionCode}
                </span>
                {row.Location}
              </td>
              <td className="p-3">{row.Prices?.[0]?.PricePerUnit || "N/A"}</td> {/* New Column */}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center p-3 bg-gray-100 border-t">
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
