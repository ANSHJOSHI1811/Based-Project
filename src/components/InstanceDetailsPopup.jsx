import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdArrowOutward } from "react-icons/md"; // Updated arrow icon
import { X } from "lucide-react";

const InstanceDetailsPopup = ({ instance, isOpen, onClose, rowID }) => {
  const [priceAndTermsData, setPriceAndTermsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!instance || !isOpen) return;

    setLoading(true);
    setError("");

    fetch(`http://localhost:8080/priceAndTerms?sku_id=${rowID}`)
      .then((res) => res.json())
      .then((data) => setPriceAndTermsData(data.data || []))
      .catch(() => setError("Failed to load data. Please try again."))
      .finally(() => setLoading(false));
  }, [instance, isOpen, rowID]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen || !instance) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg relative max-w-4xl w-full max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3">
          <div className="flex items-center gap-4 text-gray-700">
            <span className="font-semibold">{instance.InstanceType}</span>
            <Link to={`/sku/${rowID}`} className="text-blue-500 hover:text-blue-700">
              <MdArrowOutward size={18} />
            </Link>
            <span className="text-gray-600">{instance.RegionCode}</span>
            <span className="text-gray-600">${instance.Prices?.[0]?.PricePerUnit || "N/A"}</span>
          </div>
          <button className="text-gray-600 hover:text-gray-800" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {loading && <p className="text-center text-gray-600 mt-4">Loading details...</p>}
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        {!loading && !error && (
          <div className="mt-4">
            <div className="max-h-64 overflow-y-auto border border-gray-300 rounded-md">
              <table className="w-full border-collapse border border-gray-300">
                <thead className="sticky top-0 bg-gray-200">
                  <tr>
                    {priceAndTermsData.some((item) => item.offer_term_id) && (
                      <>
                        <th className="border border-gray-300 px-4 py-2">Contract Length</th>
                        <th className="border border-gray-300 px-4 py-2">Offering Class</th>
                        <th className="border border-gray-300 px-4 py-2">Purchase Option</th>
                      </>
                    )}
                    <th className="border border-gray-300 px-4 py-2">Unit</th>
                    <th className="border border-gray-300 px-4 py-2">Price</th>
                    <th className="border border-gray-300 px-4 py-2">Effective Date</th>
                  </tr>
                </thead>
                <tbody>
                  {priceAndTermsData.length > 0 ? (
                    priceAndTermsData.map((item, idx) => (
                      <tr key={idx} className="border border-gray-300">
                        {item.offer_term_id && (
                          <>
                            <td className="border border-gray-300 px-4 py-2">
                              {item.lease_contract_length || "-"}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">{item.offering_class || "-"}</td>
                            <td className="border border-gray-300 px-4 py-2">{item.purchase_option || "-"}</td>
                          </>
                        )}
                        <td className="border border-gray-300 px-4 py-2">{item.unit}</td>
                        <td className="border border-gray-300 px-4 py-2">${item.price_per_unit}</td>
                        <td className="border border-gray-300 px-4 py-2">{item.effective_date}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center py-4 text-gray-500">
                        No pricing details available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstanceDetailsPopup;
