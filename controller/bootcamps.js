import path from "path";
import asyncHandler from "../middleware/asyncHandler.js";
import Bootcamp from "../model/Bootcamp.js";
import ErrorResponse from "../utils/errorResponse.js";
import geocoder from "../utils/geocoder.js";

// @desc get all bootcamps
// @route api/v1/bootcamps
// @method GET
// @access public
export const getBootCamps = asyncHandler(async (req, res, next) => {
  return res.status(200).json(res.advanceResult);
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
  const bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp) {
    return next(
      new ErrorResponse(`bootcamp with id ${req.params.id} is not found`, 404)
    );
  }
  await bootcamp.remove();
  return res.status(200).json({ success: true, data: bootcamp });
});

// @desc update  bootcamp image
// @route api/v1/bootcamps/:id
// @method DELETE
// @access private
export const uploadImageBootCamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp) {
    return next(
      new ErrorResponse(`bootcamp with id ${req.params.id} is not found`, 404)
    );
  }
  const file = req.files.file;
  if (!file.mimetype.startsWith("image")) {
    return next(new ErrorResponse("Please provide a valid image file", 400));
  }
  if (file.size > process.env.MAX_FILE_SIZE_UPLOAD) {
    return next(
      new ErrorResponse(
        `please upload image size less than or equal to ${
          process.env.MAX_FILE_SIZE_UPLOAD / 1000000
        }mb`,
        400
      )
    );
  }
  file.name = `photo_${bootcamp._id}${path.parse(file.name).ext}`;

  file.mv(
    path.join(path.resolve(process.env.FILE_UPLOAD_PATH), file.name),
    async (err) => {
      if (err) {
        console.log(err);
        return next(new ErrorResponse("Error uploading image", 500));
      }
      await Bootcamp.findByIdAndUpdate(req.params.id, { photo: file.name });
      return res.status(200).json({ success: true, data: file.name });
    }
  );
});
