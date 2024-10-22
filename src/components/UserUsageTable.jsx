// UserUsageTable.js
import React from 'react';

function UsageTable({ instances }) {
  return (
    <div className="w-full overflow-x-auto">
      <div className="w-[1200px] mx-auto overflow-hidden rounded-lg shadow-md">
        <table className="table-fixed min-w-full bg-white">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="w-1/5 py-3 px-4 text-left">Instance</th>
              <th className="w-1/5 py-3 px-4 text-left">Region</th>
              <th className="w-1/5 py-3 px-4 text-left">Running Cost</th>
              <th className="w-1/5 py-3 px-4 text-left">Total Cost</th>
              <th className="w-1/5 py-3 px-4 text-left">Findings</th>
            </tr>
          </thead>
        </table>

        <div className="h-96 overflow-y-auto">
          <table className="table-fixed min-w-full">
            <tbody>
              {instances.map((instance, index) => (
                <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                  <td className="w-1/5 py-3 px-4 border-b">{instance.Instance}</td>
                  <td className="w-1/5 py-3 px-4 border-b">{instance.Region}</td>
                  <td className="w-1/5 py-3 px-4 border-b">{instance.RunningCost}</td>
                  <td className="w-1/5 py-3 px-4 border-b">{instance.Cost}</td>
                  <td className="w-1/5 py-3 px-4 border-b">{instance.Findings}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UsageTable;
