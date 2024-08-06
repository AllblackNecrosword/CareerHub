import React from "react";
import { Link } from "react-router-dom";
const Signup = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col border m-4 p-16 rounded-xl shadow-lg ">
        <div className="text-center mb-6 ">
          <h1 className="text-3xl font-semibold">Signup</h1>
          <p className="text-sm font-normal text-gray-400">
            Create your account
          </p>
        </div>
        <div className="flex flex-col space-y-6">
          <input
            type="username"
            name="username"
            id="username"
            placeholder="username"
            className="border p-2 rounded-2xl w-64"
          />
          <input
            type="email"
            name="email"
            id="password"
            placeholder="Email"
            className="border p-2 rounded-2xl w-64"
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className="border p-2 rounded-2xl w-64"
          />
          <input
            type="password"
            name="confirmpassword"
            id="confirmpassword"
            placeholder="confirmpassword"
            className="border p-2 rounded-2xl w-64"
          />
          <div className="flex items-center gap-5">
            <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
            <label for="vehicle1"> Student</label>
            <input type="checkbox" id="vehicle2" name="vehicle2" value="Car" />
            <label for="vehicle2"> Recruiter</label>
          </div>
          <button className="bg-blue-500 p-3 rounded-2xl text-white font-semibold">
            Signup
          </button>
          <div className="my-4 font-normal text-gray-400">
            <a href="#">
              Don't have an account?{" "}
              <Link to={"/login"} className="text-black">
                Signup
              </Link>{" "}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
