// MoreinfoTable.js
import React, { useEffect, useState } from 'react';
import InstanceDetails from './InstanceDetailsTable';
import RowsPerPageSelector from './RowsPerPageSelector';
import PaginationComponent from './PaginationComponent';

const MoreinfoTable = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    fetch('/all-instances.json')
      .then((response) => response.json())
      .then((jsonData) => setData(jsonData))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(data.length / rowsPerPage);

  const handlePageChange = (page) => {
    if (page !== '...') setCurrentPage(page);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const handleRowSelect = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (currentRows.every((row) => selectedRows.includes(row.id))) {
      setSelectedRows((prev) => prev.filter((id) => !currentRows.some((row) => row.id === id)));
    } else {
      const newSelectedRows = [...selectedRows, ...currentRows.map((row) => row.id)];
      setSelectedRows([...new Set(newSelectedRows)]);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-4 gap-2 mt-2 ml-10">
        <div className="col-span-2 text-left text-gray-700 mb-4">
          <p>{data.length} offers found</p>
        </div>

        <RowsPerPageSelector
          rowsPerPage={rowsPerPage}
          handleRowsPerPageChange={handleRowsPerPageChange}
        />
      </div>

      <InstanceDetails
        data={currentRows}
        selectedRows={selectedRows}
        handleRowSelect={handleRowSelect}
        handleSelectAll={handleSelectAll}
      />

      <PaginationComponent
        totalPages={totalPages}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default MoreinfoTable;
