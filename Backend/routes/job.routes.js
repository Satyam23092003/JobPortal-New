import express from "express";
import authenticatedToken from "../middleware/isAuthenticated.js";

import {
  getAdminJobs,
  getAllJobs,
  getJobById,
  postJob,
} from "../controllers/job.controller.js";
const router = express.Router();

// router.route('/register').post(register);
router.post("/post", authenticatedToken, postJob);
router.get("/get", authenticatedToken, getAllJobs);
router.get("/get/:id", authenticatedToken, getJobById);
router.get("/getadminjobs", authenticatedToken, getAdminJobs);

export default router;
