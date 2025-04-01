
import { Badge } from "@/components/ui/badge";
import React from "react";

const JobCards = () => {
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-200 m-2 cursor-pointer hover:shadow-2xl hover:shadow-blue-200 hover:p-3 ">
      <div>
        <h1 className="text-lg font-medium">Company Name</h1>
        <p className="text-sm text-gray-600 ">India</p>
      </div>
      <div>
        <h2 className="font-bold text-lg my-2">Job Title</h2>
        <p className="text-sm text-gray-600 ">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque ipsum
          quae eos nesciunt alias! 
        </p>
      </div>
      <div className="flex gap-2 items-center mt-4" >
       <Badge variant={"ghost"} className={"text-blue-700 font-bond"}>10 Position</Badge>
       <Badge variant={"ghost"} className={"text-[#FA4F09] font-bond"}>20 LPA</Badge>
       <Badge variant={"ghost"} className={"text-[#6B3AC2] font-bond"}>Remote</Badge>
       <Badge variant={"ghost"} className={"text-blue-700 font-bond"}>Full time</Badge>
      </div>
    </div>
  );
};

export default JobCards;
