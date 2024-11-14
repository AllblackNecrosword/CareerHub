import React from "react";

import JobList from "./JobList";
import Navbar from "../shared/Navbar";

const Browse = () => {
  const browseResult = [1, 2, 3, 4, 5];
  return (
    <>
    <Navbar/>
    <div className="mt-24 mx-auto max-w-7xl">
      <h1 className="text-2xl font-semibold">Search Results ({browseResult.length})</h1>
      <div className="grid grid-cols-3 mx-auto mt-6 gap-4">
        {browseResult.map((items, index) => {
          return <JobList />;
        })}
      </div>
    </div>
    </>
    
  );
};

export default Browse;
