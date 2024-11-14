import { setgetAdminJobs } from "@/redux/jobSlice";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const useDisplayAdminJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    
    const fetchAdminJobs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/jobs/adminjobs",
          {
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          dispatch(setgetAdminJobs(response.data));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAdminJobs();
  }, []);
};

export default useDisplayAdminJobs;
