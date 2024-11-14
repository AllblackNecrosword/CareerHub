import React, { useEffect, useState } from "react";
import Filtercard from "./Filtercard";
import JobList from "./JobList";
import { useSelector } from "react-redux";
import Navbar from "../shared/Navbar";

const Jobs = () => {
  // const jobArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const { allJobs } = useSelector((store) => store.job);

  return (
    <>
      <Navbar />
      <div className="mt-20">
        {/* Filter Card at left */}
        {/* Job Card at Right */}
        <div className="max-w-7xl m-auto">
          <div className="flex gap-5">
            {/* Updated width class */}
            <div className="w-1/5">
              <Filtercard />
            </div>

            {allJobs.length <= 0 ? (
              <span>No Jobs Found</span>
            ) : (
              <div className=" grid grid-cols-3 gap-4 w-4/5">
                {allJobs.map((job) => (
                  <JobList key={job._id} job={job} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Jobs;
