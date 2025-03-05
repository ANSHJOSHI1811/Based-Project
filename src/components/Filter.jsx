import React, { useEffect, useState } from "react";

const FilterPanel = ({ applyFilters }) => {
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [gpu, setGpu] = useState(0);
  const [network, setNetwork] = useState(0);

  useEffect(() => {
    fetch("http://localhost:8080/api/regions")
      .then((res) => res.json())
      .then((data) => setRegions(data))
      .catch((err) => console.error("Error fetching regions:", err));
  }, []);

  const handleApplyFilters = () => {
    applyFilters({ region: selectedRegion, gpu, network });
  };

  return (
    <div className="p-4 border-r border-gray-300 w-1/4 bg-gray-100">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium">Region</label>
        <select
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">All Regions</option>
          {regions.map((region) => (
            <option key={region.id} value={region.code}>{region.name}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">GPU: {gpu}</label>
        <input
          type="range"
          min="0"
          max="16"
          value={gpu}
          onChange={(e) => setGpu(e.target.value)}
          className="w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Network: {network} Gbps</label>
        <input
          type="range"
          min="0"
          max="100"
          value={network}
          onChange={(e) => setNetwork(e.target.value)}
          className="w-full"
        />
      </div>
      <button
        onClick={handleApplyFilters}
        className="w-full p-2 bg-blue-500 text-white rounded"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default FilterPanel;
