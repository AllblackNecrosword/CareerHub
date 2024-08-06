import React from "react";
import {Link} from 'react-router-dom';

const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col border m-4 p-16 rounded-xl shadow-lg ">
        <div className="text-center mb-6 ">
          <h1 className="text-3xl font-semibold">Welcome back</h1>
        <p className="text-sm font-normal text-gray-400">
          Enter your credentials to login
        </p>
        </div>
        <div className="flex flex-col space-y-6">
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
        <button className="bg-blue-500 p-3 rounded-2xl text-white font-semibold">
          Login
        </button>
        </div>
        <div className="my-4 font-normal text-gray-400">
           <a href="#">Don't have an account? <Link to={"/signup"} className="text-black">Signup</Link> </a>
        </div>
       
      </div>
    </div>
  );
};

export default Login;
