import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import awsLogo from "../assets/aws.png";
import azureLogo from "../assets/azure.png";

const InstanceDetailsTable = ({ data, openModal, onSort, sortBy, order, includeNaPrice, setIncludeNaPrice }) => {
  const sortableColumns = {
    VCPU: "vcpu",
    RAM: "memory",
    Network: "network",
    "Price Per Unit": "price",
  };

  const handleSortClick = (column) => {
    const field = sortableColumns[column];
    if (field) {
      onSort(field);
    }
  };

  const getSortIndicator = (column) => {
    const field = sortableColumns[column];
    if (sortBy === field) {
      return order === "asc" ? " ↑" : " ↓";
    }
    return "";
  };

  return (
    <div className="w-3/4 overflow-auto ml-4 bg-white shadow-lg rounded-lg border border-gray-200">
      <table className="min-w-full border-collapse">
      <thead className="sticky top-0 bg-gray-100 shadow-md z-10">
  <tr className="text-left border-b border-gray-300 text-sm font-semibold text-gray-700">
    <th className="p-4"></th>
    <th className="p-4">Instance Type</th>
    <th
      className={`p-4 cursor-pointer hover:text-blue-600 transition-colors duration-200 ${
        sortBy === "vcpu" ? "text-blue-600" : ""
      }`}
      onClick={() => handleSortClick("VCPU")}
      title="Sort by vCPU"
    >
      <div className="flex items-center">
        vCPU
        <span className="ml-1">{getSortIndicator("VCPU") || "⇅"}</span>
      </div>
    </th>
    <th
      className={`p-4 cursor-pointer hover:text-blue-600 transition-colors duration-200 ${
        sortBy === "memory" ? "text-blue-600" : ""
      }`}
      onClick={() => handleSortClick("RAM")}
      title="Sort by RAM"
    >
      <div className="flex items-center">
        RAM (GiB)
        <span className="ml-1">{getSortIndicator("RAM") || "⇅"}</span>
      </div>
    </th>
    <th className="p-4">Storage</th>
    <th
      className={`p-4 cursor-pointer hover:text-blue-600 transition-colors duration-200 ${
        sortBy === "network" ? "text-blue-600" : ""
      }`}
      onClick={() => handleSortClick("Network")}
      title="Sort by Network"
    >
      <div className="flex items-center">
        Network
        <span className="ml-1">{getSortIndicator("Network") || "⇅"}</span>
      </div>
    </th>
    <th className="p-4">Location</th>
    <th
      className={`p-4 cursor-pointer hover:text-blue-600 transition-colors duration-200 font-bold ${
        sortBy === "price" ? "text-blue-600" : ""
      }`}
      onClick={() => handleSortClick("Price Per Unit")}
      title="Sort by Price"
    >
      <div className="flex items-center">
        Price Per Unit
        <span className="ml-1">{getSortIndicator("Price Per Unit") || "⇅"}</span>
      </div>
    </th>
  </tr>
</thead>


        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              className="border-b border-gray-200 hover:bg-gray-50 transition-all duration-200 cursor-pointer"
              onClick={() => openModal(row, row.ID)}
            >
              <td className="p-4 flex items-center gap-3">
                  <img
                    src={
                      row.ProviderID === 1
                        ? awsLogo
                        : row.ProviderID === 2
                        ? azureLogo
                        : null
                    }
                    alt="Provider Logo"
                    className="w-10 h-10 rounded-md"
                  />
              </td>
              <td className="p-4 font-medium text-gray-800">
                {row.InstanceType} <span className="text-gray-500">{row.OperatingSystem}</span>
              </td>
              <td className="p-4">{row.VCPU}</td>
              <td className="p-4">{row.Memory}</td>
              <td className="p-4">{row.Storage}</td>
              <td className="p-4">{row.Network}</td>
              <td className="p-3 flex items-center gap-2 relative group">



<FaLocationDot className="text-blue-500" />


<span className="absolute left-8 top-0 bg-black text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">


  {row.RegionCode}

</span>


{row.Location}

</td>
            
              <td className="p-4 font-semibold text-gray-900">
  {row.Prices?.[0]?.PricePerUnit != null
    ? `$${row.Prices[0].PricePerUnit}`
    : "N/A"}
</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InstanceDetailsTable;
