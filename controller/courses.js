import Course from "../model/Course.js";
import asyncHandler from "../middleware/asyncHandler.js";
import ErrorResponse from "../utils/errorResponse.js";
import Bootcamp from "../model/Bootcamp.js";

// @desc get all courses with bootcamp
// @route api/v1/bootcamps/:id
// @method GET
// @access public
export const getCourses = asyncHandler(async (req, res, next) => {
  let query;
  if (req.params.bootcampId) {
    query = Course.find({ bootcamp: req.params.bootcampId });
  } else {
    query = Course.find();
  }

  const courses = await query.populate({
    path: "bootcamp",
    select: "name description",
  });
  return res
    .status(200)
    .json({ success: true, count: courses.length, data: courses });
});

// @desc get single course
// @route api/v1/courses/:id
// @method GET
// @access public
export const getCourse = asyncHandler(async (req, res, next) => {
  let query = Course.findById(req.params.id);
  const course = await query.populate({
    path: "bootcamp",
    select: "name description",
  });
  if (!course) {
    return next(
      new ErrorResponse(`course with id ${req.params.id} not found`, 404)
    );
  }
  return res.status(200).json({ success: true, data: course });
});

// @desc create new course associated with bootcamp
// @route api/v1/bootcamps/:bootcampId/courses
// @method POST
// @access private
export const createCourse = asyncHandler(async (req, res, next) => {
  req.body.bootcamp = req.params.bootcampId;
  let bootcamp = await Bootcamp.findById(req.params.bootcampId);
  if (!bootcamp) {
    return next(
      new ErrorResponse(
        `bootcamp with id ${req.params.bootcampId} not found`,
        404
      )
    );
  }

  const course = await Course.create(req.body);
  return res.status(200).json({ success: true, data: course });
});

// @desc update single course
// @route api/v1/bootcamps/:bootcampId/courses
// @method PUT
// @access private
export const updateCourse = asyncHandler(async (req, res, next) => {
  let course = Course.findById(req.params.id);
  if (!course) {
    return next(
      new ErrorResponse(`course with id ${req.params.id} not found`, 404)
    );
  }

  course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true,
  });
  return res.status(200).json({ success: true, data: course });
});

// @desc delete single course
// @route api/v1/bootcamps/:bootcampId/courses
// @method DELETE
// @access private
export const deleteCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return next(
      new ErrorResponse(`course with id ${req.params.id} is not found`, 404)
    );
  }
  await course.remove();
  return res.status(200).json({ success: true, data: course });
});
