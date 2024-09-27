import React from "react";
import Filtercard from "./Filtercard";
import JobList from "./JobList";

const Jobs = () => {
  const jobArray = [1, 2, 3, 4,5,6,7,8,9];

  return (
    <div className="mt-20">
      {/* Filter Card at left */}
      {/* Job Card at Right */}
      <div className="max-w-7xl m-auto">
        <div className="flex gap-5">
          {/* Updated width class */}
          <div className="w-1/5">
            <Filtercard />
          </div>

          {jobArray.length <= 0 ? (
            <span>No Jobs Found</span>
          ) : (
            <div className=" grid grid-cols-3 gap-4 w-4/5">
              {jobArray.map((item, index) => (
                <JobList key={index} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
