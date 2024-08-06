import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <nav className="">
        <div className="p-2 flex justify-between items-center font-poppins md:py-4 font-medium border-b-2">
          <h1 className="text-black font-medium md:ml-32">
          <Link to={"/"}>Career<span className="text-blue-500">Hub</span></Link>  
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
            <Link to={"/"}> <li>Home</li></Link>
              <li>Jobs</li>
              <li>Browse</li>
              <button>
                <CgProfile size={30} />
              </button>
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
