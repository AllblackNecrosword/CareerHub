import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setgetAppliedJob } from "@/redux/jobSlice";

const Appliedjob = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const FetchAppliedJobs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/application/getappliedjob",
          {
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          dispatch(setgetAppliedJob(response.data));
        }
      } catch (error) {
        console.log(error);
      }
    };
    FetchAppliedJobs();
  }, []);
  const { getAppliedJob } = useSelector((store) => store.job);
  // console.log(getAppliedJob);

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent applied jobs.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Date</TableHead>
            <TableHead>JobRole</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {getAppliedJob?.application?.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">
                {" "}
                {new Date(item.createdAt).toLocaleDateString() || "N/A"}
              </TableCell>
              <TableCell>{item?.job?.title}</TableCell>
              <TableCell>{item?.job?.company?.name}</TableCell>
              <TableCell className="text-right">
                {item.status === "pending" ? (
                  <Badge size="icon" variant="outline">
                    {item?.status}
                  </Badge>
                ) : (
                  <Badge size="icon" className="bg-green-500">
                    {item?.status}
                  </Badge>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Appliedjob;
