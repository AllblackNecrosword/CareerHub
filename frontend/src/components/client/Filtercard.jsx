import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
import React from "react";

const Filtercard = () => {
  const filterData = [
    {
      filterType: "Location",
      array: ["Kathmandu", "Bhaktapur", "Lalitpur", "Pokhara"],
    },
    {
      filterType: "Industry",
      array: [
        "Frontend Developer",
        "Backend Developer",
        "Full stack Developer",
        "MERN stack Developer",
      ],
    },
    {
      filterType: "Salary",
      array: ["0-40k", "50k-1lakh", "1lakh-5lakh"],
    },
  ];

  return (
    <div className="fixed">
      <h1 className="text-xl font-bold border-b-2">Filter</h1>
      <div className="my-5 ">
        {filterData.map((items, index) => (
          <div key={index} className="my-4">
            <h1 className="font-semibold my-2">{items.filterType}</h1>
            {items.array.map((item, idx) => (
              <div key={idx} className="flex items-center space-x-2 space-y-2">
                {/* Native checkbox input */}
                <div className="flex items-center gap-x-3 space-y-2">
                 <input type="checkbox" id={item} className="w-5 h-5" />
                <label htmlFor={item} className="text-gray-700">
                  {item}
                </label> 
                </div>
                
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filtercard;
