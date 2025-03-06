import React, { useEffect, useState } from 'react';
import { FaLocationDot } from "react-icons/fa6";
import awsLogo from "../assets/aws.png";
import azureLogo from "../assets/azure.png";
import Slider from "@mui/material/Slider";

const SavingDetailsTable = ({ openModal }) => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [priceRange, setPriceRange] = useState([0, 10]);

  useEffect(() => {
    fetchRegions();
  }, []);

  useEffect(() => {
    fetchData(currentPage, entriesPerPage, selectedRegion, priceRange);
  }, [currentPage, entriesPerPage, selectedRegion, priceRange]);

  const fetchRegions = async () => {
    try {
      const response = await fetch("http://localhost:8080/regions?provider=AWS");
      if (!response.ok) throw new Error("Failed to fetch regions");
      const result = await response.json();
      setRegions(result);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchData = async (page, limit, region, priceRange) => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams({
        page,
        limit,
        region: region || "",
        minimumPrice: priceRange[0],
        maximumPrice: priceRange[1],
      }).toString();

      const response = await fetch(`http://localhost:8080/savingplans?${queryParams}`);
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

  return (
    <div className="p-4">
      {/* Filters Section */}
      <div className="flex justify-between items-center p-4 bg-white shadow-md rounded-md mb-4">
        {/* Region Dropdown */}
        <select 
          value={selectedRegion} 
          onChange={(e) => setSelectedRegion(e.target.value)}
          className="p-2 border border-gray-300 rounded shadow-sm focus:ring focus:ring-blue-300 transition"
        >
          <option value="">All Regions</option>
          {regions.map((region) => (
            <option key={region.RegionID} value={region.RegionCode}>
              {region.RegionCode}
            </option>
          ))}
        </select>

        {/* Price Range Slider */}
        <div className="w-64">
          <span className="block text-sm font-medium text-gray-700">Price Range: ${priceRange[0]} - ${priceRange[1]}</span>
          <Slider 
            value={priceRange} 
            onChange={(_, newValue) => setPriceRange(newValue)}
            valueLabelDisplay="auto" 
            min={0} 
            max={10} 
            step={0.1} 
          />
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-y-auto border rounded-md shadow-md bg-white" style={{ height: "560px" }}>
        {loading && <div className="text-center p-4">Loading...</div>}
        {error && <div className="text-center p-4 text-red-600">{error}</div>}
        {!loading && !error && !data.length && <div className="text-center p-4">No instances found</div>}
        {!loading && !error && data.length > 0 && (
          <table className="min-w-full bg-white">
            <thead className="sticky top-0 bg-gray-100 shadow-sm">
              <tr className="text-left border-b text-sm font-semibold">
                <th className="p-3">Instance Type</th>
                <th className="p-3">Lease Length</th>
                <th className="p-3">Unit</th>
                <th className="p-3">Rate</th>
                <th className="p-3">Location</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr 
                  key={index} 
                  className="border-b hover:bg-gray-50 cursor-pointer transition duration-200"
                  onClick={() => openModal(row, row.DiscountedSku)}
                >
                  <td className="p-3 flex items-center gap-2">
                    {row.ProviderID === 1 ? (
                      <img src={awsLogo} alt="AWS" className="w-8 h-8" />
                    ) : (
                      <img src={azureLogo} alt="Azure" className="w-8 h-8" />
                    )}
                    {row.DiscountedInstanceType}
                  </td>
                  <td className="p-3">{row.LeaseContractLength}</td>
                  <td className="p-3">{row.Unit}</td>
                  <td className="p-3 font-semibold text-green-600">${row.DiscountedRate}</td>
                  <td className="p-3 flex items-center gap-2">
                    <FaLocationDot className="text-blue-500" />
                    {row.Location}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center space-x-4 p-4">
        <button 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition disabled:bg-gray-300 disabled:cursor-not-allowed" 
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} 
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-gray-700">Page {currentPage} of {totalPages}</span>
        <button 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition disabled:bg-gray-300 disabled:cursor-not-allowed" 
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} 
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SavingDetailsTable;