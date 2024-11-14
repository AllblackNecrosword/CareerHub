import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const CompanyCreate = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState("");

  const inputHandler = (e) => {
    setInput(e.target.value);
  };

  const registerCompany = async () => {
    if (!input) {
      return toast.error("Cannot Submit Empty form ");
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/api/company/registercompany",
        { name: input },
        {
          withCredentials: true,
        }
      );
      if (response.status === 201) {
        toast.success("Company registered successfully");
        console.log(response);
        const companyId = response?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
      } else {
        toast.error(response.data.message);
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="mt-36 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold">Create your Company</h1>
        <p className="mt-2">What would you like to name your company ? </p>
        <div className="my-4">
          <label className="text-xl font-semibold">Company Name</label>
          <Input
            placeholder="Apple, Google .. "
            className="mt-3"
            onChange={inputHandler}
          ></Input>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => navigate("/admin/companies")}
          >
            Cancel
          </Button>
          <Button onClick={registerCompany}>Continue</Button>
        </div>
      </div>
    </div>
  );
};

export default CompanyCreate;
