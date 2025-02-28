import React, { useEffect, useState } from "react";
import InstanceDetailsTable from "./InstanceDetailsTable";
import InstanceDetailsPopup from "./InstanceDetailsPopup";

const InstanceContainer = () => {
  const [data, setData] = useState([]);
  const [selectedInstance, setSelectedInstance] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [rowID, setRowID] = useState(null);
  useEffect(() => {
    fetch("/all-instances.json")
      .then((res) => res.json())
      .then((jsonData) => setData(jsonData))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  const openPopup = (instance, rowID) => {
    setSelectedInstance(instance);
    setRowID(rowID); // rowID state me store karo
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setSelectedInstance(null);
    setIsPopupOpen(false);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Instance Details</h2>
      <InstanceDetailsTable data={data} openModal={openPopup} />

      {/* Instance Details Popup */}
      <InstanceDetailsPopup
  instance={selectedInstance}
  isOpen={isPopupOpen}
  onClose={closePopup}
  rowID={rowID}  // New prop pass kiya
/>
    </div>
  );
};

export default InstanceContainer;
