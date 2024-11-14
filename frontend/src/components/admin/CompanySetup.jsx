import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import useFetchSingleCompany from "@/hooks/useFetchSingleCompany";

const CompanySetup = () => {
  const { singleCompany } = useSelector((store) => store.company);

  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  const inputHandler = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setInput({ ...input, [name]: files[0] });
    } else {
      setInput({ ...input, [name]: value });
    }
  };
  const navigate = useNavigate();

  const { id } = useParams();

  //Running the function 
  useFetchSingleCompany(id);

  const submitHandler = async () => {
    try {
      const formData = new FormData();
      formData.append("name", input.name);
      formData.append("description", input.description);
      formData.append("website", input.website);
      formData.append("location", input.location);
      if (input.file) {
        formData.append("file", input.file);
      }

      const response = await axios.put(
        `http://localhost:5000/api/company/updatecompany/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        toast.success("Comapny information update successfully");
        navigate("/admin/companies");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    setInput({
      name: singleCompany.name || "",
      description: singleCompany.description || "",
      website: singleCompany.website || "",
      location: singleCompany.location || "",
      file: singleCompany.file || null,
    });
  }, [singleCompany]);

  return (
    <div>
      <Navbar />
      <div className="max-w-2xl mx-auto mt-36">
        <h1 className="text-center text-2xl font-bold">Company Setup</h1>

        {/* Form */}
        <div className="grid grid-cols-2 gap-4 mt-5">
          <div className="w-full">
            <label className="font-semibold">Company Name</label>
            <Input
              type="text"
              name="name"
              value={input.name}
              placeholder="Enter company name"
              onChange={inputHandler}
            />
          </div>
          <div className="w-full">
            <label className="font-semibold">Description</label>
            <Input
              type="text"
              name="description"
              value={input.description}
              placeholder="Enter description"
              onChange={inputHandler}
            />
          </div>

          <div className="w-full">
            <label className="font-semibold">Website</label>
            <Input
              type="text"
              name="website"
              value={input.website}
              placeholder="Enter website URL"
              onChange={inputHandler}
            />
          </div>
          <div className="w-full">
            <label className="font-semibold">Location</label>
            <Input
              type="text"
              name="location"
              value={input.location}
              placeholder="Enter location"
              onChange={inputHandler}
            />
          </div>

          <div className="w-full">
            <label className="font-semibold">Logo</label>
            <Input
              type="file"
              name="file"
              accept="image/*"
              onChange={inputHandler}
            />
          </div>
        </div>

        <div className="my-4 flex justify-between w-8/12">
          <Button variant="outline" onClick={()=>navigate("/admin/companies/")}>Cancel</Button>
          <Button onClick={submitHandler}>Update</Button>
        </div>
      </div>
    </div>
  );
};

export default CompanySetup;
