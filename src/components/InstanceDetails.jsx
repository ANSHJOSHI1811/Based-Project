// Table.js
import React from 'react';
import { FaLocationDot } from "react-icons/fa6";

const InstanceDetails = ({ data, selectedRows, handleRowSelect, handleSelectAll }) => {
  const isAllSelected = data.every(row => selectedRows.includes(row.id));

  return (
    <table className="min-w-full bg-white">
      <thead className="sticky top-0 bg-white">
        <tr className="text-left border-b border-gray-300">
          <th className="p-3">
            <input
              type="checkbox"
              checked={isAllSelected}
              onChange={handleSelectAll}
            />
          </th>
          <th className="p-3">Name</th>
          <th className="p-3">CPU</th>
          <th className="p-3">RAM</th>
          <th className="p-3">Disk</th>
          <th className="p-3">Bandwidth</th>
          <th className="p-3">Network Speed</th>
          <th className="p-3">Location</th>
          <th className="p-3">Price</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id} className="border-b border-gray-300 hover:bg-gray-100">
            <td className="p-3">
              <input
                type="checkbox"
                checked={selectedRows.includes(row.id)}
                onChange={() => handleRowSelect(row.id)}
              />
            </td>
            <td className="p-3 flex items-center">
              <img
                src="https://download.logo.wine/logo/Amazon_Web_Services/Amazon_Web_Services-Logo.wine.png"
                alt="aws logo"
                className="w-6 h-6 mr-2"
              />
              {row.name}
            </td>
            <td className="p-3">{row.cpu}</td>
            <td className="p-3">{row.ram}</td>
            <td className="p-3">{row.disk}</td>
            <td className="p-3">{row.bandwidth}</td>
            <td className="p-3">{row.networkSpeed}</td>
            <td className="p-3 relative group">
              <FaLocationDot />
              <span className="absolute left-8 top-0 w-max bg-black text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {row.location}
              </span>
            </td>
            <td className="p-3">{row.price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default InstanceDetails;
