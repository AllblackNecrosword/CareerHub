import { setAllJobs } from "@/redux/jobSlice";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const FetchAllJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchALlJobs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/jobs/alljobs", {
          withCredentials: true, // Ensure this is included
        });
        if (response.status === 200) {
          dispatch(setAllJobs(response.data));
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch jobs. Please try again later.");
      }
    };
    fetchALlJobs();
  }, []);
};

export default FetchAllJobs;
