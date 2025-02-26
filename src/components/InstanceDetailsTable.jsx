import React from 'react';
import { FaLocationDot } from "react-icons/fa6";

const InstanceDetailsTable = ({ data, openModal }) => {
  if (!data || data.length === 0) {
    return <div>No instances found</div>;
  }

  return (
    <div className="overflow-y-auto border border-gray-300 rounded-md" style={{ height: "512px" }}>
      <table className="min-w-full bg-white">
        <thead className="sticky top-0 bg-white">
          <tr className="text-left border-b border-gray-300">
          <th className="p-3">Provider</th>
            <th className="p-3">Name</th>
            <th className="p-3">CPU</th>
            <th className="p-3">RAM</th>
            <th className="p-3">Instance type</th>
            <th className="p-3">Storage</th>
            <th className="p-3">Operating System</th>
            <th className="p-3">Location</th>
            <th className="p-3">Price</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              className="border-b border-gray-300 hover:bg-gray-100 cursor-pointer"
              onClick={() => openModal(row)}
            >
              <td className="p-3">{row.provider}</td>
              <td className="p-3">{row.name}</td>
              <td className="p-3">{row.cpu}</td>
              <td className="p-3">{row.ram}</td>
              <td className="p-3">{row.instancetype}</td>
              <td className="p-3">{row.storage}</td>
              <td className="p-3">{row.operatingsystem}</td>
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
    </div>
  );
};

export default InstanceDetailsTable;
