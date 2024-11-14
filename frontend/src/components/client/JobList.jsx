import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Badge, Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
const JobList = ({ job }) => {
  return (
    <>
      <div className="p-6 shadow-lg rounded-3xl bg-white border">
        <div className="flex items-center justify-between">
          <p className="text-gray-400">2 days ago</p>
          <Button variant="outline" className="rounded-full" size="icon">
            <Bookmark />
          </Button>
        </div>

        <div className="flex gap-2 items-center my-2">
          <Button variant="outline" className="p-6 rounded-full" size="icon">
            <Avatar>
              <AvatarImage src="https://t3.ftcdn.net/jpg/04/74/05/94/360_F_474059464_qldYuzxaUWEwNTtYBJ44VN89ARuFktHW.jpg" />
            </Avatar>
          </Button>
          <div className="text-base font-medium">
            <h1>{job.company?.name}</h1>
            <p>{job.location}</p>
          </div>
        </div>
        <div>
          <h2 className="font-semibold text-lg my-2">{job.title}</h2>
          <p className="text-sm text-gray-500">
            {job.description}
          </p>
        </div>
        <div className="flex flex-wrap gap-6 text-sm mt-1">
          <button className=" text-blue-500">{job.position} Position</button>
          <button className="text-orange-600">{job.jobType}</button>
          <button className="text-green-600">{job.salary}</button>
        </div>
        <div className="my-2">
          <Link to={`/jobdescription/${job._id}`}>
            <Button className="rounded-xl bg-blue-500">View</Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default JobList;
