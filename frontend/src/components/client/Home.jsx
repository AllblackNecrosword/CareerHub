import React, { useEffect } from "react";
import Herobanner from "./Herobanner";
import Latestjobs from "./Latestjobs";
import Category from "./Category";
import FetchAllJobs from "@/hooks/FetchAllJobs";
import Navbar from "../shared/Navbar";
import { useSelector } from "react-redux";
// import store from "@/redux/store";
import { useNavigate } from "react-router-dom";
import useDisplayAllCompany from "@/hooks/useDisplayAllCompany";

const Home = () => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  FetchAllJobs();


  useEffect(() => {
    if (user?.role === "recruiter") {
      navigate("/admin/companies");
    }
  }, [user, navigate]);

  return (
    <div>
      <Navbar />
      <Herobanner />
      <Category />
      <Latestjobs />
    </div>
  );
};

export default Home;
