import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "../ui/button";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { setgetJobbyId } from "@/redux/jobSlice";
import Navbar from "../shared/Navbar";

const JobDescription = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, user } = useSelector((store) => store.auth);
  const { getJobbyId } = useSelector((store) => store.job);

  // Determine if the user has already applied based on Redux state
  const isAlreadyApplied =
    getJobbyId?.applications?.some(
      (applicant) => applicant.applicant === user?._id
    ) || false;

  const [isApplied, setIsApplied] = useState(isAlreadyApplied);

  useEffect(() => {
    const fetchJobDescription = async () => {
      try {
        dispatch(setLoading(true));
        const response = await axios.get(
          `http://localhost:5000/jobs/job/${id}`,
          {
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          dispatch(setgetJobbyId(response.data));
          setIsApplied(
            response.data.applications.some(
              (applicant) => applicant.applicant === user?._id
            )
          );
        } else {
          console.log(response.data.message);
        }
        dispatch(setLoading(false));
      } catch (error) {
        console.log(error);
        dispatch(setLoading(false));
      }
    };
    fetchJobDescription();
  }, [id, user._id, dispatch]);
  // console.log("Job by Id", getJobbyId);

  const applyforJob = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/application/postapplication/${id}`,
        {},
        { withCredentials: true }
      );

      if (response.status === 200) {
        setIsApplied(true);
        const updatedJob = {
          ...getJobbyId,
          applications: [...getJobbyId.applications, { applicant: user?._id }],
        };
        dispatch(setgetJobbyId(updatedJob));
        toast.success("Applied Successfully");
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="mt-24">
        {loading ? (
          <button className="bg-blue-500 p-3 rounded-2xl text-white font-semibold flex justify-center items-center">
            <Loader2 className="h-5 w-7 animate-spin" />
          </button>
        ) : (
          <div className="max-w-7xl m-auto">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold ">{getJobbyId?.title}</h1>
              <Button
                onClick={isApplied ? null : applyforJob}
                disabled={isApplied}
                className={`rounded-lg ${
                  isApplied
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-[#7209b7] hover:bg-[#5f32ad]"
                }`}
              >
                {isApplied ? "Already Applied" : "Apply Now"}
              </Button>
            </div>
            <div className="space-x-2 mt-4">
              <Badge variant="outline" className="text-blue-500">
                {getJobbyId?.position}
              </Badge>
              <Badge variant="outline" className="text-orange-500">
                {getJobbyId?.jobType}
              </Badge>
              <Badge variant="outline" className="text-green-500">
                {getJobbyId?.salary} LPA
              </Badge>
            </div>
            <div className="mt-4 border-b-2">
              <h1 className="mb-3 text-xl font-semibold">Job Description</h1>
            </div>
            <div className="my-4">
              <h1 className="font-bold my-1">
                Role:{" "}
                <span className="pl-4 font-normal text-gray-800">
                  {getJobbyId?.title}
                </span>
              </h1>
              <h1 className="font-bold my-1">
                Location:{" "}
                <span className="pl-4 font-normal text-gray-800">
                  {getJobbyId?.location}
                </span>
              </h1>
              <h1 className="font-bold my-1">
                Description:{" "}
                <span className="pl-4 font-normal text-gray-800">
                  {getJobbyId?.description}
                </span>
              </h1>
              <h1 className="font-bold my-1">
                Experience:{" "}
                <span className="pl-4 font-normal text-gray-800">
                  {getJobbyId?.experience} years
                </span>
              </h1>
              <h1 className="font-bold my-1">
                Salary:{" "}
                <span className="pl-4 font-normal text-gray-800">
                  {getJobbyId?.salary} LPA
                </span>
              </h1>
              <h1 className="font-bold my-1">
                Company ID:{" "}
                <span className="pl-4 font-normal text-gray-800">
                  {getJobbyId?.company}
                </span>
              </h1>
              <h1 className="font-bold my-1">
                Created By:{" "}
                <span className="pl-4 font-normal text-gray-800">
                  {getJobbyId?.createdBy}
                </span>
              </h1>
              <h1 className="font-bold my-1">
                Total Applicants:{" "}
                <span className="pl-4 font-normal text-gray-800">
                  {getJobbyId?.applications?.length}
                </span>
              </h1>
              <h1 className="font-bold my-1">
                Posted Date:{" "}
                <span className="pl-4 font-normal text-gray-800">
                  {getJobbyId?.createdAt?.split("T")[0] || "N/A"}
                </span>
              </h1>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobDescription;
