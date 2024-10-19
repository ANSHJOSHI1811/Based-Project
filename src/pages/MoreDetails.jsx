import React from 'react';
import Sidebar from '../components/Sidebar';
import MoreinfoTable from '../components/DetaileContainer';

function MoreDetails() {

  return (
    <div className="grid grid-cols-12 gap-2 ml-10 flex h-screen grid-rows-1 mt-5">
      <div className="col-span-3" style={{width:'97%'}}>
        <Sidebar />
      </div>

      <div className="col-span-9 bg-white p-4 shadow-lg h-screen  p-4 overflow-y-auto rounded-md" style={{width:'97%'}}>
        <MoreinfoTable />
      </div>
    </div>
  );
}

export default MoreDetails;
