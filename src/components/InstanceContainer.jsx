import React, { useEffect, useState } from "react";
import InstanceDetailsTable from "./InstanceDetailsTable";
import InstanceDetailsFilter from "./InstanceDetailsFilter";
import InstanceDetailsPopup from "./InstanceDetailsPopup";

const InstanceContainer = () => {
  const [providers, setProviders] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState("");
  const [regions, setRegions] = useState([]);
  const [selectedRegionCode, setSelectedRegionCode] = useState("");
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [vcpuRange, setVcpuRange] = useState([1, 64]);
  const [priceRange, setPriceRange] = useState([0, 10]);
  const [selectedInstance, setSelectedInstance] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [rowID, setRowID] = useState(null);

  useEffect(() => {
    fetchProviders();
  }, []);

  useEffect(() => {
    if (selectedProvider) fetchRegions(selectedProvider);
  }, [selectedProvider]);

  useEffect(() => {
    fetchData(currentPage, entriesPerPage, selectedRegionCode, vcpuRange, priceRange);
  }, [currentPage, entriesPerPage, selectedRegionCode, vcpuRange, priceRange]);

  const fetchProviders = async () => {
    try {
      const response = await fetch("http://localhost:8080/providers");
      if (!response.ok) throw new Error("Failed to fetch providers");
      const result = await response.json();
      setProviders(result.providers || []);
    } catch (error) {
      console.error("Error fetching providers:", error.message);
    }
  };

  const fetchRegions = async (provider) => {
    try {
      const response = await fetch(
        `http://localhost:8080/regions?provider=${provider}`
      );
      if (!response.ok) throw new Error("Failed to fetch regions");
      const result = await response.json();
      setRegions(result || []);
    } catch (error) {
      console.error("Error fetching regions:", error.message);
    }
  };

  const fetchData = async () => {
    try {
      let url = `http://localhost:8080/skus?page=${currentPage}&limit=${entriesPerPage}`;
      if (selectedRegionCode) url += `&region=${selectedRegionCode}`;
      url += `&minVcpu=${vcpuRange[0]}&maxVcpu=${vcpuRange[1]}`;
      url += `&minPrice=${priceRange[0]}&maxPrice=${priceRange[1]}`;
  
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch data");
      
      const result = await response.json();
      setData(result.data || []);
      setTotalPages(result.totalPages || 1); // ✅ Ensure totalPages is updated
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const openPopup = (instance, rowID) => {
    setSelectedInstance(instance);
    setRowID(rowID);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setSelectedInstance(null);
    setIsPopupOpen(false);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Instance Details</h2>
      <div className="flex h-[560px] border border-gray-300 rounded-md shadow-md">
        <InstanceDetailsFilter
          providers={providers}
          selectedProvider={selectedProvider}
          setSelectedProvider={setSelectedProvider}
          regions={regions}
          selectedRegionCode={selectedRegionCode}
          setSelectedRegionCode={setSelectedRegionCode}
          vcpuRange={vcpuRange}
          setVcpuRange={setVcpuRange}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          entriesPerPage={entriesPerPage}
          setEntriesPerPage={setEntriesPerPage}
          setRegions={setRegions} // Pass setRegions to the filter
        />
        <InstanceDetailsTable data={data} openModal={openPopup} />
      </div>

      {/* Instance Details Popup */}
      <InstanceDetailsPopup
        instance={selectedInstance}
        isOpen={isPopupOpen}
        onClose={closePopup}
        rowID={rowID}
      />

      {/* Pagination Controls */}
      <div className="flex justify-center items-center space-x-4 p-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default InstanceContainer;
