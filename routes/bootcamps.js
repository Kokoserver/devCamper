import express from "express";
import {
  createBootCamps,
  getBootCamp,
  updateBootCamp,
  getBootCamps,
  deleteBootCamp,
  getBootCampByLocation,
} from "../controller/bootcamps.js";

const router = express.Router();
router.route("/radius/:zipcode/:distance").get(getBootCampByLocation);
router.route("/").get(getBootCamps).post(createBootCamps);
router
  .route("/:id")
  .get(getBootCamp)
  .put(updateBootCamp)
  .delete(deleteBootCamp);

export default router;
