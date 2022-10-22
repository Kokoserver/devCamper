import Bootcamp from "../model/Bootcamp.js";

// @desc get all bootcamps
// @route api/v1/bootcamps
// @method GET
// @access public
export const getBootCamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find();
    return res
      .status(200)
      .json({ success: true, count: bootcamps.length, data: bootcamps });
  } catch (error) {
    return res.status(500).json({ success: false });
  }
};

// @desc get single bootcamp
// @route api/v1/bootcamps/:id
// @method GET
// @access public
export const getBootCamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);
    if (!bootcamp) return res.status(404).json({ success: false });
    return res.status(200).json({ success: true, data: bootcamp });
  } catch (error) {
    return res.status(400).json({ success: false });
  }
};

// @desc create single bootcamp
// @route api/v1/bootcamps
// @method POST
// @access private
export const createBootCamps = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);
    return res.status(201).json({ success: true, bootcamp });
  } catch (error) {
    return res.status(400).json({ success: false });
  }
};

// @desc update single bootcamp
// @route api/v1/bootcamps/:id
// @method PUT
// @access private
export const updateBootCamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!bootcamp) return res.status(400).json({ success: false });
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(400).json({ success: false });
  }
};

// @desc update single bootcamp
// @route api/v1/bootcamps/:id
// @method DELETE
// @access private
export const deleteBootCamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
    if (!bootcamp) return res.status(400).json({ success: false });
    return res.status(200).json({ success: true, data: bootcamp });
  } catch (error) {
    return res.status(400).json({ success: false });
  }
};
