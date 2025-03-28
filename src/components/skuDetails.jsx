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
      {skuData ? (
        <div className="bg-white p-4 rounded shadow-lg">
          {/* General Info Card */}
          <div className="bg-gray-100 p-4 rounded shadow mb-4 flex justify-between">
            <p><strong>{skuData.InstanceType}</strong> </p>
            <p><strong>Location:</strong> {skuData.RegionCode}</p>
            <p><strong>Price:</strong> ${skuData.Prices?.[0]?.PricePerUnit || "N/A"}</p>
          </div>
          
          {/* Compute & Storage & Network Cards in Single Row */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            {/* Compute Card */}
            <div className="bg-gray-100 p-4 rounded shadow">
              <h3 className="text-lg font-semibold">Compute</h3>
              <p><strong>vCPU:</strong> {skuData.VCPU}</p>
              <p><strong>Memory:</strong> {skuData.Memory} GB</p>
              <p><strong>Physical Processor:</strong> {skuData.PhysicalProcessor}</p>
              <p><strong>CPU Architecture:</strong> {skuData.CpuArchitecture}</p>
              <p><strong>GPU:</strong> {skuData.GPU}</p>
            </div>
            
            {/* Storage & Network Card */}
            <div className="bg-gray-100 p-4 rounded shadow">
              <h3 className="text-lg font-semibold">Storage & Network</h3>
              <p><strong>Storage:</strong> {skuData.Storage}</p>
              <p><strong>Max IOPS:</strong> {skuData.MaxIOPS}</p>
              <p><strong>Max Throughput:</strong> {skuData.MaxThroughput}</p>
              <p><strong>Network Performance:</strong> {skuData.Network}</p>
              <p><strong>Enhanced Networking:</strong> {skuData.EnhancedNetworking}</p>
            </div>
          </div>
          
          {/* Pricing Details Card */}
          <div className="bg-gray-100 p-4 rounded shadow">
            <h3 className="text-lg font-semibold">Pricing Details</h3>
            <table className="w-full border-collapse border mt-2">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border px-4 py-2">Effective Date</th>
                  <th className="border px-4 py-2">Unit</th>
                  <th className="border px-4 py-2">Price Per Unit</th>
                </tr>
              </thead>
              <tbody>
                {skuData.Prices?.length > 0 ? (
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
        </div>
      ) : (
        <p className="text-gray-500">No data available.</p>
      )}
    </div>
  );
};

export default SkuDetails;
