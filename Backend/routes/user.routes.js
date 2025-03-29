import express from "express";
import { login, register, updateProfile,logout } from "../controllers/user.controllers.js";
import authenticatedToken from "../middleware/isAuthenticated.js";
import { singleUpload } from "../middleware/multer.js";
const router = express.Router();

// router.route('/register').post(register);
router.post("/register", singleUpload, register);
router.post("/login", login);
router.post("/profile/update",authenticatedToken, updateProfile);
router.post("/logout",logout);


export default router;