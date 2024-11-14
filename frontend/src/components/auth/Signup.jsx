import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Signup = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmpassword: "",
    role: "",
    file: "",
  });
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.auth);

  const inputHandler = (e) => {
    const { id, value } = e.target;
    setInput({ ...input, [id]: value });
  };

  const handleRoleChange = (e) => {
    setInput({ ...input, role: e.target.value });
  };

  const filesHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  // console.log(input);

  const submitHandler = async () => {
    const { username, email, phoneNumber, role, password, confirmpassword } =
      input;
    if (password !== confirmpassword) {
      return alert("password donot match");
    }
    if (!username || !email || !phoneNumber || !role || !password) {
      toast.error("All fields are required", {
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

    try {
      dispatch(setLoading(true));
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("phoneNumber", phoneNumber);
      formData.append("password", password);
      formData.append("role", role);

      if (input.file) {
        formData.append("file", input.file);
      }

      const response = await axios.post(
        `http://localhost:5000/api/register`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (response.status !== 200) {
        console.log("Error:", response.data);
        throw new Error(response.data.message || "Something went wrong");
      }
      toast.success("User created successfully", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/login");
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  // console.log(input);
  return (
    <div className="flex items-center justify-center min-h-screen mt-20">
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
            id="username"
            placeholder="username"
            className="border p-2 rounded-2xl w-64"
            value={input.username}
            onChange={inputHandler}
          />
          <input
            type="email"
            id="email"
            placeholder="Email"
            className="border p-2 rounded-2xl w-64"
            value={input.email}
            onChange={inputHandler}
          />
          <input
            type="phoneNumber"
            id="phoneNumber"
            placeholder="phoneNumber"
            className="border p-2 rounded-2xl w-64"
            value={input.phoneNumber}
            onChange={inputHandler}
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            className="border p-2 rounded-2xl w-64"
            value={input.password}
            onChange={inputHandler}
          />
          <input
            type="password"
            id="confirmpassword"
            placeholder="confirmpassword"
            className="border p-2 rounded-2xl w-64"
            onChange={inputHandler}
          />
          <div className="flex items-center gap-5">
            <input
              type="radio"
              id="student"
              name="role"
              value="student" // lowercase
              checked={input.role === "student"}
              onChange={handleRoleChange}
            />
            <label htmlFor="student">Student</label>
            <input
              type="radio"
              id="recruiter"
              name="role"
              value="recruiter" // lowercase
              checked={input.role === "recruiter"}
              onChange={handleRoleChange}
            />
            <label htmlFor="recruiter">Recruiter</label>
          </div>
          <div className="flex ">
            <label htmlFor="profile" className="flex flex-col gap-y-2">
              Profile
              <input
                accept="image/*"
                type="file"
                name="file"
                className="cursor-pointer"
                onChange={filesHandler}
              />
            </label>
          </div>
          {loading ? (
            <button className="bg-blue-500 p-3 rounded-2xl text-white font-semibold flex justify-center items-center">
              <Loader2 className="animate-spin" />
            </button>
          ) : (
            <button
              className="bg-blue-500 p-3 rounded-2xl text-white font-semibold"
              onClick={submitHandler}
            >
              Signup
            </button>
          )}

          <div className="my-4 font-normal text-gray-400">
            Don't have an account?{" "}
            <Link to={"/login"} className="text-black">
              Signup
            </Link>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
