import React from "react";
import { Button } from "../ui/button";
import { Badge, Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";

const JobList = () => {
  return (
    <div className="p-6  shadow-lg rounded-3xl bg-white border">
      <div className="flex items-center justify-between">
        <p className="text-gray-400">2 days ago</p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>

      <div className="flex gap-2 items-center my-2">
        <Button variant="outline" className="p-6 rounded-full" size="icon">
          <Avatar>
            <AvatarImage src="https://t3.ftcdn.net/jpg/04/74/05/94/360_F_474059464_qldYuzxaUWEwNTtYBJ44VN89ARuFktHW.jpg" />
          </Avatar>
        </Button>
        <div className="text-base font-medium">
          <h1>Company Name</h1>
          <p>Nepal</p>
        </div>
      </div>
      <div>
        <h2 className="font-semibold text-lg my-2">Title</h2>
        <p className="text-sm text-gray-500">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit libero
          delectus vitae, modi quas aliquid harum consequatur, dolorum eveniet
          dignissimos odit iure magni ut pariatur quia laudantium! Quod,
          eligendi nobis?
        </p>
      </div>
      <div className="flex flex-wrap gap-6 text-sm mt-1">
        <button className=" text-blue-500">2 Position</button>
        <button className="text-orange-600">Full Time</button>
        <button className="text-green-600">45LPA</button>
      </div>
      <div className="my-2">
        <Button className="rounded-xl bg-blue-500">View</Button>
      </div>
    </div>
  );
};

export default JobList;
