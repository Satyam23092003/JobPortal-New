import { Link } from "react-router-dom";
import React from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut, User2 } from "lucide-react";
import Login from "./authentication/Login";

const Navbar = () => {
  const user=false;
  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <h1 className="text-2xl font-bold">
            <span className="text-[#6B3AC2]">Job</span> <span className="text-[#FA4F09]">Portal</span>
          </h1>
        </div>

        <div className="flex gap-10 items-center">
          <ul className="flex font-medium items-center gap-6">
            <li>
              <Link>Home</Link>
            </li>
            <li>
              <Link>Browse</Link>
            </li>
            <li>
              <Link>Job</Link>
            </li>
          </ul>
          {
            !user?(
              <div className="flex items-center gap-6">
                <Link to={"/login"}> <Button variant="outline">Login</Button></Link>  
                <Link to={"/register"}><Button className="bg-red-600 hover:bg-red-700">Register</Button></Link>
              </div>
            ):
          
          <Popover>
            <PopoverTrigger asChild>
              <Avatar className="cursor-pointer items-center">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="w-70 shadow">
              <div className="flex gap-4 items-center space-y-4">
                <Avatar className="cursor-pointer mx-4">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                </Avatar>
                <div>
                  <h3 className="font-medium mt-2">Kumar Satyam</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit
                  </p>
                </div>
              </div>
              <div className="flex flex-col my-2 mx-4  text-gray-600">
                <div className="flex w-fit items-center gap-2 cursor-pointer">
                  <User2></User2>
                  <Button variant="link">Profile</Button>
                </div>

                <div className="flex w-fit items-center gap-2 cursor-pointer">
                  <LogOut></LogOut>
                  <Button variant="link">Login</Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
