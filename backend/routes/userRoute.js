import { register } from "../controllers/userController.js";
import express from 'express'
const router = express.Router()


router.route('/').post(register)


export default router