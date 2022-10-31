import {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../controller/courses.js";
import { Router } from "express";
import advanceResult from "../middleware/advanceResult.js";
import Course from "../model/Course.js";
const router = Router({ mergeParams: true });

router
  .route("/")
  .get(advanceResult(Course, "bootcamp"), getCourses)
  .post(createCourse);
router.route("/:id").get(getCourse).put(updateCourse).delete(deleteCourse);

export default router;
