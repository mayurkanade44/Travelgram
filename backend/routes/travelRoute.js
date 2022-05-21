import express from "express";
import {
  createTravel,
  deleteTravel,
  getAllTravels,
  getSingleTravel,
  searchTravel,
  travelByUser,
  updateTravel,
} from "../controllers/travelController.js";

const router = express.Router();

router.route("/").post(createTravel).get(getAllTravels);
router.route("/search").get(searchTravel);
router.route("/userTravels").get(travelByUser);
router
  .route("/blog/:id")
  .get(getSingleTravel)
  .patch(updateTravel)
  .delete(deleteTravel);

export default router;
