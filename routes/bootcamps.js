import express from "express";
import advanceResult from "../middleware/advanceResult.js";
import Bootcamp from "../model/Bootcamp.js";

import {
  createBootCamps,
  getBootCamp,
  updateBootCamp,
  getBootCamps,
  deleteBootCamp,
  getBootCampByLocation,
  uploadImageBootCamp,
} from "../controller/bootcamps.js";
import courseRouter from "./courses.js";

const router = express.Router();
router.use("/:bootcampId/courses", courseRouter);
router.route("/radius/:zipcode/:distance").get(getBootCampByLocation);
router
  .route("/")
  .get(advanceResult(Bootcamp, "courses"), getBootCamps)
  .post(createBootCamps);
router.route("/:id/photo").put(uploadImageBootCamp);
router
  .route("/:id")
  .get(getBootCamp)
  .put(updateBootCamp)
  .delete(deleteBootCamp);

export default router;
