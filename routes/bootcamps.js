import express from "express";
import {
  createBootCamps,
  getBootCamp,
  updateBootCamp,
  getBootCamps,
  deleteBootCamp,
  getBootCampByLocation,
} from "../controller/bootcamps.js";
import courseRouter from "./courses.js";

const router = express.Router();
router.use("/:bootcampId/courses", courseRouter);
router.route("/radius/:zipcode/:distance").get(getBootCampByLocation);
router.route("/").get(getBootCamps).post(createBootCamps);
router
  .route("/:id")
  .get(getBootCamp)
  .put(updateBootCamp)
  .delete(deleteBootCamp);

export default router;
