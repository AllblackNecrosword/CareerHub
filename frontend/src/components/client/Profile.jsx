import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Edit2Icon, Heading2, Mail, Phone } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Badge } from "@/components/ui/badge";
import Appliedjob from "./Appliedjob";
import UpdateProfile from "./UpdateProfile";
import { useSelector } from "react-redux";
import Navbar from "../shared/Navbar";
const Profile = () => {
  const { user } = useSelector((store) => store.auth);
  const Skills = user?.profile?.skills || [];

  const [isopen, setIsOpen] = useState(false);

  const handleprofileedit = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  // console.log(isopen);
  return (
    <>
<Navbar/>
    <div className="mt-24 max-w-7xl m-auto">
      <div className="border rounded-xl shadow-lg">
        <div className="flex gap-5 items-center p-4">
          <Avatar className="w-16 h-16 rounded-full">
            <AvatarImage
              src={user?.profile?.profile}
              alt={user?.username || "User Avatar"}
            />
            <AvatarFallback>
              {user?.username ? user.username.charAt(0) : "U"}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-xl font-bold">{user?.username}</h1>
            <p className="text-sm text-gray-400">
              {user?.profile?.bio || "No bio available"}
            </p>
          </div>
          <div>
            <Button
              variant="outline"
              size="icon"
              onClick={handleprofileedit}
              className="ml-auto"
            >
              <Edit2Icon />
            </Button>
          </div>
        </div>
        <div className="mx-3 my-3">
          <div className="flex gap-3 my-2">
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className="flex gap-3">
            <Phone />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>
        <div className=" p-4">
          <h1 className="text-2xl font-medium ">Skills</h1>
          <div className="flex gap-4 mt-3">
            {Skills.length === 0 ? (
              <h1>No Skills found</h1>
            ) : (
              Skills.map((item, index) => {
                return <Badge variant="outline">{item}</Badge>;
              })
            )}
          </div>

          <div className="mt-3">
            <h1 className="text-2xl font-medium">Resume</h1>
            <label>
              <a
                href={user?.profile?.resume}
                className="text-blue-700 underline"
                download={user?.profile?.resumeName}
              >
                {user?.profile?.resumeName || "No resume found"}
              </a>
            </label>
          </div>
        </div>
      </div>
      {/*  */}
      <div className="max-w-7xl mx-auto bg-white rounded-2xl mt-8">
        <h1 className="text-center text-2xl font-bold p-3">Applied Jobs</h1>
        <Appliedjob />
      </div>
      {isopen && <UpdateProfile isOpen={isopen} onClose={handleClose} />}
    </div>
    </>
  );
};

export default Profile;
