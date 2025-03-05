import React, { useState, useEffect } from "react";

const Sliders = ({ onFilterChange, defaultValues }) => {
  const [price, setPrice] = useState(defaultValues.price);
  const [memory, setMemory] = useState(defaultValues.memory);
  const [vCPU, setVCPU] = useState(defaultValues.vCPU);

  useEffect(() => {
    onFilterChange({ price, memory, vCPU });
  }, [price, memory, vCPU]);

  const resetFilters = () => {
    setPrice(defaultValues.price);
    setMemory(defaultValues.memory);
    setVCPU(defaultValues.vCPU);
  };

  return (
    <div className="p-4 border rounded-lg shadow-lg bg-white">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>
      
      {/* Price Slider */}
      <div className="mb-4">
        <label className="block text-sm font-medium">Max Price: ${price}</label>
        <input
          type="range"
          min="0"
          max="1000"
          step="10"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="w-full"
        />
      </div>
      
      {/* Memory Slider */}
      <div className="mb-4">
        <label className="block text-sm font-medium">Max Memory: {memory} GB</label>
        <input
          type="range"
          min="1"
          max="128"
          step="1"
          value={memory}
          onChange={(e) => setMemory(Number(e.target.value))}
          className="w-full"
        />
      </div>
      
      {/* vCPU Slider */}
      <div className="mb-4">
        <label className="block text-sm font-medium">Max vCPUs: {vCPU}</label>
        <input
          type="range"
          min="1"
          max="64"
          step="1"
          value={vCPU}
          onChange={(e) => setVCPU(Number(e.target.value))}
          className="w-full"
        />
      </div>

      <button 
        onClick={resetFilters} 
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
        Reset Filters
      </button>
    </div>
  );
};

export default Sliders;
