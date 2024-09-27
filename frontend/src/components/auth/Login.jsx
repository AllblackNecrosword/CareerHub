import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import store from "@/redux/store";
import { Loader2 } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.auth);


  const inputHandler = (e) => {
    const { id, value } = e.target;
    setInput({ ...input, [id]: value });
  };

  const submitHandler = async () => {
    const { email, password } = input;

    if (!email || !password) {
      return alert("Cannot submit empty form");
    }

    try {
      dispatch(setLoading(true));
      const response = await axios.post(
        `http://localhost:5000/api/login`,
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.status !== 200) {
        toast.error(response.data.message || "Something went wrong", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return;
      }

      // Success case: navigate and show success toast
      navigate("/");
      toast.success("LoggedIn successfully", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      // dispatch(setUser(true));
      dispatch(setUser(response.data.user));
    } catch (error) {
      // Handle error cases
      toast.error(error.response?.data?.message || "Something went wrong", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } finally {
      dispatch(setLoading(false));
    }
  };

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
            id="email"
            placeholder="Email"
            className="border p-2 rounded-2xl w-64"
            value={input.email}
            onChange={inputHandler}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className="border p-2 rounded-2xl w-64"
            value={input.password}
            onChange={inputHandler}
          />
          {loading ? (
            <button className="bg-blue-500 p-3 rounded-2xl text-white font-semibold flex justify-center items-center">
              <Loader2 className="h-5 w-7 animate-spin" />
            </button>
          ) : (
            <button
              className="bg-blue-500 p-3 rounded-2xl text-white font-semibold"
              onClick={submitHandler}
            >
              Login
            </button>
          )}
        </div>
        <div className="my-4 font-normal text-gray-400">
          <p href="#">
            Don't have an account?{" "}
            <Link to={"/signup"} className="text-black">
              Signup
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
