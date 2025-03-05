import React, { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import awsLogo from "../assets/aws.png"; // AWS logo
import azureLogo from "../assets/azure.png"; // Azure logo

const InstanceDetailsTable = ({ openModal }) => {
  const [providers, setProviders] = useState([]); // Store provider list
  const [selectedProvider, setSelectedProvider] = useState(""); // Selected provider
  const [regions, setRegions] = useState([]); // Store regions
  const [selectedRegionCode, setSelectedRegionCode] = useState(""); // Selected RegionCode
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProviders(); // Fetch providers on mount
  }, []);

  useEffect(() => {
    if (selectedProvider) fetchRegions(selectedProvider); // Fetch regions when provider changes
  }, [selectedProvider]);

  useEffect(() => {
    fetchData(currentPage, entriesPerPage, selectedRegionCode);
  }, [currentPage, entriesPerPage, selectedRegionCode]);

  // Fetch providers from API
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

  // Fetch regions based on selected provider
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

  // Fetch instance data with region as a query parameter
  const fetchData = async (page, limit, regionCode) => {
    setLoading(true);
    setError(null);
    try {
      let url = `http://localhost:8080/skus?page=${page}&limit=${limit}`;
      if (regionCode) {
        url += `&region=${regionCode}`;
      }
  

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

  const handleEntriesChange = (event) => {
    setEntriesPerPage(parseInt(event.target.value));
    setCurrentPage(1);
  };

  const getProviderLogo = (providerId) => (providerId === 1 ? awsLogo : providerId === 2 ? azureLogo : null);

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center p-4 text-red-600">{error}</div>;
  if (!data.length) return <div className="text-center p-4">No instances found</div>;

  return (
    <div className="overflow-y-auto border border-gray-300 rounded-md shadow-md" style={{ height: "560px" }}>
      {/* Filter Section */}
      <div className="flex justify-between items-center p-3 bg-gray-100 border-b">
        <label className="text-sm">
          Show
          <select value={entriesPerPage} onChange={handleEntriesChange} className="ml-2 p-1 border rounded">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>{" "}
          entries
        </label>

        {/* Provider Filter Dropdown */}
        <label className="text-sm">
          Select Provider:
          <select
            value={selectedProvider}
            onChange={(e) => {
              setSelectedProvider(e.target.value);
              setRegions([]); // Reset regions when provider changes
              setSelectedRegionCode(""); // Reset selected region
            }}
            className="ml-2 p-1 border rounded"
          >
            <option value="">Select Provider</option>
            {providers.map((provider, index) => (
              <option key={index} value={provider}>
                {provider}
              </option>
            ))}
          </select>
        </label>

        {/* Region Filter Dropdown */}
        <label className="text-sm">
          Filter by Region:
          <select
            value={selectedRegionCode}
            onChange={(e) => setSelectedRegionCode(e.target.value)}
            className="ml-2 p-1 border rounded"
            disabled={!selectedProvider} // Disable if no provider is selected
          >
            <option value="">All Regions</option>
            {regions.map((region) => (
              <option key={region.RegionID} value={region.RegionCode}>
                {region.RegionCode}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Table */}
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
                {getProviderLogo(row.ProviderID) && (
                  <img src={getProviderLogo(row.ProviderID)} alt="Provider Logo" className="w-8 h-8" />
                )}
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
    </div>
  );
};

export default InstanceDetailsTable;
