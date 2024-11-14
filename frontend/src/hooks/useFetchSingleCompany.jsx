import { setSingleCompany } from "@/redux/companySlice";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const useFetchSingleCompany = (id) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSingleCompany = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/company/getcompany/${id}`,
          {
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          dispatch(setSingleCompany(response.data));
        }
      } catch (error) {
        console.log(error);
        if (error.response) {
          console.log(error.response.data.message);
        }
      }
    };

    fetchSingleCompany();
  }, [id, dispatch]);
};

export default useFetchSingleCompany;
