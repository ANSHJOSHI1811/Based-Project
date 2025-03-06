import React, { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import awsLogo from "../assets/aws.png";
import azureLogo from "../assets/azure.png";
import Slider from "@mui/material/Slider";

const InstanceDetailsTable = ({ openModal }) => {
  const [providers, setProviders] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState("");
  const [regions, setRegions] = useState([]);
  const [selectedRegionCode, setSelectedRegionCode] = useState("");
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [vcpuRange, setVcpuRange] = useState([1, 64]);
  const [priceRange, setPriceRange] = useState([0, 10]);

  useEffect(() => {
    fetchProviders();
  }, []);

  useEffect(() => {
    if (selectedProvider) fetchRegions(selectedProvider);
  }, [selectedProvider]);

  useEffect(() => {
    fetchData();
  }, [currentPage, entriesPerPage, selectedRegionCode, vcpuRange, priceRange]);

  const fetchProviders = async () => {
    try {
      const response = await fetch("http://localhost:8080/providers");
      if (!response.ok) throw new Error("Failed to fetch providers");
      const result = await response.json();
      setProviders(result.providers || []);
    } catch (error) {
      console.error("Error fetching providers:", error.message);
    }
  };

  const fetchRegions = async (provider) => {
    try {
      const response = await fetch(`http://localhost:8080/regions?provider=${provider}`);
      if (!response.ok) throw new Error("Failed to fetch regions");
      const result = await response.json();
      setRegions(result || []);
    } catch (error) {
      console.error("Error fetching regions:", error.message);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      let url = `http://localhost:8080/skus?page=${currentPage}&limit=${entriesPerPage}`;
      if (selectedRegionCode) url += `&region=${selectedRegionCode}`;
      url += `&minVcpu=${vcpuRange[0]}&maxVcpu=${vcpuRange[1]}`;
      url += `&minPrice=${priceRange[0]}&maxPrice=${priceRange[1]}`;

      const response = await fetch(url);
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
    <div className="overflow-y-auto border border-gray-300 rounded-md shadow-md" style={{ height: "560px" }}>
      <div className="flex flex-col p-3 bg-gray-100 border-b gap-3">
        <label className="text-sm">
          Show
          <select value={entriesPerPage} onChange={(e) => setEntriesPerPage(parseInt(e.target.value))} className="ml-2 p-1 border rounded">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select> entries
        </label>

        <label className="text-sm">
          Select Provider:
          <select
            value={selectedProvider}
            onChange={(e) => {
              setSelectedProvider(e.target.value);
              setRegions([]);
              setSelectedRegionCode("");
            }}
            className="ml-2 p-1 border rounded"
          >
            <option value="">Select Provider</option>
            {providers.map((provider, index) => (
              <option key={index} value={provider}>{provider}</option>
            ))}
          </select>
        </label>

        <label className="text-sm">
          Filter by Region:
          <select
            value={selectedRegionCode}
            onChange={(e) => setSelectedRegionCode(e.target.value)}
            className="ml-2 p-1 border rounded"
            disabled={!selectedProvider}
          >
            <option value="">All Regions</option>
            {regions.map((region) => (
              <option key={region.RegionID} value={region.RegionCode}>{region.RegionCode}</option>
            ))}
          </select>
        </label>

        <div>
          <label className="text-sm">Filter by VCPU:</label>
          <Slider
            value={vcpuRange}
            onChange={(_, newValue) => setVcpuRange(newValue)}
            valueLabelDisplay="auto"
            min={1}
            max={64}
          />
        </div>

        <div>
          <label className="text-sm">Filter by Price:</label>
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

      <table className="min-w-full bg-white">
        <thead className="sticky top-0 bg-gray-100 shadow-sm">
          <tr className="text-left border-b border-gray-300 text-sm font-semibold">
            <th className="p-3"></th>
            <th className="p-3">Instance Type</th>
            <th className="p-3">VCPU</th>
            <th className="p-3">RAM</th>
            <th className="p-3">Storage</th>
            <th className="p-3">Network</th>
            <th className="p-3">Location</th>
            <th className="p-3">Price Per Unit</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="border-b border-gray-200 hover:bg-gray-100 cursor-pointer transition" onClick={() => openModal(row, row.ID)}>
              <td className="p-3 flex items-center gap-2">
                <img src={row.ProviderID === 1 ? awsLogo : row.ProviderID === 2 ? azureLogo : null} alt="Provider Logo" className="w-8 h-8" />
              </td>
              <td className="p-3">{row.InstanceType} {row.OperatingSystem}</td>
              <td className="p-3">{row.VCPU}</td>
              <td className="p-3">{row.Memory}</td>
              <td className="p-3">{row.Storage}</td>
              <td className="p-3">{row.Network}</td>
              <td className="p-3 flex items-center gap-2 relative group">
                <FaLocationDot className="text-blue-500" />
                <span className="absolute left-8 top-0 bg-black text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {row.RegionCode}
                </span>
                {row.Location}
              </td>
              <td className="p-3">{row.Prices?.[0]?.PricePerUnit || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between p-3 bg-gray-100 border-t">
        <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="p-2 border rounded">Previous</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="p-2 border rounded">Next</button>
      </div>
    </div>
  );
};

export default InstanceDetailsTable;
