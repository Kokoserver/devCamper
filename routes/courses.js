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
import protectedRoute from "../middleware/auth.js";
import permission from "../middleware/role.js";
router
  .route("/")
  .get(advanceResult(Course, "bootcamp"), getCourses)
  .post(...[protectedRoute, permission("publisher"), createCourse]);
router
  .route("/:id")
  .get(getCourse)
  .put(...[protectedRoute, permission("publisher"), updateCourse])
  .delete(...[protectedRoute, permission("publisher"), deleteCourse]);

export default router;
