import {Company} from "../models/company.model.js";
import mongoose from "mongoose";

export const registerCompany = async (req, res) => {
  try {
    const { companyName ,description } = req.body;
    if (!companyName || !description) {
      return res.status(400).json({
        success: false,
        message: "Company Name is required",
      });
    }
    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res.status(400).json({
        success: false,
        message: "Company Already Exist",
      });
    }

    company = await Company.create({
      name: companyName,
      description:description,
      userId: req.id,
    });

    return res.status(200).json({
      message: "Company Registered Successfully",
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

        export const getAllCompanies = async (req, res) => {
        try {
            const userId = req.id; //logged in user id
            // console.log(userId);
            const companies = await Company.find({ userId });
            if (!companies) {
            return res.status(404).json({
                success: false,
                message: "No company found",
            });
            }
            return res.status(200).json({
                companies,
                success:true,
            });
        } catch (error) {
            console.log(error);
        }
        };

export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({
        success: false,
        message: "No company found",
      });
    }

    return res.status(200).json({
      success: true,
      company,
    });
  } catch (error) {}
};

//update the company details
export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const file = req.file;

    //cloudinary

    const updateData = {
      name,
      description,
      website,
      location,
    };
    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if(!company){
        return res.status(404).json({
            success:false,
            message:"Company not found"
        })
    }
    return res.status(200).json({
        success:true,
        company,
        message:"Comany details have been updated"
    })
  } catch (error) {}
};
