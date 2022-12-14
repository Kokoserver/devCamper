import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import errorResponse from "../utils/ErrorResponse.js";
import User from "../model/User.js";
export default asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  //   else if (req.cookies.session_token) {
  //     token = req.cookies.session_token;
  //   }

  if (!token) {
    return next(
      new errorResponse("Not authorization to access this route", 401)
    );
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decoded.id);
    if (!user) {
      return next(
        new errorResponse("Not authorization to access this route", 401)
      );
    }
    req.user = user;
    next();
  } catch (error) {
    return next(
      new errorResponse("Not authorization to access this route", 401)
    );
  }
});
