import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Edit2Icon, Heading2, Mail, Phone } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { Badge } from "@/components/ui/badge";
import Appliedjob from "./Appliedjob";

const Profile = () => {
  const Skills = [
    "Frontend",
    "backend",
    "Fullstack",
    "MERN Stack",
    "Swing Stack",
  ];

  return (
    <div className="mt-24 max-w-7xl m-auto">
      <div className="border rounded-xl shadow-lg">
        <div className="flex gap-5 items-center p-4">
          <Avatar className="w-16 h-16 rounded-full">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-xl font-bold"> Full Name</h1>
            <p className="text-sm text-gray-400">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cum a
              quidem, distinctio nisi debitis, sed iste error, iusto soluta
              molestias aspernatur ea aliquam. Explicabo quibusdam ipsum nam,
              doloremque eum officiis?
            </p>
          </div>
          <div>
            <Button variant="outline" size="icon">
              <Edit2Icon />
            </Button>
          </div>
        </div>
        <div className="mx-3 my-3">
          <div className="flex gap-3 my-2">
            <Mail />
            <span>Koshish@gmail.com</span>
          </div>
          <div className="flex gap-3">
            <Phone />
            <span>9843023686</span>
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
            <label typeof="">Resume</label>
          </div>
        </div>
      </div>
      {/*  */}
      <div className="max-w-7xl mx-auto bg-white rounded-2xl mt-8">
        <h1 className="text-center text-2xl font-bold p-3">Applied Jobs</h1>
        <Appliedjob/>
      </div>
    </div>
  );
};

export default Profile;
