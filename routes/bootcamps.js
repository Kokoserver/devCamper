import express from "express";
import {
  createBootCamps,
  getBootCamp,
  updateBootCamp,
  getBootCamps,
  deleteBootCamp,
} from "../controller/bootcamps.js";

const router = express.Router();
router.route("/").get(getBootCamps).post(createBootCamps);
router
  .route("/:id")
  .get(getBootCamp)
  .put(updateBootCamp)
  .delete(deleteBootCamp);

export default router;
