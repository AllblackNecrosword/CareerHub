import { setAllCompany } from "@/redux/companySlice";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const useDisplayAllCompany = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const FetchAllCompany = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/company/getcompany",
          {
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          dispatch(setAllCompany(response.data));
        }
      } catch (error) {
        console.log(error);
      }
    };
    FetchAllCompany();
  }, [dispatch]);
};

export default useDisplayAllCompany;
