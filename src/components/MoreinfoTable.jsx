import React, { useEffect, useState } from 'react';
//import Pagination from './Pagination';

const MoreinfoTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/all-instances.json')
      .then((response) => response.json())
      .then((jsonData) => setData(jsonData))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <>
      <div className="container mx-auto my-8">
        <div className="text-left text-gray-700 mb-4">
          <p>243,620 offers found</p>
          <p className="text-right text-sm">
            <img src='https://cdn-icons-png.flaticon.com/128/17753/17753332.png' className="w-5 h-5 inline-block ml-1"/> Change currency to EUR to see more offers.
          </p>
        </div>
        <table className="min-w-full bg-white border border-gray-300 rounded-md">
          <thead>
            <tr className="text-left border-b border-gray-300">
              <th className="p-3">
                <input type="checkbox" />
              </th>
              <th className="p-3">Name</th>
              <th className="p-3 cursor-pointer">CPU<img src="https://cdn-icons-png.flaticon.com/128/7601/7601533.png" alt="info icon" className="w-5 h-6 inline-block ml-1"/></th>
              <th className="p-3 cursor-pointer">RAM<img src="https://cdn-icons-png.flaticon.com/128/7601/7601533.png" alt="info icon" className="w-5 h-6 inline-block ml-1"/></th>
              <th className="p-3 cursor-pointer">Disk<img src="https://cdn-icons-png.flaticon.com/128/7601/7601533.png" alt="info icon" className="w-5 h-6 inline-block ml-1"/></th>
              <th className="p-3 cursor-pointer">Bandwidth<img src="https://cdn-icons-png.flaticon.com/128/7601/7601533.png" alt="info icon" className="w-5 h-6 inline-block ml-1"/></th>
              <th className="p-3 cursor-pointer">Network Speed<img src="https://cdn-icons-png.flaticon.com/128/7601/7601533.png" alt="info icon" className="w-5 h-6 inline-block ml-1"/></th>
              <th className="p-3 cursor-pointer">Location<img src="https://cdn-icons-png.flaticon.com/128/7601/7601533.png" alt="info icon" className="w-5 h-6 inline-block ml-1"/></th>
              <th className="p-3 cursor-pointer">Price <img src="https://cdn-icons-png.flaticon.com/128/7601/7601533.png" alt="info icon" className="w-5 h-6 inline-block ml-1"/></th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} className="border-b border-gray-300 hover:bg-gray-100">
                <td className="p-3">
                  <input type="checkbox" />
                </td>
                <td className="p-3 flex items-center">
                  <img src="https://download.logo.wine/logo/Amazon_Web_Services/Amazon_Web_Services-Logo.wine.png" alt="aws logo" className="w-6 h-6 mr-2" />
                  {row.name}
                </td>
                <td className="p-3">{row.cpu}</td>
                <td className="p-3">{row.ram}</td>
                <td className="p-3">{row.disk}</td>
                <td className="p-3">{row.bandwidth}</td>
                <td className="p-3">{row.networkSpeed}</td>
                <td className="p-3">
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/13905/13905666.png"
                    alt="location icon"
                    className="w-6 h-6"
                  />
                </td>
                <td className="p-3">{row.location}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </>
  );
};

export default MoreinfoTable;