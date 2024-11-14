import React from "react";
import { useSelector } from "react-redux";

const Latestjobs = () => {
  const { allJobs } = useSelector((store) => store.job);

  console.log("All jobs", allJobs);
  return (
    <div className=" w-3/4 m-auto mt-12">
      <div className="text-center text-2xl font-semibold ">
        <h1 className="text-3xl">
          Whats trending on <span className="text-blue-500">CareerHub</span>
        </h1>
      </div>
      {/* card */}
      <div className="flex flex-wrap justify-center flex-row gap-5 my-12">
        {allJobs.slice(0, 3).map((element, index) => {
          return (
            <div className="w-80 h-56 bg-white rounded-2xl mt-8 shadow-md ">
              <div className="p-3">
                <>
                  <h2 className="font-bold">{element.company?.name}</h2>
                  <p className="font-normal text-gray-400">
                    {element.location}
                  </p>
                  <h1 className="font-bold my-2">{element.title}</h1>
                  <p className=" w-full h-24 overflow-hidden font-normal text-gray-600">
                    {element.description}
                  </p>
                  <div className="flex flex-wrap gap-6 text-sm mt-1">
                    <button className=" text-blue-500">{element.position} Position</button>
                    <button className="text-orange-600">
                      {element.jobType}
                    </button>
                    <button className="text-green-600">
                      {element.salary}LPA
                    </button>
                  </div>
                </>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Latestjobs;
