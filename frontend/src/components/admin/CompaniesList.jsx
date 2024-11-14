import React, { useEffect, useState } from "react";
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
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Pencil } from "lucide-react";
import { useSelector } from "react-redux";
import store from "@/redux/store";
import { useNavigate } from "react-router-dom";

const CompaniesList = () => {
  const { allcompany, searchCompany } = useSelector((store) => store.company);
  // console.log("Search value", searchCompany);

  // Filter companies based on the search term
  const filteredCompanies = allcompany.filter((company) =>
    company?.name?.toLowerCase().includes(searchCompany?.toLowerCase() || "")
  );

  const navigate = useNavigate();

  return (
    <div className="my-5">
      <Table>
        <TableCaption>A list of your registered companies.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allcompany.length <= 0 ? (
            <span>You have not registered any company</span>
          ) : (
            filteredCompanies.map((element, index) => (
              <TableRow key={element._id || index}>
                <TableCell className="font-medium">
                  <Avatar className="cursor-pointer">
                    <AvatarImage src={element.logo} alt="@shadcn" />
                    <AvatarFallback></AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell>{element.name}</TableCell>
                <TableCell>{element.createdAt.split("T")[0]}</TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger>
                      <Button
                        onClick={() =>
                          navigate(`/admin/companies/${element._id}`)
                        }
                      >
                        Edit
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full">
                      <Pencil />
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

export default CompaniesList;
