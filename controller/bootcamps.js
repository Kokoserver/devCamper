import asyncHandler from "../middleware/asyncHandler.js";
import Bootcamp from "../model/Bootcamp.js";
import ErrorResponse from "../utils/errorResponse.js";
import geocoder from "../utils/geocoder.js";

// @desc get all bootcamps
// @route api/v1/bootcamps
// @method GET
// @access public

export const getBootCamps = asyncHandler(async (req, res, next) => {
  let query;
  let queryStr = { ...req.query };
  const removeQuery = ["select"];
  removeQuery.forEach((param) => delete removeQuery[param]);
  queryStr = JSON.stringify(queryStr);
  queryStr = queryStr.replace(
    /\b(gt|gte|lte|lt|in)\b/g,
    (match) => `$${match}`
  );
  query = Bootcamp.find(JSON.parse(queryStr));
  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
  }
  if (req.query.sort) {
    const sort = req.query.sort.split(",").join(" ");
    query = query.sort(sort);
  } else {
    query.sort("-createdAt");
  }

  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Bootcamp.countDocuments();
  query = query.skip(startIndex).limit(limit);

  const bootcamps = await query;
  const pagination = {};
  if (endIndex < total) {
    console.log("i enter here...");
    pagination["next"] = {
      page: page + 1,
      limit,
    };
  }
  if (startIndex > 0) {
    pagination["prev"] = {
      page: page - 1,
      limit,
    };
  }

  return res.status(200).json({
    success: true,
    count: bootcamps.length,
    pagination,
    data: bootcamps,
  });
});

// @desc get all bootcamps by distance
// @route api/v1/bootcamps/radius/:zipcode/distance
// @method GET
// @access public

export const getBootCampByLocation = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;
  // get geocoder location
  const location = await geocoder.geocode(zipcode);
  const { latitude, longitude } = location[0];
  // calculate distance
  // earch radius  3963 miles

  const radius = distance / 3963;
  const bootcamps = await Bootcamp.find({
    location: {
      $geoWithin: { $centerSphere: [[longitude, latitude], radius] },
    },
  });
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
