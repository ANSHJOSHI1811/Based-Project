import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import awsLogo from "../assets/aws.png";
import azureLogo from "../assets/azure.png";

const InstanceDetailsTable = ({ data, openModal }) => {
  return (
    <div className="w-3/4 overflow-auto ml-4 bg-white shadow-lg rounded-lg border border-gray-200">
      <table className="min-w-full border-collapse">
        <thead className="sticky top-0 bg-gray-100 shadow-md z-10">
          <tr className="text-left border-b border-gray-300 text-sm font-semibold text-gray-700">
            <th className="p-4"></th>
            <th className="p-4">Instance Type</th>
            <th className="p-4">VCPU</th>
            <th className="p-4">RAM</th>
            <th className="p-4">Storage</th>
            <th className="p-4">Network</th>
            <th className="p-4">Location</th>
            <th className="p-4">Price Per Unit</th>
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
              <td className="p-4 flex items-center gap-2 text-gray-700">
                <FaLocationDot className="text-blue-500 text-lg" />
                {row.RegionCode}
              </td>
              <td className="p-4 font-semibold text-gray-900">
                {row.Prices?.[0]?.PricePerUnit ? `$${row.Prices[0].PricePerUnit}` : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InstanceDetailsTable;
