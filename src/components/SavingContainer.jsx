import React, { useEffect, useState } from "react";
import SavingDetailsTable from "./SavingDetailsTable";
import SavingDetailsPopup from "./SavingDetailsPopup";

const SavingContainer = () => {
  const [data, setData] = useState([]);
  const [selectedInstance, setSelectedInstance] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [skuCode, setSkuCode] = useState(null);
  useEffect(() => {
    fetch("/all-instances.json")
      .then((res) => res.json())
      .then((jsonData) => setData(jsonData))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  const openPopup = (instance, skuCode) => {
    setSelectedInstance(instance);
    setSkuCode(skuCode);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setSelectedInstance(null);
    setIsPopupOpen(false);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Instance Details</h2>
      <SavingDetailsTable data={data} openModal={openPopup} />

      {/* Instance Details Popup */}
      <SavingDetailsPopup
  instance={selectedInstance}
  isOpen={isPopupOpen}
  onClose={closePopup}
  skuCode={skuCode}  // New prop pass kiya
/>
    </div>
  );
};

export default SavingContainer;
