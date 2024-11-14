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
import { useSelector } from "react-redux";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { BsThreeDots } from "react-icons/bs";
import { Button } from "../ui/button";
import { toast } from "react-toastify";
import axios from "axios";

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.applicant);

  const changeStatusHandler = async (status, id) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/application/updatestatus/${id}`,
        { status },
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        toast.success("Status Changed Sucessfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Table>
      <TableCaption>A list of your applicants.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">FullName</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Contact</TableHead>
          <TableHead>Resume</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Status</TableHead>
          <TableHead className="text-right">Edit</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {applicants?.jobs?.applications?.map((application) => (
          <TableRow key={application._id}>
            <TableCell className="font-medium">
              {application.applicant?.username || "N/A"}
            </TableCell>
            <TableCell>{application.applicant?.email || "N/A"}</TableCell>
            <TableCell>{application.applicant?.phoneNumber || "N/A"}</TableCell>
            <TableCell>
              <a
                href={`/resumes/${application.applicant?._id}.pdf`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {application.applicant?.resume || "Resume.pdf"}
              </a>
            </TableCell>
            <TableCell>
              {new Date(application.createdAt).toLocaleDateString() || "N/A"}
            </TableCell>
            <TableCell className="text-right">
              {application.status || "Pending"}
            </TableCell>
            <TableCell className="text-right">
              <Popover>
                <PopoverTrigger>
                  {" "}
                  <BsThreeDots size={24} />
                </PopoverTrigger>
                <PopoverContent className="w-full">
                  <ul className="font-semibold flex flex-col gap-y-3">
                    <Button
                      className="hover:bg-green-500"
                      onClick={() =>
                        changeStatusHandler("accepted", application._id)
                      }
                    >
                      Accepted
                    </Button>
                    <Button
                      className="hover:bg-red-500"
                      onClick={() =>
                        changeStatusHandler("rejected", application._id)
                      }
                    >
                      Rejected
                    </Button>
                  </ul>
                </PopoverContent>
              </Popover>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ApplicantsTable;
