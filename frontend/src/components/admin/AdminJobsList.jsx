import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { UserRoundSearch } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";

const AdminJobsList = () => {
  const { getAdminJobs, getSearchAdminJobs } = useSelector(
    (store) => store.job
  );

  const SearchCompany = getAdminJobs.filter((element) =>
    element?.title
      ?.toLowerCase()
      .includes(getSearchAdminJobs?.toLowerCase() || "")
  );
  const navigate = useNavigate();

  return (
    <div className="my-5">
      <Table>
        <TableCaption>A list of your Jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Position</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {getAdminJobs.length <= 0 ? (
            <span>You have not created any job</span>
          ) : (
            SearchCompany.map((element, index) => (
              <TableRow key={element._id || index}>
                <TableCell className="font-medium">
                  <Avatar className="cursor-pointer">
                    <AvatarImage src={element?.company?.logo} alt="@shadcn" />
                    <AvatarFallback></AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell>{element?.title}</TableCell>
                <TableCell>{element?.position}</TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger>
                      <BsThreeDots size={24} />
                    </PopoverTrigger>
                    <PopoverContent className="w-full">
                      <UserRoundSearch size={18}
                        onClick={()=>navigate(`/admin/appliedApplicants/${element._id}`)}
                      />
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsList;
