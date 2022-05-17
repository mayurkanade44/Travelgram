import { register, login, googleLogin } from "../controllers/userController.js";
import express from "express";
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/googleLogin").post(googleLogin);

export default router;
