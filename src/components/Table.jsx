import React, { useEffect, useState } from 'react';

function Table () {
  const [instances, setInstances] = useState([]);

  // Fetch the JSON file data
  useEffect(() => {
    fetch('/aws-instances.json')
      .then(response => response.json())
      .then(data => setInstances(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);
  return ( 
    <table className="min-w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
      <thead className="bg-gray-800 text-white">
        <tr>
          <th className="py-3 px-4 text-left">Instance</th>
          <th className="py-3 px-4 text-left">Region</th>
          <th className="py-3 px-4 text-left">Running Cost</th>
          <th className="py-3 px-4 text-left">Total Cost</th>
          <th className="py-3 px-4 text-left">Findings</th>
        </tr>
      </thead>
      <tbody>
        {instances.map((instance, index) => (
          <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
            <td className="py-3 px-4 border-b">{instance.Instance}</td>
            <td className="py-3 px-4 border-b">{instance.Region}</td>
            <td className="py-3 px-4 border-b">{instance.RunningCost}</td>
            <td className="py-3 px-4 border-b">{instance.Cost}</td>
            <td className="py-3 px-4 border-b">{instance.Findings}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
