import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CompaniesList from "./CompaniesList";
import { useNavigate } from "react-router-dom";
import useDisplayAllCompany from "@/hooks/useDisplayAllCompany";
import { useDispatch } from "react-redux";
import { setSearchCompany } from "@/redux/companySlice";

const Companies = () => {
  const navigate = useNavigate();
  useDisplayAllCompany();
  const [search, setSearch] = useState();

  const inputHandler = (e) => {
    setSearch(e.target.value);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompany(search));
  }, [search]);
  return (
    <div>
      <Navbar />
      <div className="mt-24 max-w-6xl mx-auto">
        <div className="flex justify-between">
          <Input
            type="search"
            className="w-fit"
            placeholder="Search"
            onChange={inputHandler}
          />
          <Button onClick={() => navigate("/admin/companies/create")}>
            New Company
          </Button>
        </div>
        <CompaniesList />
      </div>
    </div>
  );
};

export default Companies;
