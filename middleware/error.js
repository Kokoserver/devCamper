import ErrorResponse from "../utils/ErrorResponse.js";
export default (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  // mongoose validation error
  if (err.name === "ValidationError") {
    const errorNames = Object.keys(err.errors);
    const message = Object.values(err.errors).map((val, index) => ({
      name: errorNames[index],
      message: val.message,
    }));
    res.status(400).json({ success: false, detail: message });
  }
  if (err.code === 11000) {
    //   mongoose duplicate value error
    const message = `Resource with field value '${err.keyValue.name}' already exists`;
    error = new ErrorResponse(message, 409);
  }
  if (err.name === "CastError" || err.path === "_id" || err.kind === "Object") {
    //   Mongooses invalid id
    const message = `Resource with id ${err.value} not found`;
    error = new ErrorResponse(message, 404);
  }
  res
    .status(error.statusCode || 500)
    .json({ success: false, detail: error.message || "Server error" });
};
