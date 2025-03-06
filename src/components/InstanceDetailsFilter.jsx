import React from "react";
import { Slider } from "@mui/material";

const InstanceDetailsFilter = ({
  providers,
  selectedProvider,
  setSelectedProvider,
  regions,
  selectedRegionCode,
  setSelectedRegionCode,
  vcpuRange,
  setVcpuRange,
  priceRange,
  setPriceRange,
  entriesPerPage,
  setEntriesPerPage,
  setRegions,
}) => {
  return (
    <div className="w-1/4 p-4 bg-white shadow-md rounded-lg border border-gray-200 overflow-y-auto">
      {/* Entries Per Page Selection */}
      <div className="mb-4">
        <label className="text-sm font-medium text-gray-700 block mb-1">
          Show Entries:
        </label>
        <select
          value={entriesPerPage}
          onChange={(e) => setEntriesPerPage(parseInt(e.target.value))}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>

      {/* Provider Selection */}
      <div className="mb-4">
        <label className="text-sm font-medium text-gray-700 block mb-1">
          Select Provider:
        </label>
        <select
          value={selectedProvider}
          onChange={(e) => {
            setSelectedProvider(e.target.value);
            setRegions([]);
            setSelectedRegionCode("");
          }}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
        >
          <option value="">Select Provider</option>
          {providers.map((provider, index) => (
            <option key={index} value={provider}>
              {provider}
            </option>
          ))}
        </select>
      </div>

      {/* Region Filter */}
      <div className="mb-4">
        <label className="text-sm font-medium text-gray-700 block mb-1">
          Filter by Region:
        </label>
        <select
          value={selectedRegionCode}
          onChange={(e) => setSelectedRegionCode(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
          disabled={!selectedProvider}
        >
          <option value="">All Regions</option>
          {regions.map((region) => (
            <option key={region.RegionID} value={region.RegionCode}>
              {region.RegionCode}
            </option>
          ))}
        </select>
      </div>

      {/* VCPU Filter */}
      <div className="mb-4">
        <label className="text-sm font-medium text-gray-700 block mb-2">
          Filter by VCPU:
        </label>
        <Slider
          value={vcpuRange}
          onChange={(_, newValue) => setVcpuRange(newValue)}
          valueLabelDisplay="auto"
          min={1}
          max={64}
          sx={{ color: "#2563EB" }}
        />
      </div>

      {/* Price Filter */}
      <div className="mb-4">
        <label className="text-sm font-medium text-gray-700 block mb-2">
          Filter by Price:
        </label>
        <Slider
          value={priceRange}
          onChange={(_, newValue) => setPriceRange(newValue)}
          valueLabelDisplay="auto"
          min={0}
          max={10}
          step={0.1}
          sx={{ color: "#2563EB" }}
        />
      </div>
    </div>
  );
};

export default InstanceDetailsFilter;
