import React, { useState } from "react";

import Navbar from "../Navbar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_ENDPOINT } from "@/utils/data.js";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",

    role: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.auth);
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_ENDPOINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      const errorMessage = error.response
        ? error.response.data.message
        : "An unexpected error occurred";
      toast.error(errorMessage);
    } finally {
      dispatch(setLoading(false));
    }
  };
  return (
    <div>
      <div>
        <Navbar />
        <div className="flex items-center justify-center max-w-7xl mx-auto">
          <form
            onSubmit={submitHandler}
            className="w-1/2 border border-gray-300 rounded-md p-4 my-10"
          >
            <h1 className="font-bold  text-xl mb-5  text-center text-blue-600">
              Login
            </h1>

            <div className="my-2">
              <Label>Email</Label>
              <Input
                className="mt-2"
                type="email"
                value={input.email}
                name="email"
                onChange={changeEventHandler}
                placeholder="satyam@gmail.com"
              ></Input>
            </div>
            <div className="my-2">
              <Label>Password</Label>
              <Input
                className="mt-2"
                type="password"
                value={input.password}
                name="password"
                onChange={changeEventHandler}
                placeholder="........."
              ></Input>
            </div>
            <div className="flex items-center justify-between">
              <RadioGroup className="flex items-center gap-4 my-5">
                <div className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    name="role"
                    value="student"
                    checked={input.role === "student"}
                    onChange={changeEventHandler}
                    className="cursor-pointer"
                  ></Input>
                  <Label htmlFor="r1">Student</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    name="role"
                    value="recruiter"
                    checked={input.role === "recruiter"}
                    onChange={changeEventHandler}
                    className="cursor-pointer"
                  ></Input>
                  <Label htmlFor="r2">Recruiter</Label>
                </div>
              </RadioGroup>
            </div>
            {loading ? (
              <div className="flex items-center justify-center my-10">
                <div className="spinner-border text-blue-600" role="status">
                  <span className="sr-only">Loading....</span>
                </div>

              </div>
            ) :(
              <button
              type="submit"
              className=" w-3/4 my-3 flex items-center justify-center max-w-7xl mx-auto   py-3 text-white bg-blue-600 hover:bg-blue-800 rounded-md"
            >
              Login
            </button>
            )
          }
            
            {/* already account then login*/}
            <p className="flex mt-3 items-center justify-center text-md">
              Don't have an account?
              <Link className="text-blue-700 " to="/register">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
