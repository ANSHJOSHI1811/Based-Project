import React, { useEffect, useState } from "react";

const SavingDetailsPopup = ({ isOpen, onClose, skuCode ,instance}) => {
  const [instanceDetails, setInstanceDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!skuCode || !isOpen) return;

    setLoading(true);
    setError("");

    fetch(`http://localhost:8080/sku?skuCode=${skuCode}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("API Response:", data); // Debugging

        // If response is an object, set it directly
        if (data && typeof data === "object") {
          setInstanceDetails(data); 
        } else {
          setError("No data found.");
        }
      })
      .catch(() => setError("Failed to load data. Please try again."))
      .finally(() => setLoading(false));
  }, [skuCode, isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Freeze background
    } else {
      document.body.style.overflow = "auto"; // Restore scrolling
    }
    return () => {
      document.body.style.overflow = "auto"; // Cleanup on unmount
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
  <div className="bg-white p-6 rounded-lg shadow-lg relative max-w-4xl w-full max-h-[80vh] overflow-y-auto">
    <button className="absolute top-2 right-2 text-gray-600" onClick={onClose}>
      ✖
    </button>

    {/* Loading and Error Handling */}
    {loading && <p className="text-center text-gray-600 mt-4">Loading details...</p>}
    {error && <p className="text-red-500 text-center mt-4">{error}</p>}

    {/* Display Data */}
    {!loading && !error && instanceDetails && (
      <div className="mt-4 border border-gray-300 p-4 rounded-lg">
        
        {/* Instance Name & Location */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-lg">{instanceDetails.InstanceType || "N/A"}</h2>
          <p className="text-gray-600">Location: {instanceDetails.RegionCode || "N/A"}</p>
        </div>

        {/* Pricing Section */}
        <div className="flex justify-between items-center mb-4 p-3 bg-gray-100 rounded-lg">
        <p className="text-green-600 font-semibold">
            Saving Rate: {instance.DiscountedRate || "N/A"}
          </p>
          <p className="text-red-500 font-semibold">
            Basic Rate: {instanceDetails.Prices?.[0]?.PricePerUnit || "N/A"}
          </p>
      
        </div>

        {/* Configuration Details */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p><strong>Operating System:</strong> {instanceDetails.OperatingSystem || "N/A"}</p>
            <p><strong>vCPUs:</strong> {instanceDetails.VCPU || "N/A"}</p>
            <p><strong>Memory:</strong> {instanceDetails.Memory ? `${instanceDetails.Memory} GB` : "N/A"}</p>
          </div>
          <div>
            <p><strong>Storage:</strong> {instanceDetails.Storage || "N/A"}</p>
            <p><strong>Network:</strong> {instanceDetails.Network ? `${instanceDetails.Network} Mbps` : "N/A"}</p>
          </div>
        </div>

      </div>
    )}
  </div>
</div>

  );
};

export default SavingDetailsPopup;
