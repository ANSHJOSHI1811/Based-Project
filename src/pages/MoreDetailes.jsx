import React from 'react';
import Sidebar from '../components/Sidebar';
import MoreinfoTable from '../components/MoreinfoTable';

function MoreDetailes() {

  return (
    <div className="flex h-screen">
      <div className="w-1/4 bg-gray-200">
        <Sidebar />
      </div>

      <div className="w-3/4 bg-white p-4">
        <MoreinfoTable />
      </div>
    </div>
  );
}

export default MoreDetailes;
