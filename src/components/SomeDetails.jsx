import React from 'react'
import { BiMoney } from "react-icons/bi";
import { TbReportMoney } from "react-icons/tb";
import { TbZoomMoney } from "react-icons/tb";
import { TbPigMoney } from "react-icons/tb";
const SomeDetails = () => {
  return (
  <>    
  <div className="container mx-auto mt-10 w-[1200px] drop-shadow-xl overflow-hidden shadow-xl bg-white p-5 rounded-lg">
        {/* Header Section */}
        <div className="grid grid-cols-4 gap-2 mt-2 ml-10">
          <div className="col-span-2 text-3xl font-semibold text-indigo-400">Welcome {"TCS-mdn"}</div>
          <div className="col-span-2 mt-3 font-semibold  text-gray-600 text-right mr-10">From Date : {"10.09.2024"} - {"20.09.2024"}</div>
          <div className="-mt-1 col-span-2 text-sm text-gray-500">Acc. Number: {123456789}</div>
        </div>
<br/>
        {/* Budget Details Section */}
        <div className="grid grid-cols-12 gap-4 mt-5 text-gray-600">
          <div className="col-span-6 flex items-center  space-x-2 ml-20 ">
            <BiMoney className="text-xl" />
            <span className="font-semibold text-gray-700">Monthly Budget Allocated:</span>
            <span>{30000}</span>
          </div>
          <div className="col-span-6 flex items-center  space-x-2 ml-40">
            <TbReportMoney className="text-xl" />
            <span className="font-semibold text-gray-700">Budget Used By EC2:</span>
            <span>{2000}</span>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4 my-3 text-gray-600">
          <div className="col-span-6 flex items-center  text-center space-x-2 ml-20">
            <TbZoomMoney className="text-xl" />
            <span className="font-semibold text-gray-700">Budget Forecasted:</span>
            <span>{2000}</span>
          </div>
          <div className="col-span-6 flex items-center space-x-2 ml-40">
            <TbPigMoney className="text-xl" />
            <span className="font-semibold text-gray-700">Savings if Optimized:</span>
            <span>{11.5}</span>
          </div>
        </div>
      </div>    
    </>

  )
}

export default SomeDetails