import React, { useEffect, useState } from 'react';
import InstanceDetailsTable from './InstanceDetailsTable';
import RowsPerPageSelector from './RowsSelector';
import PaginationComponent from './Pagination';
import DetailsInstanceInfo from './InstanceDetailsPopup';

const MoreInfoTable = () => {
  const [data, setData] = useState([]);
  const [currentRows, setCurrentRows] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedProvider, setSelectedProvider] = useState('');
  const [cpuLimit, setCpuLimit] = useState(16);
  const [ramLimit, setRamLimit] = useState(64);
  const [nwLimit, setNwLimit] = useState(20.0);
  const [diskLimit, setDiskLimit] = useState(200);
  const [bandLimit, setBandLimit] = useState(50);
  const [priceLimit, setPriceLimit] = useState(20);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInstance, setSelectedInstance] = useState(null);

  // Fetch data from JSON file
  useEffect(() => {
    fetch('/all-instances.json')
      .then((response) => {
        if (!response.ok) throw new Error('Failed to load data');
        return response.json();
      })
      .then((jsonData) => {
        console.log("Fetched Data:", jsonData); // Debugging fetched data
        setData(jsonData);
        setCurrentRows(jsonData);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  // Filter data based on user inputs and search term
  useEffect(() => {
    let filteredRows = data;

    if (selectedLocation) {
      filteredRows = filteredRows.filter(row => row.location === selectedLocation);
      console.log("Filtered by Location:", filteredRows);
    }

    if (selectedProvider) {
      filteredRows = filteredRows.filter(row => row.provider === selectedProvider);
      console.log("Filtered by Provider:", filteredRows);
    }

    filteredRows = filteredRows.filter(row =>
      row.cpu <= cpuLimit &&
      row.price <= priceLimit &&
      row.ram <= ramLimit &&
      row.networkSpeed <= nwLimit &&
      row.bandwidth <= bandLimit &&
      row.disk <= diskLimit
    );

    if (searchTerm) {
      filteredRows = filteredRows.filter(row =>
        row.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setCurrentRows(filteredRows);
    console.log("Final Filtered Rows:", filteredRows);
  }, [selectedLocation, selectedProvider, cpuLimit, ramLimit,nwLimit, diskLimit, bandLimit, priceLimit, data, searchTerm
  ]);

  // Pagination logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const totalPages = Math.ceil(currentRows.length / rowsPerPage);

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const openModal = (instance) => {
    setSelectedInstance(instance);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedInstance(null);
  };

  return (
    <div className="grid grid-cols-12 gap-4 h-screen p-4 mt-7">
      {/* Sidebar: Left */}
      <div className="sidebar col-span-3 bg-white p-4 space-y-4 rounded-lg shadow-md">
         {/* Search Input */}
         <div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Name"
            className="border border-gray-300 p-2 rounded w-full"
          />
        </div>
       
        {/* Provider Dropdown */}
        <div>
          <select
            value={selectedProvider}
            onChange={(e) => {
              console.log("Selected Provider:", e.target.value); // Debugging
              setSelectedProvider(e.target.value);
            }}
            className="border border-gray-300 p-2 rounded w-full"
          >
            <option value="">Select Provider</option>
            {Array.from(new Set(data.map(row => row.provider))).map((provider, index) => (
              <option key={index} value={provider}>{provider}</option>
            ))}
          </select>
        </div>

        {/* Location Dropdown */}
        <div>
          <select
            value={selectedLocation}
            onChange={(e) => {
              console.log("Location:", e.target.value); // Debugging
              setSelectedLocation(e.target.value);
            }}
            className="border border-gray-300 p-2 rounded w-full"
          >
            <option value="">Select Location</option>
            {Array.from(new Set(data.map(row => row.location))).map((location, index) => (
              <option key={index} value={location}>{location}</option>
            ))}
          </select>
        </div>

      

        {/* Range Inputs */}
        {[
          { label: 'CPU Limit', value: cpuLimit, setValue: setCpuLimit, max: 16 },
          { label: 'Price Limit', value: priceLimit, setValue: setPriceLimit, max: 20 },
          { label: 'RAM Limit', value: ramLimit, setValue: setRamLimit, max: 64 },
          { label: 'Network Limit', value: nwLimit, setValue: setNwLimit, max: 20 },
          { label: 'Bandwidth Limit', value: bandLimit, setValue: setBandLimit, max: 50 },
          { label: 'Disk Limit', value: diskLimit, setValue: setDiskLimit, max: 200 }
        ].map((item, index) => (
          <div key={index}>
            <label className="block mb-2 text-gray-700">
              {item.label}: {item.value}
            </label>
            <input
              type="range"
              min="1"
              max={item.max}
              value={item.value}
              onChange={(e) => item.setValue(Number(e.target.value))}
              className="w-full"
            />
          </div>
        ))}
      </div>

      {/* Main Container: Right */}
      <div className="main-container col-span-9 bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-4 gap-2 mb-4">
          <p className="col-span-2 text-left text-gray-700">{currentRows.length} offers found</p>
          <RowsPerPageSelector
            rowsPerPage={rowsPerPage}
            handleRowsPerPageChange={handleRowsPerPageChange}
          />
        </div>

        <InstanceDetailsTable
          data={currentRows.slice(indexOfFirstRow, indexOfLastRow)}
          openModal={openModal}
        />

        <PaginationComponent
          totalPages={totalPages}
          currentPage={currentPage}
          handlePageChange={setCurrentPage}
        />

        {isModalOpen && (
          <DetailsInstanceInfo
            instance={selectedInstance}
            isOpen={isModalOpen}
            onClose={closeModal}
          />
        )}
      </div>
    </div>
  );
};

export default MoreInfoTable;
