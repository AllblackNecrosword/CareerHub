import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";

import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import AppliedApplicantsList from "./AppliedApplicantsList";
import { useDispatch, useSelector } from "react-redux";
import { setApplicants } from "@/redux/applicantSlice";

const AppliedApplicants = () => {
  const { jobid } = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.applicant);

  useEffect(() => {
    const FetchApplicantData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/application/getapplication/${jobid}`,
          {
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          //   toast.success("Sucessfully Fetched");
          dispatch(setApplicants(response.data));
        }
      } catch (error) {
        console.log(error);
      }
    };
    FetchApplicantData();
  }, [jobid]);

  return (
    <div>
      <Navbar />
      <div className="mt-28 max-w-5xl m-auto">
        <h1 className="text-xl font-bold">
          {" "}
          Applicant applied {applicants?.jobs?.applications.length}
        </h1>
        <div className="my-8">
          <AppliedApplicantsList />
        </div>
      </div>
    </div>
  );
};

export default AppliedApplicants;
