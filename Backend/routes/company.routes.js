import express from "express";
import authenticatedToken from "../middleware/isAuthenticated.js";
import { getAllCompanies, registerCompany ,getCompanyById,updateCompany } from "../controllers/company.controller.js";
const router = express.Router();

// router.route('/register').post(register);
router.post("/register",authenticatedToken, registerCompany);
router.get("/get",authenticatedToken,getAllCompanies)
router.get("/get/:id",authenticatedToken,getCompanyById);
router.put("/update/:id",authenticatedToken, updateCompany);



export default router;