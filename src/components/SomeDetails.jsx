import React from 'react'

const SomeDetails = () => {
  return (<>    <div className="container mx-auto mt-10 w-5/6 drop-shadow-xl overflow-hidden shadow-lg p-5">
  
   <div className="grid grid-rows-1 grid-cols-4 gap-2 mt-3">
    <div className="col-span-2 text-3xl font-semibold  mb-0">Welcome {"TCS-mdn"}</div>
    <div className="col-span-2 mt-3 mb-0 ">Date {"10.09.2024"} to {"20.09.2024"} </div>  
     <div className="-mt-2 col-span-2 text-sm  mb-0 h-1/2">Acc. Number : {123456789}</div>
    </div>

<div className="grid grid-rows-2 grid-cols-4 gap-2 mt-3">
<div className="col-span-2">Monthly Budget Allocated : {30000}</div>
<div className="col-span-2 ">Budget Used By EC2 :{2000}</div>
<div className="col-span-2">Budget Forcasted :{2000}</div>
<div className="col-span-2">Savings if Optimized :{11.5}</div>
</div></div>    </>

  )
}

export default SomeDetails