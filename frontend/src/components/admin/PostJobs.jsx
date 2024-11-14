import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSelector } from "react-redux";
import store from "@/redux/store";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const PostJobs = () => {
  const { allcompany } = useSelector((store) => store.company);
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirement: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    company: "",
  });

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const navigate = useNavigate();

  // console.log(input);

  const companyHandler = (value) => {
    const companyId = allcompany.find(
      (company) => company.name.toLowerCase() === value.toLowerCase()
    );
    setInput({ ...input, company: companyId._id });
  };

  const postJobHandler = async () => {
    try {
      if (
        !title ||
        !description ||
        !requirement ||
        !salary ||
        !location ||
        !jobType ||
        !experience ||
        !position
      ) {
        return toast.error("Please fill up the form");
      }
      const response = await axios.post(
        "http://localhost:5000/jobs/createjob",
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        toast.success("Successfully created Job");
        navigate("/admin/adminjobs");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl m-auto mt-28">
        <h1 className="text-center text-2xl font-bold">Post your Job</h1>
        <div className="flex flex-wrap justify-evenly border p-5 rounded-xl shadow-lg gap-4 mt-6">
          <div className="w-2/5">
            <label htmlFor="title" className="text-sm font-semibold">
              Title
            </label>
            <Input
              id="title"
              className="my-2 "
              onChange={inputHandler}
              name="title"
              value={input.title}
            />
          </div>
          <div className="w-2/5">
            <label htmlFor="description" className="text-sm font-semibold">
              Description
            </label>
            <Input
              id="description"
              className="my-2 "
              onChange={inputHandler}
              name="description"
              value={input.description}
            />
          </div>
          <div className="w-2/5">
            <label htmlFor="requirement" className="text-sm font-semibold">
              Requirement
            </label>
            <Input
              id="requirement"
              className="my-2 "
              onChange={inputHandler}
              name="requirement"
              value={input.requirement}
            />
          </div>
          <div className="w-2/5">
            <label htmlFor="salary" className="text-sm font-semibold">
              Salary
            </label>
            <Input
              id="salary"
              className="my-2 "
              onChange={inputHandler}
              name="salary"
              value={input.salary}
            />
          </div>
          <div className="w-2/5">
            <label htmlFor="location" className="text-sm font-semibold">
              Location
            </label>
            <Input
              id="location"
              className="my-2 "
              onChange={inputHandler}
              name="location"
              value={input.location}
            />
          </div>
          <div className="w-2/5">
            <label htmlFor="jobType" className="text-sm font-semibold">
              Job Type
            </label>
            <Input
              id="jobType"
              className="my-2 "
              onChange={inputHandler}
              name="jobType"
              value={input.jobType}
            />
          </div>
          <div className="w-2/5">
            <label htmlFor="experience" className="text-sm font-semibold">
              Experience
            </label>
            <Input
              id="experience"
              className="my-2 "
              onChange={inputHandler}
              name="experience"
              value={input.experience}
            />
          </div>
          <div className="w-2/5">
            <label htmlFor="position" className="text-sm font-semibold">
              Position
            </label>
            <Input
              id="position"
              className="my-2 "
              type="number"
              onChange={inputHandler}
              name="position"
              value={input.position}
            />
          </div>
          <div className="w-2/5">
            {allcompany.length <= 0 ? (
              <span className="text-sm text-red-600 font-medium">
                You need to create a company before posting jobs
              </span>
            ) : (
              <Select onValueChange={companyHandler}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Company" />
                </SelectTrigger>
                <SelectContent>
                  {allcompany.map((element) => (
                    <SelectItem key={element.id} value={element.name}>
                      {element.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        </div>
        <div className="my-4 flex justify-between">
          <Button className="bg-gray-300 text-black font-semibold">
            Cancel
          </Button>
          <Button onClick={postJobHandler} className="bg-green-300">
            Create
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PostJobs;
