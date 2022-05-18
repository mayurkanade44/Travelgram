import express from "express";
import {
  createTravel,
  getAllTravels,
} from "../controllers/travelController.js";

const router = express.Router();

router.route("/").post(createTravel).get(getAllTravels);

export default router;
