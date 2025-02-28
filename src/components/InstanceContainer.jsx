import React, { useEffect, useState } from "react";
import InstanceDetailsTable from "./InstanceDetailsTable";

const InstanceContainer = () => {
  const [data, setData] = useState([]);

  // Fetch data from JSON file
  useEffect(() => {
    fetch("/all-instances.json")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to load data");
        return response.json();
      })
      .then((jsonData) => {
        console.log("Fetched Data:", jsonData);
        setData(jsonData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Instance Details</h2>
      <InstanceDetailsTable data={data} />
    </div>
  );
};

export default InstanceContainer;
