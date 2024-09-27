import React from "react";
import Herobanner from "./Herobanner";
import Latestjobs from "./Latestjobs";
import Category from "./Category";

const Home = () => {
  return (
    <div >
      <Herobanner />
      <Category/>
      <Latestjobs />
    </div>
  );
};

export default Home;
