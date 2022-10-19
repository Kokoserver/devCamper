// @desc get all bootcamps
// @route api/v1/bootcamps
// @method GET
// @access public
export const getBootCamps = (req, res, next) => {
  return res.status(200).json({ message: "get all bootcmaps" });
};

// @desc get single bootcamp
// @route api/v1/bootcamps/:id
// @method GET
// @access public
export const getBootCamp = (req, res, next) => {
  return res
    .status(200)
    .json({ message: "get single bootcmaps" + req.params.id });
};

// @desc create single bootcamp
// @route api/v1/bootcamps
// @method POST
// @access private
export const createBootCamps = (req, res, next) => {
  return res.status(200).json({ message: "create single bootcmap" });
};

// @desc update single bootcamp
// @route api/v1/bootcamps/:id
// @method PUT
// @access private
export const updateBootCamp = (req, res, next) => {
  return res
    .status(200)
    .json({ message: "update single bootcmaps" + req.params.id });
};

// @desc update single bootcamp
// @route api/v1/bootcamps/:id
// @method DELETE
// @access private
export const deleteBootCamp = (req, res, next) => {
  res.status(200).json({ message: "delete single bootcmaps" + req.params.id });
};
