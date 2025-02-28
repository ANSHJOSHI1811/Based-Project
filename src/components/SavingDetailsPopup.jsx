import React, { useEffect, useState } from "react";

const SavingDetailsPopup = ({ instance, isOpen, onClose ,rowID }) => {
  const [priceData, setPriceData] = useState(null);
  const [termsData, setTermsData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!instance || !isOpen) return;
  
    setLoading(true);
    setError("");
  
    Promise.all([
      fetch(`http://localhost:8080/terms?sku_id=${rowID}`).then((res) => res.json()),
      fetch(`http://localhost:8080/prices?sku_id=${rowID}`).then((res) => res.json()),
    ])
      .then(([terms, prices]) => {
        setTermsData(terms);
        setPriceData(prices);
      })
      .catch(() => setError("Failed to load data. Please try again."))
      .finally(() => setLoading(false));
  }, [instance, isOpen, rowID]);

  if (!isOpen || !instance) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg relative max-w-2xl w-full">
        {/* Header */}
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-bold">{instance.name} ({instance.provider})</h3>
          <button className="text-gray-600 hover:text-gray-800" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Loading State */}
        {loading && <p className="text-center text-gray-600 mt-4">Loading details...</p>}

        {/* Error State */}
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        {/* Content */}
        {!loading && !error && (
          <>
            <div className="mt-4">
              <p><strong>Location:</strong> {instance.location}</p>
              <p><strong>Base Price:</strong> ${instance.price}</p>
            </div>

            {/* Price Details */}
            <div className="mt-4">
              <h4 className="font-semibold text-gray-700">Pricing Details</h4>
              {priceData && priceData.length > 0 ? (
                <ul className="mt-2 space-y-2">
                  {priceData.map((price, idx) => (
                    <li key={idx} className="p-2 bg-gray-100 rounded-md">
                      <strong>Price ID:</strong> {price.PriceID} | 
                      <strong> Unit:</strong> {price.Unit} | 
                      <strong> Rate:</strong> ${price.PricePerUnit}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No pricing details available.</p>
              )}
            </div>

            {/* Terms Details */}
            <div className="mt-4">
              <h4 className="font-semibold text-gray-700">Terms & Conditions</h4>
              {termsData && termsData.terms.length > 0 ? (
                <ul className="mt-2 space-y-2">
                  {termsData.terms.map((term, idx) => (
                    <li key={idx} className="p-2 bg-gray-100 rounded-md">
                      <strong>Lease Length:</strong> {term.LeaseContractLength} | 
                      <strong> Purchase:</strong> {term.PurchaseOption} | 
                      <strong> Offering Class:</strong> {term.OfferingClass}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No terms available.</p>
              )}
            </div>
          </>
        )}
      </div>

      {/* Close on backdrop click */}
      <div className="fixed inset-0 bg-transparent" onClick={onClose}></div>
    </div>
  );
};

export default SavingDetailsPopup;
