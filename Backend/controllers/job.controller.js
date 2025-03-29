import { Job } from "../models/job.model.js";

//Admin Job Posting
export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      location,
      salary,
      jobType,
      position,
      companyId,
      experience,

    } = req.body;

    const userId = req.id;
    if (
      !title ||
      !description ||
      !requirements ||
      !location ||
      !salary ||
      !jobType ||
      !position ||
      !companyId ||
      !experience
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      location,
      salary: Number(salary),
      jobType,
      position,
      company: companyId,
      experience: experience,
      created_by: userId,
    });
    return res.status(200).json({
      success: true,
      job,
      message: "Job Posted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error job create",
    });
  }
};

//users

export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
        { requirements: { $regex: keyword, $options: "i" } },
        { location: { $regex: keyword, $options: "i" } },
        { jobType: { $regex: keyword, $options: "i" } },
        { position: { $regex: keyword, $options: "i" } },
      ],
    };
    const jobs = await Job.find(query).populate({
      path:"company",
    }).sort({createdAt:-1});
    if (!jobs) {
      return res.status(400).json({
        success: false,
        message: "No Job Found",
      });
    }

    return res.status(200).json({
      success: true,
      jobs,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "Server Error job create",
    });
  }
};

//users
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path:"company",
    }).sort({createdAt:-1});
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job Not found",
      });
    }

    return res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error job create",
    });
  }
};

//admin job created
export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ created_by: adminId });
    if (!jobs) {
      return res.status(404).json({
        success: false,
        message: "Job Not found",
      });
    }
  
    return res.status(200).json({
      success:true,
      jobs
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error job create",
    });
  }
};
