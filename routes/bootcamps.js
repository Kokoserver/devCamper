import express from "express";
import advanceResult from "../middleware/advanceResult.js";
import Bootcamp from "../model/Bootcamp.js";
import protectedRoute from "../middleware/auth.js";
import permission from "../middleware/role.js";
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
  .post(...[protectedRoute, permission("publisher"), createBootCamps]);
router
  .route("/:id/photo")
  .put(...[protectedRoute, permission("publisher"), uploadImageBootCamp]);
router
  .route("/:id")
  .get(getBootCamp)
  .put(...[protectedRoute, permission("publisher"), updateBootCamp])
  .delete(...[protectedRoute, permission("publisher"), deleteBootCamp]);

export default router;
