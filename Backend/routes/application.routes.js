import express from "express";
import authenticatedToken from "../middleware/isAuthenticated.js";
import { applyJobs, getApplicants, getAppliedJobs, updateStatus } from "../controllers/application.controller.js";

const router = express.Router();

// router.route('/register').post(register);
router.get("/apply/:id",authenticatedToken, applyJobs);
router.get("/get",authenticatedToken,getAppliedJobs)
router.get("/get/:id",authenticatedToken,getApplicants);
router.post("/status/:id",authenticatedToken, updateStatus);



export default router;