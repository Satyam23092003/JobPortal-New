import React, { useState } from "react";
import Navbar from "../Navbar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Link, useNavigate } from "react-router-dom";
import { Phone } from "lucide-react";
import { USER_API_ENDPOINT } from "@/utils/data.js";
import { toast } from "sonner";
import axios from "axios";
import {  setLoading } from "@/redux/authSlice";
import { useDispatch, useSelector } from "react-redux";


const Register = () => {
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    role: "",
    file: "",
  });

const navigate =useNavigate();
const dispatch = useDispatch();
const {loading}=useSelector((store)=>store.auth)
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files[0] });
  };
    const submitHandler=async(e)=>{
    e.preventDefault();
   
    const formData=new FormData();
      formData.append("fullName",input.fullName);
      formData.append("email",input.email);
      formData.append("password",input.password);
      formData.append("role",input.role);
      formData.append("phoneNumber",input.phoneNumber);
      if(input.file){
        formData.append("file",input.file);
      }
    try{
        dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_ENDPOINT}/register`,formData,{
        headers:{
          "Content-Type":"multipart/form-data"
        },
        withCredentials:true,
      });
      
      if(res.data.success){
        navigate("/login");
        toast.success(res.data.message);
      }
    }catch(error){
      console.log(error);
      const errorMessage=error.response? error.response.data.message:"An unexpected error occurred";
      toast.error(errorMessage);
    }
    finally {
          dispatch(setLoading(false));
        }

  }
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-300 rounded-md p-4 my-10"
        >
          <h1 className="font-bold  text-xl mb-5  text-center text-blue-600">
            Register
          </h1>
          <div className="my-2">
            <Label>Full Name</Label>
            <Input
              className="mt-2"
              type="text"
              value={input.fullName}
              name="fullName"
              onChange={changeEventHandler}
              placeholder="Kumar Satyam"
            ></Input>
          </div>
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
          <div className="my-2">
            <Label>Phone Number</Label>
            <Input
              className="mt-2"
              type="tel"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              placeholder="+0123456789"
            ></Input>
          </div>
          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                 
                  value="student"
                  checked={input.role==='student'}
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
                  checked={input.role==='recruiter'}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                ></Input>
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="flex items-center gap-2">
            <Label>Profile Photo</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={changeFileHandler}
              className="cursor-pointer"
            ></Input>
          </div>
          {loading ? (
              <div className="flex items-center justify-center my-10">
                <div className="spinner-border text-blue-600" role="status">
                  <span className="sr-only">Loading....</span>
                </div>

              </div>
            ) :(
              <button type="submit" className="block w-full mt-4 py-3 text-white bg-primary hover:bg-primary/90 rounded-md">
            Register
          </button>
            )
          }
          
          {/* already account then login*/}
          <p className="flex mt-3 items-center justify-center text-md">
            Already have an account?
            <Link className="text-blue-700 " to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
