import express from "express";
import {
  createTravel,
  getAllTravels,
  getSingleTravel,
  travelByUser,
} from "../controllers/travelController.js";

const router = express.Router();

router.route("/").post(createTravel).get(getAllTravels);
router.route("/userTravels").get(travelByUser);
router.route("/blog/:id").get(getSingleTravel);

export default router;
