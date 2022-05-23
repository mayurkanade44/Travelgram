import express from "express";
import {
  createTravel,
  deleteTravel,
  getAllTravels,
  getSingleTravel,
  likeTravel,
  realtedTravels,
  searchTravel,
  travelByTags,
  travelByUser,
  updateTravel,
} from "../controllers/travelController.js";

const router = express.Router();

router.route("/").post(createTravel).get(getAllTravels);
router.route("/userTravels").get(travelByUser);
router.route("/search").get(searchTravel);
router.route("/search/:tag").get(travelByTags);
router.route("/like/:id").patch(likeTravel);
router
  .route("/blog/:id")
  .get(getSingleTravel)
  .patch(updateTravel)
  .delete(deleteTravel)
  .post(realtedTravels);

export default router;
