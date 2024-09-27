import React from "react";

const Latestjobs = () => {
  return (
    <div className=" w-3/4 m-auto mt-12">
      <div className="text-center text-2xl font-semibold ">
        <h1 className="text-3xl">
          Whats trending on <span className="text-blue-500">CareerHub</span>
        </h1>
      </div>
      {/* card */}
      <div className="flex flex-wrap justify-center flex-row gap-5 my-12">
        <div className="w-80 h-56 bg-white rounded-2xl mt-8 shadow-md ">
          <div className="p-3">
            <h2 className="font-bold">Google</h2>
            <p className="font-normal text-gray-400">India</p>
            <h1 className="font-bold my-2">Full Stack Developer</h1>
            <p className=" w-full h-24 overflow-hidden font-normal text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
              molestias amet quam, numquam fugit magnam? Nisi, quia itaque
              quibusdam omnis quidem architecto, magnam facere quae numquam et
              sint voluptate saepe.
            </p>
            <div className="flex flex-wrap gap-6 text-sm mt-1">
              <button className=" text-blue-500">2 Position</button>
              <button className="text-orange-600">Full Time</button>
              <button className="text-green-600">45LPA</button>
            </div>
          </div>
        </div>
        {/*  */}
        <div className="w-80 h-56 bg-white rounded-2xl mt-8 shadow-md">
          <div className="p-3">
            <h2 className="font-bold">Google</h2>
            <p className="font-normal text-gray-400">India</p>
            <h1 className="font-bold my-2">Full Stack Developer</h1>
            <p className=" w-full h-24 overflow-hidden font-normal text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
              molestias amet quam, numquam fugit magnam? Nisi, quia itaque
              quibusdam omnis quidem architecto, magnam facere quae numquam et
              sint voluptate saepe.
            </p>
            <div className="flex flex-wrap gap-6 text-sm mt-1">
              <button className=" text-blue-500">2 Position</button>
              <button className="text-orange-600">Full Time</button>
              <button className="text-green-600">45LPA</button>
            </div>
          </div>
        </div>
        {/*  */}
        <div className="w-80 h-56 bg-white rounded-2xl mt-8 shadow-md">
          <div className="p-3">
            <h2 className="font-bold">Google</h2>
            <p className="font-normal text-gray-400">India</p>
            <h1 className="font-bold my-2">Full Stack Developer</h1>
            <p className=" w-full h-24 overflow-hidden font-normal text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
              molestias amet quam, numquam fugit magnam? Nisi, quia itaque
              quibusdam omnis quidem architecto, magnam facere quae numquam et
              sint voluptate saepe.
            </p>
            <div className="flex flex-wrap gap-6 text-sm mt-1">
              <button className=" text-blue-500">2 Position</button>
              <button className="text-orange-600">Full Time</button>
              <button className="text-green-600">45LPA</button>
            </div>
          </div>
        </div>
        {/*  */}
      </div>
    </div>
  );
};

export default Latestjobs;
