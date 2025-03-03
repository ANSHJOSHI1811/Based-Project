import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SkuDetails = () => {
  const { sku_id } = useParams();
  const [skuData, setSkuData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");

    fetch(`http://localhost:8080/sku?sku_id=${sku_id}`)
      .then((res) => res.json())
      .then((data) => setSkuData(data))
      .catch(() => setError("Failed to fetch SKU details."))
      .finally(() => setLoading(false));
  }, [sku_id]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-xl font-bold">SKU Details</h2>
      {skuData ? (
        <div className="bg-white p-4 rounded shadow-lg">
          <p><strong>SKU Code:</strong> {skuData.SKUCode}</p>
          <p><strong>Product Family:</strong> {skuData.ProductFamily}</p>
          <p><strong>vCPU:</strong> {skuData.VCPU}</p>
          <p><strong>Memory:</strong> {skuData.Memory} GB</p>
          <p><strong>Storage:</strong> {skuData.Storage}</p>
          <p><strong>Operating System:</strong> {skuData.OperatingSystem}</p>
          <p><strong>Network:</strong> {skuData.Network} Mbps</p>
          <p><strong>Region:</strong> {skuData.RegionCode}</p>

          {/* Pricing Table */}
          <h3 className="text-lg font-semibold mt-4">Pricing Details</h3>
          <table className="w-full border-collapse border mt-2">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">Effective Date</th>
                <th className="border px-4 py-2">Unit</th>
                <th className="border px-4 py-2">Price Per Unit</th>
              </tr>
            </thead>
            <tbody>
              {skuData.Prices.length > 0 ? (
                skuData.Prices.map((price, idx) => (
                  <tr key={idx} className="border">
                    <td className="border px-4 py-2">{price.EffectiveDate}</td>
                    <td className="border px-4 py-2">{price.Unit}</td>
                    <td className="border px-4 py-2">${price.PricePerUnit}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-2">No pricing data available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500">No data available.</p>
      )}
    </div>
  );
};

export default SkuDetails;
