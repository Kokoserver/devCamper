import asyncHandler from "../middleware/asyncHandler.js";
import Bootcamp from "../model/Bootcamp.js";
import ErrorResponse from "../utils/errorResponse.js";

// @desc get all bootcamps
// @route api/v1/bootcamps
// @method GET
// @access public

export const getBootCamps = asyncHandler(async (req, res, next) => {
  const bootcamps = await Bootcamp.find();
  return res
    .status(200)
    .json({ success: true, count: bootcamps.length, data: bootcamps });
});

// @desc get single bootcamp
// @route api/v1/bootcamps/:id
// @method GET
// @access public
export const getBootCamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp) {
    return next(
      new ErrorResponse(`bootcamp with id ${req.params.id} is not found`, 404)
    );
  }
  return res.status(200).json({ success: true, data: bootcamp });
});

// @desc create single bootcamp
// @route api/v1/bootcamps
// @method POST
// @access private
export const createBootCamps = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);
  return res.status(201).json({ success: true, bootcamp });
});

// @desc update single bootcamp
// @route api/v1/bootcamps/:id
// @method PUT
// @access private
export const updateBootCamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!bootcamp) {
    return next(
      new ErrorResponse(`bootcamp with id ${req.params.id} is not found`, 404)
    );
  }
  return res.status(200).json({ success: true, data: bootcamp });
});

// @desc update single bootcamp
// @route api/v1/bootcamps/:id
// @method DELETE
// @access private
export const deleteBootCamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
  if (!bootcamp) {
    return next(
      new ErrorResponse(`bootcamp with id ${req.params.id} is not found`, 404)
    );
  }
  return res.status(200).json({ success: true, data: bootcamp });
});
