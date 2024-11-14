import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CompaniesList from "./CompaniesList";
import { useNavigate } from "react-router-dom";
import useDisplayAllCompany from "@/hooks/useDisplayAllCompany";
import { useDispatch, useSelector } from "react-redux";
import { setSearchCompany } from "@/redux/companySlice";
import AdminJobsList from "./AdminJobsList";
import useDisplayAdminJobs from "@/hooks/useDisplayAdminJobs";
import { setgetSearchAdminJobs } from "@/redux/jobSlice";

const AdminJobs = () => {
  useDisplayAdminJobs();
  // const { getAdminJobs } = useSelector((store) => store.job);

  const [searchinput, setSearchInput] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setgetSearchAdminJobs(searchinput));
  }, [searchinput]);

  return (
    <div>
      <Navbar />
      <div className="mt-24 max-w-6xl mx-auto">
        <div className="flex justify-between">
          <Input
            type="search"
            className="w-fit"
            placeholder="Search"
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <Button onClick={() => navigate("/admin/postjobs")}>
            Add new Job
          </Button>
        </div>
        <AdminJobsList />
      </div>
    </div>
  );
};

export default AdminJobs;
