import React, { useState } from 'react';

const Sidebar = () => {
  const [currency, setCurrency] = useState('USD');
  const [price, setPrice] = useState([0.0028, 784.896]);
  const [cpu, setCpu] = useState([0, 896]);
  const [ram, setRam] = useState([0, 35]);
  const [disk,setdisk]=useState([0,360]);
  const [GPU, setGpu]=useState([0,16]);
  const [Bandwidth,setBandwidth]=useState([0,214]);
  const [Networkspeed,setNetworkspeed]=useState([0,400]);

  return (
    <div className="bg-white p-4 shadow-lg h-screen  p-4 overflow-y-auto rounded-md ">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>

      <div className="mb-6">
        <label className="block mb-2 font-medium">Currency</label>
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="block w-full bg-gray-100 border border-gray-300 rounded px-3 py-2"
        >
          <option value="USD">$ USD</option>
          <option value="EUR">€ EUR</option>
          <option value="CNY">¥ CNY</option>
        </select>
      </div>

      <div className="mb-6">
        <label className="block mb-2 font-medium">Price</label>
        <div className="flex justify-between text-sm mb-2">
          <span>${price[0].toFixed(4)}</span>
          <span>${price[1].toFixed(3)}</span>
        </div>
      </div>

      <div className="mb-6">
        <label className="block mb-2 font-medium">Location</label>
        <select className="block w-full bg-gray-100 border border-gray-300 rounded px-3 py-2">
          <option>Select locations</option>
          <option>USA</option>
          <option>Europe</option>
          <option>Asia</option>
        </select>
      </div>

      <div className="mb-6">
        <label className="block mb-2 font-medium">Provider</label>
        <select className="block w-full bg-gray-100 border border-gray-300 rounded px-3 py-2">
          <option>Select providers</option>
          <option>Amazon Web Services</option>
          <option>Google Cloud</option>
          <option>Azure</option>
        </select>
      </div>

      <div className="mb-6">
        <label className="block mb-2 font-medium">Name</label>
        <input
          type="text"
          placeholder="Search..."
          className="block w-full bg-gray-100 border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <div className="mb-6">
        <label className="block mb-2 font-medium">CPU</label>
        <div className="flex justify-between text-sm mb-2">
          <span>{cpu[0]}</span>
          <span>{cpu[1]}</span>
        </div>
        <input
          type="range"
          min={0}
          max={896}
          value={cpu[0]}
          onChange={(e) => setCpu([e.target.valueAsNumber, cpu[1]])}
          className="w-full"
        />
        <input
          type="range"
          min={0}
          max={896}
          value={cpu[1]}
          onChange={(e) => setCpu([cpu[0], e.target.valueAsNumber])}
          className="w-full mt-1"
        />
      </div>

      <div className="mb-6">
        <label className="block mb-2 font-medium">RAM</label>
        <div className="flex justify-between text-sm mb-2">
          <span>{ram[0]} MB</span>
          <span>{ram[1]} TB</span>
        </div>
        <input
          type="range"
          min={0}
          max={35}
          value={ram[0]}
          onChange={(e) => setRam([e.target.valueAsNumber, ram[1]])}
          className="w-full"
        />
        <input
          type="range"
          min={0}
          max={35}
          value={ram[1]}
          onChange={(e) => setRam([ram[0], e.target.valueAsNumber])}
          className="w-full mt-1"
        />
      </div>

      <div className="mb-6">
        <label className="block mb-2 font-medium">Disk</label>
        <div className="flex justify-between text-sm mb-2">
          <span>{disk[0]} MB</span>
          <span>{disk[1]} TB</span>
        </div>
        <input
          type="range"
          min={0}
          max={360}
          value={disk[0]}
          onChange={(e) => setdisk([e.target.valueAsNumber, disk[1]])}
          className="w-full"
        />
        <input
          type="range"
          min={0}
          max={360}
          value={disk[1]}
          onChange={(e) => setdisk([disk[0], e.target.valueAsNumber])}
          className="w-full mt-1"
        />
      </div>

      <div className="mb-6">
        <label className="block mb-2 font-medium">GPU</label>
        <div className="flex justify-between text-sm mb-2">
          <span>{GPU[0]}</span>
          <span>{GPU[1]}</span>
        </div>
        <input
          type="range"
          min={0}
          max={16}
          value={GPU[0]}
          onChange={(e) => setGpu([e.target.valueAsNumber, GPU[1]])}
          className="w-full"
        />
        <input
          type="range"
          min={0}
          max={16}
          value={GPU[1]}
          onChange={(e) => setGpu([GPU[0], e.target.valueAsNumber])}
          className="w-full mt-1"
        />
      </div>
      
      <div className="mb-6">
        <label className="block mb-2 font-medium">Bandwidth</label>
        <div className="flex justify-between text-sm mb-2">
          <span>{Bandwidth[0]} MBps</span>
          <span>{Bandwidth[1]} GBps</span>
        </div>
        <input
          type="range"
          min={0}
          max={214}
          value={Bandwidth[0]}
          onChange={(e) => setBandwidth([e.target.valueAsNumber, Bandwidth[1]])}
          className="w-full"
        />
        <input
          type="range"
          min={0}
          max={214}
          value={Bandwidth[1]}
          onChange={(e) => setBandwidth([Bandwidth[0], e.target.valueAsNumber])}
          className="w-full mt-1"
        />
      </div>

      <div className="mb-6">
        <label className="block mb-2 font-medium">Network Speed</label>
        <div className="flex justify-between text-sm mb-2">
          <span>{Networkspeed[0]} MBps</span>
          <span>{Networkspeed[1]} GBps</span>
        </div>
        <input
          type="range"
          min={0}
          max={214}
          value={Networkspeed[0]}
          onChange={(e) => setNetworkspeed([e.target.valueAsNumber, Networkspeed[1]])}
          className="w-full"
        />
        <input
          type="range"
          min={0}
          max={214}
          value={Networkspeed[1]}
          onChange={(e) => setNetworkspeed([Networkspeed[0], e.target.valueAsNumber])}
          className="w-full mt-1"
        />
      </div>
    </div>
  );
};

export default Sidebar;
