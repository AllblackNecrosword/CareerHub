import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOutIcon, User2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setUser } from "@/redux/authSlice";
import axios from "axios";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const user = false;

  const logoutHandler = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/logout", {
        withCredentials: true,
      });

      if (response.status === 200) {
        dispatch(setUser(null));
        toast.success(response.data.message);
        navigate("/login"); // Redirects to login page after logout
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "An error occurred during logout."
      );
    }
  };

  return (
    <div>
      <nav className="fixed top-0 w-full bg-white z-50 shadow-md">
        <div className="p-2 flex justify-between items-center font-poppins md:py-4 font-medium border-b-2">
          <h1 className="text-black font-medium md:ml-32 md:text-2xl">
            <Link to={"/"}>
              Career<span className="text-blue-500">Hub</span>
            </Link>
          </h1>
          <div className="flex gap-5 md:hidden">
            <button onClick={toggleMenu}>
              <CgProfile size={24} />
            </button>
            <button onClick={toggleMenu}>
              {isOpen ? <RxCross2 size={24} /> : <RxHamburgerMenu size={24} />}
            </button>
          </div>
          {/* Md viewpoint */}
          <div className="hidden md:block">
            <ul className="flex gap-6 items-center mr-32">
              {user && user?.role === "recruiter" ? (
                <>
                  <Link to={"/admin/companies"}>
                    {" "}
                    <li>Company</li>
                  </Link>
                  <Link to={"/admin/adminjobs"}>
                    {" "}
                    <li>Jobs</li>
                  </Link>
                </>
              ) : (
                <>
                  <Link to={"/"}>
                    <li>Home</li>
                  </Link>
                  <Link to={"/jobs"}>
                    <li>Jobs</li>
                  </Link>

                  <Link to={"/browse"}>
                    {" "}
                    <li>Browse</li>
                  </Link>
                </>
              )}

              {user ? (
                <div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Avatar className="cursor-pointer">
                        <AvatarImage
                          src={user?.profile?.profile}
                          alt="@shadcn"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    </PopoverTrigger>
                    <PopoverContent
                      side="bottom"
                      align="center"
                      sideOffset={10}
                      className="w-80 mt-2 border bg-white p-5 rounded-3xl shadow-lg"
                    >
                      <div className="flex items-center gap-4 p-4">
                        <Avatar className="cursor-pointer">
                          <AvatarImage
                            src={user?.profile?.profile}
                            alt="@shadcn"
                          />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold">{user?.username}</h4>
                          {user?.role === "student" && (
                            <p className="text-sm font-light text-gray-500">
                              {user?.profile?.bio || "Student at CareerHub"}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col gap-4 mt-4">
                        {user?.role === "student" && (
                          <Link
                            to="/profile"
                            className="flex items-center gap-2 text-gray-700 hover:text-blue-500"
                          >
                            <User2 />
                            <span>View Profile</span>
                          </Link>
                        )}
                        <button
                          onClick={logoutHandler}
                          className="flex items-center gap-2 text-red-600 hover:text-red-500"
                        >
                          <LogOutIcon />
                          <span>Logout</span>
                        </button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              ) : (
                <>
                  <Link to={"/login"}>
                    <Button
                      variant="outline"
                      className="bg-blue-500 text-white"
                    >
                      Login
                    </Button>
                  </Link>
                  <Link to={"/signup"}>
                    <Button variant="outline">Signup</Button>
                  </Link>
                </>
              )}
            </ul>
          </div>
        </div>
        {/* sm viewpoint */}
        {isOpen && (
          <div className="fixed inset-0 bg-slate-400 p-2 flex flex-col w-full rounded-b-xl border-b-2 rounded-xl h-80">
            <div className="flex justify-between items-center">
              <h1 className="text-black font-medium">
                Career<span className="text-blue-500">Hub</span>
              </h1>
              <button onClick={toggleMenu}>
                <RxCross2 size={24} />
              </button>
            </div>
            <div className="mt-8">
              <ul className="flex gap-6 flex-col">
                <li>Home</li>
                <li>Jobs</li>
                <li>Browse</li>
              </ul>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
