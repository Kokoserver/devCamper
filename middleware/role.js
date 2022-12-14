import ErrorResponse from "../utils/ErrorResponse.js";

export default function (...roles) {
  return function (req, res, next) {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `Access denied only ${roles} can access this route`,
          403
        )
      );
    }
    next();
  };
}
